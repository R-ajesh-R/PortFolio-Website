import React from 'react'
import AboutMeLeft from './AboutMeLeft'
import './aboutme.css';
import AboutMeRigth from './AboutMeRigth';
const AboutMe = () => {
  return (
    <div className='flex-row white size-full'>
      <AboutMeLeft />
      <AboutMeRigth />
    </div>
  )
}

export default AboutMe
