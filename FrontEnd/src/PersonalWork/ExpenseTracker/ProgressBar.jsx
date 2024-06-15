import React from 'react'
const variants={
    '50': 'green',
    '75': 'yellow',
    '100': 'red'
}
const ProgressBar = ({percentage}) => {
  let color;
  if(percentage<50)
    color=variants['50'];
  else if(percentage<75)
    color=variants['75'];
  else if(percentage>=75)
    color=variants['100']
  return (
    <div className='flex-center'>
        <div className='total-bar'>
            <div style={{background: `${color}`,'--filledPortion': `${percentage}%`}} className={`progressed-bar ${percentage >= 100 && 'full-bar'}`}>
                {percentage && <span style={{marginRight:'5px'}}>{percentage}%</span>}
            </div>
        </div>
    </div>
  )
}

export default ProgressBar
