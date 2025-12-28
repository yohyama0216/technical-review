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

function createCategoryCard(categoryName, index, colClass = 'col-md-4') {
    const col = document.createElement('div');
    col.className = colClass;

    const card = document.createElement('div');
    card.className = `card category-card text-white bg-category-${(index % 9) + 1} shadow-sm`;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body text-center';
    cardBody.innerHTML = `<h5 class="mb-0">${categoryName}</h5>`;

    card.appendChild(cardBody);
    col.appendChild(card);
    
    return { col, card };
}

function getQuestionsByCategory(majorCat, middleCat, minorCat) {
    return quizData.filter(
        q =>
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

// ==================== LOCALSTORAGE HELPERS ====================

function getLocalStorageItem(key, defaultValue = {}) {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));
}

function setLocalStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// ==================== UTILITY HELPERS ====================

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function updateProgressBar(element, current, total) {
    if (!element) return;
    const progress = ((current + 1) / total) * 100;
    element.style.width = `${progress}%`;
    element.setAttribute('aria-valuenow', progress);
}

function setProgressBarPercentage(element, percentage) {
    if (!element) return;
    element.style.width = `${percentage}%`;
    element.setAttribute('aria-valuenow', percentage);
}

function styleAnswerButtons(question, selectedAnswer, shuffledAnswers) {
    const answerButtons = document.querySelectorAll('.answer-btn');
    const isCorrect = selectedAnswer === question.correct;
    
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
}

// ==================== DOM ELEMENTS ====================

let majorCategoryScreen = null;
let middleCategoryScreen = null;
let minorCategoryScreen = null;
let questionListScreen = null;
let statsScreen = null;
let quizScreen = null;
let resultScreen = null;
let reviewScreen = null;

let majorCategoryButtons = null;
let middleCategoryButtons = null;
let middleCategoryTitle = null;
let minorCategoryButtons = null;
let minorCategoryTitle = null;

let backBtn = null;
let submitBtn = null;
let nextQuestionBtn = null;
let reviewBtn = null;
let homeBtn = null;
let reviewBackBtn = null;

let progressFill = null;
let categoryBreadcrumb = null;
let questionText = null;
let answersContainer = null;
let resultContent = null;
let reviewContent = null;
let reviewCategoryTitle = null;

// Stats elements
let totalCorrectEl = null;
let totalIncorrectEl = null;
let totalQuestionsEl = null;
let completedQuestionsEl = null;
let unansweredQuestionsEl = null;
let completedPercentageEl = null;
let unansweredPercentageEl = null;

// Question list elements
let majorCategoryFilter = null;
let middleCategoryFilter = null;
let minorCategoryFilter = null;
let questionListContainer = null;
let questionCount = null;
let answerStatusFilter = null;
let questionSearch = null;

// ==================== INITIALIZATION ====================

function migrateOldData() {
    // Migrate old questionAnswerCounts to questionAnswerStats if needed
    const oldCounts = localStorage.getItem('questionAnswerCounts');
    const newStats = localStorage.getItem('questionAnswerStats');

    if (oldCounts && !newStats) {
        const counts = JSON.parse(oldCounts);
        const stats = {};

        for (const [key, value] of Object.entries(counts)) {
            // Assume old counts were total answers, split as correct for backward compatibility
            stats[key] = { correct: value, incorrect: 0 };
        }

        setLocalStorageItem('questionAnswerStats', stats);
        console.log('Migrated old answer counts to new stats format');
    }
}

