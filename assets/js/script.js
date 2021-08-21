// * *** SET QUESTIONS OBJECT ARRAY ***
var questionObjectArray = [
    {
        "question": "What is the difference between the === and == operators?",
        "A": "== compares both value and type are identical; === converts the type first then compares value",
        "B": "=== can only compare String values, while == can compare all types",
        "C": "=== compares both value and type are identical; == converts the type first then compares value",
        "D": "== is only applicable in comparing array indexes and is not applicable in any other context ",
        "correct": "C"
    },
    {
        "question": "Which of these user-interactive functions produces a Boolean value from the user?",
        "A": "prompt",
        "B": "confirm",
        "C": "message",
        "D": "alert",
        "correct": "B"
    },
    {
        "question": "What is the async() function?",
        "A": "It is used to expect a random return value within its function",
        "B": "It is used to catch an expected error that is located in another function",
        "C": "It tells JavaScript not to run its function until the function below it has executed",
        "D": "It is used to expect the await keyword, which in tandem invokes asynchronous code within a function",
        "correct": "D"
    },
    {
        "question": "In JavaScript, if you want to run some code and catch a possible or expected error, you use try and ______.",
        "A": "catch",
        "B": "promise",
        "C": "await",
        "D": "reference",
        "correct": "A"
    },
    {
        "question": "Can a const variable be hoisted?",
        "A": "Yes",
        "B": "No",
        "C": "Only when it is diluted through being passed to another function",
        "D": "Only after it has been re-assigned",
        "correct": "B"
    },
    {
        "question": "What is the difference between a function expression and a function declaration?",
        "A": "Expressions can be hoisted; declarations cannot be",
        "B": "Expressions must take an argument; declarations do not need parameters",
        "C": "Expressions have global scope; declarations don't",
        "D": "Expressions are defined through variables; declarations are named functions",
        "correct": "D"
    },
    {
        "question": "What does the split() function do?",
        "A": "Splits an array down the middle index (rounding down) into two sub-arrays",
        "B": "Turns each element in an array into a String value",
        "C": "Divides a String into an ordered list of sub-strings, creates an array of the sub-strings, and returns the array",
        "D": "Divides a String into an unordered list of sub-strings, creates an array of the sub-strings, and does not return the array",
        "correct": "C"
    },
    {
        "question": "What happens if you try to add the number 10 to a String?",
        "A": "You will get a reference error, since JavaScript will know they are different types",
        "B": "The entire String will be converted to a null value, but the code will run",
        "C": "The number will implicitly be converted into a String value and concatenate the Strings through coercion",
        "D": "The number will implicitly be converted and given its own new String variable but will not be concatenated",
        "correct": "C"
    }, {
        "question": "Can you use square brackets, ie [], to get the value of an object's property?",
        "A": "Yes",
        "B": "No, you may only get an object's property with Object.property syntax",
        "C": "Yes, but only if the object is not itself contained in an array of objects",
        "D": "No, you may only get an object's property by converting the object into an array first",
        "correct": "A"
    },
    {
        "question": "What is the primary difference between null and undefined?",
        "A": "null means that the variable doesn't exist; undefined means it exists but has no value",
        "B": "undefined means that the variable doesn't exist; null means it exists but has no value",
        "C": "null applies to Strings, while undefined is used for Booleans, objects, and arrays",
        "D": "undefined means the variable is in an object; null means it's inaccessible by scope",
        "correct": "B"
    },
];

// Set global variables representing elements
const startButton = document.getElementById('start-btn');
const choiceA = document.getElementById('answer-a-btn');
const choiceB = document.getElementById('answer-b-btn');
const choiceC = document.getElementById('answer-c-btn');
const choiceD = document.getElementById('answer-d-btn');
const quizIntroContainer = document.querySelector('#quiz-intro-container');
const answerChoiceContainer = document.querySelector('#answer-choice-container');
const questionTitleElement = document.querySelector('.question-title-text');
const inputHighScoresPage = document.querySelector('#input-high-score-container');
const submitButton = document.querySelector('#submit-button');
const showHighScoresElement = document.querySelector('.high-score-content');
const showEndNavButtonsElement = document.querySelector('.high-score-nav-buttons');
const clearScoresButton = document.querySelector('#clear-button');
const backToStartButton = document.querySelector('#go-back-button');

