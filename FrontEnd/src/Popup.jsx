import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group'
import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios"
const handleSubmit=(setPopupOpen)=>{
    document.getElementById('popupContent').classList.toggle('drop-popup');
    setTimeout(()=>{
        setPopupOpen(false);
        document.getElementById('root').style.removeProperty("position","fixed");
    },3000)
}
function handleClosePopup(setPopupOpen){
    document.getElementById('root').style.removeProperty("position","fixed");
    setPopupOpen(false)
}
const Popup = ({setPopupOpen}) => {
  return ReactDOM.createPortal(
    <>
        <div className="popup" style={{overflow:'hidden'}}></div>
        <div className='popupContent-center'>
            <div id='popupContent' className='popup-content'>
                <form className='popup-form'>
                    <div className='inline-flex-last'>
                        <ion-icon onClick={()=>handleClosePopup(setPopupOpen)} style={{height:'20px',width:'20px'}} name="close-outline"></ion-icon>
                    </div>
                    <button type='button' onClick={()=>handleSubmit(setPopupOpen)}>Submit</button>
                </form>
            </div>
        </div>
    </>,document.getElementById('modal')
  )
}

export default Popup
