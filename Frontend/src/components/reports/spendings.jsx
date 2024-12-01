import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Label,
} from 'recharts';

const COLORS = ['#4A90E2', '#82ca9d', '#ffc658', '#d84a4a', '#4CAF50', '#FF7043', '#8E24AA'];

const Spendings = () => {
  const [categoryExpenses, setCategoryExpenses] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
        setMonthlyTotal(total);

        const categoryData = {};
        monthlyExpenses.forEach((expense) => {
          if (categoryData[expense.category]) {
            categoryData[expense.category] += expense.amount;
          } else {
            categoryData[expense.category] = expense.amount;
          }
        });

        const chartData = Object.keys(categoryData).map((category, index) => ({
          name: category,
          value: categoryData[category],
          fill: COLORS[index % COLORS.length],
        }));

        setCategoryExpenses(chartData);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses(currentMonth);
  }, [currentMonth]);

  const handleMonthChange = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const getMonthName = (date) => date.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => handleMonthChange(-1)}
          style={{
            backgroundColor: '#003d7d',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            marginRight: '10px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          &lt;
        </button>
        <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {getMonthName(currentMonth)}
        </h4>
        <button
          onClick={() => handleMonthChange(1)}
          style={{
            backgroundColor: '#003d7d',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            marginLeft: '10px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          &gt;
        </button>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <strong style={{ fontSize: '0.8rem', color: '#333' }}>
          Total Monthly Expense: ₹{monthlyTotal.toFixed(2)}
        </strong>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={categoryExpenses}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            innerRadius={70}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {categoryExpenses.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Spendings;