function initializeDOM() {
    majorCategoryScreen = document.getElementById('majorCategoryScreen');
    middleCategoryScreen = document.getElementById('middleCategoryScreen');
    minorCategoryScreen = document.getElementById('minorCategoryScreen');
    questionListScreen = document.getElementById('questionListScreen');
    statsScreen = document.getElementById('statsScreen');
    quizScreen = document.getElementById('quizScreen');
    resultScreen = document.getElementById('resultScreen');
    reviewScreen = document.getElementById('reviewScreen');

    majorCategoryButtons = document.getElementById('majorCategoryButtons');
    middleCategoryButtons = document.getElementById('middleCategoryButtons');
    middleCategoryTitle = document.getElementById('middleCategoryTitle');
    minorCategoryButtons = document.getElementById('minorCategoryButtons');
    minorCategoryTitle = document.getElementById('minorCategoryTitle');

    backBtn = document.getElementById('backBtn');
    submitBtn = document.getElementById('submitBtn');
    nextQuestionBtn = document.getElementById('nextQuestionBtn');
    reviewBtn = document.getElementById('reviewBtn');
    homeBtn = document.getElementById('homeBtn');
    reviewBackBtn = document.getElementById('reviewBackBtn');

    progressFill = document.getElementById('progressFill');
    categoryBreadcrumb = document.getElementById('categoryBreadcrumb');
    questionText = document.getElementById('questionText');
    answersContainer = document.getElementById('answersContainer');
    resultContent = document.getElementById('resultContent');
    reviewContent = document.getElementById('reviewContent');
    reviewCategoryTitle = document.getElementById('reviewCategoryTitle');

    totalCorrectEl = document.getElementById('totalCorrect');
    totalIncorrectEl = document.getElementById('totalIncorrect');
    totalQuestionsEl = document.getElementById('totalQuestions');
    completedQuestionsEl = document.getElementById('completedQuestions');
    unansweredQuestionsEl = document.getElementById('unansweredQuestions');
    completedPercentageEl = document.getElementById('completedPercentage');
    unansweredPercentageEl = document.getElementById('unansweredPercentage');

    majorCategoryFilter = document.getElementById('majorCategoryFilter');
    middleCategoryFilter = document.getElementById('middleCategoryFilter');
    minorCategoryFilter = document.getElementById('minorCategoryFilter');
    questionListContainer = document.getElementById('questionListContainer');
    questionCount = document.getElementById('questionCount');
    answerStatusFilter = document.getElementById('answerStatusFilter');
    questionSearch = document.getElementById('questionSearch');
}

document.addEventListener('DOMContentLoaded', () => {
    initializeDOM();
    setupEventListeners();
    migrateOldData();

    // Initialize based on current page
    const pathname = window.location.pathname;
    if (pathname.includes('stats.html')) {
        loadStatistics();
    } else if (pathname.includes('question-list.html')) {
        initializeQuestionListFilters();
        updateQuestionList();
    }
});

function setupEventListeners() {
    document.getElementById('randomQuestionBtn')?.addEventListener('click', startRandomQuestion);
    document.getElementById('backToMajorBtn')?.addEventListener('click', showMajorCategoryScreen);
    document
        .getElementById('backToMiddleBtn')
        ?.addEventListener('click', () => showMiddleCategories(currentMajorCategory));
    document.getElementById('backToHomeBtn')?.addEventListener('click', showMajorCategoryScreen);
    document
        .getElementById('backToHomeFromListBtn')
        ?.addEventListener('click', showMajorCategoryScreen);
    backBtn?.addEventListener('click', returnToQuestionList);
    homeBtn?.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    reviewBtn?.addEventListener('click', showReview);
    reviewBackBtn?.addEventListener('click', showResultScreen);
    nextQuestionBtn?.addEventListener('click', goToNextQuestion);

    // Question list filter event listeners
    majorCategoryFilter?.addEventListener('change', () => {
        updateMiddleCategoryFilter();
        updateQuestionList();
    });
    middleCategoryFilter?.addEventListener('change', () => {
        updateMinorCategoryFilter();
        updateQuestionList();
    });
    questionSearch?.addEventListener('input', updateQuestionList);
    minorCategoryFilter?.addEventListener('change', updateQuestionList);
    answerStatusFilter?.addEventListener('change', updateQuestionList);
}

// ==================== SCREEN NAVIGATION ====================

function showScreen(screenToShow) {
    const screens = [
        majorCategoryScreen,
        middleCategoryScreen,
        minorCategoryScreen,
        questionListScreen,
        statsScreen,
        quizScreen,
        resultScreen,
        reviewScreen,
    ];

    screens.forEach(screen => {
        if (screen) {
            screen.classList.remove('active');
        }
    });

    if (screenToShow) {
        screenToShow.classList.add('active');
    }
}

