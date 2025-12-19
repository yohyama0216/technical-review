// ==================== CATEGORY & QUESTION FUNCTIONS ====================

function getCategories() {
    const categories = {};
    quizData.forEach(q => {
        if (!categories[q.majorCategory]) {
            categories[q.majorCategory] = {};
        }
        if (!categories[q.majorCategory][q.middleCategory]) {
            categories[q.majorCategory][q.middleCategory] = new Set();
        }
        categories[q.majorCategory][q.middleCategory].add(q.minorCategory);
    });
    
    Object.keys(categories).forEach(majorKey => {
        Object.keys(categories[majorKey]).forEach(middleKey => {
            categories[majorKey][middleKey] = Array.from(categories[majorKey][middleKey]);
        });
    });
    
    return categories;
}

function getQuestionsByCategory(majorCat, middleCat, minorCat) {
    return quizData.filter(q => 
        q.majorCategory === majorCat && 
        q.middleCategory === middleCat && 
        q.minorCategory === minorCat
    );
}

// ==================== APP STATE ====================

let currentMajorCategory = '';
let currentMiddleCategory = '';
let currentMinorCategory = '';
let currentQuestionIndex = 0;
let selectedAnswer = null;
let quizResults = [];
let shuffledAnswers = [];

// ==================== DOM ELEMENTS ====================

const majorCategoryScreen = document.getElementById('majorCategoryScreen');
const middleCategoryScreen = document.getElementById('middleCategoryScreen');
const minorCategoryScreen = document.getElementById('minorCategoryScreen');
const questionListScreen = document.getElementById('questionListScreen');
const statsScreen = document.getElementById('statsScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const reviewScreen = document.getElementById('reviewScreen');

const majorCategoryButtons = document.getElementById('majorCategoryButtons');
const middleCategoryButtons = document.getElementById('middleCategoryButtons');
const middleCategoryTitle = document.getElementById('middleCategoryTitle');
const minorCategoryButtons = document.getElementById('minorCategoryButtons');
const minorCategoryTitle = document.getElementById('minorCategoryTitle');

const backBtn = document.getElementById('backBtn');
const submitBtn = document.getElementById('submitBtn');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const reviewBtn = document.getElementById('reviewBtn');
const homeBtn = document.getElementById('homeBtn');
const reviewBackBtn = document.getElementById('reviewBackBtn');

const progressFill = document.getElementById('progressFill');
const categoryBreadcrumb = document.getElementById('categoryBreadcrumb');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const resultContent = document.getElementById('resultContent');
const reviewContent = document.getElementById('reviewContent');
const reviewCategoryTitle = document.getElementById('reviewCategoryTitle');

// Stats elements
const totalCorrectEl = document.getElementById('totalCorrect');
const totalIncorrectEl = document.getElementById('totalIncorrect');
const totalQuestionsEl = document.getElementById('totalQuestions');
const dailyStatsDisplay = document.getElementById('dailyStatsDisplay');
const categoryStatsDisplay = document.getElementById('categoryStatsDisplay');

// Question list elements
const majorCategoryFilter = document.getElementById('majorCategoryFilter');
const middleCategoryFilter = document.getElementById('middleCategoryFilter');
const minorCategoryFilter = document.getElementById('minorCategoryFilter');
const questionListContainer = document.getElementById('questionListContainer');
const questionCount = document.getElementById('questionCount');

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('randomQuestionBtn').addEventListener('click', startRandomQuestion);
    document.getElementById('backToMajorBtn').addEventListener('click', showMajorCategoryScreen);
    document.getElementById('backToMiddleBtn').addEventListener('click', () => showMiddleCategories(currentMajorCategory));
    document.getElementById('backToHomeBtn').addEventListener('click', showMajorCategoryScreen);
    document.getElementById('backToHomeFromListBtn').addEventListener('click', showMajorCategoryScreen);
    backBtn.addEventListener('click', showMajorCategoryScreen);
    homeBtn.addEventListener('click', () => {
        showMajorCategoryScreen();
        finishQuiz();
    });
    reviewBtn.addEventListener('click', showReview);
    reviewBackBtn.addEventListener('click', showResultScreen);
    nextQuestionBtn.addEventListener('click', goToNextQuestion);
    
    // Question list filter event listeners
    majorCategoryFilter.addEventListener('change', () => {
        updateMiddleCategoryFilter();
        updateQuestionList();
    });
    middleCategoryFilter.addEventListener('change', () => {
        updateMinorCategoryFilter();
        updateQuestionList();
    });
    minorCategoryFilter.addEventListener('change', updateQuestionList);
}

