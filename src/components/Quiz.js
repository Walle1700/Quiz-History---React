import React,{useCallback,useEffect,useRef} from 'react';

import Answer from './Answer';
import Clock from './Clock';

import {useGlobalContext} from '../context';


function Quiz() {
    const {
      setUserAnswer,
      userAnswer,
      setIndex,
      quizData,
      index,
      counter, 
      setCounter,
      setEndGame,
      setSeconds,
    }=useGlobalContext();

    const {question,
        answers,
        correctAnswer,
      }=quizData[index];

    const answersContainer=useRef(null);

  
     const chooseAnswer=useCallback((index)=>{
          
            answersContainer.current.childNodes.forEach((item,i)=>{
              if(i===index) {
                setUserAnswer(i);
                item.classList.add("answer-choosen");
              }
              else item.classList.remove("answer-choosen");
            }
            )
    },[]); 


    const nextQuestion=()=>{
          if(userAnswer===null) return;
          
          const correctAnswerId=answers.indexOf(correctAnswer);
          
          answersContainer.current.childNodes.forEach((item,i)=>{
            item.classList.remove("answer-choosen");
            if (i===userAnswer && userAnswer!==correctAnswerId ) {
              item.classList.add("answer-wrong");
            }
            if(i===correctAnswerId) {
              item.classList.add("answer-right");
            }
            if(userAnswer===correctAnswerId&&i===correctAnswerId) {
              setCounter(prev=>++prev);
            }
          }
        )
          
          setTimeout(() => {
              if(index===quizData.length-1) {
                
                return setEndGame(true)
              };
              setIndex(prev=>++prev);
              
              answersContainer.current.childNodes.forEach((item)=>{
                item.className='answer';
                setUserAnswer(null);
              }
              )
            }, 1200);
    }

    useEffect(() => {
      let interval;
        
      interval=setInterval(() => {
        setSeconds(prev=>{
          if(prev===0) {
          if(index===quizData.length-1) {
            return setEndGame(true)
          }
           setIndex(prev=>++prev);
        };
          return --prev
        })
      }, 1000);
      return ()=>{
        clearInterval(interval);
        setSeconds(30);
      }
      
    }, [index])
  

    return (
        <div className="question-wrapper">
          <Clock/>
        <div className="question-container">
           <h2 className="question">Question:  ({index+1}/{quizData.length}) </h2>
           <h3 
           className="question-title" 
           dangerouslySetInnerHTML={{__html:question}}
           />
           <div className="btn-container">
           <button className="btn" onClick={()=>nextQuestion()}>Next</button>
        </div>
      </div>
           <div className="answer-container" ref={answersContainer}>
             {answers.map((answer,index)=><Answer key={index} answer={answer} index={index} chooseAnswer={chooseAnswer} />)}
           </div>
        </div>
    )
}

export default Quiz
