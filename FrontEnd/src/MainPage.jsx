import React, { useEffect } from 'react'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
function setScroll(){
  const htmlElement=document.documentElement;
  const scroll=htmlElement.scrollTop/htmlElement.clientHeight;
  const valueForVariable=Math.min(scroll*100,100);
  htmlElement.style.setProperty('--scroll',valueForVariable);
  console.log(valueForVariable)
}
const MainPage = () => {
  useEffect(()=>{
    window.addEventListener('scroll',setScroll)
  },[])
  return (
    <div className='main-page'>
      <LeftPanel />
      <RightPanel />
    </div>
  )
}

export default MainPage
