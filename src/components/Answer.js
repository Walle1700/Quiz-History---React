import React from 'react'

function Answer({answer,index,chooseAnswer}) {

    return (
        <div className="answer" 
        onClick={()=>chooseAnswer(index)}
        dangerouslySetInnerHTML={{__html:answer}}
        />
    )
}

export default Answer
