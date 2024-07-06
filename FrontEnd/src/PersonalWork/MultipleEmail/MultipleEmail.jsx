import React, { useEffect, useRef, useState } from 'react'
import './multipleemail.css'
const handlePaste=(e,{emailList,setEmailList,setValue})=>{
  e.preventDefault();
  setValue('');
  const tempList=[...emailList];
  var pastedContent = e.clipboardData.getData("text");
  let pastedMails = pastedContent.split(",");
  pastedMails=[...tempList,...pastedMails]
  const newList=[...new Set(pastedMails)]
  setEmailList(newList)
}
const MultipleEmail = (props) => {
  const [value,setValue]=useState('');
  const [error,setError]=useState('');
  const inputRef=useRef(null)
  const [emailList,setEmailList]=useState([]);
  const [chipColor,setChipColor]=useState('#41B06E')
  const [edittableValue,setEdittableValue]=useState('');
  const [edittableIndex,setEdittableIndex]=useState(null);
  const {searchParams}=props;
  useEffect(()=>{
    document.getElementById('content').scrollIntoView({ behavior: 'smooth', block:'center' });
  },[])
  useEffect(()=>{
    let chipcolor=searchParams.get('chipColor');
    if(chipcolor)
      setChipColor(chipcolor)
  },[props.searchParams])
  const regex=/^[a-zA-Z0-9.\s_%+-]+@[a-zA-Z0-9.\s-]+\.[a-zA-Z]{2,}$/;
  console.log('regex',regex)
  const handleOnChange=(e)=>{
    setValue(e.target.value)
    if(error!=='')
    setError('')
  }
  const handleKeyDown=(e)=>{
    if((e.key === "Enter" || e.key === "Tab" || e.key === ",") && value !== ''){
      e.preventDefault();
      if(edittableValue !== '')
        setEdittableValue('')
      if(!regex.test(e.target.value)){
        setError('The provided e-mail is not valid');
        return;
      }
      let tempList=[...emailList,e.target.value]
      setEmailList([...new Set(tempList)])
      setValue('')
    }
    else if(e.key === "Backspace" && value === ''){
      e.preventDefault();
      if(edittableValue !== '')
        setEdittableValue('')
      let tempList=[...emailList];
      tempList.pop();
      setEmailList([...tempList]);
    }
  }
  const handleEditValue = (e) =>{
    if(!(e.key==='Enter'))
      return;
    let tempList=[...emailList];
    tempList[edittableIndex]=edittableValue;
    setEmailList(tempList);
    setEdittableValue('');
  }
  return (
    <div style={{color:"white",'--chipcolor':chipColor}}>
      {edittableValue !== '' ? 
      <div className='edit-email' style={{width:'200px',marginBottom:'5px'}}>
        <input name='email' value={edittableValue} onChange={(e)=>setEdittableValue(e.target.value)} onKeyDown={handleEditValue} />
      </div> 
      : null
      }
      <div className={`multipleemail-input ${error === '' ? 'valid' : ''}`} onClick={()=>inputRef.current.focus()}>
        {emailList.map((email,idx)=>{
          return <>
          <p key={idx} className={`email-chip ${!regex.test(email) ? 'inValid' : ''}`} onClick={()=>{setEdittableValue(email);setEdittableIndex(idx)}} >{email}<span className='close-icon' onClick={()=>setEmailList(prev=>{
            let tempList=[...prev];
            edittableValue !== '' ? setEdittableValue('') : null;
            tempList.splice(idx,1);
            return tempList;
          })}><ion-icon name="close-circle-outline"></ion-icon></span></p>
          </>
        })}
        <input style={{all:'unset',color:'black',width:'300px'}} className='multipleemail-nput' value={value} ref={inputRef} onPaste={(e)=>handlePaste(e,{emailList,setEmailList,setValue})} onKeyDown={handleKeyDown} onChange={handleOnChange} placeholder='Please type or paste Email Here...'/>
      </div>
      {error !== '' ? <p style={{color: 'Red'}}>{error}</p> : null}
    </div>
  )
}

export default MultipleEmail
