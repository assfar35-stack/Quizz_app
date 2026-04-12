const urlParams = new URLSearchParams(window.location.search);


const currentSubject = urlParams.get('subject');

console.log("The user clicked on:", currentSubject);


const questions = quizData[currentSubject];

// 2. Set up the Quiz "State"
let currentQuestionIndex = 0; // Starts at 0 (the first question in the array)
let score = 0;

// 3. Select the HTML elements
const questionTitle = document.getElementById('question-title');
const questionCounter = document.getElementById('question-counter');

function renderQuestion() {
  // Get the current question object based on the index
  const currentQuestionData = questions[currentQuestionIndex];

  // Update the HTML text content
  questionTitle.textContent = currentQuestionData.question;
  
  // Update the counter (adding 1 because arrays start at 0)
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

// 5. Run the function immediately to show the first question
renderQuestion();