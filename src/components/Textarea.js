import React, { createRef, useEffect, useRef, useState, useMemo } from "react";
import UpperMenu from "./UpperMenu";
import { useGameMode } from "../context/GameMode";
import CapsLockWarn from "../context/CapsLockWarn";
import Stats from "../stats/Stats";
import { Dialog, DialogTitle } from "@mui/material";
var randomWords = require("random-words");

function Textarea(props) {

  const { gameTime, gameWords, gameMode } = useGameMode();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [countDown, setCountDown] = useState(5);
  const [testStart, setTestStart] = useState(false);
  const [testOver, setTestOver] = useState(false);
  const [capsLocked, setCapsLocked] = useState(false);
  const [correctChar, setCorrectChar] = useState(0);
  const [incorrectChar, setIncorrectChar] = useState(0);
  const [missedChar, setMissedChar] = useState(0);
  const [extraChar, setExtraChar] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const wordWrapperRef = useRef();
  const outOfFocusWarningRef = useRef();
  const [openDialog, setOpenDialog] = useState(false);
  const [wordsArray, setWordsArray] = useState(() => {
    
    if(gameMode==='words'){
      return randomWords(gameWords);
  }
    return randomWords(200);
  });

  const [intervalId,setIntervalId] = useState(null);

  const words = useMemo(() => {
    return wordsArray;
  }, [wordsArray]);

  const wordSpanRef = useMemo(() => {
    return Array(words.length)
      .fill(0)
      .map((i) => createRef());
  }, [words]);

  const handleDialogEvents = (e) => {
    if (e.keyCode === 13 || e.keyCode === 9) {
      e.preventDefault();
      setOpenDialog(false);
      resetGame();
      return;
    }

    if (e.keyCode === 32) {
      e.preventDefault();
      setOpenDialog(false);
      redoGame();
      return;
    }
    e.preventDefault();
    setOpenDialog(false);
    focusInput();
    startTimer();
  };

  const redoGame = () => {
    setCurrentCharIndex(0);
    setCurrentWordIndex(0);
    setCountDown(gameTime);
    setTestStart(false);
    setTestOver(false);
    clearInterval(intervalId);
    resetWordSpanRef();
    setCorrectChar(0);
    setIncorrectChar(0);
    setCorrectWords(0);
    setExtraChar(0);
    setMissedChar(0);
    setGraphData([]);
    wordSpanRef[0].current.scrollIntoView();
    focusInput();
  };


  const resetGame = () => {
    setCurrentCharIndex(0);
    setCurrentWordIndex(0);
    setCountDown(gameTime);
    setTestStart(false);
    setTestOver(false);
    clearInterval(intervalId);
    if(gameMode==='words'){
      let random = randomWords(Number(gameWords));
      setWordsArray(random);
      setCountDown(180);
  }
  else{
      let random = randomWords(200);
      setWordsArray(random);
  }
    setCorrectChar(0);
    setIncorrectChar(0);
    setCorrectWords(0);
    setExtraChar(0);
    setMissedChar(0);
    setGraphData([]);
    wordSpanRef[0].current.scrollIntoView();
  };

  const resetHelper = async ()=>{
    await resetGame();
      focusInput(1, true);
    
  }

  useEffect(() => {
    resetHelper();
  }, [gameTime,gameMode,gameWords]);

  const textInputRef = useRef(null);

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);

    function timer() {
      setCountDown((prevCountDown) => {
        setCorrectChar((correctChar) => {
          setGraphData((data) => {
             
            const startTime = (gameMode==='words')?180:gameTime
            return [...data,[startTime-prevCountDown,Math.round((correctChar/5)/((startTime-prevCountDown+1)/60))]];
        })
          return correctChar;
        });

        if (prevCountDown === 1) {
          clearInterval(intervalId);
          setCountDown(0);
          setTestOver(true);
        } else {
          return prevCountDown - 1;
        }
      });
    }
  };

  const calculateWPM = () => {
    return Math.round((correctChar/5)/((graphData[graphData.length-1][0]+1)/60));
  };

  const calculateAccuracy = () => {
    return Math.round((correctWords / currentWordIndex) * 100);
  };

  const handleKeyDown = (e) => {

    if (e.keyCode === 9) {

      if(testStart){
        clearInterval(intervalId);
      }
      e.preventDefault();
      setOpenDialog(true);
      return;
    }

    setCapsLocked(e.getModifierState("CapsLock"));

    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    let allSpans =
      wordSpanRef[currentWordIndex].current.querySelectorAll("span");

    if (e.keyCode === 32) {

      if(currentWordIndex===wordsArray.length-1){
        clearInterval(intervalId);
        setTestOver(true);  
        return;   
      }

      const correctChar =
        wordSpanRef[currentWordIndex].current.querySelectorAll(".correct");
      const incorrectChar =
        wordSpanRef[currentWordIndex].current.querySelectorAll(".incorrect");
      setMissedChar(
        missedChar +
          (allSpans.length - incorrectChar.length - correctChar.length)
      );
      if (correctChar.length === allSpans.length) {
        setCorrectWords(correctWords + 1);
      }

      if (allSpans.length <= currentCharIndex) {
        allSpans[currentCharIndex - 1].className = allSpans[
          currentCharIndex - 1
        ].className.replace("right", "");
      } else {
        allSpans[currentCharIndex].className = allSpans[
          currentCharIndex - 1
        ].className.replace("current", "");
      }

      wordSpanRef[currentWordIndex + 1].current.querySelectorAll(
        "span"
      )[0].className = "char current";

      if(currentWordIndex !== 0 && wordSpanRef[currentWordIndex+1].current.offsetLeft < wordSpanRef[currentWordIndex+1].current.offsetLeft ){
        wordSpanRef[currentWordIndex].current.scrollIntoView();
      }

      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentCharIndex(0);
      return;
    }

    if (e.keyCode === 8) {
      if (currentCharIndex !== 0) {
        if (currentCharIndex === allSpans.length) {
          if (allSpans[currentCharIndex - 1].className.includes("extra")) {
            allSpans[currentCharIndex - 1].remove();
            allSpans[currentCharIndex - 2].className += " right";
          } else {
            allSpans[currentCharIndex - 1].className = "char current";
          }
          setCurrentCharIndex(currentCharIndex - 1);
          return;
        }

        wordSpanRef[currentWordIndex].current.querySelectorAll("span")[
          currentCharIndex
        ].className = "char";
        wordSpanRef[currentWordIndex].current.querySelectorAll("span")[
          currentCharIndex - 1
        ].className = "char current";
        setCurrentCharIndex(currentCharIndex - 1);
      }
      return;
    }

    if (e.key.length !== 1) {
      return;
    }

    if (currentCharIndex === allSpans.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "char incorrect right extra";
      setExtraChar(extraChar + 1);
      allSpans[currentCharIndex - 1].className = allSpans[
        currentCharIndex - 1
      ].className.replace("right", "");

      wordSpanRef[currentWordIndex].current.append(newSpan);
      setCurrentCharIndex(currentCharIndex + 1);
      return;
    }

    let key = e.key;

    let currentCharacter =
      wordSpanRef[currentWordIndex].current.querySelectorAll("span")[
        currentCharIndex
      ].innerText;

    if (key === currentCharacter) {
      setCorrectChar(correctChar + 1);
      wordSpanRef[currentWordIndex].current.querySelectorAll("span")[
        currentCharIndex
      ].className = "char correct";
    } else {
      setIncorrectChar(incorrectChar + 1);
      wordSpanRef[currentWordIndex].current.querySelectorAll("span")[
        currentCharIndex
      ].className = "char incorrect";
    }

    if (
      currentCharIndex + 1 ===
      wordSpanRef[currentWordIndex].current.querySelectorAll("span").length
    ) {
      wordSpanRef[currentWordIndex].current.querySelectorAll("span")[
        currentCharIndex
      ].className += " right";
    } else {
      wordSpanRef[currentWordIndex].current.querySelectorAll("span")[
        currentCharIndex + 1
      ].className = "char current";
    }

    setCurrentCharIndex(currentCharIndex + 1);
  };

  const handleKeyUp = (e) => {};

  const handelInputBlur = ()=>{
    wordWrapperRef.current.className += ' blur';
    outOfFocusWarningRef.current.className = 'outOfFocusWarning';
    if(testStart){
    clearInterval(intervalId);
    }
  }

  

  const focusInput = (e, newGame = false) => {
    wordWrapperRef.current.className = wordWrapperRef.current.className.replace('blur','');
    outOfFocusWarningRef.current.className = 'outOfFocusWarning-remove';
    textInputRef.current.focus();
    if(newGame){
      return;
    }
    if(testStart){
      startTimer();
    }
  };

  const resetWordSpanRef = () =>{
    wordSpanRef.map(i=>{
      
        Array.from(i.current.childNodes).map(ii=>{
            ii.className = 'char';
        })
    })

    if(wordSpanRef[0]){
        wordSpanRef[0].current.querySelectorAll('span')[0].className = 'char current';
    }
}

  useEffect(() => {
    focusInput();
    return ()=>{
      clearInterval(intervalId);
  }
  }, []);

  useEffect(() => {
    resetWordSpanRef();
  }, [wordSpanRef]);

  return (
    <div>
      <CapsLockWarn open={capsLocked} />
      <UpperMenu countDown={countDown} />

      {!testOver ? (
        <div className="type-box" onClick={focusInput}>
          <div className="outOfFocusWarning" ref={outOfFocusWarningRef} > Click here to Focus </div>
          <div className="words" ref={wordWrapperRef}>
            {words.map((word, index) => (
              <span className="word" key={index} ref={wordSpanRef[index]}>
                {word.split("").map((char, ind) => (
                  <span className="char" key={ind}>{char}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <Stats
          wpm={calculateWPM()}
          accuracy={calculateAccuracy()}
          correctChars={correctChar}
          incorrectChars={incorrectChar}
          extraChars={extraChar}
          missedChars={missedChar}
          graphData={graphData}
          reset={resetGame}
        />)
      }

      <input
        type="text"
        className="hidden-input"
        ref={textInputRef}
        onBlur={handelInputBlur}
        onKeyDown={(e) => handleKeyDown(e)}
        onKeyUp={(e) => handleKeyUp(e)}
      />

      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        style={{
          backdropFilter: "blur(2px)",
        }}
        open={openDialog}
        onKeyDown={handleDialogEvents}
      >
        <DialogTitle>
          <div className="instruction">press Space to redo</div>
          <div className="instruction">press Tab/Enter to restart</div>
          <div className="instruction">press any other key to exit</div>
        </DialogTitle>
      </Dialog>
    </div>
  );
}

export default Textarea;