// ==================== SCREEN NAVIGATION ====================

function showScreen(screenToShow) {
    [majorCategoryScreen, middleCategoryScreen, minorCategoryScreen, 
     questionListScreen, statsScreen, quizScreen, resultScreen, reviewScreen].forEach(screen => {
        screen.classList.remove('active');
    });
    screenToShow.classList.add('active');
}

function showMajorCategoryScreen() {
    showScreen(majorCategoryScreen);
}

// ==================== RANDOM QUESTION ====================

function startRandomQuestion() {
    // Get a random question from all available questions
    const randomIndex = Math.floor(Math.random() * quizData.length);
    const randomQuestion = quizData[randomIndex];
    
    startQuizFromQuestion(randomQuestion);
}

function showStatsScreen() {
    showScreen(statsScreen);
    loadStatistics();
}

// ==================== MAJOR CATEGORY ====================

function setupMajorCategories() {
    const categories = getCategories();
    majorCategoryButtons.innerHTML = '';
    
    const majorCats = Object.keys(categories);
    majorCats.forEach((category, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        
        const card = document.createElement('div');
        card.className = `card category-card text-white bg-category-${(index % 9) + 1} shadow-sm`;
        
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center';
        cardBody.innerHTML = `<h5 class="mb-0">${category}</h5>`;
        
        card.appendChild(cardBody);
        col.appendChild(card);
        card.addEventListener('click', () => showMiddleCategories(category));
        majorCategoryButtons.appendChild(col);
    });
}

// ==================== MIDDLE CATEGORY ====================

function showMiddleCategories(majorCat) {
    currentMajorCategory = majorCat;
    const categories = getCategories();
    const middleCats = Object.keys(categories[majorCat]);
    
    middleCategoryTitle.textContent = `${majorCat} - 中カテゴリを選択`;
    middleCategoryButtons.innerHTML = '';
    
    middleCats.forEach((middleCat, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        
        const card = document.createElement('div');
        card.className = `card category-card text-white bg-category-${(index % 9) + 1} shadow-sm`;
        
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center';
        cardBody.innerHTML = `<h5 class="mb-0">${middleCat}</h5>`;
        
        card.appendChild(cardBody);
        col.appendChild(card);
        card.addEventListener('click', () => showMinorCategories(majorCat, middleCat));
        middleCategoryButtons.appendChild(col);
    });
    
    showScreen(middleCategoryScreen);
}

// ==================== MINOR CATEGORY ====================

function showMinorCategories(majorCat, middleCat) {
    currentMajorCategory = majorCat;
    currentMiddleCategory = middleCat;
    const categories = getCategories();
    const minorCats = categories[majorCat][middleCat];
    
    minorCategoryTitle.textContent = `${middleCat} - 小カテゴリを選択`;
    minorCategoryButtons.innerHTML = '';
    
    minorCats.forEach((minorCat, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        
        const card = document.createElement('div');
        card.className = `card category-card text-white bg-category-${(index % 9) + 1} shadow-sm`;
        
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center';
        cardBody.innerHTML = `<h5 class="mb-0">${minorCat}</h5>`;
        
        card.appendChild(cardBody);
        col.appendChild(card);
        card.addEventListener('click', () => startQuiz(majorCat, middleCat, minorCat));
        minorCategoryButtons.appendChild(col);
    });
    
    showScreen(minorCategoryScreen);
}

// ==================== QUIZ FUNCTIONS ====================

let currentQuestions = [];
let isSingleQuestionMode = false;

function startQuiz(majorCat, middleCat, minorCat) {
    currentMajorCategory = majorCat;
    currentMiddleCategory = middleCat;
    currentMinorCategory = minorCat;
    currentQuestionIndex = 0;
    quizResults = [];
    isSingleQuestionMode = false;
    currentQuestions = getQuestionsByCategory(majorCat, middleCat, minorCat);
    
    showScreen(quizScreen);
    loadQuestion();
}

