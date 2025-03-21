var questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Rome", correct: false },
            { text: "Paris", correct: true }
        ]
    },
    {
        question: "Which is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "Who developed the theory of relativity?",
        answers: [
            { text: "Isaac Newton", correct: false },
            { text: "Albert Einstein", correct: true },
            { text: "Galileo Galilei", correct: false },
            { text: "Nikola Tesla", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
            { text: "Pb", correct: false }
        ]
    },
    {
        question: "How many continents are there on Earth?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false }
        ]
    },
    {
        question: "Which programming language is known as the backbone of web development?",
        answers: [
            { text: "Python", correct: false },
            { text: "C++", correct: false },
            { text: "JavaScript", correct: true },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "What is the square root of 64?",
        answers: [
            { text: "6", correct: false },
            { text: "7", correct: false },
            { text: "8", correct: true },
            { text: "9", correct: false }
        ]
    }
];






document.addEventListener("DOMContentLoaded",function(){
    var startScreen = document.getElementById("start-screen");
    var quizContainer  = document.querySelector(".quiz");
    var startBtn  = document.getElementById("start-btn");
    

    startBtn.addEventListener("click",function(){
        startScreen.style.display = "none";
         quizContainer.style.display ="block";

         startQuiz();

    });


});


var allQuestion = document.getElementById("question");
var nextButton = document.getElementById("next-btn");
var answerbtn = document.getElementById("answer-button" );


let currentQuestionIndex = 0 ; // thats called declaration and initialization
let score = 0;


function randomQuestion(){
    questions.sort(()=>Math.random()- 0.5);
    questions =questions.slice(0,5);
}


function startQuiz(){
    randomQuestion();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion (){
    resetState();
    var  currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    allQuestion.innerHTML = questionNo + "." +currentQuestion.question ;


    currentQuestion.answers.forEach( answers=>{
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerbtn.appendChild(button);

        if(answers.correct){
            button.dataset.correct =answers.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}

function   resetState() {
    nextButton.style.display = "none";
    while(answerbtn.firstChild){
        answerbtn.removeChild(answerbtn.firstChild)
    }
}


function selectAnswer (e){
    const selectBtn =  e.target;
    const isCorrect = selectBtn.dataset.correct ==="true";
    if (isCorrect){
        selectBtn.classList.add("correct");
        score ++;
    }else{
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerbtn.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display ="block";
}
 





function  showScore(){
    resetState();
  allQuestion.innerHTML = `you scored ${score} out of ${questions.length}`
  nextButton.innerHTML = "play again";
  nextButton.style.display="block";
};

function  handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore();
    }
}


nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();