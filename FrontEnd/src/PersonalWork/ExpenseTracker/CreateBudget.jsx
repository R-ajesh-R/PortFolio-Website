import React, {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
const CreateBudget = ({setBudget}) => {
  const [budgetName,setBudgetName]=useState('');
  const [amount,setAmount]=useState(0);
  const [error,setError]=useState('')
  function handleCreateBudget(e){
    e.preventDefault();
    setError('');
    if(!budgetName || !amount){
      setError('Please fill all the details...');
      return;
    }
    if(amount===0 || amount.toString().includes('-')){
      setError('Amount can not be 0 or negative...')
      return;
    }
    setBudget(prev=>{
      let uid = uuidv4();

      return [...prev,{amount:Number(amount),budgetName,id:uid,createdAt:Date.now()}];
    })
    setAmount(0);
    setBudgetName('');
  }
  return (
    <form className="budget">
        <p className='heading'>Create Budget</p>
        <label className='budget-label' htmlFor="budgetName">Budget Name</label>
        <input type='text' id="budgetName" name='budgetName' value={budgetName} onChange={(e)=>{
          if(error!=='')setError('');
          setBudgetName(e.target.value);
        }} placeholder='e.g., Groceries'/>
        <label className='budget-label' htmlFor="amount">Amount</label>
        <input type='number' id="amount" name='amount' value={amount} onChange={(e)=>{
          if(error!=='')setError('');
          setAmount(e.target.value);
          }} placeholder='₹3000'/>
        <div style={{width:'90%'}}>
          <button type='submit' onClick={handleCreateBudget} className='button-primary-expense'>Create New Budget <span>&#8377;</span></button>
        </div>
        {error !== '' ? <p className='error-style'>{error}</p> : null}
    </form>
  )
}

export default CreateBudget
