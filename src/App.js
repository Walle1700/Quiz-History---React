import React from 'react';

import Loading from './components/Loading';
import Error from './components/Error';
import EndQuiz from './components/EndQuiz';
import Quiz from './components/Quiz';

import {useGlobalContext} from './context';


function App() {

  const {quizData,loading,error,counter,endGame}=useGlobalContext();


  if(endGame) return <EndQuiz counter={counter} questionLength={quizData.length}/>

  if(loading) return <Loading/>;

  if(error) return <Error/>;
  
  if(!quizData.length) return <Error/>;
  
  if(!endGame) return(<Quiz />)
  
  }

export default App
