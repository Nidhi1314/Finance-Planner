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
  ![Screenshot 2025-06-19 170035](https://github.com/user-attachments/assets/7ae81d7f-8e86-495c-b500-6da3bd808291)

 
![Screenshot 2025-06-19 170051](https://github.com/user-attachments/assets/480d76b4-4e9c-4211-9314-27a6284ba851)
![Screenshot 2025-06-19 170113](https://github.com/user-attachments/assets/44bad41c-6102-4cbf-aff3-318a7819dd55)


- **Dashboard Page**  
  

![Screenshot 2025-06-19 170351](https://github.com/user-attachments/assets/849934de-0400-4381-bf0a-4531a394b301)

![Screenshot 2025-06-19 170341](https://github.com/user-attachments/assets/68da1d53-8b5f-47c9-965f-96a68b700d93)

- **Prediction in Action**  


![Screenshot 2025-06-19 170437](https://github.com/user-attachments/assets/4c4233f8-a0e2-4027-9fef-d8d29b46ef59)

![Screenshot 2025-06-19 170451](https://github.com/user-attachments/assets/9c64e3d5-e088-4251-ab99-03380e0273f6)

---

## 🎥 Demo Recording





https://github.com/user-attachments/assets/32d79e6e-e192-4a9f-9410-a91f0a56eea7








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
