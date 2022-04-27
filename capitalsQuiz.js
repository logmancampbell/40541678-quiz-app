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
        question: "What is the capital of Argentina?",
        choice1: "Quito",
        choice2: "Santiago",
        choice3: "Caracas",
        choice4: "Buenos Aires",
        answer: 4,
    },
    {
        question: "What is the capital of Thailand?",
        choice1: "hanoi",
        choice2: "Bangkok",
        choice3: "Vientiane",
        choice4: "Phnom Penh",
        answer: 2,
    },
    {
        question: "What is the capital of Turkey?",
        choice1: "Baghdad",
        choice2: "Tehran",
        choice3: "Ankara",
        choice4: "Sophia",
        answer: 3,
    },
    {
        question: "What is the capital of United States?",
        choice1: "California",
        choice2: "Maine",
        choice3: "Washington DC",
        choice4: "New York",
        answer: 3,
    },
    {
        question: "What is the capital of the UK?",
        choice1: "London",
        choice2: "Edinburgh",
        choice3: "Dublin",
        choice4: "Cardiff",
        answer: 1,
    },
    {
        question: "What is the capital of Ukraine?",
        choice1: "Budapest",
        choice2: "Chisinau",
        choice3: "Bucharest",
        choice4: "Kiev",
        answer: 4,
    },
    {
        question: "What is the capital of Norway?",
        choice1: "Oslo",
        choice2: "Reykjavik",
        choice3: "Copenhagen",
        choice4: "Helsinki",
        answer: 1,
    },
    {
        question: "What is the capital of Palau?",
        choice1: "Port Vila",
        choice2: "Tarawa",
        choice3: "Ngerulmud",
        choice4: "Yaren",
        answer: 3,
    },
    {
        question: "What is the capital of Romania?",
        choice1: "Belgrade",
        choice2: "Bucharest",
        choice3: "Brussels",
        choice4: "Baku",
        answer: 2,
    },
    {
        question: "What is the capital of kyrgyzstan?",
        choice1: "Bishkek",
        choice2: "Kabul",
        choice3: "Dushanbe",
        choice4: "Tashkent",
        answer: 1,
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