function navigateToPage(pageName, screen, initCallback) {
    // Navigate to page if not already there
    if (!window.location.pathname.includes(pageName)) {
        window.location.href = pageName;
        return;
    }
    showScreen(screen);
    if (initCallback) {
        initCallback();
    }
}

function showMajorCategoryScreen() {
    showScreen(majorCategoryScreen);
}

function returnToQuestionList() {
    // Check if we're on the question list page
    if (window.location.pathname.includes('question-list.html')) {
        showScreen(questionListScreen);
    } else {
        showMajorCategoryScreen();
    }
}

// ==================== RANDOM QUESTION ====================

function startRandomQuestion() {
    // Get a random question from all available questions
    const randomIndex = Math.floor(Math.random() * quizData.length);
    const randomQuestion = quizData[randomIndex];

    startQuizFromQuestion(randomQuestion);
}

function showQuestionListScreen() {
    navigateToPage('question-list.html', questionListScreen, () => {
        initializeQuestionListFilters();
        updateQuestionList();
    });
}

function showStatsScreen() {
    navigateToPage('stats.html', statsScreen, loadStatistics);
}

// ==================== MAJOR CATEGORY ====================

function setupMajorCategories() {
    if (!majorCategoryButtons) return;

    const categories = getCategories();
    majorCategoryButtons.innerHTML = '';

    const majorCats = Object.keys(categories);
    majorCats.forEach((category, index) => {
        const { col, card } = createCategoryCard(category, index);
        card.addEventListener('click', () => showMiddleCategories(category));
        majorCategoryButtons.appendChild(col);
    });
}

function showMiddleCategories(majorCat) {
    if (!middleCategoryTitle || !middleCategoryButtons) return;

    currentMajorCategory = majorCat;
    const categories = getCategories();
    const middleCats = Object.keys(categories[majorCat]);

    middleCategoryTitle.textContent = `${majorCat} - 中カテゴリを選択`;
    middleCategoryButtons.innerHTML = '';

    middleCats.forEach((middleCat, index) => {
        const { col, card } = createCategoryCard(middleCat, index);
        card.addEventListener('click', () => showMinorCategories(majorCat, middleCat));
        middleCategoryButtons.appendChild(col);
    });

    showScreen(middleCategoryScreen);
}

