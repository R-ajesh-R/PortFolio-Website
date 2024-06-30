import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const Expense = (props) => {
  const [expenseName,setExpenseName]=useState('');
  const [amount,setAmount]=useState(0);
  const [category,setCategory]=useState(props.budget[0]?.id)
  const [error,setError]=useState('');
  const handleCreateBudget=(e)=>{
    e.preventDefault();
    setError('');
    if(!budgetName || !amount){
      setError('Please fill all the details...');
      return;
    }
    let amt=amount.toString();
    if(amt==='0' || amt.includes('-') || amt===0){
      setError('Amount can not be 0 or negative...')
      return;
    }
    if(isNaN(Number(amount))){
      setError('The entered amount is not a number');
      return;
    }
    console.log(amount)
    let totalAmountSpent=0;
    const currentCategory = props.budget.length ===1 ? props.budget[0].id : category
    if(props.expense.length > 0)
    totalAmountSpent=props.expense.reduce((acc,curr)=>{
      if(currentCategory===curr.budgetId)
        return acc+=Number(curr.expenseAmount);
      return acc;
    },0);
    let [{amount:budgetedAmount}]=props.budget.filter(el=>el.id===currentCategory)
    console.log(amount,totalAmountSpent,budgetedAmount,(Number(amount)+totalAmountSpent) > budgetedAmount);
    if((Number(amount)+totalAmountSpent) > budgetedAmount){
      alert('The Expense Amount exceeds the Total Amount do you still wish to Proceed?');
    }
    props.setExpense(prev=>{
      let uid = uuidv4();
      let temp=[...prev];
      temp.push({expenseAmount:amount,expenseName,id:uid,createdAt:Date.now(),budgetId:currentCategory})
      console.log(temp,amount)
      return [...temp];
    })
    setAmount(0);
    setExpenseName('');
  }
  return (
    <form className="budget">
        <p className='heading'>Add New Expense</p>
        <label className='budget-label' htmlFor="expenseName">Expense Name</label>
        <input required type='text' id="expenseName" name='expenseName' value={expenseName} onChange={(e)=>{
          if(error!=='')setError('');
          setExpenseName(e.target.value);
        }} placeholder='e.g., Coffee'/>
        <label className='budget-label' htmlFor="amount">Amount</label>
        <input required type='number' id="amount" name='amount' value={amount} onChange={(e)=>{
          if(error!=='')setError('');
          setAmount(Number(e.target.value));
          }} placeholder='e.g., ₹3.50'/>
        <label className='budget-label' htmlFor="category">Budget Category</label>
        {props.budget.length > 1 ? 
        <select style={{color:'black'}} defaultValue={props.budget[0]?.id}  name='category' value={category} onChange={e=>{
          if(error!=='')setError('');
          setCategory(e.target.value);
          }}>
            {props.budget.map(el=>{
                return <option value={el.id}>{el.budgetName}</option>
            })}
        </select>
        : <input type='text' name='category' readOnly={true} value={props.budget[0]?.budgetName} onChange={e=>setCategory(e.target.value)}></input>
        }
        <div style={{width:'90%'}}>
          <button type='submit' onClick={handleCreateBudget} className='button-primary-expense'>Add Expense <p style={{display:'flex'}}><ion-icon style={{color:'black'}} name="add-circle-outline"></ion-icon></p></button>
        </div>
        {error !== '' ? <p className='error-style'>{error}</p> : null}
    </form>
  )
}

export default Expense
