import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const moveHandler=(e)=>{

}
const Footer = () => {

  return (
    <div style={{position:'fixed',bottom:'0px'}}>
      <LinkedInIcon onMouseMove={moveHandler} style={{color: "#17304a",height:'70px',width: '70px',marginLeft:'50px'}} />
    </div>
  )
}

export default Footer
