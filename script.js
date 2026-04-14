/** * 1. CONFIGURATION & STATE */
const urlParams = new URLSearchParams(window.location.search);
const currentSubject = urlParams.get('subject') || 'HTML';

// This checks if quizData actually exists in your other file
console.log("1. Checking quizData:", typeof quizData !== 'undefined' ? "Found!" : "NOT FOUND!");
const questions = (typeof quizData !== 'undefined') ? quizData[currentSubject] : [];
console.log("2. Questions loaded for " + currentSubject + ":", questions);

const subjectIcons = {
  'HTML': './assets/icons/iconhtml.svg',
  'CSS': './assets/icons/iconcss.svg',
  'JavaScript': './assets/icons/iconjs.svg',
  'Accessibility': './assets/icons/iconaccses.svg'
};

const iconIncorrect = `<img src="assets/icons/wrong.png" alt="incorrect" class="w-8 h-8 md:w-10 md:h-10">`;

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

// Initial UI Setup
document.getElementById('subject-title').textContent = currentSubject;
document.getElementById('subject-icon').src = subjectIcons[currentSubject] || subjectIcons['HTML'];

function escapeHtml(text) {
  if (!text) return ""; 
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

/** * 2. CORE FUNCTIONS */

function renderQuestion() {
  if (!questions || questions.length === 0) {
      console.error("STOPPED: No questions found. Check if your data.js subject matches the URL.");
      return;
  }

  const data = questions[currentIdx];
  console.log("3. Rendering Question:", data.question);
  console.log("4. Options found:", data.options); // THIS SHOULD NOT BE EMPTY

  isAnswered = false;
  selectedBtn = null;
  
  questionTitle.textContent = data.question;
  questionCounter.textContent = `Question ${currentIdx + 1} of ${questions.length}`;
  progressBar.style.width = `${((currentIdx + 1) / questions.length) * 100}%`;
  
  submitBtn.textContent = "Submit Answer";
  errorMsg.classList.add('hidden');
  errorIconContainer.innerHTML = ''; 
  optionsContainer.innerHTML = '';

  // If data.options is missing, this loop won't run, resulting in empty boxes
  if (!data.options) {
      optionsContainer.innerHTML = "<p class='text-white'>Error: No options found in your data file.</p>";
      return;
  }

  data.options.forEach((option, i) => {
    const char = String.fromCharCode(65 + i); 
    const escapedOption = escapeHtml(option);
    
    const btn = document.createElement('button');
    btn.className = "option-btn group w-full flex items-center gap-4 bg-[#3b4d66] p-4 md:p-5 rounded-2xl md:rounded-[24px] border-[3px] border-transparent transition-all shadow-sm text-left outline-none";
    
    btn.innerHTML = `
      <div class="letter-box w-10 h-10 md:w-14 md:h-14 rounded-lg bg-[#f4f6fa] flex items-center justify-center shrink-0 text-[#626c7f] font-medium text-[20px] md:text-[28px] transition-colors">
        ${char}
      </div>
      <span class="option-text text-[18px] md:text-[28px] font-medium text-white flex-1">${escapedOption}</span>
      <div class="icon-container ml-auto w-8 h-8 md:w-10 md:h-10"></div>
    `;
    
    btn.onclick = () => handleSelect(btn);
    optionsContainer.appendChild(btn);
  });
}

function handleSelect(btn) {
  if (isAnswered) return;
  errorMsg.classList.add('hidden');
  errorIconContainer.innerHTML = '';

  document.querySelectorAll('.option-btn').forEach(b => {
    b.classList.replace('border-[#a729f5]', 'border-transparent');
    const box = b.querySelector('.letter-box');
    box.classList.remove('bg-[#a729f5]', 'text-white');
    box.classList.add('bg-[#f4f6fa]', 'text-[#626c7f]');
  });

  selectedBtn = btn;
  btn.classList.replace('border-transparent', 'border-[#a729f5]');
  const letterBox = btn.querySelector('.letter-box');
  letterBox.classList.remove('bg-[#f4f6fa]', 'text-[#626c7f]');
  letterBox.classList.add('bg-[#a729f5]', 'text-white');
}

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

  document.querySelectorAll('.option-btn').forEach(btn => {
    const btnText = btn.querySelector('.option-text').textContent;
    const letterBox = btn.querySelector('.letter-box');
    
    if (btnText === data.answer) {
      applyStatus(btn, letterBox, '#22c55e', 'assets/icons/correct.png');
    } else if (btn === selectedBtn && !isCorrect) {
      applyStatus(btn, letterBox, '#ef4444', 'assets/icons/wrong.png');
    }
  });

  submitBtn.textContent = (currentIdx < questions.length - 1) ? "Next Question" : "Finish Quiz";
}

function applyStatus(btn, box, colorHex, iconPath) {
  btn.style.borderColor = colorHex;
  box.style.backgroundColor = colorHex;
  box.classList.add('text-white');
  btn.querySelector('.icon-container').innerHTML = `<img src="${iconPath}" class="w-8 h-8 md:w-10 md:h-10">`;
}

submitBtn.addEventListener('click', () => {
  if (!isAnswered) {
    validateAnswer();
  } else {
    currentIdx++;
    currentIdx < questions.length ? renderQuestion() : finishQuiz();
  }
});
/* finish event */
function finishQuiz() {
  const mainEl = document.querySelector('main');
  mainEl.innerHTML = `
    <div class="flex flex-col lg:flex-row gap-12 w-full max-w-[1160px] mx-auto items-start p-6">
      <div class="flex-1 text-white">
        <h2 class="text-[40px] md:text-[64px] font-light">Quiz completed</h2>
        <h3 class="text-[40px] md:text-[64px] font-medium">You scored...</h3>
      </div>
      <div class="flex-1 w-full max-w-[564px]">
        <div class="bg-[#3b4d66] p-8 md:p-12 rounded-[24px] flex flex-col items-center">
          <div class="flex items-center gap-4 mb-10">
              <img src="${subjectIcons[currentSubject]}" class="w-10 h-10">
              <span class="text-white text-[18px] md:text-[28px] font-medium">${currentSubject}</span>
          </div>
          <span class="text-white text-[88px] md:text-[144px] font-medium">${score}</span>
          <p class="text-[#abc1e1] text-[18px] md:text-[24px]">out of ${questions.length}</p>
        </div>
        <button onclick="window.location.href='index.html'" class="w-full bg-[#a729f5] text-white text-[18px] md:text-[28px] py-4 rounded-[24px] mt-8">Play Again</button>
      </div>
    </div>`;
}

renderQuestion();