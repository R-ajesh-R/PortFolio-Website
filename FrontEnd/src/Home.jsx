import React from 'react'
import Navigation from './Navigation'
import MainPage from './MainPage.jsx'
import Slider from './Slider.jsx'
const Home = ({setPopupOpen}) => {
  return (
    <>
        <Navigation setPopupOpen={setPopupOpen} />
        <div className='main-page1'>
        <MainPage />
        </div>
        <div className='main-page2'>
          <Slider />
        </div>
    </>
  )
}

export default Home
