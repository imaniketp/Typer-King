import { createContext, useContext, useState } from "react";

const GameModeContext = createContext();

export const GameModeContextProvider = ({children}) => {
    
    const [gameTime, setGameTime] = useState(5);
    const [gameMode, setGameMode] = useState('time');
    const [gameWords, setGameWords] = useState(10);

    const values = {
        gameTime,
        gameMode,
        gameWords,
        setGameMode,
        setGameWords,
        setGameTime
    }

    return (<GameModeContext.Provider value = {values}>{children}</GameModeContext.Provider>)

}

export const useGameMode = () => useContext(GameModeContext);