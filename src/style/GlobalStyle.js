import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`


*,
*::after,
*::before{
    box-sizing: border-box;
}

body{
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: ${ ({theme}) => theme.background} ;
    color: ${ ({theme}) => theme.title} ;
    padding: 0;
    margin: 0;
    transition:  all 0.25s linear;
    overflow-y: scroll;
}

body::-webkit--scrollbar {
    display: none ;
}

.canvas{
    display: grid;
    align-items: center;
    gap: 0.5rem;
    grid-auto-flow: row;
    grid-template-rows: auto 1fr auto;
    height: 100vh;
    padding: 1rem;
    width: 100vw;
}

.type-box{
    display: block;
    max-width: 80%;
    height: 50%;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    position: relative;
}

.words{
    font-size: 20px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    width: 100%;
    color: ${ ({theme}) => theme.typeBoxText} ;

}
.word{
    margin: 5px 5px;
    padding-right: 2px;
    scroll-margin: 4px;
}

.hidden-input{
    opacity: 0;
}

.char.correct{
    color: ${ ({theme}) => theme.title} ;
}

.char.incorrect{
    color: red
}

.current{
    border-left: 1px solid;
    animation: blinking 2s infinite ;
    animation-timing-function: ease;
    
}
@keyframes blinking {
    0% { border-left-color: ${ ({theme}) => theme.title} ;}
    25% { border-left-color: ${ ({theme}) => theme.background} ;}
    50% { border-left-color: ${ ({theme}) => theme.title} ;}
    75% { border-left-color: ${ ({theme}) => theme.background} ;}
    100% { border-left-color: ${ ({theme}) => theme.title} ;}
}
.right{
    border-right: 1px solid ;
    animation: blinkingRight 2s infinite ease;
    
}
@keyframes blinkingRight {
    0% { border-right-color: ${ ({theme}) => theme.title} ;}
    25% { border-right-color: ${ ({theme}) => theme.background} ;}
    50% { border-right-color: ${ ({theme}) => theme.title} ;}
    75% { border-right-color: ${ ({theme}) => theme.background} ;}
    100% { border-right-color: ${ ({theme}) => theme.title} ;}
}

.header{
    color: ${ ({theme}) => theme.title},
    display: flex;
    width: 80%;
    height: 30%;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    
    justify-content: space-between;
}
a{ 
    color: inherit; 
    text-decoration: none;
}

.upper-menu{
    display: flex;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    padding: 1rem;
    color: ${ ({theme}) => theme.typeBoxText} ;    
}

.time-mode, .word-mode{
    display: flex;
}

.time, .no-of-words{
    font-size: 20px;
    margin-right: 15px;
}

.time:hover, .no-of-words:hover{
    cursor: pointer;
    color: ${ ({theme}) => theme.title} ;
}
.counter{
    font-size: 20px;
}

.stats-box{
    display: flex;
    max-width: 80%;
    height: 60%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
}

.left-stats{
    width: 30%;
    padding: 30px;
}

.title{
    font-size: 20px;
    color: ${ ({theme}) => theme.typeBoxText} ;
    
}

.subTitle{
    font-size: 30px;
    color: ${ ({theme}) => theme.title} ;
}

.right-stats{
    width: 70%;
    
}

.graph{
    height: 80%;
}


.footer{
    display: flex;
    width: 80%;
    height: 20%;
    margin-left: auto;
    margin-right: auto;
    align-self: flex-end;
    align-items: center;   
}
.actual-footer{
    display:flex;
    justify-content: space-between;
    width: 90%;
}

.theme-options{
    background: transparent;
    min-width: 200px;
    align-items: center;
}
.hint{
    kbd{
        background-color: ${ ({theme})=> theme.title };
        color: ${ ({theme})=> theme.background };
        padding: 2.5px 5px;
        border-radius: 3px;
    }
}


.select{
    color: black;
    min-width: 90px;
}
.instruction{
    color: ${ ({theme})=> theme.title };
}

.reset-btn{
    display: block;
    margin: auto;
    transform: scale(1.5);
}
.reset-btn:hover {
    background: ${({theme}) => theme.typeBoxText}
}

.user-profile{
    width:1000px;
    margin:auto;
    display:flex;
    min-height:15rem;
    background:  ${ ({theme})=> theme.typeBoxText };
    border-radius: 30px;
}

.user{
    display:flex;
    width:50%;
    justify-content:center;
    margin-top:30px;
    margin-bottom:30px;
    padding:1rem;
    border-right: 2px solid
}
.result-graph, .table{
    width:1000px;
    margin:auto;
}
.picture{
    position:relative;
    width:50%;
    min-height:5rem;
    min-width:5rem;
}
.info{
    width:50%;
    margin-top:1rem;
    text-align:center;
    padding:1rem;
    font-size:1.5rem;
}
.central-data{
    width:1000px;
    margin: auto;
    margin-top:2rem;
    margin-bottom: 3rem;
}
.total-times{
    width:50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:3rem;
}
.central-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
}
a{ 
    color: inherit; 
    text-decoration: none;
} 
.mode:hover{
    color: ${ ({theme})=> theme.title };
    border-right-color: ${ ({theme})=> theme.typeBoxText };
    cursor: pointer;
}

.blur{
    filter: blur(5px);
}

.outOfFocusWarning{
    position: relative;
    width: 1000px;
    height: 0;
    text-align: center;
    z-index:999;
    margin: auto;
    line-height: 150px;
}

.outOfFocusWarning-remove{
    visibility: hidden;
    position: relative;
    width: 1000px;
    height: 0;
    text-align: center;
    z-index:999;
    margin: auto;
    line-height: 150px;
}





`;

export default GlobalStyles;
