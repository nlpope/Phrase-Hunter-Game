 /* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
 
 class Phrase {
     constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }
    addPhraseToDisplay(phrase){
        //in case you want to cheat a little
        console.log(`Phrase: ${phrase.phrase} `);
        //get all list items in phrase div
        const addLetters = document.querySelector('#phrase ul');
        //generate array of letters from phrase
        Array.from(phrase.phrase)
        //loop through hiding the letters before game begins
        .forEach(letter => {
            if(letter !== ' '){
                addLetters.insertAdjacentHTML('beforeend', `<li class ="hide letter ${letter} bounceIn">${letter}</li>`);
            } else {
                addLetters.insertAdjacentHTML('beforeend', `<li class="space"> </li>`);
            }
        })
    }
    checkLetter(enteredLetter, activePhrase){
        //checks if enteredLetter is in activePhrase. Should return -1 or anything >= 0
        return activePhrase.indexOf(enteredLetter);
    }
    showMatchedLetter(enteredLetter){
        //select all letters that match enteredLetter, revealing them with class 'show'
        Array.from(document.querySelectorAll(`.hide.letter.${enteredLetter}`))
        .forEach(match => match.className = 'show');
    }
}
