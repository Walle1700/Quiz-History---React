import React from 'react';
import {useGlobalContext} from '../context';


function Clock() {
    const{seconds}=useGlobalContext();

    return (
        <div className="clock-wrapper">
            <span>00</span>
            <span>:</span>
            <span>{seconds<1?'00':seconds<10?'0'+seconds:seconds}</span>
        </div>
    )
}

export default Clock
