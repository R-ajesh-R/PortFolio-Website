import React, { useState } from 'react'
import './todo.css'
const Todo = () => {
  const [value,setValue]=useState('')
  const [todo,setTodo]=useState([]);
 
  const handleKeyDown=(e)=>{
    if(e.key==='Enter'){
        if(todo.length===0){
            setTodo([value]);
            setValue('');
            return;
        }
        setTodo(prev=>{
            let tempList=[...prev];
            tempList.push(value);
            return tempList;
        })
        setValue('');
    }
  }
  return (
    <>
        <div style={{color:'white',position:'absolute',top:'10px',width:'100%',display:'flex',justifyContent:'center'}}>
            <input style={{color:'black',width:'300px',outline:'none',position:'relative',top:'20px'}} className='multipleemail-input' value={value}  onKeyDown={handleKeyDown} onChange={(e)=>setValue(e.target.value)} placeholder='What would you like to add to our todo List?'/>
        </div>
        <div style={{flex: '50%',justifyContent:'center',alignItems:'center',display:'flex'}}>
            <div>
                <p style={{textAlign:'center',color:'white'}}>Items on the Todo</p>
                <div droppable className='todo-wrapper'>
                    {todo.map((el,idx)=>{
                        return <div id={`${idx}`} draggable key={`${idx}removed`} className='Todo'>
                                    <p className='todo-content'>{el}</p>
                                    <button className='first-button'><ion-icon name="create-outline" className='Icon'></ion-icon></button>
                                    <button><ion-icon name="trash-outline" className='Icon'></ion-icon></button>
                                </div>
                    })}
                </div>
            </div>
        </div>
        <div style={{flex: '50%',justifyContent:'center',alignItems:'center',display:'flex'}}>
            <div>
                <p style={{textAlign:'center',color:'white'}}>Items that are completed</p>
                <div droppable className='todo-wrapper'>
                    {todo.map((el,idx)=>{
                        return <div key={`${idx}removed`} className='Todo'>
                                    <p className='todo-content'>{el}</p>
                                    <button className='first-button'><ion-icon name="create-outline" className='Icon'></ion-icon></button>
                                    <button><ion-icon name="trash-outline" className='Icon'></ion-icon></button>
                               </div>
                    })}
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo
