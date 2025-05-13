import pandas as pd
import numpy as np
from datetime import datetime
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.model_selection import TimeSeriesSplit
import statsmodels.api as sm
from prophet import Prophet
from statsmodels.tsa.statespace.sarimax import SARIMAX
import xgboost as xgb
import plotly.graph_objects as go
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from io import BytesIO
import os
import uuid
import base64
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests
# Suppress warnings
import warnings
warnings.filterwarnings('ignore')
# Input from user to specify forecasting period
forecast_period=365

# Function to process the bank statement Excel file
def process_bank_statement(df):
    """
    Processes the bank statement Excel file by skipping the first skip_rows rows.
    Extracts the date and withdrawal amount columns based on position.
    """
    try:
        # Read the Excel file, skipping the first skip_rows rows
        
        
        # Debugging: Print the first few rows and columns
        print("Uploaded file preview:")
        print(df.head())
        print("Columns in the file:", df.columns.tolist())
        
        # Use column positions since names are obscured
        date_col = df.columns[0]  # First column (index 0) is the date
        withdrawal_col = df.columns[4]  # Fifth column (index 4) is the withdrawal amount
        
        # Select and rename columns
        processed_df = df[[date_col, withdrawal_col]].copy()
        processed_df.columns = ['date', 'amount']
        
        # Filter out rows with invalid dates (e.g., '********')
        processed_df = processed_df[processed_df['date'] != '********']
        
        # Convert date to datetime format
        processed_df['date'] = pd.to_datetime(processed_df['date'], format='%d/%m/%y', errors='coerce')
        
        # Drop rows with invalid dates (NaT)
        processed_df = processed_df.dropna(subset=['date'])
        
        # Convert withdrawal amount to numeric, handling any non-numeric values
        processed_df['amount'] = pd.to_numeric(processed_df['amount'], errors='coerce')
        
        # Filter for debit transactions only (non-zero withdrawal amounts)
        processed_df = processed_df[processed_df['amount'] > 0].copy()
        
        # Ensure amount is positive for analysis
        processed_df['amount'] = processed_df['amount'].abs()
        
        # Aggregate by date (in case there are multiple transactions per day)
        daily_spend = processed_df.groupby('date')['amount'].sum().reset_index()
        
        return daily_spend
    
    except Exception as e:
        print(f"Error processing file: {e}")
        return None

# Function to engineer features for time series forecasting
def engineer_features(df):
    """
    Creates time-based features for forecasting models.
    """
    df = df.copy()
    if 'date' in df.columns:
        df = df.set_index('date')
    
    # Resample to ensure regular time intervals (daily)
    df = df.resample('D').sum().fillna(0)
    
    # Add date-based features
    df = df.reset_index()
    df['dayofweek'] = df['date'].dt.dayofweek  # 0=Monday, 6=Sunday
    df['month'] = df['date'].dt.month
    df['year'] = df['date'].dt.year
    df['day'] = df['date'].dt.day
    df['is_weekend'] = df['dayofweek'].isin([5, 6]).astype(int)
    df['is_month_start'] = df['date'].dt.is_month_start.astype(int)
    df['is_month_end'] = df['date'].dt.is_month_end.astype(int)
    
    # Add lag features
    df['amount_lag7'] = df['amount'].shift(7)
    df['amount_lag14'] = df['amount'].shift(14)
    df['amount_lag30'] = df['amount'].shift(30)
    
    # Add rolling average features
    df['rolling_mean_7'] = df['amount'].rolling(window=7).mean()
    df['rolling_mean_14'] = df['amount'].rolling(window=14).mean()
    df['rolling_mean_30'] = df['amount'].rolling(window=30).mean()
    
    # Add rolling standard deviation (for volatility)
    df['rolling_std_7'] = df['amount'].rolling(window=7).std()
    df['rolling_std_30'] = df['amount'].rolling(window=30).std()
    
    # Weekly and monthly aggregations
    df['week_of_year'] = df['date'].dt.isocalendar().week
    df['day_of_month'] = df['date'].dt.day
    
    # Create cyclical features for day of week, month, etc.
    df['dayofweek_sin'] = np.sin(2 * np.pi * df['dayofweek']/7)
    df['dayofweek_cos'] = np.cos(2 * np.pi * df['dayofweek']/7)
    df['month_sin'] = np.sin(2 * np.pi * df['month']/12)
    df['month_cos'] = np.cos(2 * np.pi * df['month']/12)
    
    return df

