import { createContext, useContext, useState } from "react";

const GameModeContext = createContext();

export const GameModeContextProvider = (children) => {
    
    const[gameTime, setGameTime] = useState(15);

    const values = {
        gameTime,
        setGameTime
    }

    return (<GameModeContextProvider value = {values}>{children}</GameModeContextProvider>)

}

export const useGameMode = () => useContext(GameModeContext);