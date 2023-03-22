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
    //Hämtar element från ID i index.html och adderar klassen "d-none", klassen har lagts in i css för att applicera display:none.
    let gameArea = document.getElementById("game-area");
    gameArea.classList.add("d-none");
    //Hämtar element från ID i index.html och adderar en lysnare som vid klick kallar på metoden validateForm. 
    let newGame = document.getElementById("newGame");
    newGame.addEventListener("click", validateForm);

    
});


function executeMove(event) {

    //Tilldelar variabler
    let jumbotronH1 = document.querySelector('.jumbotron h1');
    let table = document.querySelector("table");
    let et = event.target;
    let form = document.querySelector("form");
    let gameArea = document.querySelector("#game-area")
    
    //Kontrollerar ifall elemetetet är en TD.
    if(et.tagName === "TD"){
        //Skriver över TD med värdet för data-ID för att möjliggöra väl av TD i senare skede.
        et = et.getAttribute("data-id");
        
        //Om fältet i gamefield är tom går den in i if-satsen
        if(oGameData.gameField[et]===""){
            
            //Om nuvarande spelare är "X" går den in och sätter alla värden efter det.
            if(oGameData.currentPlayer==oGameData.playerOne) {
                jumbotronH1.textContent = "Aktuell spelare är "+ oGameData.nickNamePlayerTwo + "("+oGameData.playerTwo +")" ;;
                event.target.style.backgroundColor = oGameData.colorPlayerOne;
                event.target.textContent = oGameData.playerOne;
                oGameData.gameField[et] = "X";
                oGameData.currentPlayer=oGameData.playerTwo;
            }
            //Annars sätter den värdet efter "O"
            else {
                jumbotronH1.textContent = "Aktuell spelare är "+ oGameData.nickNamePlayerOne + "("+oGameData.playerOne +")";
                event.target.style.backgroundColor = oGameData.colorPlayerTwo;
                event.target.textContent = oGameData.playerTwo;
                oGameData.gameField[et] = "O";
                oGameData.currentPlayer=oGameData.playerOne;
            }
        }
        
        //Tilldelar variabeln 0, 1, 2, eller 3 beroende på spelets status.
        let result = oGameData.checkForGameOver();
        
        //Kollar ifall result skiljer sig med 0, vilket innebär att det är oavgjort eller att någon av spelarna vunnit.
        if(result != 0) {
            if(result == 3){
                jumbotronH1.textContent = "Oavgjort";
            }
            else if(result == 1) {
                jumbotronH1.textContent ="Vinnare är "+oGameData.nickNamePlayerOne+"! Spela igen?";
            }
            else {
                jumbotronH1.textContent = "Vinnare är " +oGameData.nickNamePlayerTwo+"! Spela igen?";
            }
            
            //Tar bort lyssnare för tabellen.
            table.removeEventListener("click", executeMove);
            
            //Tar bort klassen d-none from form, vilket resulterar att formuläret visas igen.
            form.classList.remove("d-none");
            
            //Lägger till klassen d-none till gameArea vilket döljer spelplanen.
            gameArea.classList.add("d-none");

            //Initierar initGlobalObject igen
            oGameData.initGlobalObject();
        }  
    }
}

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