// End game alterable variables
let viewHighScores = document.querySelector('#view-scores-link');
let inputFormElement = document.querySelector('#submit-form');
let userInitialsElement = document.querySelector('#initials');
let endGameText = document.querySelector('.end-game-text-content');
let displayedHighScore = document.querySelector('.end-game-sub-title');
let scoreBoard = document.querySelector('.high-scores-list');

// Correct/incorrect answer variables
let correctAnswers = 0;
let answerTextElement = document.querySelector('.answer-text');
let correctText = document.querySelector('.correct-incorrect-text');

/* Creater timer counters as variables which can be re-assigned as it counts;
   one for countdown loop and one to represent the HTML text element on the page */
let counter = 150;
let timerHTMLText = document.getElementById('countdown');
// Global timer variable set blank to use for clearing interval functions
var beginCountDown;

// Create high scores to hold current high scores in local storage or an empty array if there are no scores
let highScoresList = JSON.parse(localStorage.getItem('highScoresStored')) || [];
// Set the empty array as local storage for global access
let userInitials;
var userScoreObj;

// Set Boolean variable to track whether or not high scores are currently being displayed to track repetitive displays
let scoresAreDisplayed = false;
// Create incrementable variable to start at 1 to count questions
let currentQuestion = 1;

// Event listeners for high score page buttons
clearScoresButton.addEventListener('click', () => {
    localStorage.clear();
    scoreBoard.classList.add('hidden');
});

backToStartButton.addEventListener('click', () => {
    // Reload the browser!
    window.location.reload();
});

// * *** GET/SAVE HIGH SCORES ***
function getHighScores() {

    // Stop the clock
    clearInterval(beginCountDown);

    // Print the top ten scores in the array (or less if the array runs through)
    for (i = 0; i < highScoresList.length; i++) {
        var savedInitials = highScoresList[i].initials;
        var savedScore = highScoresList[i].time;
        // Create a new li for each item in the array
        var newScore = document.createElement("li");
        // Set each list item to the contents of each player object
        newScore.textContent = `${i + 1}. ${savedInitials} -- ${savedScore}`;
        // Append list item to the parent
        scoreBoard.append(newScore);
    }

    // Hide high scores input page and show the display
    inputHighScoresPage.classList.add('hidden');
    inputFormElement.classList.add('hidden');
    endGameText.classList.add('hidden');
    showHighScoresElement.classList.remove('hidden');
    showEndNavButtonsElement.classList.remove('hidden');
    answerChoiceContainer.classList.add('hidden');
    quizIntroContainer.classList.add('hidden');

    // Prevent multiple displays of the same scores within the function
    viewHighScores.style.pointerEvents = "none";

};

// Quick save scores function
function saveHighScores() {
    localStorage.setItem('highScoresStored', JSON.stringify(highScoresList));
};

// * *** GET USER INITIALS AND SCORE INPUT ***
function getUserInfo() {
    // Prevent browser reload
    event.preventDefault();
    // Create variable of user initials
    userInitials = userInitialsElement.value;
    // Check if user has input anything
    if (!userInitials) {
        alert("You didn't enter anything. Please try again.");
        // Re-route the user back to the form
        return;
    }
    // Create user object to push to high scores array
    userScoreObj = {
        "initials": userInitials,
        "time": counter,
    };
    // Get high scores from local storage or set an empty array if there are no scores
    highScoresList = JSON.parse(localStorage.getItem('highScoresStored')) || [];


    if (!highScoresList) {
        // Push the first score and save
        highScoresList.push(userScoreObj);
        saveHighScores();
    }
    else {
        // Push user object to array
        highScoresList.push(userScoreObj);
        // Sort the array by the object property time
        highScoresList.sort((first, second) => second.time - first.time);
        saveHighScores();
    }
    // Get high scores and pass in the user info 
    getHighScores(userScoreObj);
};

