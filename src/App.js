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
        <div className="container">
            <Upside></Upside>
            <div className="keyboard">
                <Teclas></Teclas>
            </div>
            <Guessing></Guessing>
        </div>
    )
}


function Upside() {
    return (
        <div className="upside">
            <Image />
            <StartButton />
        </div>
    )
}

function Image() {
    return (

        <img className="hangman-image" src={forca0} alt="imagem de forca" />

    )
}

function StartButton() {
    return (
        <button className="start-button">Escolher Palavra</button>
    )
}

function Teclas() {

    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    return (
        alfabeto.map((i) => <button className="letter">{i}</button>)

    )
}

function Guessing() {
    return (
        <div className="guessing">
            <p>Já sei a palavra!</p>
            <input className="guess"></input>
            <button className="guess-button">chutar</button>
        </div>
    )
}