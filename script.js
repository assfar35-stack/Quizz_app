console.log("1. Script successfully started!");

// 1. URL Parameter Setup
const urlParams = new URLSearchParams(window.location.search);
const currentSubject = urlParams.get('subject');
console.log("2. The subject picked is:", currentSubject);

// 2. Fetch the data
const questions = quizData[currentSubject];
console.log("3. The questions loaded are:", questions);

// 3. Application State
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionText = null;
let isAnswerSubmitted = false;

// 4. DOM Elements
const questionTitle = document.getElementById('question-title');
const questionCounter = document.getElementById('question-counter');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const errorMessage = document.getElementById('error-message');
const progressBar = document.getElementById('progress-bar');

const alphabet = ['A', 'B', 'C', 'D'];

// Helper function to escape HTML special characters
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// The exact SVG code for the Correct and Incorrect icons
const iconCorrect = `<svg class="w-8 h-8 md:w-10 md:h-10 ml-auto" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5ZM20 32.5C13.1064 32.5 7.5 26.8936 7.5 20C7.5 13.1064 13.1064 7.5 20 7.5C26.8936 7.5 32.5 13.1064 32.5 20C32.5 26.8936 26.8936 32.5 20 32.5ZM28.6187 14.2813C28.1305 13.793 27.3389 13.793 26.8507 14.2813L17.5 23.632L13.1493 19.2813C12.6611 18.793 11.8695 18.793 11.3813 19.2813C10.893 19.7695 10.893 20.5611 11.3813 21.0493L16.616 26.284C17.1043 26.7723 17.8959 26.7723 18.384 26.284L28.6187 16.0493C29.1069 15.5611 29.1069 14.7695 28.6187 14.2813Z" fill="#2fd887"/></svg>`;

const iconIncorrect = `<svg class="w-8 h-8 md:w-10 md:h-10 ml-auto" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5ZM20 32.5C13.1064 32.5 7.5 26.8936 7.5 20C7.5 13.1064 13.1064 7.5 20 7.5C26.8936 7.5 32.5 13.1064 32.5 20C32.5 26.8936 26.8936 32.5 20 32.5ZM25.8839 14.1161C25.3956 13.6278 24.6044 13.6278 24.1161 14.1161L20 18.2322L15.8839 14.1161C15.3956 13.6278 14.6044 13.6278 14.1161 14.1161C13.6278 14.6044 13.6278 15.3956 14.1161 15.8839L18.2322 20L14.1161 24.1161C13.6278 24.6044 13.6278 25.3956 14.1161 25.8839C14.6044 26.3722 15.3956 26.3722 15.8839 25.8839L20 21.7678L24.1161 25.8839C24.6044 26.3722 25.3956 26.3722 25.8839 25.8839C26.3722 25.3956 26.3722 24.6044 25.8839 24.1161L21.7678 20L25.8839 15.8839C26.3722 15.3956 26.3722 14.6044 25.8839 14.1161Z" fill="#ee5454"/></svg>`;

console.log("4. Successfully grabbed all HTML elements!");

// 5. The Render Function
function renderQuestion() {
  console.log("5. Attempting to render the question...");
  
  const currentQuestionData = questions[currentQuestionIndex];

  questionTitle.textContent = currentQuestionData.question;
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  optionsContainer.innerHTML = '';
  selectedOptionText = null;
  isAnswerSubmitted = false;
  submitBtn.textContent = "Submit Answer";
  errorMessage.classList.add('hidden');

  console.log("6. Attempting to build the buttons...");

  currentQuestionData.options.forEach((option, index) => {
    const escapedOption = escapeHtml(option);
    const buttonHTML = `
      <button class="option-btn group w-full flex items-center gap-4 md:gap-8 bg-blue-850 p-3 md:p-5 rounded-xl md:rounded-3xl hover:ring-2 hover:ring-white/10 transition-all shadow-lg text-left outline-none border-2 border-transparent">
        <div class="letter-box w-10 h-10 md:w-14 md:h-14 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 text-blue-500 font-medium text-[18px] md:text-[28px] transition-colors">
          ${alphabet[index]}
        </div>
        <span class="option-text text-[18px] md:text-[28px] font-medium text-white flex-1">${escapedOption}</span>
        
        <div class="icon-container ml-auto"></div>
      </button>
    `;
    optionsContainer.insertAdjacentHTML('beforeend', buttonHTML);
  });

  console.log("7. Buttons built successfully!");

  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      handleOptionClick(this, optionButtons);
    });
  });
}

