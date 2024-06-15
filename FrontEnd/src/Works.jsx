import React, { isValidElement } from 'react'
import './works.css'
import { components } from './PersonalWork/DevelopedComponents'
import { useLocation, useSearchParams } from 'react-router-dom'
const Works = (props) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(); 
  const component=searchParams.get('component')
  if(!component)
  return React.createElement(
    () => <div>Please Provide a valid Component to Proceed.</div>
  );
  if(!components[component.toLowerCase()])
  return React.createElement(
    'div',{className:'Works no-component'},`The component ${component} has not been created yet.`
  );
  let Comp=components[component.toLowerCase()]
  return (
    <div className='Works'>
        {isValidElement(<Comp />) ? <Comp searchParams={searchParams} /> : null}
    </div>
  )
}

export default Works
