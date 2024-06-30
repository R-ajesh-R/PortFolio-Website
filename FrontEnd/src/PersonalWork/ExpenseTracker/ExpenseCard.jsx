import React, { useState } from 'react'
import {formatter} from './expenseUtils'
import ProgressBar from './ProgressBar';
const ExpenseCard = ({expense=[],budget,setViewBreakUp,viewBreakUp}) => {
  const totalExpense=expense.reduce((acc,ini)=>{
    if(ini.budgetId===budget.id)
      return acc+=Number(ini.expenseAmount);
    return acc;
  },0)
  console.log('897yguvhb',totalExpense,budget,expense)
  const handleExpenseList = () =>{
    setViewBreakUp(prev=>{
      let value=prev.id===budget.id ? {value:prev.value ? false : true,id:prev.value ? '' : budget.id} : {value:true,id:budget.id};
      return {...prev,...value};
    })
  }
  return (
    <form style={{background:`${totalExpense > budget.amount ? 'red' : 'rgb(30 7 31)'}`}} className="budget expense-items">
        <p className='heading'>{budget.budgetName}</p>
        <p>{formatter(Number(budget.amount))} Budgetted</p>
        <ProgressBar percentage={Number.parseFloat((totalExpense/budget.amount)*100).toFixed(2)} />
        <div className='flex-space-between'>
            <p>{formatter(totalExpense??0)} Spent</p>
            <p>{formatter(budget.amount-(totalExpense??0))} Remaining</p>
        </div>
        <button type='button' onClick={handleExpenseList} className='button-primary-expense'><span>View Details</span> <p style={{display:'flex'}}><ion-icon style={{color:'black'}} name="cash-outline"></ion-icon></p></button>
    </form>
  )
}

export default ExpenseCard;
