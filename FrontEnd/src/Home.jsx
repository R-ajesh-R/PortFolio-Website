import React from 'react'
import Navigation from './Navigation'
import MainPage from './MainPage.jsx'
import Slider from './Slider.jsx'
import AboutMe from './AboutMe/AboutMe.jsx'
const Home = ({setPopupOpen}) => {
  return (
    <>
        <div className='main-page1'>
        <MainPage />
        </div>
        <div id="main-page2" className='main-page2'>
          <Slider />
        </div>
        <div id="main-page3" className='main-page3'>
          <AboutMe />
        </div>
    </>
  )
}

export default Home
