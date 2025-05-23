# 💰 Finance Planner with Machine Learning

**Finance Planner with Machine Learning** is a web application that enables users to upload bank statements (Excel files) and get insightful financial analytics, predictions for future expenses, and visualizations to better manage their monthly budgets.

> 🔍 Currently, the app performs a **1-year prediction** of expenses using machine learning models like **SARIMA** and **Prophet** based on historical bank transaction data.

---

## 🚀 Features

- 📄 **Bank Statement Upload**  
  Users can upload their monthly bank statements in Excel format.

- 🤖 **Expense Prediction**  
  After uploading, the app processes the statement using time series forecasting models (SARIMA, Prophet) to predict expenses for the next 12 months.

- 📊 **Data Visualization**  
 ### 🧑‍💼 User Dashboard

The dashboard provides:

- A personalized welcome with the user’s profile  
- Step-by-step guidance on how to use the app effectively  
- An upload section where users can submit their bank statement in Excel format for analysis  

---

### 📈 Expense Analysis & Visualization

The **Analyse** section presents:

- Interactive line charts based on the uploaded financial data  
- One-year forecast of final monthly balances using **SARIMA** or **Prophet** time series models  
- Clear visualization of predicted trends to help users anticipate future spending patterns  


- 🌐 **Cloudinary Integration**  
  Excel files are uploaded to Cloudinary, and the backend fetches them for ML processing.

---

## 🧠 Machine Learning Models

- **SARIMA (Seasonal ARIMA)** – Captures seasonal effects in time-series data.
- **Prophet** – Flexible model by Meta for robust time series forecasting.

---

## 🧰 Tech Stack

| Area              | Technology               |
|-------------------|--------------------------|
| Frontend          | React, Tailwind CSS      |
| Backend           | Node.js (Express)        |
| ML Model          | Python (Prophet, SARIMA) |
| File Upload       | Cloudinary               |
| Charts & Visuals  | Chart.js                 |
| Authentication    | Auth0                    |

---

### 📸 App Screenshots

- **Home Page**  
  ![Screenshot 2025-05-23 232430](https://github.com/user-attachments/assets/5e7b1cc8-4ec5-420e-8bc1-1169123ed81d)
  ![Screenshot 2025-05-23 232523](https://github.com/user-attachments/assets/899b9535-37b1-4b80-880a-cbd30c99110d)


- **Login / Register Page**  
|![Screenshot 2025-05-23 232604](https://github.com/user-attachments/assets/628f1d9d-aead-4fb0-85cb-97b056221773)
![Screenshot 2025-05-23 232640](https://github.com/user-attachments/assets/e8ef8cc1-88f7-42a5-b1c4-1ec82eafa9f9)


- **Dashboard Page**  
  ![Screenshot 2025-05-23 232725](https://github.com/user-attachments/assets/5d1af4dc-3c19-4e0a-8c00-3cafb6f4d921)


- **Upload Excel Page**  
  ![Screenshot 2025-05-23 232748](https://github.com/user-attachments/assets/bfbeb77c-19f5-4349-a6ce-6fcb122a2c62)
  ![Screenshot 2025-05-23 232809](https://github.com/user-attachments/assets/52ebc042-7f9b-4b1d-91ca-e2e5706ee601)

- **Prediction in Action**  
![Screenshot 2025-05-23 232835](https://github.com/user-attachments/assets/f3546f50-a066-4dc2-b026-c5b081ad21fc)


---

## 🎥 Demo Recording


https://github.com/user-attachments/assets/057168b4-7c89-406e-9ba8-63ce1a0171cc



---

## 🌱 Future Enhancements

- 🗓 **Real-time Event Integration** (Holidays, Exams, Festivals)
- 🧠 **Linear Regression & Decision Trees** for specific event-driven predictions
- 🧾 **Monthly Report Download**
- 📅 **User-defined Recurring Events Budgeting**
- 📱 Mobile responsiveness and app version

---

## 🔧 Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/finance-planner-ml.git
