// ---------quiz question object array----------
var quizQuestions = [{
    question:"JavaScript is an ______ language?",
    ansA:"Object-Oriented",
    ansB:"Object-Based",
    ansC:"Procedural",
    ansD:"None of the above",
    correctAnswer:"a"},
    {
    question:"Which of the following keywords is used to define a variable in Javascript?",
    ansA:"var",
    ansB:"let",
    ansC:"Both A and B",
    ansD:"None of the above",
    correctAnswer:"c"},
    {
    question:"Which of the following methods can be used to display data in some form using Javascript?",
    ansA:"document.write()",
    ansB:"console.log()",
    ansC:"window.alert()",
    ansD:"All of the above",
    correctAnswer:"d"},
    {
    question:"When an operator’s value is NULL, the typeof returned by the unary operator is:",
    ansA:"Boolean",
    ansB:"Undefined",
    ansC:"Object",
    ansD:"Integer",
    correctAnswer:"c"},
        {
    question:"Which function is used to serialize an object into a JSON string in Javascript?",
    ansA:"stringify()",
    ansB:"parse()",
    ansC:"convert()",
    ansD:"None of the above",
    correctAnswer:"a"},
        {
    question:"Which of the following are closures in Javascript?",
    ansA:"Variables",
    ansB:"Functions",
    ansC:"Objects",
    ansD:"All of the above",
    correctAnswer:"d"},
        {
    question:"Which of the following is not a Javascript framework?",
    ansA:"Node",
    ansB:"Vue",
    ansC:"React",
    ansD:"Salmon",
    correctAnswer:"d"},
        {
    question:"How to stop an interval timer in Javascript?",
    ansA:"clearInterval",
    ansB:"clearTimer",
    ansC:"intervalOver",
    ansD:"intervalClear",
    correctAnswer:"a"},
        {
    question:"How do we write a comment in javascript?",
    ansA:"/* */",
    ansB:"//",
    ansC:"#",
    ansD:"$ $",
    correctAnswer:"b"},
        {
    question:"How are objects compared when they are checked with the strict equality operator?",
    ansA:"The contents of the objects are compared",
    ansB:"Their references are compared",
    ansC:"Both A and B",
    ansD:"None of the Above",
    correctAnswer:"b"},

];

// ----------variables to get html elements---------
var a = document.getElementById("a");
var b = document.getElementById("b");
var c = document.getElementById("c");
var d = document.getElementById("d");
var quizEl = document.getElementById("quiz");
var timer = document.getElementById("timer");
var finalScoreEl = document.getElementById("finalScore");
var gameoverEl = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var beginButtonEl = document.getElementById("beginbtn");
var startPageEl = document.getElementById("startpage");
var hsContainerEl = document.getElementById("highscoreContainer");
var hsDiv = document.getElementById("highscorePage");
var hsInputName = document.getElementById("initials");
var hsDisplayName = document.getElementById("highscore-initials");
var lastButtonsEl = document.getElementById("lastButtons");
var submitButton = document.getElementById("submitScore");
// ----------global variables-----------
var timeLeft = 90;
var timerInterval;
var score = 0;
var correct;
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex=0;
// ---------end assign variables----------

beginButtonEl.addEventListener("click", startQuiz)
// ----------generates quiz questions----------
function generateQuizQuestion(){
    gameoverEl.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        End ()
        return
    };
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    a.innerHTML = currentQuestion.ansA;
    b.innerHTML = currentQuestion.ansB;
    c.innerHTML = currentQuestion.ansC;
    d.innerHTML = currentQuestion.ansD;
};
// ----------displays scorelist by adding list element in html----------
var scoreList = document.getElementById("scoreList");
function renderScores (){
    quiz.style.display = "none";
    startPageEl.style.display = "none";
    hsContainerEl.style.display = "block";
    gameoverEl.style.display = "none";
    hsContainerEl.style.display = "block";
    lastButtonsEl.style.display = "block";

    for (var i = 0; i < highScores.length; i++){
        var li = document.createElement("li");
        li.innerText = `initials: ${highScores[i].initials} score ${highScores[i].score}`;
        scoreList.appendChild(li);
    }
}
// ----------hides everything but quiz questions and calls on generateQuizQuestion function----------
function startQuiz(){
    gameoverEl.style.display = "none";
    quizEl.style.display = "none";
    startPageEl.style.display = "none";
    generateQuizQuestion();

// -----had a bit of an issue with the decrement here but did half decrement to mitigate double countdown-----
    timerInterval = setInterval(function() {
        timeLeft-=.5;
        timer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval)
          End()
        }
      }, 1000);
    quiz.style.display = "block";
}
// -----userchoice must equal the correctAnswer object in quizQuestion variable, else timer goes down 10 seconds and user does not get 1 point-----
function checkAnswer(choice) {
    console.log(choice);
    if (choice ==quizQuestions[currentQuestionIndex].correctAnswer){
        console.log("Correct!");
        score +=1;
}
    else {
        timeLeft -=10;
    }
    currentQuestionIndex++
    generateQuizQuestion();
};
// ----play again button function----
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverEl.style.display = "none";
    startPageEl.style.display = "flex";
    timeLeft = 90;
    score = 0;
    currentQuestionIndex = 0;
}
// ---removes highscore stored in localstorage, refreshes page to beginning---
function clearHighScore(){
    window.localStorage.clear();
    hsDisplayName.textContent = "";
    hsContainerEl.textContent = "";
    document.location.reload();
}
// ---used within the timer function set to when the time runs out---
function End() {
    quiz.style.display = "none";
    startPageEl.style.display = "none";
    hsContainerEl.style.display = "block";
    gameoverEl.style.display = "block";
    lastButtonsEl.style.display = "block";
};
// ---saves score to localStorage---
var highScores = JSON.parse(localStorage.getItem("High Scores")) || []
function submitScore(){
    var data = {
    initials: initials.value,
    score: score,
    }
    highScores.push(data),
    localStorage.setItem("High Scores", JSON.stringify(highScores));
    renderScores();
    }


// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score