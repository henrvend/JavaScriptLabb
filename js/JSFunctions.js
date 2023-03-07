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
        //Om inte "X" eller "O" har vunnit och i har loopat igenom hela arrayen inte innehåller en tom plats kommer den returnera en 3:a för oavgjort.
        else if (!oGameData.gameField.includes('') && i === kontrolleraVinster.length-1){
            return 3;
        }
    }
    
    // Tidigare IF-sats uteslutet scenariot där ingen vinnare finns. 
    return 0;
}
