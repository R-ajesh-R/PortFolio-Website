import React from 'react';
// import profile from './assets/Profile.jpg'
const RightPanel = () => {
  return (
    <div className='rightPanel'>
        <div className='animate-left-out2 flex-center-center between'>
            <div className='profile'>
                <img src='../assets/Profile.jpg' />
            </div>
            <div className='profile-wrapper'>
                <p style={{color:'white'}}><strong>PROFILE</strong></p>
                <p style={{color:'white'}}>Results-driven Full Stack Developer with over 2.5 years of experience in designing, developing, and maintaining web applications using Node.js and React. Strong problem-solving skills and a passion for learning and implementing new technologies. Proven track record of collaborating effectively with cross-functional teams to deliver high-quality software solutions on time and within budget.</p>
            </div>
        </div>
    </div>
  )
}

export default RightPanel



// import React from 'react';
// const RightPanel = () => {
//   return (
//     <div className='rightPanel'>
//         <div className='flex-center-center'>
//             <div id='card' className='animate-left-out2'>
//                 <img src='./assets/test.jpg' />
//             </div>
//         </div>
//         <svg style={{display:'none'}}>
//             <defs>
//                 <filter id="noise">
//                     <feTurbulence 
//                         baseFrequency="0.7,0.8"
//                         seed="0"
//                         type='fractalNoise'
//                         result='static'
//                     >
//                         <animate attributeName='seed' values='100' dur='800ms' repeatCount='1' begin="card.mouseenter" />
//                     </feTurbulence>
//                     <feDisplacementMap 
//                         in='SourceGraphic'
//                         in2='static'
//                         scale="0"
//                     >
//                         <animate attributeName='scale' values='20' dur='800ms' repeatCount='2' begin="card.mouseenter" />
//                     </feDisplacementMap>
//                 </filter>
//             </defs>
//         </svg>
//     </div>
//   )
// }

// export default RightPanel
