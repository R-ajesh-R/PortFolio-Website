import React, { useState } from 'react'
import { formatter } from './expenseUtils'
const columnValues=['expenseName','expenseAmount','createdAt'];
function compare( el,type ) {
 return function(a,b){
  if((typeof a[el] ==='string' || typeof b[el] ==='string') && type==='Asc'){
    if ( a[el] < b[el] ){
      return -1;
    }
    if ( a[el] > b[el] ){
      return 1;
    }
    return 0;
  }else if(typeof a[el] ==='string' || typeof b[el] ==='string' && type==='Dsc'){
    if ( a[el] > b[el] ){
      return -1;
    }
    if ( a[el] < b[el] ){
      return 1;
    }
    return 0;
  }else if((typeof a[el] ==='number' || typeof b[el] ==='number') && type==='Asc'){
    return a[el] - b[el];
  }else if((typeof a[el] ==='number' || typeof b[el] ==='number') && type==='Dsc'){
    return b[el] - a[el];
  }
 }
}
const Table = ({expense,setExpense,viewBreakUp}) => {
  const [sortBase,setSortBase]=useState({type:'Asc',by:'createdAt'});
  const [tempDataList,setTempDataList]=useState([]);
  const currentExpense=expense.filter(el=>el.budgetId===viewBreakUp.id);
  if(currentExpense.length!==tempDataList.length){
    setTempDataList([...currentExpense]);
    setSortBase({type:'Asc',by:'createdAt'})
  }
  const handleDelete = (id) =>{
    const tempExpense=expense.filter(el=>(el.id!==id));
    setExpense([...tempExpense]);
  }
  const handleSortClick=(el,idx)=>{
    let type,dataList=[];
    if(el==='Action')
      return;
    if(sortBase.by!==el){
      type='Asc';
    }
    if(sortBase.type==='Asc' && sortBase.by===el){
      type='Dsc';
    }
    else if(sortBase.type==='Dsc' && sortBase.by===el){
      type='Asc';
    }
    dataList=[...currentExpense];
    dataList.sort(compare(el,type))
    setTempDataList([...dataList])
    setSortBase(prev=>{
      return {type:type,by:el}
    })
  }
  let valuesForMap=tempDataList.length > 0 ? tempDataList : currentExpense;
  return (
    currentExpense.length > 0 ? <div className='grid-md'>
      <p style={{color:'white',fontSize:'xx-large'}}>Recent Expenses</p>
      <div className="table">
        <table cellPadding="0">
            <thead>
                <tr>
                    {['Name','Amount','Created Date','Action'].map((el,idx)=>{
                        return <th key={idx} onClick={(e)=>handleSortClick(columnValues[idx],idx)}>{`${el}`}<span>{(sortBase.by===columnValues[idx]) ? (sortBase.type === 'Asc') ? <ion-icon name="arrow-up-outline"></ion-icon> : <ion-icon name="arrow-down-outline"></ion-icon> : null}</span></th>
                        })}
                </tr>
            </thead>
            <tbody>
                {valuesForMap.map(el=>{
                    return <tr key={el.id}>
                                <td>{el.expenseName}</td>
                                <td>{formatter(el.expenseAmount)}</td>
                                <td>{new Date(el.createdAt).toLocaleDateString()}</td>
                                <td><button type='button' onClick={()=>console.log('fda34',el)} style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',background:'inherit',border:'none'}}><p style={{display:'flex',cursor:'pointer'}}><ion-icon style={{color:'white'}} name="trash-outline" onClick={()=>handleDelete(el.id)}></ion-icon></p></button></td>
                            </tr>
                })}
            </tbody>
        </table>
      </div>
    </div> :
    <div className='grid-md'>
      <p style={{color:'white',fontSize:'xx-large'}}>No Expense to list for the selected option</p>
    </div>
  )
}

export default Table
