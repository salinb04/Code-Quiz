// Store Questions
var startQuizButton = document.getElementById("startQuizButton");
var viewHighScoresButton = document.getElementById("viewHighScoresButton");
var timer = document.getElementById("timer");
var startSection = document.getElementById("start-section");
var questionSection = document.getElementById("question-section");
var questionHeader = document.getElementById("question-header");
var answerChoices = document.getElementById("answer-choices");
var questionFeedback = document.getElementById("question-feedback");
var mainContent = document.getElementById("main-content");
var submitBtn = document.getElementById("submit-button");
var highScoreArea = document.getElementById("high-scores");

var questionsBank = [
  {
    text: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    text: "The condition in an if / else statement is encolsed within _____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parantheses",
  },
];

var score = 0;
var questionValue = 5;
var leaderboard = [];
var timeLeft = 30;
var questionIndex = 0;
var timerInterval;

// Actions Handlers
startQuizButton.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var storedScores = JSON.parse(localStorage.getItem("scores"));

  var highScore = {
    initials: document.getElementById("initial-field").value.trim(),
    score: score,
  };

  if (storedScores === null) {
    storedScores = [highScore];
  } else {
    storedScores.push(highScore);
  }

  // resort storedScores based on score (highest at the top)
  // storedScores = sortScores(storedScores);

  console.log(highScore);
  localStorage.setItem("scores", JSON.stringify(storedScores));
  showHighScores();
});

function showHighScores() {
  highScoreArea.innerHTML = "";
  var storedScores = JSON.parse(localStorage.getItem("scores"));
  for (var i = 0; i < storedScores.length; i++) {
    var score = document.createElement("p");
    score.textContent = storedScores[i].initials + ": " + storedScores[i].score;
    highScoreArea.appendChild(score);
  }
}

function timerStart() {
  timerInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = timeLeft;

    if (timeLeft <= 0) {
      timerStop();
    }
  }, 1000);
}

function timerStop() {
  timer.textContent = "0";
  clearInterval(timerInterval);
  showSection("all-done");
}

function answerSelected(event) {
  var choiceSelected = event.target.innerText;
  var isCorrect = questionsBank[questionIndex].answer === choiceSelected;

  // Ternerary Operator
  // questionFeedback.textContent = isCorrect ? "Correct" : "Wrong!";

  if (isCorrect) {
    questionFeedback.textContent = "Correct";
    score += questionValue;
  } else {
    timeLeft -= 10;
    questionFeedback.textContent = "Wrong!";
  }

  questionIndex++;
  setQuestion();
}

function setQuestion() {
  if (questionIndex >= questionsBank.length) {
    showAllDone();
  } else {
    var question = questionsBank[questionIndex];
    questionHeader.textContent = question.text;

    answerChoices.innerHTML = "";

    for (var choice of question.choices) {
      var button = document.createElement("button");
      button.textContent = choice;
      button.className = "button-choice";

      button.addEventListener("click", answerSelected);
      answerChoices.appendChild(button);
    }
  }
}

function showSection(sectionID) {
  for (var section of mainContent.children) {
    if (section.id === sectionID) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  }
}

function showAllDone() {
  timerStop();
  showSection("all-done");
  showHighScores();
}

function startQuiz() {
  showSection("question-section");
  timerStart();

  setQuestion();
}