function showMinorCategories(majorCat, middleCat) {
    if (!minorCategoryTitle || !minorCategoryButtons) return;

    currentMajorCategory = majorCat;
    currentMiddleCategory = middleCat;
    const categories = getCategories();
    const minorCats = categories[majorCat][middleCat];

    minorCategoryTitle.textContent = `${middleCat} - 小カテゴリを選択`;
    minorCategoryButtons.innerHTML = '';

    minorCats.forEach((minorCat, index) => {
        const { col, card } = createCategoryCard(minorCat, index, 'col-md-6');
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
    if (categoryBreadcrumb) {
        categoryBreadcrumb.innerHTML = `
            <li class="breadcrumb-item">${currentMajorCategory}</li>
            <li class="breadcrumb-item">${currentMiddleCategory}</li>
            <li class="breadcrumb-item active">${currentMinorCategory}</li>
        `;
    }

    // Update progress
    updateProgressBar(progressFill, currentQuestionIndex, currentQuestions.length);

    // Show question
    if (questionText) {
        questionText.textContent = question.question;
    }

    // Clear and hide explanation
    const existingExplanation = document.getElementById('explanationBox');
    if (existingExplanation) {
        existingExplanation.remove();
    }

    // Shuffle answers
    const answersWithIndex = question.answers.map((text, index) => ({
        text: text,
        originalIndex: index,
    }));
    shuffledAnswers = shuffleArray(answersWithIndex);

    // Display answers
    if (answersContainer) {
        answersContainer.innerHTML = '';
        shuffledAnswers.forEach(answerObj => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-primary answer-btn';
            btn.textContent = answerObj.text;
            btn.addEventListener('click', () => selectAnswer(answerObj.originalIndex));
            answersContainer.appendChild(btn);
        });
    }

    if (submitBtn) submitBtn.classList.add('d-none');
    if (nextQuestionBtn) nextQuestionBtn.classList.add('d-none');
}

function selectAnswer(index) {
    if (selectedAnswer !== null) return;

    selectedAnswer = index;
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correct;

    quizResults.push({
        questionIndex: currentQuestionIndex,
        selectedAnswer: selectedAnswer,
        correct: isCorrect,
    });

    // Style answer buttons to show correct/incorrect
    styleAnswerButtons(question, selectedAnswer, shuffledAnswers);

    if (submitBtn) submitBtn.classList.add('d-none');
    showExplanation(question, isCorrect);

    // Save to daily history
    saveDailyHistory(isCorrect);

    // Increment answer count for this question
    incrementQuestionAnswerCount(question, isCorrect);

    // Show next question button
    if (nextQuestionBtn) nextQuestionBtn.classList.remove('d-none');
}

function showExplanation(question, isCorrect) {
    let explanationBox = document.getElementById('explanationBox');

    if (!explanationBox) {
        explanationBox = document.createElement('div');
        explanationBox.id = 'explanationBox';
        explanationBox.className =
            'alert ' + (isCorrect ? 'alert-success' : 'alert-danger') + ' mt-3';
        const quizContent = document.querySelector('.quiz-content');
        if (quizContent) {
            quizContent.appendChild(explanationBox);
        }
    }

    if (explanationBox) {
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
}

//  ==================== RESULT & REVIEW ====================

function saveQuizResults() {
    if (quizResults.length === 0) return;

    const correct = quizResults.filter(r => r.correct).length;
    const total = quizResults.length;
    saveQuizResult(
        currentMajorCategory,
        currentMiddleCategory,
        currentMinorCategory,
        correct,
        total
    );
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

function incrementQuestionAnswerCount(question, isCorrect) {
    const questionId = getQuestionId(question);
    const answerStats = getLocalStorageItem('questionAnswerStats');

    if (!answerStats[questionId]) {
        answerStats[questionId] = { correct: 0, incorrect: 0 };
    }

    if (isCorrect) {
        answerStats[questionId].correct++;
    } else {
        answerStats[questionId].incorrect++;
    }

    setLocalStorageItem('questionAnswerStats', answerStats);
}

function getQuestionAnswerCount(question) {
    const questionId = getQuestionId(question);
    const answerStats = JSON.parse(localStorage.getItem('questionAnswerStats') || '{}');
    const stats = answerStats[questionId] || { correct: 0, incorrect: 0 };
    return stats.correct + stats.incorrect;
}

function getQuestionAnswerStats(question) {
    const questionId = getQuestionId(question);
    const answerStats = getLocalStorageItem('questionAnswerStats');

    // Migration: Convert old questionAnswerCounts to questionAnswerStats
    if (!answerStats[questionId]) {
        const oldCounts = getLocalStorageItem('questionAnswerCounts');
        if (oldCounts[questionId]) {
            // Assume old counts were all correct answers for backward compatibility
            answerStats[questionId] = { correct: oldCounts[questionId], incorrect: 0 };
        }
    }

    return answerStats[questionId] || { correct: 0, incorrect: 0 };
}

function isQuestionCompleted(question) {
    const stats = getQuestionAnswerStats(question);
    // 正解数が不正解数より5個以上多い場合は完了
    return stats.correct >= stats.incorrect + 5;
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

    // Add the new question to the current session instead of resetting
    currentMajorCategory = nextQuestion.majorCategory;
    currentMiddleCategory = nextQuestion.middleCategory;
    currentMinorCategory = nextQuestion.minorCategory;
    currentQuestions.push(nextQuestion);
    currentQuestionIndex++;

    // Load the next question without resetting results
    loadQuestion();
}

// ==================== STATISTICS FUNCTIONS ====================

function saveQuizResult(majorCat, middleCat, minorCat, correct, total) {
    const results = getLocalStorageItem('quizResults');
    const key = `${majorCat}::${middleCat}::${minorCat}`;

    if (!results[key]) {
        results[key] = {
            majorCategory: majorCat,
            middleCategory: middleCat,
            minorCategory: minorCat,
            attempts: 0,
            totalCorrect: 0,
            totalQuestions: 0,
        };
    }

    results[key].attempts++;
    results[key].totalCorrect += correct;
    results[key].totalQuestions += total;

    setLocalStorageItem('quizResults', results);
}

function saveDailyHistory(isCorrect) {
    const today = new Date().toISOString().split('T')[0];
    const history = getLocalStorageItem('dailyHistory');

    if (!history[today]) {
        history[today] = { correct: 0, incorrect: 0, total: 0 };
    }

    history[today].total++;
    if (isCorrect) {
        history[today].correct++;
    } else {
        history[today].incorrect++;
    }

    setLocalStorageItem('dailyHistory', history);
}

function loadStatistics() {
    // Calculate cumulative totals from question answer stats
    let totalCorrect = 0;
    let totalIncorrect = 0;

    quizData.forEach(question => {
        const stats = getQuestionAnswerStats(question);
        totalCorrect += stats.correct;
        totalIncorrect += stats.incorrect;
    });

    // Get daily history for charts
    const dailyHistory = getLocalStorageItem('dailyHistory');

    // Calculate question statistics
    let completedCount = 0;
    let unansweredCount = 0;
    let answeredCount = 0;

    quizData.forEach(question => {
        const stats = getQuestionAnswerStats(question);
        const total = stats.correct + stats.incorrect;

        if (total > 0) {
            answeredCount++;
        } else {
            unansweredCount++;
        }

        if (isQuestionCompleted(question)) {
            completedCount++;
        }
    });

    const totalQuestions = quizData.length;
    const totalStudied = totalCorrect + totalIncorrect; // 累計学習数（全回答数の合計）
    const studiedPercentage =
        totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
    const completedPercentage =
        totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;
    const unansweredPercentage =
        totalQuestions > 0 ? Math.round((unansweredCount / totalQuestions) * 100) : 0;
    const answeredPercentage =
        totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

    // Update summary cards
    if (totalCorrectEl) totalCorrectEl.textContent = totalCorrect;
    if (totalIncorrectEl) totalIncorrectEl.textContent = totalIncorrect;
    if (completedQuestionsEl) completedQuestionsEl.textContent = totalStudied; // 累計学習数として全回答数を表示
    if (unansweredQuestionsEl) unansweredQuestionsEl.textContent = unansweredCount;
    if (completedPercentageEl) completedPercentageEl.textContent = `${studiedPercentage}%`; // 回答済み問題の割合
    if (unansweredPercentageEl) unansweredPercentageEl.textContent = `${unansweredPercentage}%`;

    // Update progress overview
    const totalQuestionsText = document.getElementById('totalQuestionsText');
    const completedProgress = document.getElementById('completedProgress');
    const answeredProgress = document.getElementById('answeredProgress');
    const unansweredProgress = document.getElementById('unansweredProgress');
    const completedProgressText = document.getElementById('completedProgressText');
    const answeredProgressText = document.getElementById('answeredProgressText');
    const unansweredProgressText = document.getElementById('unansweredProgressText');
    const completedCount2 = document.getElementById('completedCount2');
    const answeredCountEl = document.getElementById('answeredCount');
    const unansweredCount2 = document.getElementById('unansweredCount2');

    if (totalQuestionsText) totalQuestionsText.textContent = totalQuestions;
    setProgressBarPercentage(completedProgress, completedPercentage);
    setProgressBarPercentage(answeredProgress, answeredPercentage);
    setProgressBarPercentage(unansweredProgress, unansweredPercentage);
    if (completedProgressText) completedProgressText.textContent = `${completedPercentage}%`;
    if (answeredProgressText) answeredProgressText.textContent = `${answeredPercentage}%`;
    if (unansweredProgressText) unansweredProgressText.textContent = `${unansweredPercentage}%`;
    if (completedCount2) completedCount2.textContent = completedCount;
    if (answeredCountEl) answeredCountEl.textContent = answeredCount;
    if (unansweredCount2) unansweredCount2.textContent = unansweredCount;

    // Display daily stats
    displayDailyStats(dailyHistory);
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
        return;
    }

    // Check if Chart.js is available
    if (typeof Chart !== 'undefined') {
        // Show chart
        document.getElementById('dailyStatsChart').style.display = 'block';

        // Prepare data for chart (show last 14 days or all if less)
        const chartDates = dates.slice(-14);
        const totalData = chartDates.map(date => dailyHistory[date]?.total || 0);
        const correctData = chartDates.map(date => dailyHistory[date]?.correct || 0);
        const incorrectData = chartDates.map(date => dailyHistory[date]?.incorrect || 0);

        // Calculate cumulative data
        let cumulativeTotal = 0;
        let cumulativeCorrect = 0;
        let cumulativeIncorrect = 0;

        // Get cumulative values up to the start of chart dates
        dates.forEach(date => {
            const stats = dailyHistory[date];
            if (stats) {
                if (!chartDates.includes(date)) {
                    // Before the chart range - just accumulate
                    cumulativeTotal += stats.total || 0;
                    cumulativeCorrect += stats.correct || 0;
                    cumulativeIncorrect += stats.incorrect || 0;
                }
            }
        });

        // Build cumulative data for chart dates
        const cumulativeTotalData = [];
        const cumulativeCorrectData = [];
        const cumulativeIncorrectData = [];

        chartDates.forEach(date => {
            const stats = dailyHistory[date];
            if (stats) {
                cumulativeTotal += stats.total || 0;
                cumulativeCorrect += stats.correct || 0;
                cumulativeIncorrect += stats.incorrect || 0;
            }
            cumulativeTotalData.push(cumulativeTotal);
            cumulativeCorrectData.push(cumulativeCorrect);
            cumulativeIncorrectData.push(cumulativeIncorrect);
        });

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
                        label: '累計学習数',
                        data: cumulativeTotalData,
                        borderColor: 'rgb(13, 110, 253)',
                        backgroundColor: 'rgba(13, 110, 253, 0.1)',
                        tension: 0.3,
                        fill: true,
                        borderWidth: 2,
                    },
                    {
                        label: '累計正解数',
                        data: cumulativeCorrectData,
                        borderColor: 'rgb(25, 135, 84)',
                        backgroundColor: 'rgba(25, 135, 84, 0.1)',
                        tension: 0.3,
                        fill: true,
                        borderWidth: 2,
                    },
                    {
                        label: '累計不正解数',
                        data: cumulativeIncorrectData,
                        borderColor: 'rgb(220, 53, 69)',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        tension: 0.3,
                        fill: true,
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            afterBody: function (context) {
                                const index = context[0].dataIndex;
                                const dailyTotal = totalData[index];
                                const dailyCorrect = correctData[index];
                                const dailyIncorrect = incorrectData[index];
                                return [
                                    '',
                                    '━━━━━━━━━━━━',
                                    `当日学習数: ${dailyTotal}問`,
                                    `当日正解数: ${dailyCorrect}問`,
                                    `当日不正解数: ${dailyIncorrect}問`,
                                ];
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                        },
                    },
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false,
                },
            },
        });
    } else {
        // If Chart.js is not available, hide the chart canvas
        const chartElement = document.getElementById('dailyStatsChart');
        if (chartElement) {
            chartElement.style.display = 'none';
        }
    }
}

