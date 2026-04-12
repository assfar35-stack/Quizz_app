// 1. URL Parameter Setup
const urlParams = new URLSearchParams(window.location.search);
const currentSubject = urlParams.get("subject");

// 2. Fetch the specific data array from data.js
const questions = quizData[currentSubject];

// 3. Application State (Tracking where the user is)
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionText = null; // Tracks the text of the answer the user clicked
let isAnswerSubmitted = false; // Prevents clicking other options after submitting

// 4. DOM Elements (The pieces of HTML we want to control)
const questionTitle = document.getElementById("question-title");
const questionCounter = document.getElementById("question-counter");
const optionsContainer = document.getElementById("options-container");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-message");
const progressBar = document.getElementById("progress-bar");

const alphabet = ["A", "B", "C", "D"];

// 5. The Render Function (Builds the screen)
function renderQuestion() {
  const currentQuestionData = questions[currentQuestionIndex];

  // Update Text
  questionTitle.textContent = currentQuestionData.question;
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  // Update Progress Bar
  const progressPercentage = (currentQuestionIndex / questions.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  // Reset states for the new question
  optionsContainer.innerHTML = "";
  selectedOptionText = null;
  isAnswerSubmitted = false;
  submitBtn.textContent = "Submit Answer";
  errorMessage.classList.add("hidden"); // Hide error message

  // Loop through options and build buttons
  currentQuestionData.options.forEach((option, index) => {
    const buttonHTML = `
      <button class="option-btn group w-full flex items-center gap-4 md:gap-8 bg-blue-850 p-3 md:p-5 rounded-xl md:rounded-3xl hover:ring-2 hover:ring-white/10 transition-all shadow-lg text-left outline-none border-2 border-transparent">
        <div class="letter-box w-10 h-10 md:w-14 md:h-14 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 text-blue-500 font-medium text-[18px] md:text-[28px] transition-colors">
          ${alphabet[index]}
        </div>
        <span class="option-text text-[18px] md:text-[28px] font-medium w-full">${option}</span>
        <img src="" class="status-icon w-8 h-8 hidden ml-auto" />
      </button>
    `;
    optionsContainer.insertAdjacentHTML("beforeend", buttonHTML);
  });

  // Attach click events to the newly created buttons
  const optionButtons = document.querySelectorAll(".option-btn");
  optionButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      handleOptionClick(this, optionButtons);
    });
  });
}

// 6. Handle User Clicking an Option
function handleOptionClick(clickedBtn, allButtons) {
  // If they already submitted, ignore clicks
  if (isAnswerSubmitted) return;

  // Hide error message if they clicked an option
  errorMessage.classList.add("hidden");

  // Grab the text of the option they clicked
  selectedOptionText = clickedBtn.querySelector(".option-text").textContent;

  // Remove the 'selected' styling (purple border) from ALL buttons
  allButtons.forEach((btn) => {
    btn.classList.remove("border-purple-600");
    btn
      .querySelector(".letter-box")
      .classList.remove("bg-purple-600", "text-white");
    btn
      .querySelector(".letter-box")
      .classList.add("bg-gray-50", "text-blue-500");
  });

  // Add the 'selected' styling to the SPECIFIC button they clicked
  clickedBtn.classList.add("border-purple-600");
  clickedBtn
    .querySelector(".letter-box")
    .classList.remove("bg-gray-50", "text-blue-500");
  clickedBtn
    .querySelector(".letter-box")
    .classList.add("bg-purple-600", "text-white");
}

// 7. Handle the "Submit Answer" button logic
submitBtn.addEventListener("click", () => {
  const currentQuestionData = questions[currentQuestionIndex];
  const optionButtons = document.querySelectorAll(".option-btn");

  // If the button says "Next Question", move to the next screen
  if (isAnswerSubmitted) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      renderQuestion(); // Load next question
    } else {
      finishQuiz(); // Quiz is over
    }
    return;
  }

  // VALIDATION: Did they select an answer?
  if (!selectedOptionText) {
    errorMessage.classList.remove("hidden"); // Show error
    return;
  }

  // They submitted an answer! Let's check it.
  isAnswerSubmitted = true;
  const isCorrect = selectedOptionText === currentQuestionData.answer;

  if (isCorrect) {
    score++;
  }

  // Loop through all buttons to apply the correct Green/Red styling
  optionButtons.forEach((btn) => {
    const btnText = btn.querySelector(".option-text").textContent;

    // Check if THIS button contains the correct answer
    if (btnText === currentQuestionData.answer) {
      btn.classList.add("border-green-500");
      btn
        .querySelector(".letter-box")
        .classList.add("bg-green-500", "text-white");
      // Note: You can change the src below to your actual checkmark icon path
      // btn.querySelector('.status-icon').src = './assets/icons/icon-correct.svg';
      // btn.querySelector('.status-icon').classList.remove('hidden');
    }
    // Check if THIS button is the one they clicked, and it was wrong
    else if (btnText === selectedOptionText && !isCorrect) {
      btn.classList.add("border-red-500");
      btn.querySelector(".letter-box").classList.remove("bg-purple-600");
      btn
        .querySelector(".letter-box")
        .classList.add("bg-red-500", "text-white");
      // Note: You can change the src below to your actual incorrect 'X' icon path
      // btn.querySelector('.status-icon').src = './assets/icons/icon-incorrect.svg';
      // btn.querySelector('.status-icon').classList.remove('hidden');
    }
  });

  // Update Submit Button Text
  submitBtn.textContent = "Next Question";
});

// 8. Handle End of Quiz
function finishQuiz() {
  // Grab the main container
  const mainContainer = document.querySelector("main");

  // Inject the new Tailwind layout for the Score Screen
  mainContainer.innerHTML = `
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

  // 9. Handle the "Play Again" logic
  document.getElementById("play-again-btn").addEventListener("click", () => {
    // This simply redirects the user back to your Start Menu
    window.location.href = "index.html";
  });
}
