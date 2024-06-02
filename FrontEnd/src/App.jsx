import { useEffect, useRef, useState } from 'react'
import Footer from './Footer.jsx'
import Popup from './Popup.jsx';
import Home from './Home.jsx';
import Works from './Works.jsx';
import { Route, Routes } from 'react-router-dom';
function App() {
  const [popupOpen,setPopupOpen]=useState(false);
  useEffect(()=>{
    const innerMouse=document.getElementById('inner-mouse');
    window.onmousemove=e=>{
      const x=e.clientX - innerMouse.offsetWidth / 2;
      const y=e.clientY - innerMouse.offsetHeight/2;
      const keyFrames={
        transform:`translate(${x}px,${y}px)`
      }
      innerMouse.animate(keyFrames,{
        duration: 800,
        fill: 'forwards'
      })
    }
  },[])
  
  //for the scroll Effect position is to be set to sticky and top should be 0
  return (
      <>
        <div id='inner-mouse'>

        </div>
        <Routes>
         <Route path='/' element={<Home setPopupOpen={setPopupOpen} />}/>
         <Route path="/works" element={<Works componentToBeRendered="MultipleEmail"/>} />
        </Routes>
        {popupOpen ? <Popup setPopupOpen={setPopupOpen}/> : null}
        <Footer />
      </>
  )
}

export default App
