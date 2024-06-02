import React from 'react';
const RightPanel = () => {
  return (
    <div className='rightPanel'>
        <div className='flex-center-center'>
            <div id='card' className='animate-left-out2'>
                <img src='./assets/test.jpg' />
            </div>
        </div>
        <svg style={{display:'none'}}>
            <defs>
                <filter id="noise">
                    <feTurbulence 
                        baseFrequency="0.7,0.8"
                        seed="0"
                        type='fractalNoise'
                        result='static'
                    >
                        <animate attributeName='seed' values='100' dur='800ms' repeatCount='1' begin="card.mouseenter" />
                    </feTurbulence>
                    <feDisplacementMap 
                        in='SourceGraphic'
                        in2='static'
                        scale="0"
                    >
                        <animate attributeName='scale' values='20' dur='800ms' repeatCount='2' begin="card.mouseenter" />
                    </feDisplacementMap>
                </filter>
            </defs>
        </svg>
    </div>
  )
}

export default RightPanel
