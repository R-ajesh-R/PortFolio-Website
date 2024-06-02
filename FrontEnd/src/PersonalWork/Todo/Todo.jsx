import React, { useState } from 'react'
import './todo.css'
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group';
const Todo = () => {
  const [value,setValue]=useState('')
  const [todo,setTodo]=useState([]);
  const [draggable,setDraggable]=useState(false);
  const movableElement=(e,offsetInfo)=>{
    const element=document.getElementById(offsetInfo.index);
    var newElement=element.cloneNode(true);
    // var newElement = React.createElement(()=><p>The Element is dragged!!</p>)
    // newElement.style.backgroundColor = "red";
    // newElement.style.position = "absolute"; 
    // newElement.style.opacity=1
    // // newElement.style.top = "0px"; newElement.style.right = "0px";
    // document.body.appendChild(newElement);
    // e.dataTransfer.setDragImage(newElement, 0, 0);
    newElement.style.left=`${e.clientX - offsetInfo.offsetX}`;
    newElement.style.top=`${e.clientY - offsetInfo.offsetY}`;
  }
  const handleDragStart = (e,index) =>{
    const element=document.getElementById(index);
    const offsetX=e.clientX - element.offsetLeft
    const offsetY=e.clientY - element.offsetTop
    document.addEventListener('mousemove',(e)=>movableElement(e,{offsetX,offsetY,index}))
  }
  const removeEvent=()=>{
    document.getElementById('1').removeEventListener('mousemove',(e)=>movableElement(e,{offsetX,offsetY}))
  }
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
                <div className='todo-wrapper'>
                    {todo.map((el,idx)=>{
                        return <div onMouseDown={(e)=>handleDragStart(e,idx)}
                        onMouseUp={removeEvent} id={`${idx}`} key={`${idx}removed`} className='Todo'>
                                <button><ion-icon name="reorder-four-outline" className='Icon'></ion-icon></button>
                                <span onMouseDown={e => setDraggable(false)}
                                onMouseUp={e => setDraggable(true)}>{el}</span>
                                <button><ion-icon name="create-outline" className='Icon'></ion-icon></button>
                                <button><ion-icon name="trash-outline" className='Icon'></ion-icon></button>
                        </div>
                    })}
                </div>
                <div draggable={true}>sdkfhsladkjfl;aksdj</div>
            </div>
        </div>
        <div style={{flex: '50%',justifyContent:'center',alignItems:'center',display:'flex'}}>
            <div>
                <p style={{textAlign:'center',color:'white'}}>Items that are completed</p>
                <div className='todo-wrapper'>
                    {todo.map((el,idx)=>{
                        return <div key={`${idx}removed`} className='Todo'>
                                <button><ion-icon name="reorder-four-outline" className='Icon'></ion-icon></button>
                                <span>{el}</span>
                                <button><ion-icon name="create-outline" className='Icon'></ion-icon></button>
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
