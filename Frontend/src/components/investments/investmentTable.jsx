import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './IVT.css';
import Sidebar from '../dashboard/sidebar';

const InvestmentsTable = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (!token) {
        alert('Please log in to view your expenses.');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: { 'Authorization': `Bearer ${token}` }, 
      });

      if (response.status === 200) {
        setExpenses(response.data); 
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

  const categoryColors = {
    'food': '#3498db',   
    'travel': '#2ecc71',      
    'Bills': '#e74c3c',   
    'Movie': '#f39c12', 
    'Others': '#95a5a6',       
  };


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Use expenses state here, not the function fetchExpenses
  const sortedInvestments = expenses
    .filter((investment) =>
      investment.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="IV-content">
      <div className="dashboard-sidebar me-10">
        <Sidebar />
      </div>
      <div className="me-5 w-[16%]">
        {/* <Sidebar /> */}
      </div>
      <div className="IV ">
        <div className="header mt-4">
          <h1 className="font-Montserrat">Hello Parth!</h1>
          <label className="input flex items-center border-transparent bg-[#908c9366] rounded-3xl">
            <input
              type="text"
              className="grow me-5"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <div className="sort-container">
            <label className="text-slate-300">
              Sort By Date:
              <select
                className="sort"
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <option value="newest" className="sort-options text-black bg-slate-900">
                  Newest First
                </option>
                <option value="oldest" className="sort-options text-black bg-slate-900">
                  Oldest First
                </option>
              </select>
            </label>
          </div>
        </div>
        <div className="head ms-5">
          <p className="welcome">Welcome Back!</p>
          <h2>Expenses</h2>
        </div>

        <div className="table-container mt-10">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {sortedInvestments.map((investment, index) => (
                <tr key={index} >
                  <td>{investment.name}</td>
                  <td>{investment.amount}</td>
                  <td>{new Date(investment.date).toLocaleDateString()}</td>
                  <td style={{ color: categoryColors[investment.category] || '#95a5a6' }}>{investment.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvestmentsTable;
