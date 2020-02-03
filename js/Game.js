/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game{
    constructor(){
        this.missed = 0;
        this.phrases = [];
        this.activePhrase = null;
    }
    startGame(){
        //get overlay
        const overlay = document.querySelector('#overlay');
        //set phrases
        const gamePhrases = ['hello world', 'am i a joke to you', 'the grass is always greener', 'there\'s no place like home'];
        //hide overlay
        overlay.style.display = 'none';
        //push each phrase in gamePhrases into empty phrase array after converting to lower case by passing them through Phrase constructor in Phrases.js
        gamePhrases.forEach(phrase => this.phrases.push(new Phrase(phrase)));
        //set activePhrase to a random object from gamePhrases
        this.activePhrase = this.getRandomPhrase();
        //pass to addPhraseToDisplay in phrase.js
        this.activePhrase.addPhraseToDisplay(this.activePhrase);
    }
    getRandomPhrase(){
       //get random number between 0 & length of gamePhrases array
       const randomNumber = Math.floor(Math.random() * this.phrases.length)
       //return the selected random phrase using randomNumber
       return this.phrases[randomNumber];
    }
    handleInteraction(e){
        //check if overlay is hidden (style atribute is only added when hidden)
        const overlay = document.querySelector('#overlay').hasAttribute('style');
        //get activePhrase (remember it's been passed through Phrase constructor)
        const activePhrase = this.activePhrase.phrase;
        //pass keyed letter to checkLetter method in Phrase object
        const letterChecker = this.activePhrase.checkLetter(e, activePhrase);
        //make an array from every displayed key in the html
        Array.from(document.querySelectorAll('.keyrow > .key')).forEach(key => {
            //if letter's index isn't found and the current key in loop is the one that was pressed and the key wasn't disabled and the overlay is hidden (it'd be undefined otherwise)
            if(letterChecker === -1 && e === key.textContent && !key.hasAttribute('disabled') && overlay){
                key.classList.add('wrong');
                key.style.cursor = 'default';
                key.setAttribute('disabled', 'disabled');
                this.removeLife();
            //if letter is found and ''''''
            } else if (letterChecker >= 0 && e === key.textContent && !key.hasAttribute('disabled') && overlay){
               key.classList.add('chosen');
               key.style.cursor = 'default';
               key.setAttribute('disabled', 'disabled');
               //pass letter to showMatchedLetter method in Phrase object
               this.activePhrase.showMatchedLetter(e);
               //check for win
               if(this.checkForWin() === 'win'){ this.gameOver('win');}
            }
        });
    }
    removeLife(){
        //get heart images
        const lives = document.querySelectorAll('.tries img');
        //increment missed by 1
        this.missed++;
        //remove a heart (I like seeing it from right to left)
        let i = lives.length-1;
        while(lives[i]){
           if(lives[i].src.includes('images/liveHeart.png')){
               lives[i].setAttribute('src', 'images/lostHeart.png');
               console.log('heart');
               break;
           }
           i--;
        }
        console.log(this.missed);
        //check for game over
        if (this.missed === lives.length){ this.gameOver('lose') };       
    }
    checkForWin(){
        //get all revealed letters
        const matchedLetters = document.querySelectorAll('.show');
        //remove spaces for count in next line
        const activePhrase = this.activePhrase.phrase.replace(/ /g, '');
        //if the length count matches up, the user won
        if (matchedLetters.length === activePhrase.length){ return 'win'; }
    }
    gameOver(gameStatus){
        // get overlay
        const overlay = document.querySelector('#overlay');
        // get reset button
        const button = document.querySelector('#btn__reset');
        // get h1 to store game message
        const gameMessage = document.querySelector('#game-over-message');
        
        //if gameStatus is equal to win
        if (gameStatus === 'win') {
            overlay.className = 'win';
            gameMessage.innerHTML = 'Congrats!  Want to play again? <br><br> <img src="images/squidward.gif" height="375">';
        }
        //if gameStatus is equal to lose
        if (gameStatus === 'lose') {
            overlay.className = 'lose';
            gameMessage.innerHTML = 'Better luck next time! <br><br> <img src="images/mr_krabs_sad.gif">';
        }

        // remove phraseHunter text
        document.querySelector('.title').innerText= " ";
        // change button text to 'Play Again?'
        button.innerText = 'Play Again?';
        // remove style attribute from overlay
        overlay.removeAttribute('style');
        // clear phrase
        document.querySelector('#phrase ul').innerHTML = '';
        // reset hearts
        Array.from(document.querySelectorAll(".tries img"))
            .forEach(img => img.setAttribute('src', 'images/liveHeart.png'));
        // reset key classes
        Array.from(document.querySelectorAll('.keyrow > .key'))
            .forEach(key => {
                key.className = 'key'
                key.removeAttribute('style');
                key.removeAttribute('disabled');
            });
    }

}