// GLOBAL VARIABLES
const startButton = document.getElementById('start-btn');
const choiceA = document.getElementById('answer-a-btn');
const choiceB = document.getElementById('answer-b-btn');
const choiceC = document.getElementById('answer-c-btn');
const choiceD = document.getElementById('answer-d-btn');
const quizIntroContainer = document.querySelector('#quiz-intro-container');
const answerChoiceContainer = document.querySelector('#answer-choice-container');
const questionTitleElement = document.querySelector('.question-title-text');
const inputHighScoresPage = document.querySelector('#high-score-container');
const submitButton = document.querySelector('#submit-button');
const showHighScoresElement = document.querySelector('.high-score-content');
const showEndNavButtonsElement = document.querySelector('.high-score-nav-buttons');
const clearScoresButton = document.querySelector('#clear-btn');
const backToStartButton = document.querySelector('#back-btn');

// END GAME VARIABLES
let viewHighScores = document.querySelector('#view-scores-link');
let inputFormElement = document.querySelector('#submit-form');
let userInitialsElement = document.querySelector('#initials');
let endGameText = document.querySelector('.end-game-text-content');
let displayedHighScore = document.querySelector('.end-game-sub-title');
let scoreBoard = document.querySelector('.high-scores-list');

// CORRECT/INCORRECT ANSWER VARIABLES
let correctAnswers = 0;
let answerTextElement = document.querySelector('.answer-text');
let correctText = document.querySelector('.correct-incorrect-text');

/* TIMER */
let counter = 180;
let timerHTMLText = document.getElementById('countdown');
// GLOBAL TIME FOR CLEARNING INTERVAL FUNCTIONS
var beginCountDown;

// HOLD HIGH SCORES IN LOCAL STORAGE OR EMPTY ARRAY
let highScoresList = JSON.parse(localStorage.getItem('highScoresStored')) || [];

let userInitials = "";
var userScoreObj = "";

let scoresAreDisplayed = false;
// Create incrementable variable to start at 1 to count questions
let currentQuestion = 1;

//  START GAME AND DISPLAY QUESTION CONTAINER 
function startGame() {
    // Change the start button's text content to represent in-quiz state
    startButton.textContent = 'Next Question';
    // Hide landing page
    quizIntroContainer.classList.add('hidden');
    // Show questions container
    answerChoiceContainer.classList.remove('hidden');
    // INITIATE nextQuestion FUNCTION
    nextQuestion();
};

// START THE COUNTDOWN TIMER
function startTimer() {

    timer = function () {
        counter--;
        timerHTMLText.textContent = `${counter}s`;
        // WHEN COUNTER REACH 0, END GAME
        if (counter <= 0) {
            clearInterval(beginCountDown);
            timerHTMLText.textContent = 0;
            counter = 0;
            endGame();
        };
    };

    // PASS IN THE countDown FUNCTION
    beginCountDown = setInterval(timer, 1000);
};

// * END OF GAME
function endGame() {
    inputHighScoresPage.classList.remove('hidden');
    inputFormElement.classList.remove('hidden');
    endGameText.classList.remove('hidden');
    quizIntroContainer.classList.add('hidden');
    questionTitleElement.classList.add('hidden');
    answerChoiceContainer.classList.add('hidden');
    displayedHighScore.textContent = `You got ${correctAnswers} right in ${counter} seconds.`

    //eventListener FOR SUBMIT BUTTON AND GET HIGH SCORE
    submitBtn.addEventListener('click', getUserInfo);
};



// HIGH SCORE PAGE BUTTON
clearScoresButton.addEventListener('click', () => {
    localStorage.clear();
    scoreBoard.classList.add('hidden');
});

backToStartButton.addEventListener('click', () => {
    // RELOADS BROWSER
    window.location.reload();
});

// * *** GET/SAVE HIGH SCORES ***
function getHighScores() {

    // STOP THE CLOCK
    clearInterval(beginCountDown);

    for (i = 0; i < highScoresList.length; i++) {
        var savedInitials = highScoresList[i].initials;
        var savedScore = highScoresList[i].time;
        var newScore = document.createElement("li");
        newScore.textContent = `${i + 1}. ${savedInitials} -- ${savedScore}`;
        // APPEND LIST ITEM TO PARENT
        scoreBoard.append(newScore);
    }

    inputHighScoresPage.classList.add('hidden');
    inputFormElement.classList.add('hidden');
    endGameText.classList.add('hidden');
    showHighScoresElement.classList.remove('hidden');
    showEndNavButtonsElement.classList.remove('hidden');
    answerChoiceContainer.classList.add('hidden');
    quizIntroContainer.classList.add('hidden');


    viewHighScores.style.pointerEvents = "none";

};

// Quick save scores function
function saveHighScores() {
    localStorage.setItem('highScoresStored', JSON.stringify(highScoresList));
};

