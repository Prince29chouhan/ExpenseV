// BudgetModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import styles from './BudgetModal.module.css';

const BudgetModal = ({ isOpen, onClose }) => {
  const [monthlyBudget, setMonthlyBudget] = useState('');
  
  // Save the budget to the backend and localStorage
  const handleSaveBudget = async () => {
    if (monthlyBudget && !isNaN(monthlyBudget)) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          "http://localhost:5000/api/users/profile", // Profile update route
          { monthlyBudget: parseFloat(monthlyBudget) }, // Send budget in the request body
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          toast.success('Monthly budget saved!');
          localStorage.setItem('monthlyBudget', monthlyBudget); // Store budget in localStorage
          onClose(); // Close modal after saving
        }
      } catch (error) {
        toast.error('Failed to save monthly budget');
      }
    } else {
      toast.error('Please enter a valid amount for the budget');
    }
  };

  // Update monthly budget on input change
  const handleBudgetChange = (event) => {
    setMonthlyBudget(event.target.value);
  };

  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <h3>Set Monthly Budget</h3>
            <button onClick={onClose} className={styles.closeButton}>X</button>
          </div>
          <div className={styles.modalBody}>
            <input
              type="number"
              value={monthlyBudget}
              onChange={handleBudgetChange}
              placeholder="Enter Budget"
              className={styles.budgetInput}
            />
          </div>
          <div className={styles.modalFooter}>
            <button onClick={handleSaveBudget} className={styles.saveButton}>
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default BudgetModal;
