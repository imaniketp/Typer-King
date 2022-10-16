import React, { createRef, useEffect, useRef, useState, useMemo } from 'react'
import './Textarea.css'
import UpperMenu from '../upperMenu/UpperMenu';
import { useGameMode } from '../context/GameMode';
import CapsLockWarn from '../context/CapsLockWarn';
var randomWords = require('random-words');


function Textarea(props) {

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [countDown, setCountDown] = useState(5);
  const [testStart,  setTestStart] = useState(false);
  const [testOver,  setTestOver] = useState(false);
  const [capsLocked, setCapsLocked] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [wordsArray, setWordsArray] = useState(()=> {
    return randomWords(50);
  });


const words = useMemo(() => {
  return wordsArray;
},[wordsArray]);

const wordSpanRef = useMemo (() => {
  return Array(words.length).fill(0).map(i => createRef());
},[words]);


  const {gameTime} = useGameMode();

  const resetGame = () => {
    setCurrentCharIndex(0);
    setCurrentWordIndex(0);
    setCountDown(gameTime);
    setTestStart(false);
    setTestOver(false);
    clearInterval(intervalId);
    let random = randomWords(50);
    setWordsArray(random);
    focusInput();
  }

  useEffect(() => {
    resetGame();
  },[gameTime]);


  const textInputRef = useRef(null)

  const startTimer = () => {
  const intervalId = setInterval(timer, 1000);
  setIntervalId(intervalId);

    function timer(){
      setCountDown((prevCountDown) => {

        if(prevCountDown === 1){
          clearInterval(intervalId);
          setCountDown(0);
          setTestOver(true);
        }
        else{
            return prevCountDown - 1; 
        }
      });
    }
  }

  const handleKeyDown = (e) => {
      let key = e.key;

      setCapsLocked(e.getModifierState("CapsLock"))

      if(!testStart){
        startTimer();
        setTestStart(true);
      }

      let allSpans = wordSpanRef[currentWordIndex].current.querySelectorAll('span');

      if(e.keyCode === 32){

        const incorrectChar = wordSpanRef[currentWordIndex].current.querySelectorAll('.incorrect');
        if(incorrectChar.length === 0){
          // correctWord +=1;
        }

        if(allSpans.length <= currentCharIndex){
            allSpans[currentCharIndex-1].className = allSpans[currentCharIndex-1].className.replace('right', '');
        }
        else{
          allSpans[currentCharIndex].className = allSpans[currentCharIndex-1].className.replace('current', '');

        }
        
        wordSpanRef[currentWordIndex+1].current.querySelectorAll('span')[0].className = 'char current';

        setCurrentWordIndex(currentWordIndex+1);
        setCurrentCharIndex(0);
        return;
      }

      if(e.keyCode === 8){
        
        if(currentCharIndex !== 0){

          if(currentCharIndex === allSpans.length){
            if(allSpans[currentCharIndex - 1].className.includes("extra")){
              allSpans[currentCharIndex - 1].remove();
              allSpans[currentCharIndex - 2].className += 'right';
            }
            else{
              allSpans[currentCharIndex-1].className = 'char current'
            }
            setCurrentCharIndex(currentCharIndex - 1);
            return;
          }

          wordSpanRef[currentWordIndex].current.querySelectorAll('span')[currentCharIndex].className = 'char';
          wordSpanRef[currentWordIndex].current.querySelectorAll('span')[currentCharIndex-1].className = 'char current';
          setCurrentCharIndex(currentCharIndex - 1);
        }
        return;
      }

      if(e.key.length !== 1){
        return;
      }

      if(currentCharIndex === allSpans.length){
        let newSpan = document.createElement('span');
        newSpan.innerText = e.key;
        newSpan.className = 'char incorrect right extra';
        allSpans[currentCharIndex-1].className = allSpans[currentCharIndex-1].className.replace('right', '');

        
        wordSpanRef[currentWordIndex].current.append(newSpan);
        setCurrentCharIndex(currentCharIndex + 1);
        return;
      }


    let currentCharacter =  wordSpanRef[currentWordIndex].current.querySelectorAll('span')[currentCharIndex].innerText;

    if(key===currentCharacter){
      wordSpanRef[currentWordIndex].current.querySelectorAll('span')[currentCharIndex].className = 'char correct';
    }
    else{
      wordSpanRef[currentWordIndex].current.querySelectorAll('span')[currentCharIndex].className = 'char incorrect';
    }

    if(currentCharIndex+1 === wordSpanRef[currentWordIndex].current.querySelectorAll('span').length){
      wordSpanRef[currentWordIndex].current.querySelectorAll('span')[currentCharIndex].className += ' right';
    }
    else{
      wordSpanRef[currentWordIndex].current.querySelectorAll('span')[currentCharIndex+1].className = 'char current';
    }
    
  
    setCurrentCharIndex(currentCharIndex+1);

  }

  const handleKeyUp = (e) => {

  }



  const focusInput = () => {
    textInputRef.current.focus();
  }

  useEffect(() => {
    focusInput();
  },[])

  useEffect(()=> {

    wordSpanRef.map(i => {
     return Array.from(i.current.childNodes).map(ii => {
         return  ii.className = 'char';
      })
    })

    if(wordSpanRef[0]){
      wordSpanRef[0].current.querySelectorAll('span')[0].className = 'char current';

    }
  },[wordSpanRef])

  
 
  return (
    <div>
        <CapsLockWarn open={capsLocked}/>
        <UpperMenu countDown={countDown} />

        {!testOver ? (<div className='type-box' onClick={focusInput}>
            <div className='words'>

              {words.map((word,index)=>
                <span className='word' ref={wordSpanRef[index]}>

                  {word.split("").map((char,ind)=>(
                  <span className='char'>
                      {char}
                  </span>
                  ))}

                </span>
              )}

            </div>
        </div>) : ( <h1>Game Over</h1>)}
        
    
    <input type='text' className='hidden-input' ref={textInputRef} onKeyDown={(e)=> handleKeyDown(e)} onKeyUp={(e)=> handleKeyUp(e)} />
    </div>
  )
}

export default Textarea