# TimeSeriesForecaster class to train and evaluate models
class TimeSeriesForecaster:
    def __init__(self, data):
        self.original_data = data.copy()
        self.engineered_data = None
        self.best_model = None
        self.best_model_name = None
        self.best_score = float('inf')
        self.model_performances = {}
    
    def prepare_data(self):
        self.engineered_data = engineer_features(self.original_data)
        return self.engineered_data
    
    def train_test_split(self, test_size=0.2):
        if self.engineered_data is None:
            self.prepare_data()
        
        split_idx = int(len(self.engineered_data) * (1 - test_size))
        train = self.engineered_data.iloc[:split_idx].copy()
        test = self.engineered_data.iloc[split_idx:].copy()
        return train, test
    
    def evaluate_model(self, y_true, y_pred, model_name):
        mae = mean_absolute_error(y_true, y_pred)
        rmse = np.sqrt(mean_squared_error(y_true, y_pred))
        mape = np.mean(np.abs((y_true - y_pred) / (y_true + 1e-5))) * 100
        
        performance = {
            'MAE': mae,
            'RMSE': rmse,
            'MAPE': mape
        }
        
        self.model_performances[model_name] = performance
        
        if mae < self.best_score:
            self.best_score = mae
            self.best_model_name = model_name
        
        return performance
    
    def train_prophet(self, forecast_periods=forecast_period):
        
        global spending_data_year  # Define outside the function
        prophet_data = self.original_data.rename(columns={'date': 'ds', 'amount': 'y'}).copy()

    # Apply log transformation to handle heteroscedasticity (only if necessary)
        prophet_data['y'] = np.log1p(prophet_data['y'])  # log(1 + x) to handle negative values

    # Determine the inflation rate based on the years present in spending data
        start_year = prophet_data['ds'].dt.year.min()
        end_year = prophet_data['ds'].dt.year.max()

    # Create a mapping for inflation rates taken from 'https://www.macrotrends.net/global-metrics/countries/IND/india/inflation-rate-cpi'
        inflation_rates = {
        2015: 0.0491, 2016: 0.0495, 2017: 0.033,
        2018: 0.0394, 2019: 0.0373, 2020: 0.0662,
        2021: 0.0513, 2022: 0.0670, 2023: 0.0565,
        2024: 0.0494, 2025: 0.0396, 2026: 0.0457
        }

    # Assign inflation rate based on the respective year
        prophet_data['inflation_rate'] = prophet_data['ds'].dt.year.map(inflation_rates).fillna(0)

        model = Prophet(
        holidays_prior_scale=5,
        changepoint_prior_scale=0.075,
        seasonality_prior_scale=17,
        yearly_seasonality=True,
        weekly_seasonality=True,
        daily_seasonality=False,
        seasonality_mode='multiplicative'
        )

    # Add Indian holidays
        model.add_country_holidays(country_name='IN')

        if len(prophet_data) > 60:
            
            model.add_seasonality(name='monthly', period=30.5, fourier_order=7)

    # Add inflation rate as an external regressor
        model.add_regressor('inflation_rate')

        model.fit(prophet_data)

        future = model.make_future_dataframe(periods=forecast_period)
        future['inflation_rate'] = future['ds'].dt.year.map(inflation_rates).fillna(0)

        forecast = model.predict(future)

    # Split the original data for test set alignment
        split_idx = int(len(self.original_data) * (1 - 0.2))  # Match test_size from train_test_split
        train_data = self.original_data.iloc[:split_idx]
        test_data = self.original_data.iloc[split_idx:]
        test_prophet = test_data.rename(columns={'date': 'ds', 'amount': 'y'})

    # Filter forecast to match test dates
        test_preds = np.expm1(forecast[forecast['ds'].isin(test_prophet['ds'])]['yhat'].values)  # Reverse log transformation
        test_actuals = test_prophet['y'].values
 
    # Ensure lengths match before evaluation
        if len(test_preds) != len(test_actuals):
          raise ValueError(f"Length mismatch: test_preds={len(test_preds)}, test_actuals={len(test_actuals)}")

        performance = self.evaluate_model(test_actuals, test_preds, 'Prophet')

        return {
        'model': model,
        'forecast': forecast,
        'performance': performance
          }
 
    
    def train_sarima(self, forecast_periods=forecast_period):
        data = self.original_data.set_index('date')['amount']
        
        train, test = self.train_test_split()
        train_sarima = train.set_index('date')['amount']
        test_sarima = test.set_index('date')['amount']
        
        best_aic = float('inf')
        best_params = None
        
        p_values = [1, 2]
        d_values = [0, 1]
        q_values = [0, 1]
        P_values = [0, 1]
        D_values = [0, 1]
        Q_values = [0, 1]
        s_values = [7]  # Weekly seasonality
        
        for p in p_values:
            for d in d_values:
                for q in q_values:
                    for P in P_values:
                        for D in D_values:
                            for Q in Q_values:
                                for s in s_values:
                                    try:
                                        model = SARIMAX(
                                            train_sarima,
                                            order=(p, d, q),
                                            seasonal_order=(P, D, Q, s),
                                            enforce_stationarity=False,
                                            enforce_invertibility=False
                                        )
                                        result = model.fit(disp=False)
                                        aic = result.aic
                                        
                                        if aic < best_aic:
                                            best_aic = aic
                                            best_params = (p, d, q, P, D, Q, s)
                                    except:
                                        continue
        
        p, d, q, P, D, Q, s = best_params
        model = SARIMAX(
            train_sarima,
            order=(p, d, q),
            seasonal_order=(P, D, Q, s),
            enforce_stationarity=False,
            enforce_invertibility=False
        )
        result = model.fit(disp=False)
        
        test_preds = result.predict(
            start=test.index[0],
            end=test.index[-1]
        )
        
        performance = self.evaluate_model(test_sarima.values, test_preds, 'SARIMA')
        
        forecast = result.get_forecast(steps=forecast_period)
        forecast_values = forecast.predicted_mean
        forecast_ci = forecast.conf_int()
        
        return {
            'model': result,
            'forecast': {
                'mean': forecast_values,
                'lower': forecast_ci.iloc[:, 0],
                'upper': forecast_ci.iloc[:, 1]
            },
            'performance': performance,
            'params': best_params
        }
    
    def train_xgboost(self, forecast_periods=forecast_period):
        self.prepare_data()
        
        features = self.engineered_data.drop(['date', 'amount'], axis=1)
        target = self.engineered_data['amount']
        
        features = features.fillna(0)
        
        train, test = self.train_test_split()
        X_train = train.drop(['date', 'amount'], axis=1).fillna(0)
        y_train = train['amount']
        X_test = test.drop(['date', 'amount'], axis=1).fillna(0)
        y_test = test['amount']
        
        model = xgb.XGBRegressor(
            n_estimators=100,
            max_depth=5,
            learning_rate=0.1,
            subsample=0.8,
            colsample_bytree=0.8,
            random_state=42
        )
        model.fit(X_train, y_train)
        
        test_preds = model.predict(X_test)
        
        performance = self.evaluate_model(y_test, test_preds, 'XGBoost')
        
        last_date = self.engineered_data['date'].iloc[-1]
        future_dates = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=forecast_periods)
        
        future_df = pd.DataFrame({'date': future_dates})
        future_df['amount'] = 0
        
        future_df['dayofweek'] = future_df['date'].dt.dayofweek
        future_df['month'] = future_df['date'].dt.month
        future_df['year'] = future_df['date'].dt.year
        future_df['day'] = future_df['date'].dt.day
        future_df['is_weekend'] = future_df['dayofweek'].isin([5, 6]).astype(int)
        future_df['is_month_start'] = future_df['date'].dt.is_month_start.astype(int)
        future_df['is_month_end'] = future_df['date'].dt.is_month_end.astype(int)
        
        future_df['dayofweek_sin'] = np.sin(2 * np.pi * future_df['dayofweek']/7)
        future_df['dayofweek_cos'] = np.cos(2 * np.pi * future_df['dayofweek']/7)
        future_df['month_sin'] = np.sin(2 * np.pi * future_df['month']/12)
        future_df['month_cos'] = np.cos(2 * np.pi * future_df['month']/12)
        
        future_df['week_of_year'] = future_df['date'].dt.isocalendar().week
        future_df['day_of_month'] = future_df['date'].dt.day
        
        full_data = self.engineered_data.copy()
        
        forecast_values = []
        
        for i in range(forecast_period):
            current_df = pd.concat([full_data, future_df.iloc[:i]], axis=0)
            next_day = future_df.iloc[i:i+1].copy()
            
            for lag, days in [('amount_lag7', 7), ('amount_lag14', 14), ('amount_lag30', 30)]:
                lag_idx = len(current_df) - days
                if lag_idx >= 0:
                    next_day[lag] = current_df['amount'].iloc[lag_idx]
                else:
                    next_day[lag] = 0
            
            for window in [7, 14, 30]:
                roll_col = f'rolling_mean_{window}'
                roll_std_col = f'rolling_std_{window}'
                
                last_idx = len(current_df)
                start_idx = max(0, last_idx - window)
                
                if start_idx < last_idx:
                    recent_values = current_df['amount'].iloc[start_idx:last_idx]
                    next_day[roll_col] = recent_values.mean()
                    next_day[roll_std_col] = recent_values.std() if len(recent_values) > 1 else 0
                else:
                    next_day[roll_col] = 0
                    next_day[roll_std_col] = 0
            
            pred_cols = X_train.columns
            next_day_features = next_day[pred_cols]
            prediction = model.predict(next_day_features)[0]
            
            forecast_values.append(prediction)
            future_df.loc[future_df.index[i], 'amount'] = prediction
        
        return {
            'model': model,
            'forecast': {
                'dates': future_dates,
                'values': forecast_values
            },
            'performance': performance
        }
    
    def train_all_models(self, forecast_periods=forecast_period):
        prophet_results = self.train_prophet(forecast_periods)
        sarima_results = self.train_sarima(forecast_periods)
        xgboost_results = self.train_xgboost(forecast_periods)
        
        print("Model Performances:")
        for model_name, metrics in self.model_performances.items():
            print(f"{model_name} - MAE: {metrics['MAE']:.2f}, RMSE: {metrics['RMSE']:.2f}, MAPE: {metrics['MAPE']:.2f}%")
        
        print(f"\nBest model: {self.best_model_name} with MAE: {self.best_score:.2f}")
        
        return {
            'prophet': prophet_results,
            'sarima': sarima_results,
            'xgboost': xgboost_results,
            'best_model': self.best_model_name
        }

