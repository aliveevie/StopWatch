import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { faPauseCircle } from '@fortawesome/free-regular-svg-icons';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [value, setValue] = useState(5)
  const [session, setSession] = useState(25)
  
  const [time, setTime] = useState({minutes: 25, seconds: 0})
  const [running, setRunning] = useState(false);
  

  useEffect(() => {
    let intervalId;
    if(running && time.minutes === 0 && time.seconds === 0){
        setTime({minutes: value, seconds: 0})
    }

    if(running){
      intervalId = setInterval(() => {
        setTime((time) => {
          const seconds = time.seconds - 1;
          if(seconds < 0){
            return {minutes: time.minutes - 1, seconds: 59}
          }else {
            return {...time, seconds}
          }
        })
      }, 1000)
    }
    return () => clearInterval(intervalId)

  }, [running, time, value])

  const handleButtonClick = () => {
    setRunning(!running)
  }

  function handleIncrease(){
   
    if(value === 60){
      setValue(60)
      
    }else if(value < 1){
      setValue(1)
    }else{
      setValue(value + 1)
    }
  }

  function handleDecrease(){
    
    if(value === 1){
      setValue(1)
      
    }else if(value > 60){
      setValue(value - 1)
    }else{
      setValue(value - 1)
    }
  }


  function handleIncreaseSes(){
   
    if(session === 60){
      setSession(60)
      
    }else if(session < 1){
      setSession(1)
    }else{
      setSession(session + 1)
      setTime({minutes: session + 1, seconds: 0})
    }
}


  function handleDecreaseSe(){
    if(session === 1){
      setSession(1)
    }else if(session > 59){
      setSession(session - 1)
    }else {
      setSession(session - 1)
      setTime({minutes: session - 1, seconds: 0})
    }
  }


  function handleReset(){
    setValue(5)
    setSession(25)
    setTime({minutes: 25, seconds: 0})
    setRunning(false)
  }

  const formatTime = () => {
    const minutes = time.minutes.toString().padStart(2, '0');
    const seconds = time.seconds < 10 ? `0${time.seconds}` : time.seconds.toString()
    return `${minutes}:${seconds}`
  };

  let styles = {
    color: "white"
  }
  if(time.minutes < 1){
    styles = {
      color: "red"
    }
  }

  const audio = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav")
  if (time.minutes < 1) {
    audio.play();
  }

  return (
    <div id="container" >
      <div className='main-title' >25 + 5 Clock</div>
        <div className='length-control' >
        <div id="break-level" className='btn-level2'>Break length</div>
       
      <button onClick={handleIncrease}  className='btn-level' >
        <FontAwesomeIcon icon={faArrowAltCircleUp} 
          size="2x"
        />
      </button>
      <div className='btn-level' id="break-length" >{value}</div>
      <button onClick={handleDecrease} className='btn-level'>
        <FontAwesomeIcon icon={faArrowAltCircleDown} 
          size="2x"
        />
      </button>
      </div>
      <div className='length-control'>
      <div id="session-label">Session Length</div>
      <button onClick={handleIncreaseSes} className='btn-level' >
        <FontAwesomeIcon icon={faArrowAltCircleUp} 
          size="2x"
        />
      </button>
      <div className='btn-level' id='session-length' >{session}</div>
      <button onClick={handleDecreaseSe} >
        <FontAwesomeIcon icon={faArrowAltCircleDown} 
          size="2x"
        />
      </button>
      
      </div>
      <div className='timer' style={styles}>
       <div className='time-wrapper'>
            <div id="timer-label" ><span>Session</span></div>
            <div id="time-left" >{formatTime(time)}</div>
       </div>
      </div>
      <div className='timer-control' >
          <button onClick={handleButtonClick} >
            <FontAwesomeIcon icon={faCirclePlay} size="2x" />
            <FontAwesomeIcon icon={faPauseCircle} size="2x" />
          </button>
          <button onClick={handleReset} >
            <FontAwesomeIcon icon={faRecycle}  />
          </button>
      </div>
     <div className='author' >Design and Coded By <br />
      <a href="https://ibadulkarim.co/" >Ibrahim Abdulkarim</a>
     </div>
    </div>
  
  );
}

export default App;
