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
        question: "Which flag has 3 vertical stripes of green, white and green?",
        choice1: "Nigeria",
        choice2: "France",
        choice3: "Ghana",
        choice4: "Spain",
        answer: 1,
    },
    {
        question: "Which country has a red circle with a green background?",
        choice1: "Bangladesh",
        choice2: "Papua New Guinnea",
        choice3: "Japan",
        choice4: "England",
        answer: 1,
    },
    {
        question: "Which country has a triangular shaped flag?",
        choice1: "Switzerland",
        choice2: "Nepal",
        choice3: "Cambodia",
        choice4: "Swaziland",
        answer: 2,
    },
    {
        question: "Which country has the star of david on it?",
        choice1: "China",
        choice2: "Vietnam",
        choice3: "Isreal",
        choice4: "Myanmar",
        answer: 3,
    },
    {
        question: "Which colours make up the Tajikistan flag?",
        choice1: "Red, White, Green, Yellow",
        choice2: "red, White, Black",
        choice3: "Red, White Green, Blue",
        choice4: "Green, Black, White",
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
        question: "What is unique about the Mozambique flag?",
        choice1: "It's not rectangular",
        choice2: "It has an AK-47 on it",
        choice3: "It's the newest national flag",
        choice4: "Mozambique has no national flag",
        answer: 2,
    },
    {
        question: "Which African country has a flag that’s the reverse of the Irish flag?",
        choice1: "Senegal",
        choice2: "Niger",
        choice3: "Eretria",
        choice4: "Cote d'Ivoire",
        answer: 4,
    },
    {
        question: "What do the flags of Albania, Sri Lanka and Kazakhstan all contain?",
        choice1: "Writing",
        choice2: "Books",
        choice3: "Animals",
        choice4: "The colour green",
        answer: 3,
    },
    {
        question: "What can be seen on the Malawi flag?",
        choice1: "A singular circle",
        choice2: "A temple",
        choice3: "A hammer and sickle",
        choice4: "A rising sun",
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