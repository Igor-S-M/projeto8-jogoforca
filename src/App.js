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


    function start() {

        console.log("start acionado")

        /*
        habilitar input e guessing
        */

        createWord()

    }

    //estado da palavra a ser adivinhada
    const [rightAnswer, setRightAnswer] = React.useState("")
    //estado da palavra a ser adivinhada sendo visualizada pelo usuario
    const [showWord, setShowWord] = React.useState("")

    //função para colocar as palavras
    function createWord() {

        console.log("createWord acionado")

        let answer = palavras[Math.floor(Math.random() * palavras.length)]
        setRightAnswer(answer)

        let shoo = ""
        for (let i = 0; i < answer.length; i++) {
            shoo += "_ "
        }

        setShowWord(shoo)
    }



    //estado dos botoes de letras
    const [letterButtonPressed, setLetterButtonPressed] = React.useState([])

    // função chamada ao clicar em um letra
    function clickLetter(letter) {

        console.log(`clickLetter(${letter}) acionado`)

        setLetterButtonPressed([...letterButtonPressed, letter])

        //conferir se acertou a letra
        checkLetter(letter)
    }


    function checkLetter(letter) {
        console.log(`checkLetter(${letter}) acionado`)

        if (rightAnswer.includes(letter)) {
            console.log("acertou a letra")
            changeShowWord(letter)

        } else {
            console.log("errou a letra")
            setWrongScore(wrongScore + 1)
            changeImage()
        }

    }

    //estado dos erros
    const [wrongScore, setWrongScore] = React.useState(0)

    //estado das imagens de forca
    const [hangmanImage, setHangmanImage] = React.useState(forca0)

    function changeImage() {

        const forcaImage = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]
        setHangmanImage(forcaImage[wrongScore + 1])
        console.log(`estamos na imagem ${wrongScore + 1}`)
        console.log("change iamge - esse é o numero de erros", wrongScore + 1)
    }


    function findRightIndexes(letter) {
        //achando os indices da resposta certa que tem a letra
        let indexes = []
        let idx = rightAnswer.indexOf(letter)
        while (idx !== -1) {
            indexes.push(idx)
            idx = rightAnswer.indexOf(letter, idx + 1)
        }
        
        return indexes

    }

    function changeShowWord(letter) {
        console.log(`changeShowWord(${letter}) foi acionada`)

        let rightIndexes = findRightIndexes(letter)
        console.log("os indices certos sao:" , rightIndexes)

        let shoo = ""
        for (let i = 0; i < showWord.length; i++) {

            //achar elementos que podem ser alterados
            if (showWord[i] === " ") {
                //conferir se os termos anterioes e posterioes sao _
                shoo += " "
                
            }

            else if (showWord[i] === "_") {
                //os que vao ser alterados
                //ver os indices deles e comparar com indexes

                if (rightIndexes.includes(i / 2)) {
                    shoo += `${letter}`
                    
                } else {
                    shoo += "_"
                }

            } else {
                shoo += `${showWord[i]}`
            }

        }


        setShowWord(shoo)

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
                        <p>{showWord}</p>
                        <p>{rightAnswer}</p>
                    </div>


                </div>
            </div>
            <div className="keyboard">
                {alfabeto.map((i, idx) => <button className={`${letterButtonPressed.includes(i) ? "clicado" : ""}`} key={idx} onClick={() => (clickLetter(i))}>{i.toUpperCase()}</button>)}
            </div>
            <div className="guess">
                <p>Já sei a palavra!</p>
                <input></input>
                <button>chutar</button>
            </div>
        </div>
    )
}





