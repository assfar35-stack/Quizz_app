/** * 1. CONFIGURATION & STATE 
 */
const urlParams = new URLSearchParams(window.location.search);
const currentSubject = urlParams.get('subject') || 'HTML';
// Assumes quizData is loaded from your data.js file
const questions = quizData[currentSubject] || [];

const subjectIcons = {
  'HTML': './assets/icons/iconhtml.svg',
  'CSS': './assets/icons/iconcss.svg',
  'JavaScript': './assets/icons/iconjs.svg',
  'Accessibility': './assets/icons/iconaccses.svg'
};

// SVG or Image for the error icon (as seen in your screenshot)
const iconIncorrect = `<img src="assets/icons/wrong.png" alt="incorrect" class="w-8 h-8 md:w-10 md:h-10">`;
const iconCorrect = `<img src="assets/icons/correct.png" alt="correct" class="w-8 h-8 md:w-10 md:h-10 ml-auto">`;

let currentIdx = 0;
let score = 0;
let selectedBtn = null;
let isAnswered = false;

// DOM Elements
const questionTitle = document.getElementById('question-title');
const questionCounter = document.getElementById('question-counter');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const progressBar = document.getElementById('progress-bar');
const errorMsg = document.getElementById('error-message');
const errorIconContainer = document.getElementById('error-icon-container');

// Initial Setup: Set Header Icon and Title
document.getElementById('subject-title').textContent = currentSubject;
document.getElementById('subject-icon').src = subjectIcons[currentSubject] || subjectIcons['HTML'];

/** * 2. CORE FUNCTIONS
 */

// Function to draw the question and buttons
function renderQuestion() {
  const data = questions[currentIdx];
  isAnswered = false;
  selectedBtn = null;
  
  // Update Text & Progress Bar
  questionTitle.textContent = data.question;
  questionCounter.textContent = `Question ${currentIdx + 1} of ${questions.length}`;
  
  // Calculate Progress
  const progressPercent = ((currentIdx + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
  
  // Reset UI
  submitBtn.textContent = "Submit Answer";
  errorMsg.classList.add('hidden');
  errorIconContainer.innerHTML = ''; 
  optionsContainer.innerHTML = '';

  // Create Option Buttons
  data.options.forEach((option, i) => {
    const char = String.fromCharCode(65 + i); // A, B, C, D
    const btn = document.createElement('button');
    
    // Classes match the design in your screenshot
    btn.className = "option-btn group w-full flex items-center gap-4 bg-[#3b4d66] p-4 md:p-5 rounded-2xl md:rounded-[24px] border-[3px] border-transparent transition-all shadow-sm text-left outline-none";
    
    btn.innerHTML = `
      <div class="letter-box w-10 h-10 md:w-14 md:h-14 rounded-lg bg-[#f4f6fa] flex items-center justify-center shrink-0 text-[#626c7f] font-medium text-[20px] md:text-[28px] transition-colors">
        ${char}
      </div>
      <span class="option-text text-[18px] md:text-[28px] font-medium text-white flex-1">${option}</span>
      <div class="icon-container ml-auto"></div>
    `;
    
    btn.onclick = () => handleSelect(btn);
    optionsContainer.appendChild(btn);
  });
}

// Function to handle clicking an option
function handleSelect(btn) {
  if (isAnswered) return; // Don't allow changes after submitting
  
  errorMsg.classList.add('hidden');
  errorIconContainer.innerHTML = '';

  // Reset all buttons to default (unselected) state
  document.querySelectorAll('.option-btn').forEach(b => {
    b.classList.replace('border-[#a729f5]', 'border-transparent');
    const box = b.querySelector('.letter-box');
    box.classList.remove('bg-[#a729f5]', 'text-white');
    box.classList.add('bg-[#f4f6fa]', 'text-[#626c7f]');
  });

  // Highlight the chosen button with Purple
  selectedBtn = btn;
  btn.classList.replace('border-transparent', 'border-[#a729f5]');
  
  const letterBox = btn.querySelector('.letter-box');
  letterBox.classList.remove('bg-[#f4f6fa]', 'text-[#626c7f]');
  letterBox.classList.add('bg-[#a729f5]', 'text-white');
}

// Function to check if the answer is right
function validateAnswer() {
  if (!selectedBtn) {
    errorMsg.classList.remove('hidden');
    errorIconContainer.innerHTML = iconIncorrect; 
    return;
  }

  isAnswered = true;
  const data = questions[currentIdx];
  const chosenText = selectedBtn.querySelector('.option-text').textContent;
  const isCorrect = chosenText === data.answer;

  if (isCorrect) score++;

  // Show correct/incorrect colors on buttons
  document.querySelectorAll('.option-btn').forEach(btn => {
    const btnText = btn.querySelector('.option-text').textContent;
    const letterBox = btn.querySelector('.letter-box');
    
    if (btnText === data.answer) {
      // Show correct answer in green
      applyStatus(btn, letterBox, '#22c55e', 'assets/icons/correct.png');
    } else if (btn === selectedBtn && !isCorrect) {
      // Show user's wrong choice in red
      applyStatus(btn, letterBox, '#ef4444', 'assets/icons/wrong.png');
    }
  });

  submitBtn.textContent = (currentIdx < questions.length - 1) ? "Next Question" : "Finish Quiz";
}

// Helper function to apply green/red colors
function applyStatus(btn, box, colorHex, iconPath) {
  btn.style.borderColor = colorHex;
  box.style.backgroundColor = colorHex;
  box.classList.add('text-white');
  btn.querySelector('.icon-container').innerHTML = `<img src="${iconPath}" class="w-8 h-8">`;
}

/** * 3. EVENTS
 */

submitBtn.addEventListener('click', () => {
  if (!isAnswered) {
    validateAnswer();
  } else {
    currentIdx++;
    currentIdx < questions.length ? renderQuestion() : finishQuiz();
  }
});

function finishQuiz() {
  document.querySelector('main').innerHTML = `
    <div class="flex flex-col lg:flex-row gap-12 w-full max-w-[1160px] mx-auto items-start">
      <div class="flex-1">
        <h2 class="text-white text-[40px] md:text-[64px] font-light leading-tight">Quiz completed</h2>
        <h3 class="text-white text-[40px] md:text-[64px] font-medium leading-tight">You scored...</h3>
      </div>
      <div class="flex-1 w-full max-w-[564px]">
        <div class="bg-[#3b4d66] p-8 md:p-12 rounded-[24px] flex flex-col items-center shadow-lg">
          <div class="flex items-center gap-4 mb-10">
              <img src="${subjectIcons[currentSubject]}" class="w-10 h-10">
              <span class="text-white text-[18px] md:text-[28px] font-medium">${currentSubject}</span>
          </div>
          <span class="text-white text-[88px] md:text-[144px] font-medium leading-none">${score}</span>
          <p class="text-[#abc1e1] text-[18px] md:text-[24px] mt-4">out of ${questions.length}</p>
        </div>
        <button onclick="location.href='index.html'" class="w-full bg-[#a729f5] hover:opacity-70 transition-all text-white text-[18px] md:text-[28px] font-medium py-4 md:py-8 rounded-2xl md:rounded-[24px] mt-8 shadow-lg">
          Play Again
        </button>
      </div>
    </div>
  `;
}

// Start the quiz
renderQuestion();