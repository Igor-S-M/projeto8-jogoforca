import React from "react"
import palavras from "./palavras"
import forca0 from "./image/forca0.png"
/*
import forca1 from "./image/forca1.png"
import forca2 from "./image/forca2.png"
import forca3 from "./image/forca3.png"
import forca4 from "./image/forca4.png"
import forca5 from "./image/forca5.png"
import forca6 from "./image/forca6.png"
*/

export default function App() {

    //chamada quando apertar o butao de escolher palavra
    function start() {

        setStartButtonSwitch("on")
    
    }

    function checkLetter(i){

    }

    
    //estado do botao iniciar
    const [startButtonSwitch, setStartButtonSwitch] = React.useState("off")
    

    //botoes do alfabeto
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    return (
        <div className="hangman-game">
            <div className="screen">
                <img src={forca0} alt="imagem de forca" />
                <button onClick={start}>Escolher Palavra</button>
                <Word switch={startButtonSwitch}></Word>
            </div>
            <div className="keyboard">
                {alfabeto.map((i,idx) => <button key={idx} onClick={()=>(checkLetter(i))}>{i.toUpperCase()}</button>)}
            </div>
            <div className="guess">
                <p>Já sei a palavra!</p>
                <input></input>
                <button>chutar</button>
            </div>
        </div>
    )
}




let palavraEscondida = ""
let palavraCerta = ""

function Word(porps) {

    
    if (porps.switch === "on") {
        palavraCerta = palavras[Math.floor(Math.random() * palavras.length)]
        for (let i in palavraCerta) {
            palavraEscondida += "_ "
        }


        return (
            <div className="word">
                <p>{palavraEscondida}</p>
                <p>{palavraCerta}</p>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}

