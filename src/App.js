import React from 'react'
import './App.css'
import Header from './header/Header'
import Textarea from './textarea/Textarea'
import Footer from './footer/Footer'
var randomWords = require('random-words');


function App() {

  const words = randomWords(50);

  return (

    
    <div className='canvas'>
        <Header/>
        <Textarea />
        <Footer />

    </div>
    
  )
}

export default App