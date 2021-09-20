const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 
        'What is a JavaScript element that represents either TRUE or FALSE values?',
        choice1: 'Boolean',
        choice2: 'Event',
        choice3: 'String',
        choice4: 'Function',
        answer: 1,
    },
    {
        question:
            "In JavaScript, what element is used to store multiple values in a single variable?",
        choice1: "Arrays",
        choice2: "Strings",
        choice3: "Closing Statement",
        choice4: "Code Block",
        answer: 1,
    },
    {
        question:
         "In JavaScript, what is a block of code called that is used to perform a specific task?",
        choice1: "String",
        choice2: "Variable",
        choice3: "Function",
        choice4: "Declaration",
        answer: 3,
    },
    {
        question:
         "What is the name of the object that allows you to perform mathematical tasks?",
        choice1: "Math",
        choice2: "Count",
        choice3: "Solve",
        choice4: "Number",
        answer: 1,
    },
    {
        
        question:
         "What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",
        choice1: "Function",
        choice2: "Loop",
        choice3: "Repeat",
        choice4: "Number",
        answer: 2,
    }
]

const SCORE_POINTS = 5
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()