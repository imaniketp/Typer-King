import React from 'react'
import { useEffect } from 'react';
import { auth,db } from '../FirebaseConfig';
import Graph from './Graph'
import {useAuthState} from 'react-firebase-hooks/auth'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useAlert } from '../context/AlertContext';
import { Tooltip } from '@material-ui/core';

function Stats({wpm, accuracy, correctChars, incorrectChars, extraChars, missedChars, graphData, reset}) {

  var timeSet = new Set();
  const {setAlert} = useAlert();

  const newGraph = graphData.filter((i) => {
    if(!timeSet.has(i[0])){
      timeSet.add(i[0]);
      return i;
    }
  })

  const [user] = useAuthState(auth);
  const pushStatsToDb = async() => {
    const resultsRef = db.collection('results');
    const {uid} = auth.currentUser 

    if(!isNaN(accuracy)){
    await resultsRef.add({
      userId: uid,
      wpm: wpm,
      accuracy: accuracy,
      character: `${correctChars}/${incorrectChars}/${extraChars}/${missedChars}`,
      timeStamp: new Date()
    })
  }

  else{
     setAlert({
      open:true,
      type:'error',
      message:'invalid test'
  });
  setTimeout(()=>{
      setAlert({
          open:false,
          type: "",
          message: ""
      })
  },2000);

}
}
  useEffect(() => {
    if(user){
      pushStatsToDb();
    }
  },[]);


  return (
    <div className='stats-box'>
      <div className='left-stats'>
        <div className='stats'>
          <div className='title'>WPM</div>
          <div className='subTitle'>{wpm}</div>
          <div className='title'>Accuracy</div>
          <div className='subTitle'>{accuracy}</div>
          <div className='title'>Characters</div>
          <Tooltip title="Correct / Incorrect / Extra / Missed" placement='bottom-end' arrow>
            <div className='subTitle'>{correctChars}/{incorrectChars}/{extraChars}/{missedChars}</div>
          </Tooltip>
        </div>
        <RestartAltIcon className='reset-btn' onClick={reset} />
      </div>

      <div className='right-stats'>
        <div className='graph'>
          <Graph graphData={newGraph} />
        </div>
      </div>

    </div>
  )
}

export default Stats