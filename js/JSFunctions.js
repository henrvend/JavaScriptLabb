"use strict";



//Testutskrifter
/*
console.log( oGameData );
oGameData.initGlobalObject();
console.log( oGameData.gameField );
console.log( oGameData.checkForGameOver() );
*/

/*
console.log( oGameData.checkHorizontal() );
console.log( oGameData.checkVertical() );
console.log( oGameData.checkDiagonalLeftToRight() );
console.log( oGameData.checkDiagonalRightToLeft() );
console.log( oGameData.checkForDraw() );
*/



/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */

window.addEventListener('load', function() {
    
    //Anropar metoden. 
    oGameData.initGlobalObject();

    let element = document.getElementById("game-area");
    element.classList.add("d-none");
    
    let element1 = document.getElementById("newGame");
    element1.addEventListener("click", validateForm);

    const newGameLink = document.getElementById("newGame");
    newGameLink.setAttribute("onclick", "validateForm()");
});

oGameData.initGlobalObject = function () {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array('', '', '', '', '', '', '', '', '');

    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
    //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    //oGameData.gameField = Array('X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O');

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //"Flagga" som indikerar om användaren klickat för checkboken.
    oGameData.timerEnabled = false;

    //Timerid om användaren har klickat för checkboxen. 
    oGameData.timerId = null;

}


function validateForm()  {
    let black = '#000000';
    let white = '#ffffff';


    try {
        let textRefs = document.querySelectorAll('input[type=text]');
        let colorRefs = document.querySelectorAll('input[type=color]');

        if(textRefs[0].value.length<5 || textRefs[1].value.length<5){throw{elementRef : textRefs[0]}}

        if(textRefs[0].value == textRefs[1].value){throw {elementRef : textRefs[1]}}
        
        if(colorRefs[0].value == colorRefs[1].value){throw {elementRef : colorRefs[0]}}

        if(colorRefs[0].value == black || colorRefs[1].value == black){throw { elementRef : colorRefs[1]}}

        if(colorRefs[0].value == white || colorRefs[1].value == white){throw { elementRef : colorRefs[0]}}
        
        initiateGame();
    }
        
    catch (error) {
        document.querySelector('#errorMsg').textContent = 'Ej korrekt ifyllt formulär';
    }
    
}

function initiateGame(){
    
    let playerChar, playerName;

    let element = document.querySelector('form');
    element.classList.add("d-none");    //Gömmer elementet
    
    //element.classList.remove("gameArea");
    
    let element1 = document.getElementById("game-area");
    element1.classList.remove("d-none")  //Tar bort klassen från game-area

    document.querySelector('#errorMsg').textContent = "";

    let textRefs = document.querySelectorAll('input[type=text]');
    let colorRefs = document.querySelectorAll('input[type=color]');

    oGameData.nickNamePlayerOne=textRefs[0].value;
    oGameData.nickNamePlayerTwo=textRefs[1].value;
    oGameData.colorPlayerOne=colorRefs[0].value;
    oGameData.colorPlayerTwo=colorRefs[1].value;
    


    let Td = document.querySelectorAll('td');

    for (let i=0; i < Td.length; i++) {

        Td[i].textContent = ""; 
        Td[i].style.backgroundColor = 'white';

    }

    if(Math.random(1)<0.5){
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData. playerOne;
    }
    else{
        playerChar = oGameData. playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData. playerTwo;
    }
    let elementH1 = document.querySelector('.jumbotron h1');
    elementH1.textContent = playerName;

}


/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
oGameData.checkForGameOver = function () {
    
    //Kontrollerar vilka rader som kan resultera i vinster
    //Lägger in raderna i en 2d array
    let kontrolleraVinster = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //Hittat inspiration från geeksforgeeks för att loopa igenom 2d array "https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/"
    //Loopar igenom att Array med möjliga vinster.
    for (let i = 0; i < kontrolleraVinster.length; i++) {
        
        //Kontrollerar så att arrayplatser i 2D array har strängvärdet "X" på platserna 0,1,2 för värdet [i].
        //Kollar både för "X" och "O"
        if (oGameData.gameField[kontrolleraVinster[i][0]] === 'X' && oGameData.gameField[kontrolleraVinster[i][1]] === 'X' && oGameData.gameField[kontrolleraVinster[i][2]] === 'X') {
            return 1;
        }
        //Gör samma sak som if-satsen ovan med skillnaden att man försöker matcha med stringvärdet "O" istället.
        else if (oGameData.gameField[kontrolleraVinster[i][0]] === 'O' && oGameData.gameField[kontrolleraVinster[i][1]] === 'O' && oGameData.gameField[kontrolleraVinster[i][2]] === 'O') {
            return 2;
        }
        //Om inte "X" eller "O" har vunnit och i har loopat igenom hela arrayen och inte innehåller en tom plats kommer den returnera en 3:a för oavgjort.
        else if (!oGameData.gameField.includes('') && i === kontrolleraVinster.length-1){
            return 3;
        }
    }


    
    // Tidigare IF-sats uteslutet scenariot där ingen vinnare finns och det fortfarande finns plats att spela på. 
    return 0;
}
