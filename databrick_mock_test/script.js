document.addEventListener('DOMContentLoaded', () => {
    let questions = [];
    let currentQuestionIndex = 0;
    let userAnswers = {}; // key: index, value: array of selected option keys
    let timerInterval;
    const totalTime = 90 * 60; // 90 minutes in seconds
    let timeRemaining = totalTime;

    // DOM Elements
    const startScreen = document.getElementById('startScreen');
    const testScreen = document.getElementById('testScreen');
    const resultScreen = document.getElementById('resultScreen');
    const reviewScreen = document.getElementById('reviewScreen');
    
    const startBtn = document.getElementById('startBtn');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const reviewBtn = document.getElementById('reviewBtn');
    const restartBtn = document.getElementById('restartBtn');
    const closeReviewBtn = document.getElementById('closeReviewBtn');

    const timerDisplay = document.getElementById('timerDisplay');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const questionNumber = document.getElementById('questionNumber');
    const questionType = document.getElementById('questionType');
    const progressFill = document.getElementById('progressFill');
    const questionGrid = document.getElementById('questionGrid');

    // To gracefully handle typos in question.json like "optuioC" or "optionB" instead of "option B"
    const possibleOptions = [
        ['option A', 'optionA'],
        ['optionB', 'option B'],
        ['optuioC', 'optionC', 'option C'],
        ['optionD', 'option D', 'optiond'],
        ['optionE', 'option E', 'optione']
    ];

    // Load Questions
    if (typeof questionsData !== 'undefined') {
        let allQuestions = [...questionsData];
        
        // Shuffle the array (Fisher-Yates algorithm)
        for (let i = allQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
        }
        
        // Pick 55 random questions
        questions = allQuestions.slice(0, 55);
    } else {
        console.error('Error loading questions: questionsData is not defined.');
        questionText.innerText = "Error loading questions. Please ensure questions.js is loaded.";
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        timerDisplay.innerText = formatTime(timeRemaining);
        timerInterval = setInterval(() => {
            timeRemaining--;
            timerDisplay.innerText = formatTime(timeRemaining);
            
            if (timeRemaining <= 300) {
                timerDisplay.classList.add('warning');
            }

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                submitTest();
            }
        }, 1000);
    }

    startBtn.addEventListener('click', () => {
        if (questions.length === 0) {
            alert('Questions are still loading or failed to load. Ensure question.json exists and is valid JSON.');
            return;
        }
        startScreen.classList.remove('active');
        testScreen.classList.add('active');
        buildGrid();
        loadQuestion(0);
        startTimer();
    });

    function buildGrid() {
        questionGrid.innerHTML = '';
        questions.forEach((_, index) => {
            const btn = document.createElement('div');
            btn.className = 'grid-item';
            btn.innerText = index + 1;
            btn.addEventListener('click', () => {
                saveAnswer();
                loadQuestion(index);
            });
            questionGrid.appendChild(btn);
        });
    }

    function updateGridUI() {
        const items = questionGrid.children;
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
            if (i === currentQuestionIndex) {
                items[i].classList.add('active');
            }
            if (userAnswers[i] && userAnswers[i].length > 0) {
                items[i].classList.add('answered');
            } else {
                items[i].classList.remove('answered');
            }
        }
    }

    function loadQuestion(index) {
        currentQuestionIndex = index;
        const q = questions[index];
        
        questionNumber.innerText = `Question ${index + 1} of ${questions.length}`;
        questionText.innerText = q.question;
        
        const isMulti = q.type && q.type.toLowerCase().includes('multi');
        questionType.innerText = isMulti ? 'Multiple Choice' : 'Single Choice';
        questionType.className = `badge ${isMulti ? 'multi' : ''}`;

        progressFill.style.width = `${((index + 1) / questions.length) * 100}%`;

        optionsContainer.innerHTML = '';
        const inputType = isMulti ? 'checkbox' : 'radio';

        possibleOptions.forEach((aliases, i) => {
            let key = aliases.find(k => q[k] !== undefined);
            if (!key) return;

            const label = document.createElement('label');
            label.className = 'option-label';
            
            const input = document.createElement('input');
            input.type = inputType;
            input.name = `q${index}`;
            input.value = key;
            
            if (userAnswers[index] && userAnswers[index].includes(key)) {
                input.checked = true;
                label.classList.add('selected');
            }

            input.addEventListener('change', () => {
                if (!isMulti) {
                    Array.from(optionsContainer.children).forEach(child => child.classList.remove('selected'));
                }
                if (input.checked) {
                    label.classList.add('selected');
                } else {
                    label.classList.remove('selected');
                }
                saveAnswer();
                updateGridUI();
            });

            label.appendChild(input);
            label.appendChild(document.createTextNode(q[key]));
            optionsContainer.appendChild(label);
        });

        prevBtn.disabled = index === 0;
        
        if (index === questions.length - 1) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }

        updateGridUI();
    }

    function saveAnswer() {
        const inputs = optionsContainer.querySelectorAll('input:checked');
        const selected = Array.from(inputs).map(input => input.value);
        userAnswers[currentQuestionIndex] = selected;
    }

    nextBtn.addEventListener('click', () => {
        saveAnswer();
        if (currentQuestionIndex < questions.length - 1) {
            loadQuestion(currentQuestionIndex + 1);
        }
    });

    prevBtn.addEventListener('click', () => {
        saveAnswer();
        if (currentQuestionIndex > 0) {
            loadQuestion(currentQuestionIndex - 1);
        }
    });

    submitBtn.addEventListener('click', () => {
        saveAnswer();
        if (confirm('Are you sure you want to submit the test?')) {
            submitTest();
        }
    });

    function submitTest() {
        clearInterval(timerInterval);
        testScreen.classList.remove('active');
        resultScreen.classList.add('active');

        let score = 0;
        questions.forEach((q, index) => {
            const userAns = userAnswers[index] || [];
            let correctAns = q.answer || [];
            if (typeof correctAns === 'string') correctAns = [correctAns];
            
            const isCorrect = userAns.length === correctAns.length && 
                              userAns.every(val => correctAns.includes(val));
            
            if (isCorrect && userAns.length > 0) {
                score++;
            }
        });

        const percentage = Math.round((score / questions.length) * 100);
        const passed = percentage >= 70;

        const resultStatus = document.getElementById('resultStatus');
        const scorePercentage = document.getElementById('scorePercentage');
        const scoreDetails = document.getElementById('scoreDetails');

        resultStatus.innerText = passed ? 'Congratulations! You Passed' : 'You Failed. Keep Practicing!';
        resultStatus.className = passed ? 'pass' : 'fail';
        
        document.querySelector('.result-card').className = `result-card ${passed ? 'pass' : 'fail'}`;
        
        scorePercentage.innerText = `${percentage}%`;
        scoreDetails.innerText = `You scored ${score} out of ${questions.length} questions correctly.`;
    }

    reviewBtn.addEventListener('click', () => {
        resultScreen.classList.remove('active');
        reviewScreen.classList.add('active');
        buildReview();
    });

    closeReviewBtn.addEventListener('click', () => {
        reviewScreen.classList.remove('active');
        resultScreen.classList.add('active');
    });

    function buildReview() {
        const container = document.getElementById('reviewContainer');
        container.innerHTML = '';

        questions.forEach((q, index) => {
            const userAns = userAnswers[index] || [];
            let correctAns = q.answer || [];
            if (typeof correctAns === 'string') correctAns = [correctAns];
            
            const isCorrect = userAns.length === correctAns.length && 
                              userAns.every(val => correctAns.includes(val));
                              
            const div = document.createElement('div');
            div.className = 'review-item';
            
            let html = `
                <h3>${index + 1}. ${q.question}</h3>
                <span class="badge ${isCorrect && userAns.length > 0 ? 'multi' : 'danger'}" style="background: ${isCorrect && userAns.length > 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}; color: ${isCorrect && userAns.length > 0 ? 'var(--success)' : 'var(--danger)'}">
                    ${isCorrect && userAns.length > 0 ? 'Correct' : 'Incorrect'}
                </span>
                <div class="options">
            `;

            possibleOptions.forEach((aliases, i) => {
                let key = aliases.find(k => q[k] !== undefined);
                if (!key) return;
                
                let optionClass = 'review-option';
                const isUserSelected = userAns.includes(key);
                const isActualCorrect = correctAns.includes(key);

                if (isActualCorrect) {
                    optionClass += ' correct';
                } else if (isUserSelected && !isActualCorrect) {
                    optionClass += ' wrong';
                }

                const labelText = String.fromCharCode(65 + i);

                html += `
                    <div class="${optionClass}">
                        <strong>${labelText}:</strong> ${q[key]}
                        ${isUserSelected ? ' <i>(Your Answer)</i>' : ''}
                        ${isActualCorrect ? ' <i>(Correct Answer)</i>' : ''}
                    </div>
                `;
            });

            html += `</div></div>`;
            div.innerHTML = html;
            container.appendChild(div);
        });
    }

    restartBtn.addEventListener('click', () => {
        userAnswers = {};
        currentQuestionIndex = 0;
        timeRemaining = totalTime;
        document.querySelector('.result-card').className = 'result-card';
        timerDisplay.classList.remove('warning');
        
        resultScreen.classList.remove('active');
        startScreen.classList.add('active');
    });
});
