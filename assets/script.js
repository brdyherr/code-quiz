// Timer that counts down from 75 seconds

// GIVEN I am taking a code quiz
// WHEN I click the start button
var correctCount = 0;

var incorrectCount = 0;
var startButton = $("#submit");
startButton.click(startGame);
var totalTime = 75;
function startTimer(countDown) {
  totalTime--;
  $("#totalTime").text(totalTime);
}
// THEN a timer starts and I am presented with a question
var questions = [
  {
    title: "Commonly used data types DO Not Include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts",
  },
  {
    title: "The condition in an if / else statement is enclosed with________.",
    choices: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    answer: "Parenthesis",
  },
  {
    title: "Arrays in JavaScript can be used to store______.",
    choices: [
      "Numbers and Strings",
      "Other Arrays",
      "Booleans",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    title:
      "String values must be enclosed within ______ when being assigned to variables.",
    choices: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
    answer: "Quotes",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "Terminal/Bash", "for loops", "console.log"],
    answer: "console.log",
  },
];
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

// The quiz will start with a score of 0.
var score = 0;
var questionNum = 0;
var gameOver = false;
var timer;

function createQuestion(questNum) {
  $("#questions").html(null);
  let questionObj = questions[questNum];
  let questionHtml = $("<div>");

  // adding title; creating HTML <p> by jQuery
  let title = $("<p>");
  title.text(questionObj.title);
  questionHtml.append(title);

  // adding the choices for the question
  let list = $("<ol>");

  questionHtml.append(title);
  for (let i = 0; i < questionObj.choices.length; i++) {
    let listItem = $("<li>");
    listItem.click(function () {
      clickAnswer(questionObj.choices[i]);
    });
    listItem.text(questionObj.choices[i]);
    list.append(listItem);
  }
  questionHtml.append(list);

  $("#questions").append(questionHtml);
}

function clickAnswer(answerChoice) {
  let correctChoice = questions[questionNum - 1].answer;
  if (correctChoice == answerChoice) {
    _log("correct");
    correctCount++;
  } else {
    incorrectCount++;
    _log("incorrect");
  }
  if (questionNum == questions.length - 1) {
    // last question
    _log(
      `Here is your score CORRECT and INCORRECT ${correctCount} ${incorrectCount}`
    );
    gameOver = true;
    stopTimer();
  } else {
    questionNum++;
    createQuestion(questionNum);
  }
}

var _log = (str) => {
  console.log(str);
};

function startGame() {
  questionNum = 0;
  timer = setInterval(startTimer, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function changeQuestion() {
  createQuestion(questionNum);
  if (questionNum + 1 == questions.length) {
    stopTimer();
  }
  questionNum++;
}
