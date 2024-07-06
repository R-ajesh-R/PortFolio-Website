import React,{useEffect, useState} from 'react'
import './expensetracker.css';
import CreateBudget from './CreateBudget';
import Expense from './Expense';
import ExpenseCard from './ExpenseCard';
import Table from './Table';
import DeleteIcon from '@mui/icons-material/Delete';
const ExpenseTracker=()=>{
  const [budget,setBudget]=useState(()=>{
    let budgetValue=localStorage.getItem('budgetValue');
    if(budgetValue)
      return JSON.parse(budgetValue);
    else
      return []
  });
  const [expense,setExpense]=useState(()=>{
    let expenseValue=localStorage.getItem('expenseValue');
    if(expenseValue)
      return JSON.parse(expenseValue);
    else
      return []
  });
  const [viewBreakUp,setViewBreakUp]=useState({value:false,id:''});
  useEffect(()=>{
    document.getElementById('content').scrollIntoView({ behavior: 'smooth', block:'center' });
  },[])
  useEffect(()=>{
    let budgetValue=JSON.stringify(budget);
    let expenseValue=JSON.stringify(expense);
    localStorage.setItem('expenseValue',expenseValue);
    localStorage.setItem('budgetValue',budgetValue);
  },[budget,expense]);
  function handleClearData(){
    alert('Do You wish to clear all data..?');
    localStorage.removeItem('expenseValue');
    localStorage.removeItem('budgetValue');
    setBudget([]);
    setExpense([]);
  }
  return (
  <div style={{width:'100vw',height:'100vh'}}>
    <div style={{minHeight:'20px',width:'100%',display:'flex',padding:'5px 60px',boxSizing:'border-box',color:'white',justifyContent:'end'}}>
      <button onClick={handleClearData} className='button-primary-expense'>Clear All Data<p style={{display:'flex'}}><DeleteIcon /></p></button>
    </div>
    <div className="expense-content">
      <div className="flex-gap">
        <CreateBudget setBudget={setBudget} />
        {budget.length > 0 && <Expense setExpense={setExpense} budget={budget} expense={expense}/>}
      </div>
      <div className='flex-gap cards'>
        {budget.length > 0 && 
        budget.map((singleBudget,idx)=>{
          return <ExpenseCard key={idx} viewBreakUp={viewBreakUp} setViewBreakUp={setViewBreakUp} expense={expense} budget={singleBudget}/>
        })}
      </div>
      {viewBreakUp.value && <Table setExpense={setExpense} viewBreakUp={viewBreakUp} expense={expense} />}
    </div>
  </div>
  )
}








// import React from 'react'
// import './expensetracker.css';
// import Budget from './Budget';
// const ExpenseTracker = () => {
//   return (
//     <div className='component-wrapper'>
//         <div className="flex-row">
//             <h2 className='heading-left'>Create your expenses</h2>
//             <button className='button-primary'>Add a Budget</button>
//             <button className='button-primary'>Add Expense</button>
//         </div>
//         <div style={{
//             display:'grid',
//             gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
//             gap: '1rem',
//             alignItems: "flex-start"
//         }}>
//             <Budget name='Test' amt={1200} max={1000} />
//         </div>
//     </div>
//   )
// }

export default ExpenseTracker
