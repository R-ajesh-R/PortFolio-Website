import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import {workList} from './workList'
const loadSlider=(active,items)=>{
    // const previousButton=doc
    let stt;//need to add active logic
    items[active].style.transform=`translate(5px,-50%)`;
    items[active].style.zIndex=1;
    items[active].style.filter='none';
    items[active].style.opacity=1;
    for(let i=0;i<items.length;i++){
      let translateProperty,rotateProperty;
      if(i===active)
        continue;
      active>i ? stt=active-i : stt=i-active;
      if(i<active)
        translateProperty=-120,rotateProperty='1deg';
      else
        translateProperty=120,rotateProperty='-1deg';
      items[i].style.transform=`translate(${translateProperty*stt}px,-50%) scale(${1-0.2*stt}) perspective(16px) rotateY(${`${rotateProperty}`})`;
      items[i].style.zIndex=-stt;
      items[i].style.filter='blur(5px)';
      items[i].style.opacity=stt > 2 ? 0 : 0.6;
    }
  }
const Slider = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(); 
  const [active,setActive]=useState(3);
  const items=useRef([]);
  let navigate = useNavigate();
  console.log(location,searchParams)
  useEffect(()=>{
    const itemsList=document.querySelectorAll('.slider .item');
    items.current=itemsList;
  },[])
  useEffect(()=>{
    loadSlider(active,items.current)
  },[active])
  const redirect=(route)=>{
    route=route.replace(/\n/,'');
    navigate(`/works?component=${route}`,{ replace:true });
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


{/* <div className="item">
<h1>Slide 1</h1>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque maiores enim possimus ipsam ducimus rem. Repellat dicta voluptas recusandae alias explicabo quasi quis magni omnis minus deserunt in, aliquam error.
Ex adipisci aliquid delectus dolorem illum ducimus esse officiis ad. Molestiae illum assumenda veniam commodi vel in quisquam quod eos, suscipit ullam ipsum sit doloribus accusantium maxime perferendis explicabo error!
</div>
<div className="item">
<h1>Slide 2</h1>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque maiores enim possimus ipsam ducimus rem. Repellat dicta voluptas recusandae alias explicabo quasi quis magni omnis minus deserunt in, aliquam error.
Ex adipisci aliquid delectus dolorem illum ducimus esse officiis ad. Molestiae illum assumenda veniam commodi vel in quisquam quod eos, suscipit ullam ipsum sit doloribus accusantium maxime perferendis explicabo error!
</div>
<div className="item">
<h1>Slide 3</h1>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque maiores enim possimus ipsam ducimus rem. Repellat dicta voluptas recusandae alias explicabo quasi quis magni omnis minus deserunt in, aliquam error.
Ex adipisci aliquid delectus dolorem illum ducimus esse officiis ad. Molestiae illum assumenda veniam commodi vel in quisquam quod eos, suscipit ullam ipsum sit doloribus accusantium maxime perferendis explicabo error!
</div>
<div className="item">
<h1>Slide 4</h1>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque maiores enim possimus ipsam ducimus rem. Repellat dicta voluptas recusandae alias explicabo quasi quis magni omnis minus deserunt in, aliquam error.
Ex adipisci aliquid delectus dolorem illum ducimus esse officiis ad. Molestiae illum assumenda veniam commodi vel in quisquam quod eos, suscipit ullam ipsum sit doloribus accusantium maxime perferendis explicabo error!
</div>
<div className="item">
<h1>Slide 5</h1>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque maiores enim possimus ipsam ducimus rem. Repellat dicta voluptas recusandae alias explicabo quasi quis magni omnis minus deserunt in, aliquam error.
Ex adipisci aliquid delectus dolorem illum ducimus esse officiis ad. Molestiae illum assumenda veniam commodi vel in quisquam quod eos, suscipit ullam ipsum sit doloribus accusantium maxime perferendis explicabo error!
</div>
<div className="item">
<h1>Slide 6</h1>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque maiores enim possimus ipsam ducimus rem. Repellat dicta voluptas recusandae alias explicabo quasi quis magni omnis minus deserunt in, aliquam error.
Ex adipisci aliquid delectus dolorem illum ducimus esse officiis ad. Molestiae illum assumenda veniam commodi vel in quisquam quod eos, suscipit ullam ipsum sit doloribus accusantium maxime perferendis explicabo error!
</div>

 */}
