import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/signup'
import Home from './home/home'
import Login from './components/login'
import Reports from './components/reports/reports'
import InvestmentsTable from './components/investments/investmentTable'





import Dashboard from './components/dashboard/dashboard'

function App() {
  return (
    <div>
      
      <Routes>
       
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/investment" element={<InvestmentsTable />} />
       
        
      </Routes>
      
    </div>
  )
}

export default App
