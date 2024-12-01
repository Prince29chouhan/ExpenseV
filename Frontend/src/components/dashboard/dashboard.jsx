import React, { useState, useEffect } from 'react';
import Sidebar from "./sidebar";
import Header from "./header";
import Transactions from "./transaction";
import Chart from "./chart";
import AmountTransfer from "./amountTransfer";
import styles from "./Dashboard.module.css";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import BudgetModal from './Budget'; // Import the modal component

const Dashboard = () => {
  const [totalMonthlyExpense, setTotalMonthlyExpense] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
  const [monthlyBudget, setMonthlyBudget] = useState(localStorage.getItem('monthlyBudget') || ''); // Use localStorage for budget
  const [showWarningAlert, setShowWarningAlert] = useState(true); // State for warning alert visibility
  const [showExceedAlert, setShowExceedAlert] = useState(true); // State for exceeding alert visibility

  // Ensure monthlyBudget is a valid number
  useEffect(() => {
    if (monthlyBudget !== '' && !isNaN(monthlyBudget)) {
      setMonthlyBudget(Number(monthlyBudget));
    }
  }, [monthlyBudget]);

  // Fetch expenses and calculate total monthly expense
  const fetchExpenses = async (month) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to view your expenses.');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const expenses = response.data;

        const selectedMonth = month.getMonth();
        const selectedYear = month.getFullYear();

        const monthlyExpenses = expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return (
            expenseDate.getMonth() === selectedMonth &&
            expenseDate.getFullYear() === selectedYear
          );
        });

        const total = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        setTotalMonthlyExpense(total); // Update the state for expenses
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Handle month navigation
  const handleMonthChange = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  useEffect(() => {
    fetchExpenses(currentMonth);
  }, [currentMonth]);

  const getMonthName = (date) => date.toLocaleString('default', { month: 'long', year: 'numeric' });

  const remainingBudget = monthlyBudget - totalMonthlyExpense;

  // Function to update the monthly budget
  const updateMonthlyBudget = (newBudget) => {
    localStorage.setItem('monthlyBudget', newBudget); // Store new budget in localStorage
    setMonthlyBudget(Number(newBudget)); // Update the state immediately
    toast.success('Budget updated successfully!');
  };

  // Function to add a new expense
  const addExpense = async (newExpense) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add an expense.');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/expenses', newExpense, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        // Immediately update total expense state after adding an expense
        setTotalMonthlyExpense(prevTotal => prevTotal + newExpense.amount); // Increment current total directly
        toast.success('Expense added successfully!');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error('Failed to add expense');
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardSidebar}>
        <Sidebar onOpenBudgetModal={() => setIsModalOpen(true)} />
      </div>
      <div className={styles.dashboardContent}>
        <Header />
        <div className={styles.mainContent}>
          {/* Budget Alerts */}
          {monthlyBudget && totalMonthlyExpense && remainingBudget < 100 && remainingBudget > 0 && showWarningAlert && (
            <div className="flex items-center justify-between bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
              <div>
                Your remaining budget is less than ₹100!
              </div>
              <button onClick={() => setShowWarningAlert(false)} className="text-xl font-bold text-yellow-700 hover:text-yellow-900">X</button>
            </div>
          )}

          {totalMonthlyExpense > monthlyBudget && showExceedAlert && (
            <div className="flex items-center justify-between bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              Your expenses have exceeded the monthly budget!
              <button onClick={() => setShowExceedAlert(false)} className="text-xl font-bold text-red-700 hover:text-red-900">X</button>
            </div>
          )}

          <div className={styles.dashboardStats}>
            <div className={`${styles.stat} glass`}>
              <h3>Monthly Budget</h3>
              <p>₹{monthlyBudget || 'Not Set'}</p>
            </div>
            <div className={`${styles.stat} glass`}>
              <h3>Total Monthly Expenses</h3>
              <p>₹{totalMonthlyExpense}</p>
            </div>
            <div className={`${styles.stat} glass`}>
              <h3>Last month Income</h3>
              <p>$10,550</p>
            </div>
          </div>
          <Chart />
          <Transactions />
        </div>
      </div>
      <div className={styles.amountTransfer}>
        <AmountTransfer />
      </div>

      {/* Modal for setting budget */}
      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSetBudget={updateMonthlyBudget} // Pass the budget update function to the modal
      />
    </div>
  );
};

export default Dashboard;
