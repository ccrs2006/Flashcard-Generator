// Interacts with file system-----------------------------------------------------
var fs = require("fs");
//Helps have call backs on the terminal-------------------------------------------
var inquirer = require("inquirer");
//This add colors to the text-----------------------------------------------------
var colors = require("colors");

var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var questions = [{full: 'George Washington was the first president of the United States.', cloze: 'George Washington'},
	             {full: 'Google was founded in 1998.', cloze: '1998'},
	             {full: 'Elon Musk is the owner of spaceX.', cloze: 'Elon Musk'},
	             {full: 'The American involvement in the Korean war lasted from 1950 to 1953.', cloze: '1953'},
                 {full: 'The first Chipotle store was open in the city of Denver.', cloze: 'Denver'}]

var arrayQuestions = [];
for(var i = 0; i < questions.length; i++) {
    var j = new ClozeCard.ClozeCard(questions[i].full, questions[i].cloze);
    arrayQuestions.push(j);
};

var questions2 = [];
var arrayCreated = [];
for(var i = 0; i < questions2.length; i++) {
    var j = new ClozeCard.ClozeCard(questions2[i].full, questions2[i].cloze);
    arrayCreated.push(j);
};

//Question tracker----------------------------------------------------------------
var currentQuestion = 0;
var correctAnswer = 0;
var incorrectAnswer = 0;

//================================================================================

mainMenu();

//Main functions--------------------------------------------------------------------
function mainMenu(){
    inquirer.prompt([
        {
            name: "firstChoices",
            type: "list",
            message: "Welcome to the Flash Card game!\n",
            choices: ["1-Would you like to play with our random questions flash cards?".bgRed.bold, "2-Or would you like to create your own flash cards?".bgRed.bold, "3-quit".bgRed.bold]
        }
    ]).then(function(response){
        if(response.firstChoices === "1-Would you like to play with our random questions flash cards?".bgRed.bold){
            RandomQuestions();
        } else if(response.firstChoices === "2-Or would you like to create your own flash cards?".bgRed.bold) {
            createYourOwn();
            // console.log("Sorry this option is not yet available!")
        } else if(response.firstChoices === "3-quit".bgRed.bold) {
            quit();
        } else {
            console.log("Sorry something went wrong!");
        };
    });
};

function RandomQuestions(){
inquirer.prompt([
    {
        name: "userGuess",
        type: "input",
        message: "\n" + arrayQuestions[currentQuestion].partial + "\n\n▲▲▲Answer: "
    }
    ]).then(function(answers){
    console.log("\n");

    if(answers.userGuess.toLowerCase() === arrayQuestions[currentQuestion].cloze.toLowerCase()){
        console.log("***************************************")
        console.log("Correct!");
        correctAnswer++;
    } else {
        console.log("***************************************\n")
        console.log("Incorrect!");
        incorrectAnswer++;
    };

    console.log(arrayQuestions[currentQuestion].full);
    console.log("***************************************\n");

    if(currentQuestion < arrayQuestions.length - 1) {
        currentQuestion++;
        RandomQuestions();
    } else {
        console.log("Game Over!".red);
        console.log("Correct Answers: " + correctAnswer);
        console.log("Incorrect Answers: " + incorrectAnswer);
        console.log("***************************************\n");
        inquirer.prompt([
            {
                name: "playAgain",
                type: "confirm",
                message: "Do you wanna play again?"
            }
        ]).then(function(answers) {
            if(answers.playAgain){
                currentQuestion = 0;
                correctAnswer = 0;
                incorrectAnswer = 0;
                RandomQuestions();
            } else {
                //Exists the game
                console.log("Thanks for playing.\nGood Bye!");
            };                
        });
     };
    });
};

function CreateYourOwn(){
    inquirer.prompt([
        {
            name: "text",
            message: "Please enter full sentense.",
            type: "input"
        },
        {
            name: "cloze",
            message: "Please enter cloze.",
            type: "input"
        }
    ]).then(function(answer){
        var newCard = new ClozeCard.ClozeCard(answers.text, answers.cloze);

        newCard.printInfo();

        inquirer.prompt([
            {
                name: "more",
                massage: "Do you want to create another card?",
                type: "confirm"
            }
        ]).then(function(ans){
            if(ans.more === true)
            CreateYourOwn();
        });
    });
};

//This will exit the Flash Card app----------------------------------------------------
function quit() {
    console.log("\nHasta la vista baby!!!".bgGreen);
    console.log(".".bgGreen);
    console.log("..".bgGreen);
    console.log("...".bgGreen);
    console.log("....".bgGreen);
    console.log(".....Exiting Flash Card game now...".bgGreen);
};

