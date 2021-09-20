const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text');
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let questionCounter = 0
let score = 0;
let avaliable questions = [];

let questions = [
    {
        question: 'In JS, what is a block of code called that is used to perform a specific task?',
        choice1: 'Variable',
        choice2: 'String',
        choice3: 'Declaration',
        choice4: 'Function',
        answer: 4
    },
    {
        question: 'What is the name of the object that allows you to perform mathematical tasks with the interpreter?',
        choice1: 'Solve',
        choice2: 'Number',
        choice3: 'Count',
        choice4: 'Math',
        answer: 4,
    },
    {
        question: 'What is the element called that is used to describe the set of variables, objects, and functions you explicitly have access to?',
        choice1: 'Scope',
        choice2: 'Range',
        choice3: 'Output',
        choice4: 'Restriction',
        answer: 1
    },
    {
        question: 'What group of tags are used to define the text headers in the body of the HTML document?',
        choice1: '<h1> to <h6>',
        choice2: '<header>',
        choice3: '<footer>',
        choice4: '<head>',
        answer: 1
    },
    {
        question:'What tag can be used to insert a line break or blank line in an HTML document?',
        choice1:'<title>',
        choice2: '<br></br>',
        choice3: '<break>',
        choice4: '<head>',
        answer: 2
    }
]

const SCORE_POINTS = 5
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion ();
}

getNewQuesion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

    questionsCounter++
    progressText.innerText = 'Question' ${questionCounter} 'of' ${MAX_QUESTIONS}
    progressBarFull.style.width = ${(questionCounter/MAX_QUESTIONS) * 100}%

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1 );

    acceptingAnswers = true;
}

choices.forEach( choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false;
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout (() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuesion();

        }, 1000)
    } )
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}