var Letter = require("./letter.js");

var Word = function(newWord){
    this.word = newWord;
    this.letterObjs = []; //an array that stores letter objects
    this.found = false;
    this.getLetters = function(){
        for(var i = 0; i < this.word.length; i++){
            this.letterObjs.push(new Letter(this.word[i]));
        }
    };
    /**
     * returns true or false 
     */
    this.foundTheWord = function(){
        // loop through all the letter objects and return true if all show properties are true
        this.found = this.letterObjs.every(function(letterObj){
            return letterObj.show;
        });

        return this.found;
    }
    /**
     * returns whether the guessed letter was found or not
     */
    this.checkLetters = function(guessedLetter){
        var outcome = 0;
        this.letterObjs.map(function(letterObj){
            if(letterObj.character == guessedLetter){
                letterObj.show = true;
                outcome++;
            }
        });
        return outcome;
    }
    /**
     * return the rendered view
     */
    this.renderOutcome = function(){
        var outcome = "";
        this.letterObjs.map(function(letterObj){
            outcome += letterObj.letterRender();
        });
        return outcome;
    }
}

module.exports = Word;