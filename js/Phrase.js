 /* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
 
 /**In this file
  * phrase constructor
  * addPhraseToDisplay method
  * checkLetter method
  * showMatchedLetter method
  */
 class Phrase {
     constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Display phrase on game board
     */
    addPhraseToDisplay = () => {
        let phrase = this.phrase;
        [...phrase].forEach((char) => {
            let ul = document.getElementById('phrase')
            .getElementsByTagName('ul')[0];
            let li = document.createElement('li');
            if(char === ' '){
                li.setAttribute('class', 'space');
                li.innerHTML = ' ';
            } else {
                li.setAttribute('class', `hide letter ${char} bounceIn`);
                li.innerHTML = `${char}`;
            }
            ul.appendChild(li);
        });
    }

    /**
     * Checks if passed letter is in phrase
     * @param (string) letter - Letter to check
     * @return {boolean} True if letter in phrase, false otherwise
     */
    checkLetter = (letter) => {
        let charArray = Array.from(this.phrase);
        let i = 0;
        while(charArray[i]){
            if(charArray[i] === letter){
                return true;
            }
            i++;
        }
        return false;
    }

    /**
     * Displays passed letter on screen after a match is found
     * @param (string) letter - Letter to display
     */
    showMatchedLetter = (letter) => {
        let boxes = document.getElementById('phrase')
        .getElementsByTagName('li');
        let i = 0;
        while(boxes[i]){
            if(boxes[i].innerHTML === letter){
                boxes[i].className = `show letter ${letter}`;
            }
            i++;
        }      
    }
}