import React, { useEffect, useRef, useState } from 'react'
// import './multipleemail.css'
const MultipleSelect = (props) => {
  const [value,setValue]=useState('');
  const [error,setError]=useState('');
  const [emailList,setEmailList]=useState(['India','Pakistan','USA','UK','France']);
  const [chipColor,setChipColor]=useState('#41B06E')
  const {searchParams}=props;
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
  return (
    <div style={{color:"white",'--chipcolor':chipColor}}>
      <div className='edit-email' style={{width:'200px',marginBottom:'5px'}}>
        <select value={value} type='select' onChange={(e)=>setValue(e.target.value)}>
            {emailList.map(elem=>{
                return <option>
                    {/* <input type='checkbox' value={elem}>{elem}</input> */}
                    <p></p>
                </option>
            })}
        </select>
      </div> 
      {error !== '' ? <p style={{color: 'Red'}}>{error}</p> : null}
    </div>
  )
}

export default MultipleSelect