// ==================== QUESTION LIST FUNCTIONS ====================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function initializeQuestionListFilters() {
    const categories = getCategories();

    // Populate major category filter
    updateCategoryFilterOptions(majorCategoryFilter, Object.keys(categories));

    // Reset other filters
    middleCategoryFilter.innerHTML = '<option value="">すべて</option>';
    minorCategoryFilter.innerHTML = '<option value="">すべて</option>';
}

function updateMiddleCategoryFilter() {
    const categories = getCategories();
    const selectedMajor = majorCategoryFilter.value;
    
    updateCategoryFilterOptions(middleCategoryFilter, 
        selectedMajor ? Object.keys(categories[selectedMajor]) : []);
    
    // Reset minor category filter
    minorCategoryFilter.innerHTML = '<option value="">すべて</option>';
}

function updateMinorCategoryFilter() {
    const categories = getCategories();
    const selectedMajor = majorCategoryFilter.value;
    const selectedMiddle = middleCategoryFilter.value;
    
    const minorCategories = (selectedMajor && selectedMiddle) 
        ? categories[selectedMajor][selectedMiddle] 
        : [];
    
    updateCategoryFilterOptions(minorCategoryFilter, minorCategories);
}

function updateCategoryFilterOptions(filterElement, options) {
    filterElement.innerHTML = '<option value="">すべて</option>';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        filterElement.appendChild(optionElement);
    });
}

