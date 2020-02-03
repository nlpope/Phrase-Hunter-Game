/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

//global variable to target start game button
const startButton = document.querySelector('#btn_reset');
//global variable to target onscreen keys
const gameKeys = document.querySelector('#qwerty');
//regex to check that what is keyed is a letter (a-z)
const keyDownCheck = new RegExp(/[a-z]/);
//global variable to store new game object in
let newGame;

startButton.addEventListener('click', () => {
    //on click, initialize a new Game object complete holders for missed count, phrases, and activePhrase
    newGame = new Game();
    //
    newGame.startButton();
})