function startQuizFromQuestion(question) {
    currentMajorCategory = question.majorCategory;
    currentMiddleCategory = question.middleCategory;
    currentMinorCategory = question.minorCategory;
    currentQuestionIndex = 0;
    quizResults = [];
    isSingleQuestionMode = true;
    currentQuestions = [question];
    
    showScreen(quizScreen);
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        finishQuiz();
        return;
    }
    
    const question = currentQuestions[currentQuestionIndex];
    selectedAnswer = null;
    
    // Update breadcrumb
    categoryBreadcrumb.innerHTML = `
        <li class="breadcrumb-item">${currentMajorCategory}</li>
        <li class="breadcrumb-item">${currentMiddleCategory}</li>
        <li class="breadcrumb-item active">${currentMinorCategory}</li>
    `;
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressFill.setAttribute('aria-valuenow', progress);
    
    // Show question
    questionText.textContent = question.question;
    
    // Clear and hide explanation
    const existingExplanation = document.getElementById('explanationBox');
    if (existingExplanation) {
        existingExplanation.remove();
    }
    
    // Shuffle answers
    shuffledAnswers = question.answers.map((text, index) => ({
        text: text,
        originalIndex: index
    }));
    
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }
    
    // Display answers
    answersContainer.innerHTML = '';
    shuffledAnswers.forEach((answerObj) => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary answer-btn';
        btn.textContent = answerObj.text;
        btn.addEventListener('click', () => selectAnswer(answerObj.originalIndex, btn));
        answersContainer.appendChild(btn);
    });
    
    submitBtn.classList.add('d-none');
    nextQuestionBtn.classList.add('d-none');
}

function selectAnswer(index, btn) {
    if (selectedAnswer !== null) return;
    
    selectedAnswer = index;
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correct;
    
    quizResults.push({
        questionIndex: currentQuestionIndex,
        selectedAnswer: selectedAnswer,
        correct: isCorrect
    });
    
    // Show correct/incorrect
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach((button, displayIndex) => {
        button.classList.add('disabled');
        const originalIndex = shuffledAnswers[displayIndex].originalIndex;
        
        if (originalIndex === question.correct) {
            button.classList.remove('btn-outline-primary');
            button.classList.add('correct');
        } else if (originalIndex === selectedAnswer && !isCorrect) {
            button.classList.remove('btn-outline-primary');
            button.classList.add('incorrect');
        }
    });
    
    submitBtn.classList.add('d-none');
    showExplanation(question, isCorrect);
    
    // Save to daily history
    saveDailyHistory(isCorrect);
    
    // Increment answer count for this question
    incrementQuestionAnswerCount(question);
    
    // Show next question button
    nextQuestionBtn.classList.remove('d-none');
}

function showExplanation(question, isCorrect) {
    let explanationBox = document.getElementById('explanationBox');
    
    if (!explanationBox) {
        explanationBox = document.createElement('div');
        explanationBox.id = 'explanationBox';
        explanationBox.className = 'alert ' + (isCorrect ? 'alert-success' : 'alert-danger') + ' mt-3';
        document.querySelector('.quiz-content').appendChild(explanationBox);
    }
    
    explanationBox.innerHTML = `
        <div class="explanation-result ${isCorrect ? 'correct-result' : 'incorrect-result'}">
            ${isCorrect ? '✓ 正解！' : '✗ 不正解'}
        </div>
        <div class="explanation-text">
            <strong>解説:</strong> ${question.explanation}
        </div>
        <div class="explanation-correct-answer">
            <strong>正解:</strong> ${question.answers[question.correct]}
        </div>
    `;
    explanationBox.style.display = 'block';
}

//  ==================== RESULT & REVIEW ====================

function saveQuizResults() {
    if (quizResults.length === 0) return;
    
    const correct = quizResults.filter(r => r.correct).length;
    const total = quizResults.length;
    saveQuizResult(currentMajorCategory, currentMiddleCategory, currentMinorCategory, correct, total);
}

function finishQuiz() {
    saveQuizResults();
    showResultScreen();
}

