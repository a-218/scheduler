
import { useState } from "react";
export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false){
    
    if(replace === true) {
      const tempHistory = [...history];
      tempHistory[tempHistory.length - 1] = newMode
      setMode(newMode);
      setHistory(tempHistory);
    } else {
      setMode(newMode);    
      const newHistory = [...history, newMode];
      setHistory(newHistory);
  
    }

   
  }; 

  

  const back = function () {

    const tempHistory = [...history];
  
    if(tempHistory.length > 1){
      tempHistory.pop()
    }
   
    //console.log('temp', tempHistory);
    setHistory(tempHistory);
    setMode(tempHistory[tempHistory.length-1]);

    
  }

  return {mode, transition, back};
}