function handleOptionClick(clickedBtn, allButtons) {
  if (isAnswerSubmitted) return; 
  errorMessage.classList.add('hidden');
  selectedOptionText = clickedBtn.querySelector('.option-text').textContent;

  allButtons.forEach(btn => {
    btn.classList.remove('border-purple-600');
    btn.querySelector('.letter-box').classList.remove('bg-purple-600', 'text-white');
    btn.querySelector('.letter-box').classList.add('bg-gray-50', 'text-blue-500');
  });

  clickedBtn.classList.add('border-purple-600');
  clickedBtn.querySelector('.letter-box').classList.remove('bg-gray-50', 'text-blue-500');
  clickedBtn.querySelector('.letter-box').classList.add('bg-purple-600', 'text-white');
}

submitBtn.addEventListener('click', () => {
  const currentQuestionData = questions[currentQuestionIndex];
  const optionButtons = document.querySelectorAll('.option-btn');

  if (isAnswerSubmitted) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      renderQuestion(); 
    } else {
      finishQuiz(); 
    }
    return;
  }

  if (!selectedOptionText) {
    errorMessage.classList.remove('hidden'); 
    return;
  }

  isAnswerSubmitted = true;
  const isCorrect = selectedOptionText === currentQuestionData.answer;
  if (isCorrect) score++;

  optionButtons.forEach(btn => {
  let btnText = btn.querySelector('.option-text').textContent;

  btn.classList.remove('border-purple-600');
  btn.querySelector('.letter-box').classList.remove('bg-purple-600');

  if (btnText === currentQuestionData.answer) {
    btn.classList.add('border-green-500');
    btn.querySelector('.letter-box').classList.remove('bg-gray-50', 'text-blue-500');
    btn.querySelector('.letter-box').classList.add('bg-green-500', 'text-white');
    btn.querySelector('.icon-container').innerHTML = iconCorrect;
  } else if (btnText === selectedOptionText && !isCorrect) {
    btn.classList.add('border-red-500');
    btn.querySelector('.letter-box').classList.remove('bg-gray-50', 'text-blue-500');
    btn.querySelector('.letter-box').classList.add('bg-red-500', 'text-white');
    btn.querySelector('.icon-container').innerHTML = iconIncorrect;
  }
});
  
  submitBtn.textContent = "Next Question";
});

function finishQuiz() {
  document.querySelector('main').innerHTML = `
    <section class="flex-1 lg:max-w-[50%] flex flex-col justify-start md:justify-center">
      <h2 class="text-[40px] md:text-[64px] font-light leading-tight">Quiz completed</h2>
      <h3 class="text-[40px] md:text-[64px] font-medium leading-tight">You scored...</h3>
    </section>
    <section class="flex-1 w-full max-w-[564px] flex flex-col mt-10 lg:mt-0">
      <div class="bg-blue-850 w-full p-8 md:p-12 rounded-[24px] flex flex-col items-center shadow-lg">
        <div class="flex items-center gap-4 mb-4 md:mb-10">
           <span class="text-[18px] md:text-[28px] font-medium">${currentSubject}</span>
        </div>
        <span class="text-[88px] md:text-[144px] font-medium leading-none">${score}</span>
        <p class="text-[18px] md:text-[24px] text-blue-300 mt-4 md:mt-6">out of ${questions.length}</p>
      </div>
      <button id="play-again-btn" class="w-full bg-purple-600 hover:bg-purple-600/50 transition-colors text-white text-[18px] md:text-[28px] font-medium py-3 md:py-6 rounded-xl md:rounded-3xl mt-6 shadow-lg">
        Play Again
      </button>
    </section>
  `;
  document.getElementById('play-again-btn').addEventListener('click', () => {
    window.location.href = 'index.html'; 
  });
}

renderQuestion();