function showResultScreen() {
    const correct = quizResults.filter(r => r.correct).length;
    const total = quizResults.length;
    const percentage = Math.round((correct / total) * 100);
    
    // Target the card-body element directly
    const cardBody = resultContent.querySelector('.card-body');
    if (!cardBody) {
        console.error('Result card body not found');
        return;
    }
    
    cardBody.innerHTML = `
        <div class="text-center result-summary">
            <h2 class="mb-4">クイズ完了！</h2>
            <div class="result-score mb-4">${correct} / ${total}</div>
            <div class="fs-4 mb-4">正解率: ${percentage}%</div>
            <div class="row">
                <div class="col-6">
                    <div class="text-success">
                        <i class="bi bi-check-circle-fill fs-1"></i>
                        <div class="fs-5 mt-2">正解: ${correct}</div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="text-danger">
                        <i class="bi bi-x-circle-fill fs-1"></i>
                        <div class="fs-5 mt-2">不正解: ${total - correct}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    showScreen(resultScreen);
}

function showReview() {
    reviewCategoryTitle.textContent = `復習: ${currentMinorCategory}`;
    reviewContent.innerHTML = '';
    
    quizResults.forEach((result, index) => {
        const question = currentQuestions[result.questionIndex];
        const div = document.createElement('div');
        div.className = `card mb-3 review-item ${result.correct ? 'correct-answer' : 'incorrect-answer'}`;
        
        div.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">問題 ${index + 1}</h5>
                <p class="card-text"><strong>Q:</strong> ${question.question}</p>
                <p class="card-text"><strong>あなたの回答:</strong> ${question.answers[result.selectedAnswer]}</p>
                ${!result.correct ? `<p class="card-text"><strong>正解:</strong> ${question.answers[question.correct]}</p>` : ''}
                <p class="card-text"><strong>解説:</strong> ${question.explanation}</p>
                <span class="badge ${result.correct ? 'bg-success' : 'bg-danger'}">${result.correct ? '正解' : '不正解'}</span>
            </div>
        `;
        
        reviewContent.appendChild(div);
    });
    
    showScreen(reviewScreen);
}

// ==================== QUESTION ANSWER TRACKING ====================

function getQuestionId(question) {
    // Use the question's index in quizData array for a stable identifier
    const index = quizData.indexOf(question);
    if (index === -1) {
        // Fallback to content-based ID if question is not in quizData
        return `${question.majorCategory}::${question.middleCategory}::${question.minorCategory}::${question.question}`;
    }
    return `q_${index}`;
}

function incrementQuestionAnswerCount(question) {
    const questionId = getQuestionId(question);
    const answerCounts = JSON.parse(localStorage.getItem('questionAnswerCounts') || '{}');
    
    if (!answerCounts[questionId]) {
        answerCounts[questionId] = 0;
    }
    answerCounts[questionId]++;
    
    localStorage.setItem('questionAnswerCounts', JSON.stringify(answerCounts));
}

function getQuestionAnswerCount(question) {
    const questionId = getQuestionId(question);
    const answerCounts = JSON.parse(localStorage.getItem('questionAnswerCounts') || '{}');
    return answerCounts[questionId] || 0;
}

function selectNextRandomQuestion() {
    // Get answer counts for all questions and find minimum count in a single pass
    let minCount = Infinity;
    const questionsWithCounts = quizData.map(question => {
        const count = getQuestionAnswerCount(question);
        if (count < minCount) {
            minCount = count;
        }
        return { question, count };
    });
    
    // Filter questions with the minimum count
    const questionsWithMinCount = questionsWithCounts.filter(q => q.count === minCount);
    
    // Select a random question from those with minimum count
    const randomIndex = Math.floor(Math.random() * questionsWithMinCount.length);
    return questionsWithMinCount[randomIndex].question;
}

function goToNextQuestion() {
    // Select next question randomly from questions with fewer answers
    const nextQuestion = selectNextRandomQuestion();
    
    // Start a new quiz with the selected question
    startQuizFromQuestion(nextQuestion);
}

// ==================== STATISTICS FUNCTIONS ====================

function saveQuizResult(majorCat, middleCat, minorCat, correct, total) {
    const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
    const key = `${majorCat}::${middleCat}::${minorCat}`;
    
    if (!results[key]) {
        results[key] = {
            majorCategory: majorCat,
            middleCategory: middleCat,
            minorCategory: minorCat,
            attempts: 0,
            totalCorrect: 0,
            totalQuestions: 0
        };
    }
    
    results[key].attempts++;
    results[key].totalCorrect += correct;
    results[key].totalQuestions += total;
    
    localStorage.setItem('quizResults', JSON.stringify(results));
}

function saveDailyHistory(isCorrect) {
    const today = new Date().toISOString().split('T')[0];
    const history = JSON.parse(localStorage.getItem('dailyHistory') || '{}');
    
    if (!history[today]) {
        history[today] = { correct: 0, incorrect: 0, total: 0 };
    }
    
    history[today].total++;
    if (isCorrect) {
        history[today].correct++;
    } else {
        history[today].incorrect++;
    }
    
    localStorage.setItem('dailyHistory', JSON.stringify(history));
}