function updateQuestionList() {
    const selectedMajor = majorCategoryFilter.value;
    const selectedMiddle = middleCategoryFilter.value;
    const selectedMinor = minorCategoryFilter.value;
    const selectedStatus = answerStatusFilter?.value || 'all';
    const searchKeyword = questionSearch?.value.toLowerCase().trim() || '';

    // Filter questions with combined conditions for better performance
    let filteredQuestions = quizData.filter(q => {
        if (selectedMajor && q.majorCategory !== selectedMajor) return false;
        if (selectedMiddle && q.middleCategory !== selectedMiddle) return false;
        if (selectedMinor && q.minorCategory !== selectedMinor) return false;

        // Filter by search keyword (search in question text and all answers)
        if (searchKeyword) {
            const questionText = q.question.toLowerCase();
            const answersText = q.answers.map(a => a.toLowerCase()).join(' ');
            if (!questionText.includes(searchKeyword) && !answersText.includes(searchKeyword)) {
                return false;
            }
        }

        // Filter by answer status
        if (selectedStatus !== 'all') {
            const stats = getQuestionAnswerStats(q);
            const total = stats.correct + stats.incorrect;
            const isCompleted = isQuestionCompleted(q);

            if (selectedStatus === 'unanswered' && total > 0) return false;
            if (selectedStatus === 'answered' && total === 0) return false;
            if (selectedStatus === 'incomplete' && (total === 0 || isCompleted)) return false;
            if (selectedStatus === 'completed' && !isCompleted) return false;
        }

        return true;
    });

    // Update question count
    questionCount.textContent = `${filteredQuestions.length}問`;

    // Display questions
    displayQuestionList(filteredQuestions);
}

