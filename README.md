# **Expense Visualizer**

Expense Visualizer is a modern web application designed to simplify budgeting and expense tracking. It empowers users to manage their finances effectively, providing insights into spending patterns through interactive visualizations.

## **Features**

- **User Authentication**: Secure registration and login using JWT-based authentication.
- **Monthly Budget Management**: Set, update, and track your monthly budgets.
- **Expense Tracking**: Record expenses and categorize them for better analysis.
- **Charts and Insights**: Visualize your spending habits through interactive charts.
- **Alerts**: Get notified when you exceed or approach your budget limits.
- **Data Persistence**: All budgets and expenses are saved across sessions.

## **Tech Stack**

### Frontend
- **React.js**: Modern JavaScript framework with hooks for dynamic UI.
- **Tailwind CSS**: Utility-first CSS framework for responsive and stylish design.
- **Axios**: Promise-based HTTP client for making API requests.

### Backend
- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web framework for building REST APIs.
- **MongoDB**: NoSQL database for storing user data and expenses.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Token)**: For secure user authentication.

## **Installation**

Follow these steps to set up the project locally:

### **Prerequisites**
- Node.js and npm installed.
- MongoDB server running locally or use MongoDB Atlas for cloud-based database.

### **Backend Setup**

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/expense-visualizer.git
    cd expense-visualizer/backend
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the backend directory with the following content:
    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/expense-visualizer
    JWT_SECRET=your_secret_key
    ```

4. Start the backend server:
    ```bash
    npm run dev
    ```

### **Frontend Setup**

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the React app:
    ```bash
    npm start
    ```

4. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

## **API Endpoints**

### **User Routes**
- **POST** `/api/user/register`: Register a new user.
- **POST** `/api/user/login`: Authenticate and login.
- **GET** `/api/user/get-budget`: Fetch the saved monthly budget.
- **POST** `/api/user/set-budget`: Save or update the monthly budget.

### **Expense Routes**
- **GET** `/api/expenses`: Fetch all expenses for the logged-in user.
- **POST** `/api/expenses`: Add a new expense.

## **Usage**

1. **Register/Login**: Create an account or log in with an existing account.
2. **Set Monthly Budget**: Input a monthly budget that you aim to stick to.
3. **Track Expenses**: Add expenses and categorize them for better analysis.
4. **Analyze Spending**: Use visual charts to monitor where your money is going.