function loadStatistics() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
    const dailyHistory = JSON.parse(localStorage.getItem('dailyHistory') || '{}');
    
    // Calculate totals
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalAnswered = 0;
    
    Object.values(results).forEach(result => {
        totalCorrect += result.totalCorrect;
        totalAnswered += result.totalQuestions;
    });
    totalIncorrect = totalAnswered - totalCorrect;
    
    // Update summary cards
    totalCorrectEl.textContent = totalCorrect;
    totalIncorrectEl.textContent = totalIncorrect;
    // Display total available questions in database
    totalQuestionsEl.textContent = quizData.length;
    
    // Display daily stats
    displayDailyStats(dailyHistory);
    
    // Display category stats
    displayCategoryStats(results);
}

// Global variable to store the chart instance
let dailyStatsChartInstance = null;

function displayDailyStats(dailyHistory) {
    const dates = Object.keys(dailyHistory).sort();
    
    if (dates.length === 0) {
        // Hide chart if no data
        const chartElement = document.getElementById('dailyStatsChart');
        if (chartElement) {
            chartElement.style.display = 'none';
        }
        dailyStatsDisplay.innerHTML = '<p class="text-muted">まだ学習履歴がありません</p>';
        return;
    }
    
    // Check if Chart.js is available
    if (typeof Chart !== 'undefined') {
        // Show chart
        document.getElementById('dailyStatsChart').style.display = 'block';
        
        // Prepare data for chart (show last 14 days or all if less)
        const chartDates = dates.slice(-14);
        const totalData = chartDates.map(date => dailyHistory[date].total);
        const correctData = chartDates.map(date => dailyHistory[date].correct);
        const incorrectData = chartDates.map(date => dailyHistory[date].incorrect);
        
        // Format dates for display (MM/DD)
        const formattedDates = chartDates.map(date => {
            const d = new Date(date);
            return `${d.getMonth() + 1}/${d.getDate()}`;
        });
        
        // Destroy existing chart if it exists
        if (dailyStatsChartInstance) {
            dailyStatsChartInstance.destroy();
        }
        
        // Create line chart
        const ctx = document.getElementById('dailyStatsChart').getContext('2d');
        dailyStatsChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: formattedDates,
                datasets: [
                    {
                        label: '学習数',
                        data: totalData,
                        borderColor: 'rgb(13, 110, 253)',
                        backgroundColor: 'rgba(13, 110, 253, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: '正解数',
                        data: correctData,
                        borderColor: 'rgb(25, 135, 84)',
                        backgroundColor: 'rgba(25, 135, 84, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: '不正解数',
                        data: incorrectData,
                        borderColor: 'rgb(220, 53, 69)',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    } else {
        // If Chart.js is not available, hide the chart canvas
        const chartElement = document.getElementById('dailyStatsChart');
        if (chartElement) {
            chartElement.style.display = 'none';
        }
    }
    
    // Display recent stats list (last 7 days)
    const recentDates = dates.slice(-7).reverse();
    let html = '<div class="list-group">';
    recentDates.forEach(date => {
        const stats = dailyHistory[date];
        const percentage = Math.round((stats.correct / stats.total) * 100);
        
        html += `
            <div class="daily-stats-item mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${date}</strong>
                        <div class="small text-muted">${stats.total}問 / 正解率 ${percentage}%</div>
                    </div>
                    <div class="text-end">
                        <span class="badge bg-success me-1">${stats.correct}</span>
                        <span class="badge bg-danger">${stats.incorrect}</span>
                    </div>
                </div>
                <div class="progress mt-2" style="height: 6px;">
                    <div class="progress-bar bg-success" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    dailyStatsDisplay.innerHTML = html;
}

function displayCategoryStats(results) {
    if (Object.keys(results).length === 0) {
        categoryStatsDisplay.innerHTML = '<p class="text-muted">まだ統計情報がありません</p>';
        return;
    }
    
    const grouped = {};
    Object.values(results).forEach(result => {
        if (!grouped[result.majorCategory]) {
            grouped[result.majorCategory] = {};
        }
        if (!grouped[result.majorCategory][result.middleCategory]) {
            grouped[result.majorCategory][result.middleCategory] = [];
        }
        grouped[result.majorCategory][result.middleCategory].push(result);
    });
    
    let html = '';
    Object.keys(grouped).forEach(majorCat => {
        html += `<div class="mb-4">
            <h6 class="fw-bold text-primary">${majorCat}</h6>`;
        
        Object.keys(grouped[majorCat]).forEach(middleCat => {
            html += `<div class="ms-3 mb-2"><strong>${middleCat}</strong>`;
            
            grouped[majorCat][middleCat].forEach(result => {
                const percentage = Math.round((result.totalCorrect / result.totalQuestions) * 100);
                html += `
                    <div class="category-stat-item ms-3 mb-2">
                        <div class="d-flex justify-content-between">
                            <span>${result.minorCategory}</span>
                            <span>
                                <span class="badge bg-primary">${result.totalCorrect}/${result.totalQuestions}</span>
                                <span class="badge bg-info">${percentage}%</span>
                            </span>
                        </div>
                        <div class="progress mt-1" style="height: 4px;">
                            <div class="progress-bar" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
        });
        html += '</div>';
    });
    
    categoryStatsDisplay.innerHTML = html;
}

