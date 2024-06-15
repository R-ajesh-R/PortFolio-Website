import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setID, setToken } from './popupSlice';
function handleClosePopup(setPopupOpen){
    document.getElementById('root').style.removeProperty("position","fixed");
    setPopupOpen(false)
}
function validateForm(data){
    if(data && data.name && data.name!=='' && data.from && data.from!=='' && data.message && data.message!=='')
        return true;
    return false;
}
const Popup = ({setPopupOpen}) => {
  const id = useSelector(state=>state.contactInfo.id);
  const token = useSelector(state=>state.contactInfo.token);
  const [formData,setFormData]=useState({});
  console.log(id,token);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!validateForm(formData))
        return;
    const res=await axios.post('http://localhost:5010/api/email',{
        id,
        ...formData
    },{headers: {
        'Authorization': `Bearer ${token}` 
      }})
    document.getElementById('popupContent').classList.toggle('drop-popup');
    setTimeout(()=>{
        setPopupOpen(false);
        document.getElementById('root').style.removeProperty("position","fixed");
    },3000)
}
  return ReactDOM.createPortal(
    <>
        <div className="popup" style={{overflow:'hidden'}}></div>
        <div className='popupContent-center'>
            <div id='popupContent' className='popup-content'>
                <form className='popup-form'>
                    <div className='inline-flex-last'>
                        <ion-icon onClick={()=>handleClosePopup(setPopupOpen)} style={{height:'20px',width:'20px'}} name="close-outline"></ion-icon>
                    </div>
                    <label htmlFor="name">Please Enter your Name*:</label>
                    <input
                    type='text' 
                    name='name' 
                    required
                    value={formData.name ? formData.name : ''} 
                    onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})} />
                    <label htmlFor="from">Please Enter your Email*:</label>
                    <input 
                    name='from'
                    type='email'
                    required 
                    value={formData.from ? formData.from : ''} 
                    onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})} />
                    <label htmlFor="subject">Please Enter the Subject:</label>
                    <input 
                    type='text' 
                    name='subject' 
                    value={formData.subject ? formData.subject : ''} 
                    onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})} />
                    <label htmlFor="message">Please Enter the message*:</label>
                    <input 
                    type='textarea' 
                    name='message' 
                    required
                    value={formData.message ? formData.message : ''} 
                    onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})} />
                    <button type='submit' onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    </>,document.getElementById('modal')
  )
}

export default Popup
