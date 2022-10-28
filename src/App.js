import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AlertSnackbar from "./signUp/Alert";
import GlobalStyles from "./style/GlobalStyle";
import { ThemeProvider} from "styled-components";
import { useTheme } from "./context/ThemeContext";


function App() {

  const { theme } = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AlertSnackbar />
        <Routes>
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/user" element={<UserPage />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
