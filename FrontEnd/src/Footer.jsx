import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
  const url='https://www.linkedin.com/in/rajesh-ramesh-22b98818b'
  return (
    <div style={{height:'70px',width:'70px',margin:'10px'}}>
      <div style={{position:'fixed',bottom:'0px'}}>
        <a target='_blank' href={url}>
          <LinkedInIcon style={{color: "white",height:'70px',width: '70px',marginLeft:'50px'}} />
        </a>
      </div>
    </div>
  )
}

export default Footer