// * *** GET USER INITIALS AND SCORE INPUT ***
function getUserInfo() {
    // PREVENT BROWSER RELOAD
    event.preventDefault();
    // VARIABLE FOR USER INTITIALS
    userInitials = userInitialsElement.value;
    if (!userInitials) {
        alert("Please try again.");
        return;
    }

    userScoreObj = {
        "initials": userInitials,
        "time": counter,
    };
    // GET HIGH SCORE FROM LS OR SET ARRAY IF NONE
    highScoresList = JSON.parse(localStorage.getItem('highScoresStored')) || [];


    if (!highScoresList) {
        highScoresList.push(userScoreObj);
        saveHighScores();
    }
    else {
        highScoresList.push(userScoreObj);
        highScoresList.sort((first, second) => second.time - first.time);
        saveHighScores();
    }
    // GET HIGH SCORE AND PASS IN INFO
    getHighScores(userScoreObj);
};

// Event listener for clear scores button
clearScoresButton.addEventListener('click', () => {
    localStorage.clear();
    scoreBoard.classList.add('hidden');
});

// START BUTTON AND TIMER, LANDING PAGE EVENTS 
startButton.addEventListener('click', () => {
    startGame();
    startTimer();
});


// * FUNCTION TO HIDE THE CORRECT OR INCORRECT ANSWER
function hideCorrect() {
    var timeout = setTimeout(function () {
        answerTextElement.classList.add('hidden');
    }, 2000);

};

// GO TO FIRST/ NEXT QUESTION
function nextQuestion() {


    if (currentQuestion > 1) {
        answerTextElement.classList.remove('hidden');
        hideCorrect();
    }


    // IF THIS IS THE LAST QUESTION, END THE GAME, OTHERWISE DISPLAY NEXT QUESTION
    if (currentQuestion === questionObjectArray.length + 1) {
        timerHTMLText = counter;
        clearInterval(beginCountDown);
        hideCorrect();
        endGame();
    }
    else {// DISPLAY CURRENT QUESTION BASED ON INDEX VALUE
        questionTitleElement.textContent = questionObjectArray[currentQuestion - 1].question;
        choiceA.textContent = questionObjectArray[currentQuestion - 1].A;
        choiceB.textContent = questionObjectArray[currentQuestion - 1].B;
        choiceC.textContent = questionObjectArray[currentQuestion - 1].C;
        choiceD.textContent = questionObjectArray[currentQuestion - 1].D;
    };

};

//  ANSWER QUESTION AND MOVE TO NEXT 
function answerQuestion(answer) {
    event.preventDefault();
    if (answer === questionObjectArray[currentQuestion - 1].correct) {
        correctText.textContent = `Great job!`;
        correctAnswers++
    }
    else {
        counter -= 10;
        timerHTMLText.textContent = counter + 's';
        correctText.textContent = `Incorrect, maybe next time!`;
    }

    // INCREMENT QUESTION AND CALL NEXT QUESTION
    currentQuestion++;
    nextQuestion();

};

// SET QUESTIONS OBJECT ARRAY 
var questionObjectArray = [
    {
        "question": "How many data types are supported by Javascript ?",
        "A": "5",
        "B": "10",
        "C": "7",
        "D": "9 ",
        "correct": "C"
    },
    {
        "question": "Which of theres is not a proper way to declare a variable?",
        "A": "let",
        "B": "var",
        "C": "incl",
        "D": "const",
        "correct": "C"
    },
    {
        "question": "Which is not a Javascript framwork ?",
        "A": "Angular",
        "B": "SASS",
        "C": "Vue",
        "D": "React",
        "correct": "B"
    },
    {
        "question": "How many items can be in an array",
        "A": "Unlimited amount",
        "B": "25",
        "C": "9",
        "D": "100",
        "correct": "A"
    },
    {
        "question": "What is the alert() method used for",
        "A": "To prompt the user",
        "B": "To send an alert message to the console",
        "C": "I dont know",
        "D": "To display an alert message to the user",
        "correct": "D"
    },
    {
        "question": "What year was javascript created",
        "A": "1983",
        "B": "2015",
        "C": "2003",
        "D": "1995",
        "correct": "D"
    },
    {
        "question": "Is Java & Javascript the same thing ?",
        "A": "It depends",
        "B": "No",
        "C": "Yes",
        "D": "Only in theory",
        "correct": "B"
    },
    {
        "question": "What company developed Javascript ?",
        "A": "Google",
        "B": "Facebook",
        "C": "Netscape",
        "D": "Dell",
        "correct": "C"
    }, {
        "question": "What is Javascript",
        "A": "Networking platform",
        "B": "A Java compiler",
        "C": "A style sheet",
        "D": "A scripting language",
        "correct": "D"
    },
    {
        "question": "What do you use to break a line within a string statement?",
        "A": "Underscore",
        "B": "Ampersand sign",
        "C": "Money Sign",
        "D": "Backslash",
        "correct": "D"
    },
];

// VIEW HIGH SCORES
viewHighScores.addEventListener('click', getHighScores);