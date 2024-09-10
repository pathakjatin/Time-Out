import React from "react";
import { createPortal } from 'react-dom';
import {forwardRef , useImperativeHandle , useRef} from "react";


const ResultModals = forwardRef(function ResultModal({ targetTime , remainingTime , onReset } , ref){

    const userLost = remainingTime <= 0;
    const formattedRemainigTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime*1000)) * 100);

    const dialog = useRef();

    useImperativeHandle( ref , ()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        };
    } );

    return createPortal(
        <dialog className="result-modal" ref={dialog}>
            {userLost && <h2>You Lost!</h2>}
            {!userLost && <h2>Your Score : {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainigTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
})

export default ResultModals;