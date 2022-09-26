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

    //estado do input
    const [textInput, setTextInput] = React.useState("")

    //estado dos erros
    const [wrongScore, setWrongScore] = React.useState(0)

    //estado das imagens de forca
    const [hangmanImage, setHangmanImage] = React.useState(forca0)

    // estado para saber se o jogo acabou ou nao
    const [endGame, setEndGame] = React.useState(true)

    //estao para saber se o user ganhou ou perdeu
    const [ganhou, setGanhou] = React.useState(true)

    function start() {

        setLetterButtonPressed([])
        setWrongScore(0)
        setHangmanImage(forca0)
        setEndGame(false)
        setTextInput("")

        /*
        habilitar input e guessing
        */

        createWord()
    }


    function createWord() {

        let answer = palavras[Math.floor(Math.random() * palavras.length)]
        setRightAnswer(answer)

        let shoo = []
        for (let i in answer) {
            shoo.push("_")
        }

        setShowWord(shoo)
        
        //teste
        console.log(answer)
    }

    function clickLetter(letter) {

        if (rightAnswer !== "") {
            setLetterButtonPressed([...letterButtonPressed, letter])
            checkLetter(letter)
        }
    }

    function changeElements(palavra) {

        let changedWord = ""

        for (let letra of palavra) {
            if (letra === "a" || letra === "á" || letra === "à" || letra === "â" || letra === "ã") {
                changedWord += "a"
            } else if (letra === "e" || letra === "é" || letra === "ê") {
                changedWord += "e"
            } else if (letra === "i" || letra === "í") {
                changedWord += "i"
            } else if (letra === "o" || letra === "ó" || letra === "ô" || letra === "õ") {
                changedWord += "o"
            } else if (letra === "u" || letra === "ú") {
                changedWord += "u"
            } else if (letra === "c" || letra === "ç") {
                changedWord += "c"
            } else {
                changedWord += letra
            }
        }
        return changedWord
    }

    function checkLetter(letter) {
        let rightAnswerTest = changeElements(rightAnswer)

        if (rightAnswerTest.includes(letter)) {
            changeShowWord(letter)

        } else {
            setWrongScore(wrongScore + 1)
            changeImage()
        }

    }

    function changeImage() {

        const forcaImage = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]
        setHangmanImage(forcaImage[wrongScore + 1])

        if (wrongScore + 1 > 5) {
            lose()
        }
    }

    function findIndexes(element, array) {
        //achando os indices da resposta certa que tem a letra
        let indexes = []
        let idx = array.indexOf(element)
        while (idx !== -1) {
            indexes.push(idx)
            idx = array.indexOf(element, idx + 1)
        }
        return indexes
    }

    function changeShowWord(letter) {

        let rightAnswerTest = changeElements(rightAnswer)
        let rightIndexes = findIndexes(letter, rightAnswerTest)
        let showIndexes = findIndexes("_", showWord)

        let teste = showWord

        for (let idx in showIndexes) {
            if (rightIndexes.includes(showIndexes[idx])) {
                teste[showIndexes[idx]] = rightAnswer[showIndexes[idx]]
            }
        }

        setShowWord(teste)

        if (showWord.join("") === rightAnswer) {
            win()
        }
    }

    function changeInput(event) {
        setTextInput(event.target.value)
    }

    function checkAnswer() {
        let rightAnswerTest = changeElements(rightAnswer)

        textInput === rightAnswerTest ? win() : lose()
    }

    function win() {
        setShowWord(rightAnswer)
        setLetterButtonPressed(alfabeto)
        setEndGame(true)
        setGanhou(true)
    }

    function lose() {
        setShowWord(rightAnswer)
        setLetterButtonPressed(alfabeto)
        setEndGame(true)
        setGanhou(false)
        setHangmanImage(forca6)

    }

    //botoes do alfabeto
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    return (
        <div className="hangman-game">
            <div className="screen">
                <img src={hangmanImage} alt="imagem de forca" />
                <button onClick={start}>Escolher Palavra</button>
                <div>
                    <div className={`word ${endGame ? (ganhou ? "verde" : "vermelho") : ""}`}>
                        <p>{!endGame ? showWord.join(" ") : rightAnswer}</p>
                    </div>
                </div>
            </div>
            <div className="keyboard">
                {alfabeto.map((i, idx) => <button className={`${letterButtonPressed.includes(i) ? "clicado" : "naoClicado"}`} key={idx} onClick={() => !letterButtonPressed.includes(i) ? (clickLetter(i)) : null}>{i.toUpperCase()}</button>)}
            </div>
            <div className="guess">
                <p>Já sei a palavra!</p>
                <input
                    onChange={changeInput}
                    value = {textInput}
                    disabled = {endGame?true:false}
                    placeholder="chuta ai!"
                />
                <button onClick={endGame? null :checkAnswer}>chutar</button>
            </div>
        </div>
    )
}





