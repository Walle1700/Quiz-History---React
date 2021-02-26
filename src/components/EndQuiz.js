import React from 'react'

function EndQuiz({counter,questionLength}) {
    const msg=counter>7 ?`It's a great result!`:counter>3?`It's not bad but could be better!`:'You definitely should more read about this!';

    return (
        <div className="question-wrapper endGame">
            <h2>
              END! Your result: {counter}/{questionLength}.
            </h2>
              <p>{msg}</p>
        </div>
    )
}

export default EndQuiz
