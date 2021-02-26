import React,{createContext,useCallback,useContext,useEffect,useState} from 'react'

const AppContext=createContext(null);

const API_URL='https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple';

const shufflingArray=(array)=>{
    for(let i=0;i<array.length;i++){
      const randomNumber=Math.floor(Math.random()*array.length);
      let tempCurrent=''
      let current=array[i];
      let random=array[randomNumber];

      tempCurrent=current;
      array[i]=random;
      array[randomNumber]=tempCurrent;
    }
    return array;
}


function AppProvider({children}) {
    let [index, setIndex] = useState(0);
    let [counter, setCounter] = useState(0);
    let [seconds, setSeconds] = useState(30);

    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [endGame, setEndGame] = useState(false);
    
    const [userAnswer, setUserAnswer] = useState(null);
  

    const fetchData=useCallback( async ()=>{
        setLoading(true);
        try{
            const res = await fetch(API_URL);
            const data =await res.json();
            const {results}=data;
            if(results){
            
            const newQuizData=results.map((result,index)=>{
              const {question,correct_answer,incorrect_answers}=result;
              const answers=[correct_answer,...incorrect_answers];
              shufflingArray(answers);
              return{
                question,
                answers,
                correctAnswer:correct_answer,
                    }
                });
          
            setQuizData(newQuizData);
            }
            else{
            setQuizData([]);
            }
        }
        catch(error){
          console.log(error);
          return setError(true);
        }
        setLoading(false);
      },[]);
    
    
      useEffect(() => {
        fetchData();
        console.log('render');
      }, []);


    return (
        <AppContext.Provider value={{
        quizData,loading,error,
        setUserAnswer,userAnswer,
        index, setIndex,
        counter, setCounter,
        endGame, setEndGame,
        seconds, setSeconds
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext=()=>{
    return useContext(AppContext);
}

export {AppContext,AppProvider};
