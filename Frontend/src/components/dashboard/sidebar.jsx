import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dashboard, CreditCard, Receipt, Notifications, Settings, ExitToApp, Add, Menu } from '@mui/icons-material';
import './sidebar.css';
import logo from '../../../public/logo.png';
import Expense from './expenseModal';
import BudgetModal from './Budget';

function Sidebar({ onOpenBudgetModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the mobile menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage on logout
    window.location.href = '/'; // Redirect to the home or login page
  };

  return (
    <div className='sidebar'>
      <div className="sidebar-logo">
        <div className="flex flex-shrink-0">
          <img className="h-8 w-auto me-3 ps-0" src={logo} alt="Your Company" />
          <h2 className='text-xl font-bold cursor-pointer text-[#FFE344]'>ExpenseV</h2>
          {/* Hamburger Menu */}
          <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <Menu />
          </button>
        </div>
      </div>

      <nav>
        <ul className={isMenuOpen ? 'open' : ''}>
          <div className="upper-sidebar">
            {/* Add Expense Button */}
            <button className="add-expense-button" onClick={() => document.getElementById("my_modal_1").showModal()}>
              <Add className="add-expense-icon" />
              Add Expense
            </button>
            <Expense />

            {/* Add Monthly Budget Button */}
            <button className="add-budget-button" onClick={onOpenBudgetModal}>
              <Add className="add-budget-icon" />
              Monthly Budget
            </button>

            {/* Sidebar links */}
            <li><Link to="/dashboard"><Dashboard /> Dashboard</Link></li>
            <li><Link to="/investment"><CreditCard /> Expenses</Link></li>
            <li><Link to="/reports"><Receipt /> Reports</Link></li>
            <li><Link to="/dashboard"><Notifications /> Notifications</Link></li>
          </div>

          <div className="lower-sidebar">
            <li><Link to="/settings"><Settings /> Settings</Link></li>
            <li><button onClick={handleLogout}><ExitToApp /> Log out</button></li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
