import React from 'react'
import { formatter } from './expenseUtils'
import ProgressBar from './ProgressBar'

const Budget = ({name,amt,max,done=false}) => {
  const classNames=[];
  if(amt > max)
    classNames.push('crd-danger')
  if(done)
    classNames.push('crd-gray')
  return (
    <div className={`budget-wrapper ${classNames.join(" ")}`}>
      <div style={{color:'black'}} className="flex-row">
        <div>{name}</div>
        <div>{formatter(amt)} 
            <span className='mute'>/ {formatter(max)}</span></div>
      </div>
      <ProgressBar percentage={100} />
      <div className="flex-center-end">
        <button className='button-primary'>Add Expense</button>
        <button className='button-primary'>View Expense</button>
      </div>
    </div>
  )
}

export default Budget
