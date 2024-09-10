import { useState , useRef } from "react";
import ResultModals from "./ResultModal.jsx";
// let timer;

export default function TimerChallenge({title , targetTime}){

    const timer = useRef();
    const dialog = useRef();
    // const [ timerStarted , setTimerStarted ] = useState(false);
    // const [ timerExpired , setTimerExpired ] = useState(false);
    const [ timeRemaining , setTimeRemaining] = useState(targetTime*1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <= 0 ){
        clearInterval(timer.current);
        
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart(){
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
            
        } , 10 );
        
    }

    function handleStop(){
        //clearTimeout;
        dialog.current.open();
        clearInterval(timer.current);
    }

    return(
    <>
        <ResultModals ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/>
        <section className="challenge">
            <h2>{title}</h2>
            
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>
                    {timerIsActive ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerIsActive ? 'active' : undefined}>
                {timerIsActive ? 'Time is running ...' : 'Timer inactive'}
            </p>
        </section>
    </>
    );
}