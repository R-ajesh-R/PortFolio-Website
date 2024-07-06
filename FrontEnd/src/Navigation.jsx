import React, { useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import InfoIcon from '@mui/icons-material/Info';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setID, setToken } from './popupSlice';
import { useNavigate } from 'react-router-dom';
function handleMouseOver(e){
  const element=document.getElementsByClassName('navigation-name')[0];
  const text=element.innerText.split('');
  element.innerText="";
  text.forEach(letter=>{
    const span=document.createElement('span');
    span.className='split-letter';
    span.innerText=letter;
    element.appendChild(span)
  })
}
async function handleContactMe(setPopupOpen,dispatch){
  const {data}=await axios.post('https://port-folio-website-beige.vercel.app/token');
  dispatch(setID(data.id));
  dispatch(setToken(data.accessToken))
  setPopupOpen(true)
  document.getElementById('root').style.setProperty("position","fixed");
}
const Navigation = ({setPopupOpen}) => {
  const dispatch=useDispatch();
  let navigate = useNavigate();
  return (
    <div id="content" className='wrapper' style={{top:'0px',left:'0px',right:'0px',zIndex:'1000'}}>
      <nav className='navigation'>
      <div className='navigation-name'>Rajesh</div>
      <div className='right-panel'>
      <ul>
        <li className='list' onClick={()=>navigate('/')}>
          <a href='/'>
            <span className='navigation-icon' ><HomeIcon /></span>
            <span className='navigation-text'>Home</span>
            <span className='navigation-circle'></span>
            <span className='popup-circle' style={{'--item':0}}></span>
          </a>
        </li>
        <li className='list' onClick={()=>{if(window.location.href!=='/')navigate('/')}}>
          <a href='#main-page2'>
              <span className='navigation-icon' ><ion-icon name="book"></ion-icon></span>
              <span className='navigation-text'>My Works</span>
              <span className='navigation-circle'></span>
              <span className='popup-circle' style={{'--item':1}}></span>
            </a>
        </li>
        <li className='list' onClick={()=>{if(window.location.href!=='/')navigate('/')}}>
            <a href='#main-page3'>
              <span className='navigation-icon'><InfoIcon /></span>
              <span className='navigation-text'>About Me</span>
              <span className='navigation-circle'></span>
              <span className='popup-circle' style={{'--item':2}}></span>
            </a>
        </li>
        <li className='list' onClick={()=>handleContactMe(setPopupOpen,dispatch)}>
            <a>
              <span className='navigation-icon'><ContactsIcon /></span>
              <span className='navigation-text'>Say Hi!</span>
              <span className='navigation-circle'></span>
              <span className='popup-circle' style={{'--item':3}}></span>
            </a>
        </li>
        <div id='indicator'></div>
      </ul>
      </div>
    </nav>
    </div>
  )
}

export default Navigation
