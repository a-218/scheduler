import { useState } from "react";
export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false){
    
    if(replace === true) {
       const tempHistory = [...history];
      // tempHistory[tempHistory.length - 1] = newMode
      tempHistory.pop();
      
      setHistory(prev => ([...tempHistory, newMode]));
      setMode(newMode);
    } else {
      setHistory(prev => ([...prev, newMode]));
      setMode(newMode);
    }
  }; 

  const back = function () {

    if (history.length > 1) {
      history.pop();
      setMode(history[history.length-1]);
    }
  }
  return {mode, transition, back};
}