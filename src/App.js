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
    return (
       <div className="hangman-game">
            <Screen/>
            <Keyboard/>
            <Guess/>
       </div>
    )
}



function Screen() {
    return (
        <div className="screen">
            <Image />
            <StartButton />
        </div>
    )
}

function Image() {
    return (

        <img src={forca0} alt="imagem de forca" />

    )
}

function StartButton() {
    return (
        <button className="start-button">Escolher Palavra</button>
    )
}



function Keyboard() {

    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    return (
        <div className="keyboard">
            {alfabeto.map((i) => <button>{i.toUpperCase()}</button>)}
        </div>
    )
}

function Guess() {
    return (
        <div className="guess">
            <p>Já sei a palavra!</p>
            <input></input>
            <button>chutar</button>
        </div>
    )
}