const packageJson = require("pkg.json");
var inquirer = require('inquirer');
var WordArray = require("./wordArray.js");
var Word = require("./word.js");

var startGame = function () {
    var guessesRemaining = 10;
    var wordList = WordArray.getWord.arrayofWords;
    var lettersGuessed = []; //this is an array that holds letters guessed by user. 
    var currentWord = null;

    inquirer.prompt([{
        name: "play",
        type: "confirm",
        message: "Ready to guess Alice's favorite things?"
    }]).then(function(answer) {
        if(answer.play){
            initGame();
        } else{
          console.log("Fine, I didn't want to play anyway..");
        }
    });

    var initGame = function(){
        if(guessesRemaining === 10) {
            console.log("Allons-y");
            console.log('*****************');
            //generates random number based on the wordBank
            var randNum = Math.floor(Math.random() * wordList.length);
            currentWord = new Word(wordList[randNum]);
            currentWord.getLetters();
            //displays current word as blanks.
            console.log(currentWord.renderOutcome());
            keepPromptingUser();
        } else{
            resetGuessesRemaining();
            initGame();
        }
    };

    var resetGuessesRemaining = function() {
        guessesRemaining = 10;
    };
    var keepPromptingUser = function() {
        //asks player for a letter
        inquirer.prompt([{
            name: "value",
            type: "input",
            message: "Choose a letter:"
        }]).then(function(letter) {
            //toUpperCase because words in word bank are all caps
            var letterReturned = (letter.value).toUpperCase();
            //adds to the lettersGuessed array if it isn't already there
            var guessedAlready = false;
            for(var i = 0; i<lettersGuessed.length; i++){
                if(letterReturned === lettersGuessed[i]){
                    guessedAlready = true;
                }
            }
            //if the letter wasn't guessed already run through entire function, else reprompt user
            if(guessedAlready === false){
                lettersGuessed.push(letterReturned);

                var found = currentWord.checkLetters(letterReturned);
                //if none were found tell user they were wrong
                if(found === 0){
                    console.log('WRONG!');
                    guessesRemaining--;
                    
                    console.log('Guesses remaining: ' + guessesRemaining);
                    //console.log(hangManDisplay[(display)-1]);

                    console.log('\n*******************');
                    console.log(currentWord.renderOutcome());
                    console.log('\n*******************');

                    console.log("Letters guessed: " + lettersGuessed);
                } else{
                    console.log('You got it, Bub!');
                    //checks to see if user won
                    if(currentWord.foundTheWord() === true){
                        console.log(currentWord.renderOutcome());
                        console.log('Winner! Winner! Chicken Dinner!');
                        // startGame();
                    } else{
                        // display the user how many guesses remaining
                        console.log('Guesses remaining: ' + guessesRemaining);
                        console.log(currentWord.renderOutcome());
                        console.log('\n*******************');
                        console.log("Letters guessed: " + lettersGuessed);
                    }
                }
                if(guessesRemaining > 0 && currentWord.found === false) {
                    keepPromptingUser();
                }else if(guessesRemaining === 0){
                    console.log('Game over!');
                    console.log('The word you were guessing was: ' + currentWord.word);
                }
            } else{
                console.log("You've already guessed that letter. Duh. Try again.")
                keepPromptingUser();
            }
        });
    };
};

startGame();