//Metod för att validera inmatningar till formuläret.
function validateForm()  {
    //Konstanter som används för att kontrollera så att de valda färgerna inte är svarta eller vita.
    const black = '#000000';
    const white = '#ffffff';

    try {
        //Hämtar alla inputs med typen text och lägger dem i textRefs.
        let textRefs = document.querySelectorAll('input[type=text]');
        //Hämtar alla inputs med typen color och lägger dem i colorRefs.
        let colorRefs = document.querySelectorAll('input[type=color]');

        //Kontrollerar ifall någon av namn inmatningarna är kortare än 5,
        //om så är fallet så kastas värde till catch.
        if(textRefs[0].value.length<5 || textRefs[1].value.length<5){
            throw' "nickname" måste vara längre än 5 bokstäver.'
        }

        //Kontrollerar ifall någon av namn inmatningarna har samma värde,
        //om så är fallet så kastas värde till catch.
        if(textRefs[0].value == textRefs[1].value){
            throw ' "nickname" får ej vara likadana.'
        }
        
        //Kontrollerar ifall någon färg inmatningarna har samma värde,
        //om så är fallet så kastas värde till catch.
        if(colorRefs[0].value == colorRefs[1].value){
            throw ' spelare får inte ha likadan färg.'
        }

        //Kontrollerar ifall någon färg inmatningarna har färgen svart,
        //om så är fallet så kastas värde till catch.
        if(colorRefs[0].value == black || colorRefs[1].value == black){
            throw ' spelarfärg får ej vara svart.'
        }

        //Kontrollerar ifall någon färg inmatningarna har färgen vit,
        //om så är fallet så kastas värde till catch.
        if(colorRefs[0].value == white || colorRefs[1].value == white){
            throw ' spelarfärg får ej vara vit.'
        }
        //Kallar på metod ifall inget har kastats till catch i if-satserna.
        initiateGame();
    }
        
    catch (error) {
        //Ändrar text innehållet för #errorMsg om catchen fångar något ifrån throw i if-satserna ovan.
        document.querySelector('#errorMsg').textContent = 'Ej korrekt ifyllt formulär,' +error;
    }
    
}

function initiateGame(){
    //Definerar let för vilken spelare som ska börja samt dess spelnamn.
    let playerChar, playerName;

    //Hämtar form-element ifrån index.html för att klassa i senare skede ska kunna läggas till. Endast ett formulär finns så vi körde på denna metoden.
    let form = document.querySelector('form');

    //Lägger till klassen d-none för elementet form.
    form.classList.add("d-none");//Gömmer elementet
    
    //Definerar element med id "game-area" för att kunna ta bort klassen "d-none" i senare skede.
    let gameArea = document.getElementById("game-area");

    //Tar bort klassen från game-area
    gameArea.classList.remove("d-none")
    
    //Ändrar text innehållet för #errorMsg till null.
    document.querySelector('#errorMsg').textContent = "";
    
    //Hämtar alla inputs med typen text och lägger dem i textRefs.
    let textRefs = document.querySelectorAll('input[type=text]');
    
    //Hämtar alla inputs med typen color och lägger dem i colorRefs.
    let colorRefs = document.querySelectorAll('input[type=color]');
    
    //Tilldelar spelar attribut värden från inmatningar som sparats i textRefs och ColorRefs.
    oGameData.nickNamePlayerOne=textRefs[0].value;
    oGameData.nickNamePlayerTwo=textRefs[1].value;
    oGameData.colorPlayerOne=colorRefs[0].value;
    oGameData.colorPlayerTwo=colorRefs[1].value;
    
    //Definerar alla element som är td från index.html.
    let Td = document.querySelectorAll('td');

    for (let i = 0; i < Td.length; i++) {
        //Sätter allt text innehåll för td till null samt ändrar bakgrundsfärgen till vit.
        Td[i].textContent = ""; 
        Td[i].style.backgroundColor = 'white';

    }
    //Kollar ifall randomiserade värdet som genereras är mindre än 0,5.
    if(Math.random(1) < 0.5){
        //Tilldelar playerChar, playername och currentPlayer värden tillhörande playerOne.
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData. playerOne;
    }
    else{
        //Vid händelse att värdet som genereras inte är mindre än 0,5 så tilldelas samma som ovan playerTwo istället.
        playerChar = oGameData. playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData. playerTwo;
    }
    //Definerar alla H1:or i klassen jumbotron i index.html.
    let jumbotronH1 = document.querySelector('.jumbotron h1');
    //Tilldelar H1:an namnet som playerName fått.
    jumbotronH1.textContent = "Spelare att börja är "+playerName;

    //Lägger till en lyssnare på Tabellen som kallar på executeMove
    let table = document.querySelector("table");
    table.addEventListener("click", executeMove);

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
