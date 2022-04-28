//Most of the following code has been influenced and sourced from the following references:
//Brian Design (2020) quiz-app-js source code (Version 1.0)[Source Code] https://www.youtube.com/watch?v=f4fB9Xg2JEY&t=3255s
//Learn{to}Code (2021) Building Quiz App with HTML, CSS and JavaScript (Version 1.0)[Source Code] https://www.youtube.com/watch?v=icb9AUBeznQ&t=1788s
 
//dom querying to grab the id and store it in a variable
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

//currentQuestions object
let currentQuestion = {}
//acceptingAnswers variable allows for there to be a delay between questions
let acceptingAnswers = true
//score 
let score = 0
//how many questions the user has completed
let questionCounter = 0
//an array to store all of the available questions
let availableQuestions = []

//constraints
const MAX_QUESTIONS = 10

//array of questions that will be displayed to the user randomly
let questions = [
    {
        question: "Where can you find the Eiffel Tower?",
        choice1: "Paris",
        choice2: "Lille",
        choice3: "Marseille",
        choice4: "Lyon",
        answer: 1,
    },
    {
        question: "The tallest building in the world is located in which city?", 
        choice1: "Dubai",
        choice2: "New York",
        choice3: "Shanghai",
        choice4: "England",
        answer: 1,
    },
    {
        question: "What is the smallest country listed?",
        choice1: "Monaco",
        choice2: "Vatican City",
        choice3: "Luxembourg",
        choice4: "Malta",
        answer: 2,
    },
    {
        question: "In which country is the humble 'thumbs up' considered a great insult?",
        choice1: "China",
        choice2: "Ethiopia",
        choice3: "Iran",
        choice4: "Azerbaijan",
        answer: 3,
    },
    {
        question: "Which lake is famously referred to as the 'Jewel of the Italian Lakes?'",
        choice1: "Lake Como",
        choice2: "Lake Garda",
        choice3: "Lake Iseo",
        choice4: "Lake Orta",
        answer: 1,
    },
    {
        question: "What colours make up the Seychelles flag?",
        choice1: "Green, Blue, Red",
        choice2: "Blue, Green White, Yellow, Red",
        choice3: "Green, White, Red",
        choice4: "Yellow, Red, White, Blue",
        answer: 2,
    },
    {
        question: "Which island group includes Ibiza, Menorca and Majorca?",
        choice1: "Canary Islands",
        choice2: "Balearic Islands",
        choice3: "Galapagos Islands",
        choice4: "Channel Islands",
        answer: 2,
    },
    {
        question: "What was the original purpose of the leaning tower of Pisa?",
        choice1: "As a Pizza Hut",
        choice2: "As a helter skelter ride",
        choice3: "As a beacon",
        choice4: "As a bell tower",
        answer: 4,
    },
    {
        question: "What is the scientific name for the Northern Lights?",
        choice1: "Glowy Sky Lights",
        choice2: "Southern Lights",
        choice3: "Aurora Borealis",
        choice4: "Lighty McLightface",
        answer: 3,
    },
    {
        question: "How many Japanese islands are there?",
        choice1: "3",
        choice2: "27",
        choice3: "186",
        choice4: "6852",
        answer: 4,
    }
]

//an arrow function that is called to start the quiz
//using arrow functions makes it more concise
startQuiz = () => {
    //using spread operator, questions array is put into a new array
    availableQuestions = [...questions]
    getNewQuestion()
}

//an arrow function to get a new question
getNewQuestion = () => {
    //if there are no questions left in the array...
    if(availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
        //stores the final score of the user into memory to be used in the end.js file
        localStorage.setItem('mostRecentScore', score)
        //opens the end.html file due to there being no questions left
        return window.location.assign('end.html')
    }


    //if there are questions left, program follows through with this code

    //increment question count by 1
    questionCounter++
    //questions numbers are updated using the variables below
    progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`
    //the width of the progressbar is determined by the percentage calculated by this line
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    //new variable created or storing a random number from index 0 to how many questions are left 
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    //question displayed on the interface is decided by the random number chosen above
    currentQuestion = availableQuestions[questionsIndex]
    //this line displays the questions to the interface
    question.innerText = currentQuestion.question

    //
    choices.forEach(choice => {
        //a varibale that stores the number of the choice that the user makes
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    //removes 1 item at the just used question index 
    //if this line wasn't included, the program would display 11 questions and would repeat questions
    availableQuestions.splice(questionsIndex, 1)

    //inclusing this means the user can actually answer the questions
    acceptingAnswers = true
}

choices.forEach(choice => {
    //an eventListener is used so that the program knows what what answer has been chosen
    choice.addEventListener('click', e => {
        //if the program isn't ready for the user to answer yet, we will just ignore there actions
        if(!acceptingAnswers) return

        //after user has selected, they can't then immediatly select another answer
        acceptingAnswers = false
        //the selectedChoice as a whole is stored in this variable
        const selectedChoice = e.target
        //the number of the selectedChoice is stored in this variable
        const selectedAnswer = selectedChoice.dataset['number']

        //default classToApply is incorrect, however, if the selectedAnswer is correct it'll change that value
        let classToApply = 'incorrect'
            //if the answer chosen by the user matches the number of the answer in the question array then...
            if (selectedAnswer == currentQuestion.answer) {
                classToApply = 'correct'
            }

        //if correct, the users' score will increment by 1 and then displayed on the interface
        if(classToApply == 'correct') {
            score += 1
            scoreText.innerText = `Score: ${score}`
        }

        //sets the background of the choice as either correct or incorrect
        selectedChoice.parentElement.classList.add(classToApply)

        //setTimeout allows for a delay before moving onto the next question
        setTimeout(() => {
            //removes the background colour from the choice selected before moving onto the next question
            //if not included, the correct or incorrect image would stay as the background throughout the remainder of the quiz
            selectedChoice.parentElement.classList.remove(classToApply)
            //the getnewQuestion function is then called
            getNewQuestion()

            //a wait of 750 milliseconds is used from displaying the current question to the next
        }, 750)
    })
})

//start quiz is called in order to...start the quiz
startQuiz()