// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score
// The quiz will start with a score of 0.

var correctCount = 0;
var incorrectCount = 0;
var startButton = $("#submit");
var totalTime = 75;

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

var score = 0;
var questionNum = 0;
var timer;

startButton.click(startGame);
$("#results button").click(saveScore);
$("#results").hide();

// save initials, get the score, feedback to user
function saveScore() {
  var initials = $("#results input").val();
  var score = $("#results input + input").val();
  localStorage.setItem(initials, score);
  alert("Saved!");
}

function endGame() {
  var score = (100 * correctCount) / (correctCount + incorrectCount);
  $("#questions").html(`Your score is ${score}%`);
  $("#results input").val("");
  $("#results input + input").val(score);
  $("#results").show();
}

function startTimer(countDown) {
  totalTime--;
  $("#totalTime").text(totalTime);
  if (totalTime <= 0) {
    stopTimer();
    endGame();
  }
}
function createQuestion(questNum) {
  $("#questions").empty();
  let questionObj = questions[questNum];
  let questionHtml = $("<div>");

  // adding title; creating HTML <p> by jQuery
  let title = $("<p>");
  title.text(questionObj.title);
  questionHtml.append(title);

  // adding the choices for the question
  let list = $("<ol>");

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
    totalTime -= 15;
  }
  if (questionNum == questions.length - 1) {
    // last question
    _log(
      `Here is your score CORRECT and INCORRECT ${correctCount} ${incorrectCount}`
    );
    stopTimer();
    endGame();
  } else {
    questionNum++;
    createQuestion(questionNum);
  }
}

var _log = (str) => {
  console.log(str);
};

function startGame() {
  $("#results").hide();
  questionNum = 0;
  correctCount = 0;
  incorrectCount = 0;
  totalTime = 75;
  timer = setInterval(startTimer, 1000);
  changeQuestion();
}

function stopTimer() {
  clearInterval(timer);
}

function changeQuestion() {
  createQuestion(questionNum);
  if (questionNum + 1 == questions.length) {
    stopTimer();
    endGame();
  }
  questionNum++;
}
