import React from 'react'
import { useGameMode } from '../context/GameMode';
import './UpperMenu.css'

function UpperMenu({countDown}) {

  const {setGameTime} = useGameMode();


const updateTime = (e) => {

  setGameTime(e.target.id)
}

  return (
    <div className='upper-menu'>

        <div className='counter'> {countDown} s</div>
        <div className='time-mode'>
            <div className='time' id={15} onClick={(e)=> updateTime(e) }>15s</div>
            <div className='time' id={30} onClick={(e)=> updateTime(e) }>30s</div>
            <div className='time' id={60} onClick={(e)=> updateTime(e) }>60s</div>
        </div>

    </div>
  )
}

export default UpperMenu