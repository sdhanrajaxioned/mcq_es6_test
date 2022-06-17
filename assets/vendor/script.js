const question = document.querySelector('.question'),
  questionContainer = document.querySelector('.question-container'),
  choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {},
  acceptingAnswers = false,
  score = 0,
  questionCounter = 0,
  availableQuestions = [],
  questions = [];

const maxQuestions = 10;

//fetch mcq questions from api
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')
  .then((response) => response.json())
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => { //
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      answerChoices.splice(formattedQuestion.answer-1, 0, loadedQuestion.correct_answer);
      answerChoices.forEach((choice, index) => formattedQuestion['choice' + (index + 1)] = choice);

      return formattedQuestion;
    });
    startTest();
  })
  .catch((error) => alert.error(error));
  
//function to display questions on page load
const startTest = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

//function to generate newQuesetions
getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem('score', score);
      //go to the end page
      return window.location.assign('end.html');
  }

  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

//checks whethere selected choice is correct or not
choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if(classToApply === 'correct') {
      score++;
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);  
      getNewQuestion();
    }, 1000);
  });
});