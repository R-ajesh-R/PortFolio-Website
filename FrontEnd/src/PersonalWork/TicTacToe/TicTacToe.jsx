import React, { useEffect, useState } from 'react'
import './tictactoe.css';
import io from 'socket.io-client';
import axios from "axios";
let socket;
let Translation={
  'Please wait while your friend is trying to join...': "waiting",
  'Let\'s Begin': "start"
}
const winningCombination=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
const TicTacToe = () => {
  const [waitingForConnection,setWaitingForConnection]=useState(true);
  const [roomvalue,setRoomValue]=useState('');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [turn,setTurn]=useState('');
  const [board,setBoard]=useState(()=>{
   return Array(3).fill("").map(el=>Array(3).fill(""))
  });
  const [tracker,setTracker]=useState(()=>{
    return Array(9).fill("")
  })
  const [isYourTurn,setIsYourTurn]=useState(false);
  const [roomNumberValue,setRoomNumberValue]=useState('')
  const [winner,setWinner]=useState(null);
  useEffect(()=>{
    socket=io.connect('http://localhost:5010/')
  },[])
  useEffect(()=>{
    socket.on("room",(res)=>{
      console.log(res)
      if(res.hasOwnProperty('players')){
        setError('')
        setLoading(false);
        setWaitingForConnection(false);
        if(res.hasOwnProperty('turn')){
          setTurn('X');
          setIsYourTurn(true);
        }else{
          setTurn('O');
        }
      }else if(res.hasOwnProperty('message')){
        setLoading(false);
        setError(res.message);
      }
    });
    socket.on('made-move',res=>{
      const {board,prevTurn,nextTurn}=res;
      if(prevTurn !== nextTurn){
        setIsYourTurn(true);
      }
      setBoard(board);
    })
    socket.on('lost',res=>{
      setWinner(turn==='X' ? 'O' : 'X');
      setIsYourTurn(false);
      // alert('Since the game is over the session will log out in 3 seconds... Hope you enjoyed!')
      setTimeout(()=>{
        socket.on('disconnect',{roomNumberValue});
        setWaitingForConnection(true);
      },3000)
    });
    socket.on('draw',res=>{
      setIsYourTurn(false);
      setWinner('draw');
      setTimeout(()=>{
        socket.on('disconnect',{roomNumberValue});
        setWaitingForConnection(true);
      },3000)
    })
  },[socket])
  const handleCreateRoom = () =>{
    setRoomNumberValue(roomvalue)
    socket.emit("room",{roomNumber:roomvalue})
    setLoading(true);
  }
  const handleClick=(i,j)=>{
    if(board[i][j]!==''){
      setError('Please choose option That is not selected...');
      return;
    }
    const copy=[...board];
    copy[i][j]=turn;
    const offset = i * 3;
    const index=offset + j;
    const temp=[...tracker];
    temp[index]=turn;
    setTracker(temp)
    setError('')
    setBoard(copy);
    setIsYourTurn(false);
    socket.emit('made-move',{board,temp,roomNumberValue,prevTurn:turn,nextTurn: turn==='X' ? 'O' : 'X'})
  }
  const renderBoard=()=>{
    let checkIfWon=false,isMatchEnded=false;
    if(!winner)
      checkIfWon = winningCombination.some(combination=>{
        return combination.every(idx=>tracker[idx]===turn)
      });
    if(!winner && !checkIfWon){
      isMatchEnded=board.flat().every(el=>el!=='');
      if(isMatchEnded){
        socket.emit('draw',{roomNumberValue});
        setWinner('draw');
        setTimeout(()=>{
          socket.on('disconnect',{roomNumberValue});
          setWaitingForConnection(true);
        },3000)
      }
    }
    if(checkIfWon){
        socket.emit('lost',{roomNumberValue})
        setWinner(turn);
        // alert('Since the game is over the session will log out in 3 seconds... Hope you enjoyed!')
        setTimeout(()=>{
          socket.on('disconnect',{roomNumberValue});
          setWaitingForConnection(true);
        },3000)
    }
    return(board.map((rows,idx)=>{
      return rows.map((column,index)=>{
        return isYourTurn ? <div key={`${idx+''+index}`} onClick={()=>handleClick(idx,index)} className={`cell ${board[idx][index]==='' ? 'showOnHover' : 'cursor-not-allowed'}`}>{board[idx][index]!=='' ? board[idx][index] : turn}</div> : <div key={`${idx+''+index}`} className={`cell cursor-not-allowed`}>{board[idx][index]!=='' && board[idx][index]}</div>
      })
    }))
  }
  console.log(turn)
  return (
    <>
      {waitingForConnection ? 
      <div style={{color:'white'}}>
        <p>Please select a room Number to Enter</p>
        <input value={roomvalue} onChange={(e)=>setRoomValue(e.target.value)} />
        <button type='button' onClick={handleCreateRoom}>Enter Room</button>
        {loading ? <div className="loading"></div> : null}
        {error !== '' && <p style={{color:'red'}}>{error}</p>}
      </div> : 
      <div className="flex-column">
        <p style={{color:'white',textAlign:'center'}}>You are Playing as: {turn}</p>
        <div className='board'>
        {renderBoard()}
        </div>
        {error !== '' && <p style={{color:'red'}}>{error}</p>}
        {winner===turn && <h5 className='game-win'>Congradulations!! You have won the game.</h5>}
        {winner!==null && winner!==turn && winner!=='draw' && <h5 className='game-draw'>The game is a draw😊</h5>}
      </div>
  }
    </>
  )
}

export default TicTacToe
