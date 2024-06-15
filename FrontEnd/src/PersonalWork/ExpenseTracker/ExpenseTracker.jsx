import React from 'react'
import './expensetracker.css';
import Budget from './Budget';
const ExpenseTracker = () => {
  return (
    <div className='component-wrapper'>
        <div className="flex-row">
            <h2 className='heading-left'>Create your expenses</h2>
            <button className='button-primary'>Add a Budget</button>
            <button className='button-primary'>Add Expense</button>
        </div>
        <div style={{
            display:'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
            gap: '1rem',
            alignItems: "flex-start"
        }}>
            <Budget name='Test' amt={1200} max={1000} />
        </div>
    </div>
  )
}

export default ExpenseTracker