// ==================== QUESTION LIST FUNCTIONS ====================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showQuestionListScreen() {
    showScreen(questionListScreen);
    initializeQuestionListFilters();
    updateQuestionList();
}

function initializeQuestionListFilters() {
    const categories = getCategories();
    
    // Populate major category filter
    majorCategoryFilter.innerHTML = '<option value="">すべて</option>';
    Object.keys(categories).forEach(majorCat => {
        const option = document.createElement('option');
        option.value = majorCat;
        option.textContent = majorCat;
        majorCategoryFilter.appendChild(option);
    });
    
    // Reset other filters
    middleCategoryFilter.innerHTML = '<option value="">すべて</option>';
    minorCategoryFilter.innerHTML = '<option value="">すべて</option>';
}

function updateMiddleCategoryFilter() {
    const categories = getCategories();
    const selectedMajor = majorCategoryFilter.value;
    middleCategoryFilter.innerHTML = '<option value="">すべて</option>';
    minorCategoryFilter.innerHTML = '<option value="">すべて</option>';
    
    if (selectedMajor) {
        Object.keys(categories[selectedMajor]).forEach(middleCat => {
            const option = document.createElement('option');
            option.value = middleCat;
            option.textContent = middleCat;
            middleCategoryFilter.appendChild(option);
        });
    }
}

function updateMinorCategoryFilter() {
    const categories = getCategories();
    const selectedMajor = majorCategoryFilter.value;
    const selectedMiddle = middleCategoryFilter.value;
    minorCategoryFilter.innerHTML = '<option value="">すべて</option>';
    
    if (selectedMajor && selectedMiddle) {
        categories[selectedMajor][selectedMiddle].forEach(minorCat => {
            const option = document.createElement('option');
            option.value = minorCat;
            option.textContent = minorCat;
            minorCategoryFilter.appendChild(option);
        });
    }
}

function updateQuestionList() {
    const selectedMajor = majorCategoryFilter.value;
    const selectedMiddle = middleCategoryFilter.value;
    const selectedMinor = minorCategoryFilter.value;
    
    // Filter questions with combined conditions for better performance
    let filteredQuestions = quizData.filter(q => {
        if (selectedMajor && q.majorCategory !== selectedMajor) return false;
        if (selectedMiddle && q.middleCategory !== selectedMiddle) return false;
        if (selectedMinor && q.minorCategory !== selectedMinor) return false;
        return true;
    });
    
    // Update question count
    questionCount.textContent = `${filteredQuestions.length}問`;
    
    // Display questions
    displayQuestionList(filteredQuestions);
}

function displayQuestionList(questions) {
    questionListContainer.innerHTML = '';
    
    if (questions.length === 0) {
        questionListContainer.innerHTML = '<div class="alert alert-info">問題が見つかりませんでした</div>';
        return;
    }
    
    questions.forEach((question, index) => {
        const card = document.createElement('div');
        card.className = 'card mb-3 question-list-item shadow-sm';
        card.style.cursor = 'pointer';
        
        card.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="card-title mb-0">問題 ${index + 1}</h5>
                    <div>
                        <span class="badge bg-primary me-1">${escapeHtml(question.majorCategory)}</span>
                        <span class="badge bg-info me-1">${escapeHtml(question.middleCategory)}</span>
                        <span class="badge bg-success">${escapeHtml(question.minorCategory)}</span>
                    </div>
                </div>
                <p class="card-text question-text mb-0">${escapeHtml(question.question)}</p>
            </div>
        `;
        
        // Add click event to navigate to this question
        // Store the question object directly to avoid inefficient lookup
        card.addEventListener('click', () => {
            startQuizFromQuestion(question);
        });
        
        questionListContainer.appendChild(card);
    });
}
