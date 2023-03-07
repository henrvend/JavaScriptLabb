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
    console.log(oGameData.gameField);
    oGameData.DiagonalaVinster();
    oGameData.VertikalaVinster();
    oGameData.HorisontalaVinster();
}

oGameData.DiagonalaVinster = function () {

    let DiagonalaVinster = [
        //Diagonala vinster
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < DiagonalaVinster.length; i++) {
        let x, y, z;
        let kontroll = [x, y, z] = DiagonalaVinster[i];
        if (oGameData.gameField[x] === 'X' && oGameData.gameField[y] === 'X' && oGameData.gameField[z] === 'X') {
            console.log("Tjaaa!");
            return 1;
        }
        else if (oGameData.gameField = [x] === 'O' && oGameData.gameField[y] === 'O' && oGameData.gameField[z] === 'O') {
            return 2;
        }

    }

    return 0;

}

oGameData.VertikalaVinster = function () {

    let VertikalaVinster = [
        //Vertikala Vinster
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    for (let i = 0; i < VertikalaVinster.length; i++) {
        let x, y, z;
        let kontroll = [x, y, z] = VertikalaVinster[i];

        if (oGameData.gameField[x] === 'X' && oGameData.gameField[y] === 'X' && oGameData.gameField[z] === 'X') {
            console.log("Tjooo!!");
            return 1;
        }
        else if (oGameData.gameField = [x] === 'O' && oGameData.gameField[y] === 'O' && oGameData.gameField[z] === 'O') {
            return 2;
        }

    }

    return 0;

}

oGameData.HorisontalaVinster = function () {

    let HorisontalaVinster = [
        //Vertikala Vinster
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];

    console.log(oGameData.gameField);
    for (let i = 0; i < HorisontalaVinster.length; i++) {
        console.log(HorisontalaVinster[i][0]);
        console.log(HorisontalaVinster[i][1]);
        console.log(HorisontalaVinster[i][2]);
        if (oGameData.gameField[HorisontalaVinster[i][0]] === 'X' && oGameData.gameField[HorisontalaVinster[i][1]] === 'X' && oGameData.gameField[HorisontalaVinster[i][2]] === 'X') {

            return 1;
        }
        else if (oGameData.gameField[HorisontalaVinster[i][0]] === 'O' && oGameData.gameField[HorisontalaVinster[i][1]] === 'O' && oGameData.gameField[HorisontalaVinster[i][2]] === 'O') {
            return 2;
        }

    }
    console.log("Tjooo!!");
    return 0;

}







