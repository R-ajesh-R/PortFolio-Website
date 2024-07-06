import React, { useEffect, useRef, useState } from 'react'
import './memorygame.css';
let success=false;
const array=()=>{
    let array=[],rows=4,cols=4;
    let totalNumbers = rows * cols;
    let uniqueNumbers = Array.from({ length: totalNumbers }, (_ , index) =>{
        let num= index < Math.floor(totalNumbers/2) ? index + 1 : totalNumbers-index;
         return num;
    });
    for (let i = totalNumbers - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [uniqueNumbers[i], uniqueNumbers[j]] = [uniqueNumbers[j], uniqueNumbers[i]];
    }
    let result = [];
    for (let i = 0; i < rows; i++) {
        result[i] = [];
        for (let j = 0; j < cols; j++) {
            result[i][j] = uniqueNumbers[i * cols + j];
        }
    }
    array = result;
    return array
}
const MemoryGame = () => {
  const [twoDArray,setTwoDArray]=useState([]);
  const [cardStatus,setCardStatus]=useState(Array(4).fill("").map(el=>Array(4).fill(false)))
  const [selectedCards,setSelectedCards]=useState({});
  const [error,setError]=useState('');
  const [gameStart,setGameStart]=useState(false);
  const timerHandler=useRef(null)
  const [movesAndTimer,setMovesAndTimer]=useState({moves:0,time:0});
  const [gameWinStatus,setGameWinStatus]=useState(false)
  useEffect(()=>{
    let valuesFromArray=array(setTwoDArray);
    setTwoDArray(valuesFromArray);
    document.getElementById('content').scrollIntoView({ behavior: 'smooth', block:'center' });
  },[])
  useEffect(()=>{
    if(Object.keys(selectedCards).length===2){
      const {card1,card2}=selectedCards;
      let currentCardStatus=cardStatus;
      if(twoDArray[card1.i][card1.j]===twoDArray[card2.i][card2.j]){
        currentCardStatus[card1.i][card1.j]=true;
        currentCardStatus[card2.i][card2.j]=true;
        if(currentCardStatus.flat().every(el=>el===true)){
          clearInterval(timerHandler.current);
          setTimeout(()=>{
            setGameWinStatus(true);
          },1000)
        }
        setCardStatus(currentCardStatus);
      }
      setTimeout(()=>{
        setSelectedCards({})
      },1500)
    }
  },[selectedCards]);
  const startGameHandler=()=>{
    timerHandler.current=setInterval(() => {
      setMovesAndTimer(prev=>{
        return {...prev,time:prev.time+1}
      })
    }, 1000);
    setGameStart(true);
  }
  const resetGame=()=>{
    stopGame();
  }
  const stopGame=()=>{
    clearInterval(timerHandler.current);
    setGameStart(false);
    let valuesFromArray=array(setTwoDArray);
    setTwoDArray(valuesFromArray);
    setError('');
    setSelectedCards({});
    setMovesAndTimer({moves:0,time:0});
    setCardStatus(Array(4).fill("").map(el=>Array(4).fill(false)));
    setGameWinStatus(false);
  }
  const clickCardHandler=(idx,innerindex)=>{
    if(gameWinStatus || Object.keys(selectedCards).length===2)
      return;
    if(cardStatus[idx][innerindex]===true){
      setError('Pick a card that is not found Yet!');
      return;
    }
    setError('')
    if(Object.keys(selectedCards).length===0)
      setSelectedCards({card1:{i:idx,j:innerindex}});
    else if(Object.keys(selectedCards).length===1){
      const {card1} = selectedCards;
      if(card1.i===idx && card1.j===innerindex){
        setError('Please Don\'t Pick the Same Card')
        return;
      }
      setSelectedCards(prev=>{
          return {...prev,...{card2:{i:idx,j:innerindex}}}
      });
    }
    setMovesAndTimer(prev=>{
      return {...prev,moves: prev.moves+1}
    })
  }
  const card1Index=Object.keys(selectedCards).length > 0 && selectedCards.card1 && selectedCards.card1.i !== undefined && selectedCards.card1.j !== undefined ? [selectedCards.card1.i,selectedCards.card1.j] : null;
  const card2Index=Object.keys(selectedCards).length > 0 && selectedCards.card2 && selectedCards.card2.i !== undefined && selectedCards.card2.j !== undefined ? [selectedCards.card2.i,selectedCards.card2.j] : null;
  console.log(movesAndTimer)
  return (
    <div className='flex-column'>
      <h5 className='heading'>Memory Game</h5>
      <div className='display-grid'>
        {gameStart ? twoDArray.map((array,idx)=>{
          return array.map((element,innerindex)=>{
            return <div className={`grid-item ${(card1Index && card1Index[0]===idx && card1Index[1]===innerindex) || (card2Index && card2Index[0]===idx && card2Index[1]===innerindex) ? 'selected' : ''} ${cardStatus[idx][innerindex] === true ? 'selected' : ''}`} onClick={()=>clickCardHandler(idx,innerindex)} key={`${innerindex}${idx}`}>
              <div className="front-card"></div>
              <div className="back-card">{element}</div>
            </div>
          })
        }) : twoDArray.map((array,idx)=>{
          return array.map((element,innerindex)=>{
            return <div key={`${idx}${innerindex}`} className='grid-item-prestart'></div>
          })
        })}
      </div>
      {error !== '' && <p style={{color: 'Red',display:'flex',justifyContent:'center',alignItems:'center'}}>{error}</p>}
      <div style={{width:'100%',background:'black',marginTop:'10px'}} className='flex-row'>
        {!gameWinStatus ? gameStart ? <button className='button' onClick={stopGame} >Stop</button> : <button className='button' onClick={startGameHandler}>Start</button> : null}
        {gameWinStatus && <button className='button' onClick={resetGame} >Reset</button>}
        <p style={{color:'white'}}>Number of Moves: <span>{movesAndTimer.moves}</span></p>
        <p style={{color:'white'}}>Timer: <span>{movesAndTimer.time}</span></p>
      </div>
      {gameWinStatus && <h5 className='game-win'>You have Successfully Completed the game!!</h5>}
    </div>
  )
}

export default MemoryGame
