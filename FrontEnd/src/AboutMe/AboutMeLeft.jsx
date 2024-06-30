import React from 'react'

const AboutMeLeft = () => {
  return (
    <div className='aboutme-left-right'>
      <div className='wd-40'>
        <div>
          <p style={{marginBottom:'5px'}}>
            <strong>Languages Spoken</strong>
          </p>
          <ul>
              <li className='flex-row' style={{width:'224px'}}><i>English</i><p style={{whiteSpace:'nowrap'}}>Read, Write, Speak</p></li>
              <br />
              <li className='flex-row' style={{width:'224px'}}><i>Tamil</i><p style={{whiteSpace:'nowrap'}}>Read, Write, Speak</p></li>
              <br />
          </ul>
        </div>
        <div>
          <div className='flex-row'>
              <p><strong>FullName</strong></p>
              <p>Rajesh R</p></div>
          <br />
          <div className="flex-row" style={{width:'224px'}}>
              <p style={{whiteSpace:'nowrap'}}><strong>Birth Date</strong></p>
              <p style={{whiteSpace:'nowrap',bottom:'0px'}}>January 6th, 2000</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMeLeft

{/* <br /> */}
        {/* <ul>
            <li className='flex-column'><p><i>English</i></p><p>Read, Write, Speak</p></li>
            <br />
            <li className='flex-column'><p><i>Tamil</i></p><p>Read, Write, Speak</p></li>
            <br />
        </ul>
        <p><i>FullName</i></p>
        <p>Rajesh R</p>
        <br />
        <p><i>Birth Date</i></p>
        <p>January 6th, 2000</p> */}