// Event listener for clear scores button
clearScoresButton.addEventListener('click', () => {
    localStorage.clear();
    scoreBoard.classList.add('hidden');
});

// * END OF GAME
function endGame() {
    // Display high scores page, remove everything else
    inputHighScoresPage.classList.remove('hidden');
    inputFormElement.classList.remove('hidden');
    endGameText.classList.remove('hidden');
    quizIntroContainer.classList.add('hidden');
    questionTitleElement.classList.add('hidden');
    answerChoiceContainer.classList.add('hidden');
    // Show text of user's high score
    displayedHighScore.textContent = `You got ${correctAnswers} right in ${counter} seconds.`

    // Create eventListener for Submit button and get high scores
    submitButton.addEventListener('click', getUserInfo);
};

// * *** START BUTTON AND TIMER, LANDING PAGE EVENTS ***
// When user clicks the start button, both functions get called
startButton.addEventListener('click', () => {
    startGame();
    startTimer();
});

// * *** START GAME AND DISPLAY QUESTION CONTAINER ***
function startGame() {
    // Change the start button's text content to represent in-quiz state
    startButton.textContent = 'Next Question';
    // Hide landing page
    quizIntroContainer.classList.add('hidden');
    // Show questions container
    answerChoiceContainer.classList.remove('hidden');
    // Invoke nextQuestion function
    nextQuestion();
};

// * *** START THE COUNTDOWN TIMER ***
function startTimer() {

    // Begin timer through callback functionality
    timer = function () {
        // Set the text on the screen equal to the internal counter
        counter--;
        timerHTMLText.textContent = `${counter}s`;
        // When counter reaches 0, end the game and freeze the page timer at 0
        if (counter <= 0) {
            clearInterval(beginCountDown);
            timerHTMLText.textContent = 0;
            counter = 0;
            endGame();
        };
    };

    // Pass in the countDown function and its interval
    beginCountDown = setInterval(timer, 1000);
};

// * FUNCTION TO HIDE THE CORRECT OR INCORRECT ANSWER
function hideCorrect() {
    var timeout = setTimeout(function () {
        answerTextElement.classList.add('hidden');
    }, 2000);

};

// * *** GO TO FIRST/NEXT QUESTION ***
function nextQuestion() {

    // If question isn't the first of the game, display answer as right or wrong
    if (currentQuestion > 1) {
        // Show the answer as correct or incorrect 
        answerTextElement.classList.remove('hidden');
        // Call the hideCorrect function to re-hide the text after a set time
        hideCorrect();
    }

    // If this is the last question, end the game; otherwise display next question
    if (currentQuestion === questionObjectArray.length + 1) {
        // Freeze the on-screen timer
        timerHTMLText = counter;
        clearInterval(beginCountDown);
        hideCorrect();
        endGame();
    }
    else {// Display the current question based on the current index variable
        questionTitleElement.textContent = questionObjectArray[currentQuestion - 1].question;
        choiceA.textContent = questionObjectArray[currentQuestion - 1].A;
        choiceB.textContent = questionObjectArray[currentQuestion - 1].B;
        choiceC.textContent = questionObjectArray[currentQuestion - 1].C;
        choiceD.textContent = questionObjectArray[currentQuestion - 1].D;
    };
    // Buttons will call the answerQuestion function on click
};

// * *** ANSWER QUESTION AND MOVE TO NEXT ***
function answerQuestion(answer) {
    event.preventDefault();
    // If the button selection matches the correct answer 
    if (answer === questionObjectArray[currentQuestion - 1].correct) {
        correctText.textContent = `Woohoo! You got it! Nice job!`;
        // Increment correct answers
        correctAnswers++
    }
    // Any other answer is incorrect and time gets decremented
    else {
        // Decrement timer for wrong answer
        counter -= 10;
        timerHTMLText.textContent = counter + 's';
        correctText.textContent = `Sorry, that was not correct!`;
    }

    // Increment the question and call the next question function
    currentQuestion++;
    nextQuestion();

};

// Event listener for viewing high scores at any time
viewHighScores.addEventListener('click', getHighScores);