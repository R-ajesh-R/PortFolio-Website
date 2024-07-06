import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import {workList} from './workList';
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}
function output(num1,operator,num2){
  return operator==='+' ? num1+num2 : num1-num2;
}
const loadSlider=(active,items)=>{
    // const previousButton=doc
    let stt;//need to add active logic
    let width=document.documentElement.clientWidth;
    for(let i=0;i<items.length && width<=600;i++){
      items[i].style.display='none';
    }
    let stationaryValue=false;
    width<=600 && (stationaryValue=true);
    let additionalValue = width <= 600 ? 75 : 0;
    items[active].style.transform=`translate(${additionalValue+5}px,-50%)`;
    if(stationaryValue)
      items[active].style.transform=`translate(-100px,-50%)`;
    items[active].style.zIndex=1;
    items[active].style.filter='none';
    items[active].style.display='block'
    items[active].style.opacity=1;
    if(!width<=600)
    for(let i=0;i<items.length;i++){
      let translateProperty,rotateProperty,operator;
      if(i===active)
        continue;
      active>i ? stt=active-i : stt=i-active;
      if(i<active)
        translateProperty=-120,rotateProperty='1deg',operator='-';
      else
        translateProperty=120,rotateProperty='-1deg',operator='+';      
      items[i].style.transform=`translate(${translateProperty*stt}px,-50%) scale(${1-0.2*stt}) perspective(16px) rotateY(${`${rotateProperty}`})`;
      items[i].style.zIndex=-stt;
      items[i].style.filter='blur(5px)';
      if(width > 600){
        items[i].style.opacity=stt > 2 ? 0 : 0.6;
        items[i].style.display='block';
      }
    }
    if(width<=600){
      if(items[active-1]){
        items[active-1].style.transform=`translate(-195px,-50%) scale(${1-0.2*1}) perspective(16px) rotateY(${`1deg`})`;
        items[active-1].style.zIndex=-1;
        items[active-1].style.filter='blur(5px)';
        items[active-1].style.opacity=0.6;      
        items[active-1].style.display='block';
      }
      if(items[active+1]){
        items[active+1].style.transform=`translate(-8px,-50%) scale(${1-0.2*1}) perspective(16px) rotateY(${`-1deg`})`;
        items[active+1].style.zIndex=-1;
        items[active+1].style.filter='blur(5px)';
        items[active+1].style.opacity=0.6;   
        items[active+1].style.display='block';
      }
    }
  }
const Slider = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(); 
  const [active,setActive]=useState(1);
  const items=useRef([]);
  let navigate = useNavigate();
  useEffect(()=>{
    const itemsList=document.querySelectorAll('.slider .item');
    items.current=itemsList;
    loadSlider(active,items.current)
    window.addEventListener('resize', ()=>loadSlider(active,items.current));
    return () => {
      window.removeEventListener('resize', ()=>loadSlider(active,items.current));
    };
  },[])
  useEffect(()=>{
    loadSlider(active,items.current)
  },[active])
  const redirect=(route)=>{
    if(route==="TicTacToe"){
      window.location.href=`https://portfolio-website-1-m76o.onrender.com/works?component=${route}`
    }else{
    route=route.replace(/\n/,'');
    navigate(`/works?component=${route}`,{ replace:true });
    }
  }
  return (
    <div className="slider">
      {workList.map((el,idx)=>{
        return (
          <div key={idx} onClick={()=>redirect(el.title)} className="item">
            <h1>{el.title}</h1>
            <p>{el.description}</p>
          </div>
        )
      })}
      <button type='button' id="previous" disabled={active===0 ? true : false} onClick={()=>setActive(active-1)}>{`<`}</button>
      <button type='button' id="next" disabled={active===items.current.length - 1 ? true : false} onClick={()=>setActive(active+1)}>{`>`}</button>
    </div>
  )
}

export default Slider