# Main function to run the forecasting

def run_forecasting(df):
    # Process the bank statement
    processed_df = process_bank_statement(df)

    if processed_df is None:
        return {"error": "Error processing file. Please check the format."}

    # Initialize the forecaster
    forecaster = TimeSeriesForecaster(processed_df)

    # Train all models and generate forecasts
    results = forecaster.train_all_models(forecast_periods=forecast_period)

    # Visualize the best model's forecast
    best_model_name = results['best_model']
    best_forecast = results[best_model_name.lower()]['forecast']

    fig = go.Figure()

    if best_model_name == 'Prophet':
        df = best_forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
        fig.add_trace(go.Scatter(
            x=df['ds'],
            y=df['yhat'],
            mode='lines',
            name='Forecast',
            line=dict(color='rgba(220, 53, 69, 0.8)', width=2),
        ))
        fig.add_trace(go.Scatter(
            x=df['ds'].tolist() + df['ds'].tolist()[::-1],
            y=df['yhat_upper'].tolist() + df['yhat_lower'].tolist()[::-1],
            fill='toself',
            fillcolor='rgba(220, 53, 69, 0.2)',
            line=dict(color='rgba(255, 255, 255, 0)'),
            name='95% Confidence Interval',
            hoverinfo='skip'
        ))
        fig.update_layout(
            title='Spending Forecast (Prophet)',
            xaxis_title='Date',
            yaxis_title='Amount ($)',
            template='plotly_dark'
        )
    else:
        if best_model_name == 'SARIMA':
            df = pd.DataFrame({
                'date': best_forecast['mean'].index,
                'mean': best_forecast['mean'],
                'lower': best_forecast['lower'],
                'upper': best_forecast['upper']
            })
            fig.add_trace(go.Scatter(
                x=df['date'],
                y=df['mean'],
                mode='lines',
                name='Forecast',
                line=dict(color='rgba(220, 53, 69, 0.8)', width=2),
            ))
            fig.add_trace(go.Scatter(
                x=df['date'].tolist() + df['date'].tolist()[::-1],
                y=df['upper'].tolist() + df['lower'].tolist()[::-1],
                fill='toself',
                fillcolor='rgba(220, 53, 69, 0.2)',
                line=dict(color='rgba(255, 255, 255, 0)'),
                name='95% Confidence Interval',
                hoverinfo='skip'
            ))
        elif best_model_name == 'XGBoost':
            df = pd.DataFrame({
                'date': best_forecast['dates'],
                'mean': best_forecast['values']
            })
            fig.add_trace(go.Scatter(
                x=df['date'],
                y=df['mean'],
                mode='lines',
                name='Forecast',
                line=dict(color='rgba(220, 53, 69, 0.8)', width=2),
            ))
            print("Note: XGBoost forecast does not include confidence intervals.")

        fig.update_layout(
            title=f'Spending Forecast ({best_model_name})',
            xaxis_title='Date',
            yaxis_title='Amount ($)',
            template='plotly_dark'
        )

    # Save plot to static folder
    filename = f"forecast_{uuid.uuid4().hex}.png"
    filepath = os.path.join("static", filename)
    fig.write_image(filepath)

    # Encode to base64
    with open(filepath, "rb") as img_file:
        b64_string = base64.b64encode(img_file.read()).decode("utf-8")

    return {
        "best_model": best_model_name,
        "image_base64": b64_string,
        "image_url": f"/static/{filename}"
    }


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask API is running"}), 200


@app.route("/api/ml/predict", methods=["POST"])
def predict_expense():
    try:
        data = request.get_json()
        file_url = data["fileUrl"]

        response = requests.get(file_url)
        file_bytes = BytesIO(response.content)

        df = pd.read_excel(file_bytes, skiprows=21)

        result = run_forecasting(df)

        return jsonify({
            "message": "Forecast successful",
            "best_model": result["best_model"],
            "image_base64": result["image_base64"],  # Use in frontend as <img src="data:image/png;base64,...">
            "image_url": result["image_url"]  # Optional, if you prefer to load from /static/ directory
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Running on port 5000 or any available port