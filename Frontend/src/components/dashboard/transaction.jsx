import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns'; // Import for date calculations
import './transactions.css';
import Expense from './expenseModal'; // Modal for adding expense
import Income from './incomeModal';  // Modal for adding income

const Transactions = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch expenses from the backend
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (!token) {
        alert("Please log in to view your expenses.");
        return;
      }

      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: { 'Authorization': `Bearer ${token}` }, // Send token in the request header
      });

      if (response.status === 200) {
        setExpenses(response.data); // Set the fetched expenses in state
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch expenses when the component mounts
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Get current week's range
  const currentWeekStart = startOfWeek(new Date());
  const currentWeekEnd = endOfWeek(new Date());

  // Filter expenses for the current week
  const currentWeekExpenses = expenses.filter(expense =>
    isWithinInterval(new Date(expense.date), { start: currentWeekStart, end: currentWeekEnd })
  );

  // Limit to first 5
  const limitedExpenses = currentWeekExpenses.slice(0, 5);

  // Function to get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case 'food':
        return 'bg-green-400'; // Green for food
      case 'travel':
        return 'bg-blue-400'; // Blue for travel
      case 'bills':
        return 'bg-red-400'; // Red for bills
      case 'movie':
        return 'bg-purple-400'; // Purple for movie
      default:
        return 'bg-gray-400'; // Default color
    }
  };

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h2>Latest Transactions</h2>
        <a href="#" className="view-all">View all</a>
      </div>
      {loading ? (
        <p>Loading expenses...</p> // Display loading message while fetching data
      ) : (
        <div className="transactions-list">
          {limitedExpenses.length > 0 ? (
            limitedExpenses.map(transaction => (
              <div className="transaction-item" key={transaction._id}>
                <div className="transaction-details">
                  <div className="transaction-avatar" />
                  <div className="transaction-name">{transaction.name}</div>
                </div>
                <div className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</div>
                <div className="transaction-amount">
                  {transaction.amount >= 0 ? `+₹${transaction.amount}` : `-₹${Math.abs(transaction.amount)}`}
                </div>
                <div className={`transaction-status ${getCategoryColor(transaction.category)}`}>
                  {transaction.category}
                </div>
              </div>
            ))
          ) : (
            <p>No expenses found for this week.</p> // Display message if no expenses are available
          )}
        </div>
      )}
      <div className="row-transaction">
        <button className="add-expense-button" onClick={() => document.getElementById("my_modal_1").showModal()}>+ Add Expense</button>
        <Expense />
        
      </div>
    </div>
  );
};

export default Transactions;