function displayQuestionList(questions) {
    if (!questionListContainer) return;

    questionListContainer.innerHTML = '';

    if (questions.length === 0) {
        questionListContainer.innerHTML =
            '<div class="alert alert-info">問題が見つかりませんでした</div>';
        return;
    }

    questions.forEach((question, index) => {
        const card = document.createElement('div');
        card.className = 'card mb-3 question-list-item shadow-sm';
        card.style.cursor = 'pointer';

        // Get stats for this question
        const stats = getQuestionAnswerStats(question);
        const total = stats.correct + stats.incorrect;
        const percentage = total > 0 ? Math.round((stats.correct / total) * 100) : 0;

        let statsHtml = '';
        if (total > 0) {
            statsHtml = `
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <div>
                        <span class="badge bg-success me-1"><i class="bi bi-check-circle"></i> ${stats.correct}</span>
                        <span class="badge bg-danger me-1"><i class="bi bi-x-circle"></i> ${stats.incorrect}</span>
                        <span class="badge bg-secondary">正解率: ${percentage}%</span>
                    </div>
                </div>
            `;
        } else {
            statsHtml = '<div class="text-muted small">未回答</div>';
        }

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
                <p class="card-text question-text mb-2">${escapeHtml(question.question)}</p>
                ${statsHtml}
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
