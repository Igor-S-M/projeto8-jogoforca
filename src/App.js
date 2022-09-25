import React from "react"
import palavras from "./palavras"
import forca0 from "./image/forca0.png"
import forca1 from "./image/forca1.png"
import forca2 from "./image/forca2.png"
import forca3 from "./image/forca3.png"
import forca4 from "./image/forca4.png"
import forca5 from "./image/forca5.png"
import forca6 from "./image/forca6.png"



export default function App() {

    //estado da palavra a ser adivinhada
    const [rightAnswer, setRightAnswer] = React.useState("")

    //estado da palavra a ser adivinhada sendo visualizada pelo usuario
    const [showWord, setShowWord] = React.useState([])

    //estado dos botoes de letras
    const [letterButtonPressed, setLetterButtonPressed] = React.useState([])

    //estado dos erros
    const [wrongScore, setWrongScore] = React.useState(0)

    //estado das imagens de forca
    const [hangmanImage, setHangmanImage] = React.useState(forca0)


    function start() {

        console.log("start acionado")

        setLetterButtonPressed([])
        setWrongScore(0)
        setHangmanImage(forca0)
        /*
        habilitar input e guessing
        */
        createWord()
        setFimDeJogo(false)

    }

    //função para colocar as palavras
    function createWord() {

        console.log("createWord acionado")

        let answer = palavras[Math.floor(Math.random() * palavras.length)]
        setRightAnswer(answer)


        let shoo = []
        for (let i in answer) {
            shoo.push("_")
        }

        setShowWord(shoo)
        console.log(answer)
    }

    // função chamada ao clicar em um letra
    function clickLetter(letter) {

        if (rightAnswer !== "") {
            setLetterButtonPressed([...letterButtonPressed, letter])

            //conferir se acertou a letra
            checkLetter(letter)
        }
    }

    function checkLetter(letter) {
        console.log(`checkLetter(${letter}) acionado`)

        if (rightAnswer.includes(letter)) {
            changeShowWord(letter)

        } else {
            setWrongScore(wrongScore + 1)
            changeImage()
        }

    }


    function changeImage() {
        console.log("changeImage acionado")

        const forcaImage = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]
        setHangmanImage(forcaImage[wrongScore + 1])
        console.log("perdeu", wrongScore + 1)

        lose()
    }


    function findIndexes(elemento, array) {
        //achando os indices da resposta certa que tem a letra
        let indexes = []
        let idx = array.indexOf(elemento)
        while (idx !== -1) {
            indexes.push(idx)
            idx = array.indexOf(elemento, idx + 1)
        }

        return indexes

    }

    function changeShowWord(letter) {
        console.log(`changeShowWord(${letter}) foi acionada`)

        let rightIndexes = findIndexes(letter, rightAnswer)
        let showIndexes = findIndexes("_", showWord)

        let teste = showWord

        for (let idx in showIndexes) {
            if (rightIndexes.includes(showIndexes[idx])) {
                teste[showIndexes[idx]] = rightAnswer[showIndexes[idx]]
            }
        }

        setShowWord(teste)
        win()

    }

    const [fimDeJogo, setFimDeJogo] = React.useState(false)

    function win() {
        if (showWord.join("") === rightAnswer) {
            alert("ganhou")
            setShowWord(rightAnswer)
            setLetterButtonPressed(alfabeto)
            setFimDeJogo(true)
        }
    }

    function lose() {
        if (wrongScore + 1 > 5) {
            alert("perdeu")
            setShowWord(rightAnswer)
            setLetterButtonPressed(alfabeto)
            setFimDeJogo(true)
        }
    }


    //botoes do alfabeto
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]


    return (
        <div className="hangman-game">
            <div className="screen">
                <img src={hangmanImage} alt="imagem de forca" />
                <button onClick={start}>Escolher Palavra</button>
                <div>
                    <div className="word">
                        <p>{!fimDeJogo? showWord.join(" "):rightAnswer}</p>
                    </div>
                </div>
            </div>
            <div className="keyboard">
                {alfabeto.map((i, idx) => <button className={`${letterButtonPressed.includes(i) ? "clicado" : ""}`} key={idx} onClick={() => !letterButtonPressed.includes(i) ? (clickLetter(i)) : ""}>{i.toUpperCase()}</button>)}
            </div>
            <div className="guess">
                <p>Já sei a palavra!</p>
                <input></input>
                <button>chutar</button>
            </div>
        </div>
    )
}





