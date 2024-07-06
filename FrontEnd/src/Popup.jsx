import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import './popup.css';
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
  const [error,setError]=useState('');
  const [isSubmitting,setIsSubmitting]=useState(false);
  useEffect(()=>{
    document.addEventListener('keydown',closeOnEsc);
    return () => document.removeEventListener('keydown',closeOnEsc);
  },[]);
  function closeOnEsc(e){
    if(e.key==="Escape")
        handleClosePopup(setPopupOpen);
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!validateForm(formData))
        return setError('Please fll in all Mandatory fields...');
    if(isSubmitting)
        return;
    setIsSubmitting(true);
    const {data}=await axios.post('https://portfolio-website-1-m76o.onrender.com/api/email',{
        id,
        ...formData
    },{headers: {
        'Authorization': `Bearer ${token}` 
      }});
    if(data.ResponseStatus==="Message Sent Successfully!!"){
        document.getElementById('popupContent').classList.toggle('drop-popup');
        setTimeout(()=>{
            setPopupOpen(false);
            document.getElementById('root').style.removeProperty("position","fixed");
        },3000)
    }
}
  return ReactDOM.createPortal(
    <>
        <div className="popup" style={{overflow:'hidden'}}></div>
        <div className='popupContent-center'>
            <div id='popupContent' className='popup-content'>
                    <div className='inline-flex-last popup-form1'>
                        <CloseIcon fontSize="xl4" onClick={()=>handleClosePopup(setPopupOpen)} style={{height:'30px',width:'30px',color:'white',cursor:'pointer'}} />
                    </div>
                <form onSubmit={handleSubmit} className='popup-form'>
                    <label htmlFor="name">Please Enter your Name*:</label>
                    <input
                    type='text' 
                    name='name' 
                    disabled={isSubmitting}
                    required
                    autoComplete='off'
                    value={formData.name ? formData.name : ''} 
                    onChange={(e)=>{if(error!=='')setError('');setFormData({...formData,[e.target.name]:e.target.value})}} />
                    <label htmlFor="from">Please Enter your Email*:</label>
                    <input 
                    name='from'
                    type='email'
                    required={true}
                    disabled={isSubmitting}
                    autoComplete='off'
                    value={formData.from ? formData.from : ''} 
                    onChange={(e)=>{if(error!=='')setError('');setFormData({...formData,[e.target.name]:e.target.value})}} />
                    <label htmlFor="subject">Please Enter the Subject:</label>
                    <input 
                    type='text' 
                    name='subject'
                    disabled={isSubmitting}
                    autoComplete='off' 
                    value={formData.subject ? formData.subject : ''} 
                    onChange={(e)=>{if(error!=='')setError('');setFormData({...formData,[e.target.name]:e.target.value})}} />
                    <label htmlFor="message">Please Enter the message*:</label>
                    <textarea 
                    type='textarea' 
                    name='message' 
                    required
                    disabled={isSubmitting}
                    autoComplete='off'
                    rows={5}
                    value={formData.message ? formData.message : ''} 
                    onChange={(e)=>{if(error!=='')setError('');setFormData({...formData,[e.target.name]:e.target.value})}} />
                    <button disabled={isSubmitting} type='submit' style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>Submit {isSubmitting && <span className='loader'></span>}</button>
                    {error !== '' ? <p className='error-style'>{error}</p> : null}
                </form>
            </div>
        </div>
    </>,document.getElementById('modal')
  )
}

export default Popup
