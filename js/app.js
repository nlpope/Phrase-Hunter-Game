/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

//global variable to target start game button
const startButton = document.querySelector("#btn__reset");
//check if overlay is hidden (style atribute is only added when hidden)
const overlay = document.querySelector('#overlay');
//global variable to target onscreen keys
const gameKeys = document.querySelector('#qwerty');
//regex to check that what is keyed is a letter (a-z)
const keyDownCheck = new RegExp(/[a-z]/);
//global variable to store new game object in
let newGame;

startButton.addEventListener('click', () => {
    //on click, initialize a new Game object complete w/ holders for missed count, phrases, and activePhrase
    newGame = new Game();
    //trigger startGame method from Game.js
    newGame.startGame();
    // add keydown listener to letters when startButton is clicked
    window.addEventListener('keydown', (e) => {
        if (keyDownCheck.test(e.key.toLocaleLowerCase()) && e.key.length === 1) {
            newGame.handleInteraction(e.key.toLowerCase());
        }
    });
});
//if enter is clicked at start or reset
window.addEventListener('keyup', (e) => {
    if(e.key === 'Enter' && overlay.style.display !== 'none'){
        //on click, initialize a new Game object complete w/ holders for missed count, phrases, and activePhrase
        newGame = new Game();
        //trigger startGame method from Game.js
        newGame.startGame();
        // add keydown listener to letters when 'enter' is keyed
        window.addEventListener('keydown', (e) => {
            if (keyDownCheck.test(e.key.toLocaleLowerCase()) && e.key.length === 1) {
                newGame.handleInteraction(e.key.toLowerCase());
            }
        });
    }
});

//add event listener to onscreen keys
gameKeys.addEventListener('click', (e) => {
    //check if click is on a button
    if (e.target.tagName === 'BUTTON') {
        //send button's textContent to handleInteraction method in Game object
        newGame.handleInteraction(e.target.textContent);
    }
});