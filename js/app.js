let game;
const button = document.getElementById('btn__reset');
/**
 * Event listeners for if user clicks 'start game' or hits the enter key
 * @param {event} event if user clicks enter the event will trigger a new game
 */
const startButtonClick = () =>{
    game = new Game();

    game.createPhrases([
        'You cant handle the truth',
        'Am I a joke to you',
        'HELLO WORLD', 
        'There is no try',
        'THE GRASS IS ALWAYS GReener'
    ]);

    game.startGame();
    console.log(game.activePhrase.phrase);
}
const startButtonEnterKey = (event) => {
    let checkOverlay = document.getElementById('overlay').style;
    if(event.keyCode == 13 && checkOverlay.display !== 'none'){
        game = new Game();

    game.createPhrases([
        'You cant handle the truth',
        'Am I a joke to you',
        'HELLO WORLD', 
        'There is no try',
        'THE GRASS IS ALWAYS GReener'
    ]);

    game.startGame();
    console.log(game.activePhrase.phrase);
    };
};

button.addEventListener('click', startButtonClick);
window.addEventListener('keydown', startButtonEnterKey, false);

/**
 * tracking virtual keyboard clicks. event delegation
 */
const parent = document.getElementById('qwerty');
const virtualKeyBoard = (event) => {
    if(event.target.className === 'key'){
        game.handleInteraction(event.target);
    }
};
const keyBoard = (event) => {
    if(event.keyCode >= 65 && event.keyCode <= 90){
        let virtualTwins = document.getElementById('qwerty')
        .getElementsByTagName('button');
        let overlay = document.getElementById('overlay');
        let i = 0;
        while(virtualTwins[i]){
            if(virtualTwins[i].innerHTML == event.key 
            && virtualTwins[i].className ==='key'
            && overlay.style.display ==='none'){
                game.handleInteraction(virtualTwins[i]);
            }
            i++;
        }
    }
};
parent.addEventListener('click', virtualKeyBoard);
window.addEventListener('keydown', keyBoard, false);

/**
 * NOTES:
 * if you need help the active phrase is logged to the console
 * 
 * if you wanna cheat just click and drag over the boxes
 * 
 * Array.from(document.getElementsByClassName('exampleName')) was a useful approach...
 * ...as getElementsByClassName doesnt return an actual array, but an array-like object (HTML collection)
 * 
 */