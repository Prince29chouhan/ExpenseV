import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from 'recharts';
import styles from './Chart.module.css';

const Chart = () => {
  const [weeklyExpenses, setWeeklyExpenses] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthlyTotal, setMonthlyTotal] = useState(0);

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

        const getWeekOfMonth = (date) => {
          const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
          const days = Math.floor((date - startOfMonth) / (24 * 60 * 60 * 1000));
          return Math.min(Math.ceil((days + 1) / 7), 4);
        };

        const weeklyData = { week1: 0, week2: 0, week3: 0, week4: 0 };

        monthlyExpenses.forEach((expense) => {
          const weekNumber = getWeekOfMonth(new Date(expense.date));
          weeklyData[`week${weekNumber}`] += expense.amount;
        });

        const chartData = [
          { name: 'Week 1', amount: weeklyData.week1, fill: '#4A90E2' },
          { name: 'Week 2', amount: weeklyData.week2, fill: '#82ca9d' },
          { name: 'Week 3', amount: weeklyData.week3, fill: '#ffc658' },
          { name: 'Week 4', amount: weeklyData.week4, fill: '#d84a4a' },
        ];

        setWeeklyExpenses(chartData);
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
    <div className={styles.chartContainer}>
      <div className={styles.header}>
        <button onClick={() => handleMonthChange(-1)} className={styles.navButton}>
          &lt;
        </button>
        <h2 className={styles.chartTitle}>
          Weekly Expenses for {getMonthName(currentMonth)}
        </h2>
        <button onClick={() => handleMonthChange(1)} className={styles.navButton}>
          &gt;
        </button>
      </div>
      <div className={styles.monthlyTotal}>
        <strong>Total Monthly Expense: ₹{monthlyTotal}</strong>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={weeklyExpenses} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis>
            <Label
              value="Amount (₹)"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: 'middle', fontSize: 12 }}
            />
          </YAxis>
          <Tooltip />
          <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
            {weeklyExpenses.map((entry, index) => (
              <cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
