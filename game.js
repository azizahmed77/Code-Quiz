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
// THEN I can save my initials and score

const timerEl = document.getElementById('time-left')
let timeLeft = 80

const start = document.getElementById('start-btn')
const homePage = document.getElementById('home')
const quizPage = document.getElementById('quiz-content')
quizPage.style.display = "none"
const currentQuestion = document.getElementById('current-question')
const choiceList = document.getElementById('question-choices')
const choiceOne = document.getElementById('choice1')
const choiceTwo = document.getElementById('choice2')
const choiceThree = document.getElementById('choice3')
const choiceFour = document.getElementById('choice4')
const gameoverPage = document.getElementById('game-over')
gameoverPage.style.display = "none"
let initials = document.getElementById('initials')
const scoresPage = document.getElementById('scores-page')
scoresPage.style.display = "none"

let input = document.getElementById('input')
const restart = document.getElementById('restart')

let score = 0
let allScores = document.getElementById("scores-list")
//let highScores = []


let allQuestions = [
    {
        question: "Inside which HTML element do we put the JavaScript?:",
        choice1: "<js>",
        choice2: "<script>",
        choice3: "<link>",
        choice4: "<h1>",
        answer: "<script>"

    },
    {
        question: "Where is the correct place to insert a JavaScript?:",
        choice1: "The <head> section",
        choice2: "The <body> section",
        choice3: "The <header> section",
        choice4: "All of the above",
        answer: "The <body> section"

    },
    {
        question: "Arrays in JavaScript can be used to store:",
        choice1: "Numbers and strings",
        choice2: "Other arrays",
        choice3: "Booleans",
        choice4: "All of the above",
        answer: "All of the above"

    },
    {
        question: "String values must be enclosed within when being assigned to variables:",
        choice1: "Commas",
        choice2: "Curly brackets",
        choice3: "Quotes",
        choice4: "Parenthesis",
        answer: "Quotes"

    },
    {
        question: "Which one has the correct syntax to start an IF statement?",
        choice1: "for(i=0; i<=5)",
        choice2: "for(i=0; i<=5;i++)",
        choice3: "for i = 1 to 5",
        choice4: "for(i<=5;i++)",
        answer: "for(i=0; i<=5;i++)"

    }


]





let timer = () => {
  let countdown = setInterval(function() {
    if(timeLeft > 1) {
        timerEl.textContent = timeLeft 
        timeLeft--
    }
    else if(timeLeft === 1) {
        timerEl.textContent = timeLeft
        timeLeft-- 
    }
    else {
        timerEl.textContent = ''
        clearInterval(countdown)
        
    }
  }, 1000)

}

let index = 0

let newQuestion = () => {
    if(index < allQuestions.length) {
        currentQuestion.textContent = allQuestions[index].question 
        choice1.textContent = allQuestions[index].choice1
        choice2.textContent = allQuestions[index].choice2
        choice3.textContent = allQuestions[index].choice3
        choice4.textContent = allQuestions[index].choice4
    }
}

let gameOver = () => {
   
    quizPage.style.display="none";
    document.getElementById('header').style.display = "none"
    gameoverPage.style.display = "block"
    document.getElementById("score").textContent= 'Your score is:' + score;
        
}

choiceOne.addEventListener('click', function(event) {
    event.stopPropagation();
    answer = allQuestions[index].answer
    console.log(event.target.textContent)
    if(event.target.textContent === answer) {
        score++
    }
    else {
        timeLeft = timeLeft -10
    }
    if(index >= allQuestions.length -1 ) {
        gameOver()
    }
    else {
    index++
    newQuestion()
    }

})

choiceTwo.addEventListener('click', function(event) {
    event.stopPropagation();
    answer = allQuestions[index].answer
    console.log(event.target.textContent)
    if(event.target.textContent === answer) {
        score++
        console.log(score)
    }
    else {
        timeLeft = timeLeft -10
    }
    if(index >= allQuestions.length -1 ) {
        gameOver()
    }
    else {
    index++
    newQuestion()
    }

})

choiceThree.addEventListener('click', function(event) {
    event.stopPropagation();
    answer = allQuestions[index].answer
    console.log(event.target.textContent)
    if(event.target.textContent === answer) {
        score++
        
    }
    else {
        timeLeft = timeLeft -10
    }
    if(index >= allQuestions.length - 1) {
        gameOver()
    }
    else {
    index++
    newQuestion()
    }

})

choiceFour.addEventListener('click', function(event) {
    event.stopPropagation();
    answer = allQuestions[index].answer
    console.log(event.target.textContent)
    if(event.target.textContent === answer) {
        score++
        console.log('hello')
    }
    else {
        timeLeft = timeLeft -10
    }
    if(index >= allQuestions.length - 1) {
        gameOver()
    }
    else {
    index++
    newQuestion()
    }

})

let submit = (event) => {
    event.preventDefault()
    quizPage.style.display="none";
    document.getElementById('header').style.display = "none"
    gameoverPage.style.display = "none"
    scoresPage.style.display = "block"
    
    let entry = {
        name: initials.value,
        score: score
    }
  
    const highScores = JSON.parse(localStorage.getItem("highScores")) || []
    highScores.push(entry);
    localStorage.setItem("highScores", JSON.stringify(highScores))

    

    allScores.innerHTML = ''
    for(i=0;i<highScores.length;i++) {
        let newScore = document.createElement('li')
        newScore.setAttribute("class", "list-group-item bg-info")
        newScore.textContent = `${highScores[i].name}: ${highScores[i].score}`
        allScores.appendChild(newScore)
        
    }
  
    //storeScore()
    //getScores()
    
}

/*let storeScore = () => {
    localStorage.setItem("highScores", JSON.stringify(highScores));

}
let getScores = () => {
    let savedScores = JSON.parse(localStorage.getItem("highScores"))

    if (savedScores !== null) {
        highScores = savedScores;
    }
}*/



input.addEventListener('submit', submit)








let startQuiz = () => {
    homePage.style.display = "none"
    quizPage.style.display = "block"
    timer()
    newQuestion()
}

let restartQuiz = () => {
    scoresPage.style.display = "none"
    location.reload()
}

start.addEventListener('click', startQuiz)
restart.addEventListener('click', restartQuiz)

