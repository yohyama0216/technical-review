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

let majorCategoryScreen = null;
let middleCategoryScreen = null;
let minorCategoryScreen = null;
let questionListScreen = null;
let statsScreen = null;
let quizScreen = null;
let resultScreen = null;
let reviewScreen = null;
let achievementsScreen = null;

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
let dailyStatsDisplay = null;
let categoryStatsDisplay = null;

// Question list elements
let majorCategoryFilter = null;
let middleCategoryFilter = null;
let minorCategoryFilter = null;
let questionListContainer = null;
let questionCount = null;
let answerStatusFilter = null;
let questionSearch = null;

// ==================== NEW FEATURES DATA ====================

// Favorites
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function toggleFavorite(question) {
    const questionId = getQuestionId(question);
    const favorites = getFavorites();
    const index = favorites.indexOf(questionId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(questionId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return favorites.includes(questionId);
}

function isFavorite(question) {
    const questionId = getQuestionId(question);
    return getFavorites().includes(questionId);
}

// Daily Goal
function getDailyGoal() {
    return parseInt(localStorage.getItem('dailyGoal') || '10');
}

function setDailyGoal(goal) {
    localStorage.setItem('dailyGoal', goal.toString());
}

function getTodayProgress() {
    const today = new Date().toISOString().split('T')[0];
    const history = JSON.parse(localStorage.getItem('dailyHistory') || '{}');
    return history[today]?.total || 0;
}

// Learning Streak
function calculateStreak() {
    const history = JSON.parse(localStorage.getItem('dailyHistory') || '{}');
    
    if (Object.keys(history).length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    
    let currentDate = new Date(today);
    
    // Check if today has activity, if not start from yesterday
    const todayStr = currentDate.toISOString().split('T')[0];
    if (!history[todayStr]) {
        currentDate.setDate(currentDate.getDate() - 1);
    }
    
    // Count consecutive days backwards
    while (true) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (history[dateStr]) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }
    
    return streak;
}

// Achievements/Badges
const BADGES = [
    { id: 'first_answer', name: '初めの一歩', icon: '🎯', description: '最初の問題に回答', condition: (stats) => stats.totalAnswers >= 1 },
    { id: 'ten_correct', name: '10問正解', icon: '✨', description: '10問正解を達成', condition: (stats) => stats.totalCorrect >= 10 },
    { id: 'fifty_correct', name: '50問正解', icon: '⭐', description: '50問正解を達成', condition: (stats) => stats.totalCorrect >= 50 },
    { id: 'hundred_correct', name: '100問正解', icon: '🌟', description: '100問正解を達成', condition: (stats) => stats.totalCorrect >= 100 },
    { id: 'perfect_score', name: 'パーフェクト', icon: '🏆', description: 'カテゴリで全問正解', condition: (stats) => stats.hasPerfectCategory },
    { id: 'streak_3', name: '3日連続', icon: '🔥', description: '3日連続で学習', condition: (stats) => stats.streak >= 3 },
    { id: 'streak_7', name: '1週間連続', icon: '💪', description: '7日連続で学習', condition: (stats) => stats.streak >= 7 },
    { id: 'complete_10', name: '10問完了', icon: '🎓', description: '10問を完了状態に', condition: (stats) => stats.completedQuestions >= 10 },
    { id: 'favorite_5', name: 'お気に入り5', icon: '💖', description: '5問をお気に入り登録', condition: (stats) => stats.favoriteCount >= 5 },
    { id: 'daily_goal', name: '目標達成', icon: '🎯', description: '1日の目標を達成', condition: (stats) => stats.dailyGoalAchieved }
];

function getEarnedBadges() {
    return JSON.parse(localStorage.getItem('earnedBadges') || '[]');
}

function checkAndAwardBadges() {
    const earnedBadges = getEarnedBadges();
    const newBadges = [];
    
    // Calculate stats
    const dailyHistory = JSON.parse(localStorage.getItem('dailyHistory') || '{}');
    let totalCorrect = 0;
    let totalAnswers = 0;
    
    Object.values(dailyHistory).forEach(day => {
        totalCorrect += day.correct || 0;
        totalAnswers += day.total || 0;
    });
    
    const completedQuestions = quizData.filter(q => isQuestionCompleted(q)).length;
    const favoriteCount = getFavorites().length;
    const streak = calculateStreak();
    const dailyGoal = getDailyGoal();
    const todayProgress = getTodayProgress();
    const dailyGoalAchieved = todayProgress >= dailyGoal;
    
    // Check for perfect category (placeholder - would need category-specific tracking)
    const hasPerfectCategory = false;
    
    const stats = {
        totalCorrect,
        totalAnswers,
        completedQuestions,
        favoriteCount,
        streak,
        dailyGoalAchieved,
        hasPerfectCategory
    };
    
    BADGES.forEach(badge => {
        if (!earnedBadges.includes(badge.id) && badge.condition(stats)) {
            earnedBadges.push(badge.id);
            newBadges.push(badge);
        }
    });
    
    localStorage.setItem('earnedBadges', JSON.stringify(earnedBadges));
    
    return newBadges;
}

// Dark Mode
function initDarkMode() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        const icon = document.getElementById('darkModeIcon');
        if (icon) {
            icon.className = 'bi bi-sun-fill';
        }
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    
    const icon = document.getElementById('darkModeIcon');
    if (icon) {
        icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }
}

// Global toast notification function
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'alert-success' : type === 'warning' ? 'alert-warning' : 'alert-info';
    toast.className = `position-fixed top-0 start-50 translate-middle-x mt-3 alert ${bgClass} alert-dismissible fade show`;
    toast.style.zIndex = '9999';
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

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
        
        localStorage.setItem('questionAnswerStats', JSON.stringify(stats));
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
    achievementsScreen = document.getElementById('achievementsScreen');
    
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
    dailyStatsDisplay = document.getElementById('dailyStatsDisplay');
    categoryStatsDisplay = document.getElementById('categoryStatsDisplay');
    
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
    initDarkMode();
    setupEventListeners();
    migrateOldData();
    
    // Initialize based on current page
    const pathname = window.location.pathname;
    if (pathname.includes('stats.html')) {
        loadStatistics();
    } else if (pathname.includes('question-list.html')) {
        initializeQuestionListFilters();
        updateQuestionList();
    } else if (pathname.includes('index.html') || pathname.endsWith('/')) {
        updateHomeScreen();
    }
});

function setupEventListeners() {
    document.getElementById('randomQuestionBtn')?.addEventListener('click', startRandomQuestion);
    document.getElementById('weakPointModeBtn')?.addEventListener('click', startWeakPointMode);
    document.getElementById('favoriteModeBtn')?.addEventListener('click', startFavoriteMode);
    document.getElementById('achievementsBtn')?.addEventListener('click', showAchievementsScreen);
    document.getElementById('backFromAchievementsBtn')?.addEventListener('click', showMajorCategoryScreen);
    document.getElementById('darkModeToggle')?.addEventListener('click', toggleDarkMode);
    
    document.getElementById('backToMajorBtn')?.addEventListener('click', showMajorCategoryScreen);
    document.getElementById('backToMiddleBtn')?.addEventListener('click', () => showMiddleCategories(currentMajorCategory));
    document.getElementById('backToHomeBtn')?.addEventListener('click', showMajorCategoryScreen);
    document.getElementById('backToHomeFromListBtn')?.addEventListener('click', showMajorCategoryScreen);
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
    const screens = [majorCategoryScreen, middleCategoryScreen, minorCategoryScreen, 
     questionListScreen, statsScreen, quizScreen, resultScreen, reviewScreen, achievementsScreen];
    
    screens.forEach(screen => {
        if (screen) {
            screen.classList.remove('active');
        }
    });
    
    if (screenToShow) {
        screenToShow.classList.add('active');
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

// ==================== NEW MODES ====================

function startWeakPointMode() {
    // Get questions with more incorrect than correct answers
    const weakQuestions = quizData.filter(q => {
        const stats = getQuestionAnswerStats(q);
        return stats.incorrect > stats.correct && (stats.correct + stats.incorrect) > 0;
    });
    
    if (weakQuestions.length === 0) {
        showToast('弱点となる問題がありません！素晴らしいです！', 'info');
        return;
    }
    
    // Pick a random weak question
    const randomIndex = Math.floor(Math.random() * weakQuestions.length);
    startQuizFromQuestion(weakQuestions[randomIndex]);
}

function startFavoriteMode() {
    const favorites = getFavorites();
    
    if (favorites.length === 0) {
        showToast('お気に入りの問題がありません。問題画面で⭐ボタンを押してお気に入りに追加してください。', 'info');
        return;
    }
    
    // Get favorite questions
    const favoriteQuestions = quizData.filter(q => isFavorite(q));
    
    if (favoriteQuestions.length === 0) {
        showToast('お気に入りの問題が見つかりませんでした。', 'warning');
        return;
    }
    
    // Pick a random favorite question
    const randomIndex = Math.floor(Math.random() * favoriteQuestions.length);
    startQuizFromQuestion(favoriteQuestions[randomIndex]);
}

function showAchievementsScreen() {
    if (!achievementsScreen) return;
    
    const badgeContainer = document.getElementById('badgeContainer');
    if (!badgeContainer) return;
    
    badgeContainer.innerHTML = '';
    const earnedBadges = getEarnedBadges();
    
    BADGES.forEach(badge => {
        const isEarned = earnedBadges.includes(badge.id);
        const badgeDiv = document.createElement('div');
        badgeDiv.className = `achievement-badge ${isEarned ? 'earned' : 'locked'}`;
        
        badgeDiv.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-description">${badge.description}</div>
        `;
        
        badgeContainer.appendChild(badgeDiv);
    });
    
    showScreen(achievementsScreen);
}

function updateHomeScreen() {
    // Update quick stats
    const dailyHistory = JSON.parse(localStorage.getItem('dailyHistory') || '{}');
    let totalCorrect = 0;
    
    Object.values(dailyHistory).forEach(day => {
        totalCorrect += day.correct || 0;
    });
    
    const completedCount = quizData.filter(q => isQuestionCompleted(q)).length;
    const favoriteCount = getFavorites().length;
    const streak = calculateStreak();
    const todayProgress = getTodayProgress();
    const dailyGoal = getDailyGoal();
    
    // Update home stats cards
    const homeCorrectCount = document.getElementById('homeCorrectCount');
    const homeCompletedCount = document.getElementById('homeCompletedCount');
    const homeFavoriteCount = document.getElementById('homeFavoriteCount');
    
    if (homeCorrectCount) homeCorrectCount.textContent = totalCorrect;
    if (homeCompletedCount) homeCompletedCount.textContent = completedCount;
    if (homeFavoriteCount) homeFavoriteCount.textContent = favoriteCount;
    
    // Update daily goal
    const dailyGoalCard = document.getElementById('dailyGoalCard');
    const goalText = document.getElementById('goalText');
    const goalProgressFill = document.getElementById('goalProgressFill');
    
    if (dailyGoalCard && goalText && goalProgressFill) {
        dailyGoalCard.style.display = 'block';
        goalText.textContent = `${todayProgress}/${dailyGoal} 問`;
        const goalPercentage = Math.min(100, Math.round((todayProgress / dailyGoal) * 100));
        goalProgressFill.style.width = `${goalPercentage}%`;
        goalProgressFill.textContent = `${goalPercentage}%`;
    }
    
    // Update streak
    const streakCard = document.getElementById('streakCard');
    const streakNumber = document.getElementById('streakNumber');
    
    if (streak > 0 && streakCard && streakNumber) {
        streakCard.style.display = 'flex';
        streakNumber.textContent = streak;
    }
    
    // Check for new badges
    const newBadges = checkAndAwardBadges();
    if (newBadges.length > 0) {
        // Could show a notification here
        console.log('New badges earned:', newBadges);
    }
}

function showQuestionListScreen() {
    // Navigate to question list page if not already there
    if (!window.location.pathname.includes('question-list.html')) {
        window.location.href = 'question-list.html';
        return;
    }
    showScreen(questionListScreen);
    initializeQuestionListFilters();
    updateQuestionList();
}

function showStatsScreen() {
    // Navigate to stats page if not already there
    if (!window.location.pathname.includes('stats.html')) {
        window.location.href = 'stats.html';
        return;
    }
    showScreen(statsScreen);
    loadStatistics();
}

// ==================== MAJOR CATEGORY ====================

function setupMajorCategories() {
    if (!majorCategoryButtons) return;
    
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

function showMiddleCategories(majorCat) {
    if (!middleCategoryTitle || !middleCategoryButtons) return;
    
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

function showMinorCategories(majorCat, middleCat) {
    if (!minorCategoryTitle || !minorCategoryButtons) return;
    
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
    
    // Update breadcrumb with favorite button
    if (categoryBreadcrumb) {
        const isFav = isFavorite(question);
        categoryBreadcrumb.innerHTML = `
            <li class="breadcrumb-item">${currentMajorCategory}</li>
            <li class="breadcrumb-item">${currentMiddleCategory}</li>
            <li class="breadcrumb-item active">${currentMinorCategory}</li>
        `;
        
        // Add favorite button
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = `favorite-btn ${isFav ? 'favorited' : ''}`;
        favoriteBtn.innerHTML = isFav ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>';
        favoriteBtn.title = 'お気に入りに追加';
        favoriteBtn.addEventListener('click', () => {
            const nowFavorited = toggleFavorite(question);
            favoriteBtn.className = `favorite-btn ${nowFavorited ? 'favorited' : ''}`;
            favoriteBtn.innerHTML = nowFavorited ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>';
        });
        
        const cardBody = document.querySelector('#quizScreen .card-body');
        if (cardBody) {
            cardBody.style.position = 'relative';
            cardBody.insertBefore(favoriteBtn, cardBody.firstChild);
        }
    }
    
    // Update progress
    if (progressFill) {
        const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressFill.setAttribute('aria-valuenow', progress);
    }
    
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
    shuffledAnswers = question.answers.map((text, index) => ({
        text: text,
        originalIndex: index
    }));
    
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }
    
    // Display answers
    if (answersContainer) {
        answersContainer.innerHTML = '';
        shuffledAnswers.forEach((answerObj) => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-primary answer-btn';
            btn.textContent = answerObj.text;
            btn.addEventListener('click', () => selectAnswer(answerObj.originalIndex, btn));
            answersContainer.appendChild(btn);
        });
    }
    
    if (submitBtn) submitBtn.classList.add('d-none');
    if (nextQuestionBtn) nextQuestionBtn.classList.add('d-none');
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
        explanationBox.className = 'alert ' + (isCorrect ? 'alert-success' : 'alert-danger') + ' mt-3';
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

function incrementQuestionAnswerCount(question, isCorrect) {
    const questionId = getQuestionId(question);
    const answerStats = JSON.parse(localStorage.getItem('questionAnswerStats') || '{}');
    
    if (!answerStats[questionId]) {
        answerStats[questionId] = { correct: 0, incorrect: 0 };
    }
    
    if (isCorrect) {
        answerStats[questionId].correct++;
    } else {
        answerStats[questionId].incorrect++;
    }
    
    localStorage.setItem('questionAnswerStats', JSON.stringify(answerStats));
}

function getQuestionAnswerCount(question) {
    const questionId = getQuestionId(question);
    const answerStats = JSON.parse(localStorage.getItem('questionAnswerStats') || '{}');
    const stats = answerStats[questionId] || { correct: 0, incorrect: 0 };
    return stats.correct + stats.incorrect;
}

function getQuestionAnswerStats(question) {
    const questionId = getQuestionId(question);
    let answerStats = JSON.parse(localStorage.getItem('questionAnswerStats') || '{}');
    
    // Migration: Convert old questionAnswerCounts to questionAnswerStats
    if (!answerStats[questionId]) {
        const oldCounts = JSON.parse(localStorage.getItem('questionAnswerCounts') || '{}');
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
    
    // Calculate totals from daily history
    let totalCorrect = 0;
    let totalIncorrect = 0;
    
    Object.values(dailyHistory).forEach(day => {
        totalCorrect += day.correct || 0;
        totalIncorrect += day.incorrect || 0;
    });
    
    // Calculate question statistics
    let completedCount = 0;
    let unansweredCount = 0;
    let answeredCount = 0;
    
    quizData.forEach(question => {
        const stats = getQuestionAnswerStats(question);
        const total = stats.correct + stats.incorrect;
        
        if (isQuestionCompleted(question)) {
            completedCount++;
        } else if (total > 0) {
            answeredCount++;
        } else {
            unansweredCount++;
        }
    });
    
    const totalQuestions = quizData.length;
    const completedPercentage = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;
    const unansweredPercentage = totalQuestions > 0 ? Math.round((unansweredCount / totalQuestions) * 100) : 0;
    const answeredPercentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
    
    // Update summary cards
    if (totalCorrectEl) totalCorrectEl.textContent = totalCorrect;
    if (totalIncorrectEl) totalIncorrectEl.textContent = totalIncorrect;
    if (completedQuestionsEl) completedQuestionsEl.textContent = completedCount;
    if (unansweredQuestionsEl) unansweredQuestionsEl.textContent = unansweredCount;
    if (completedPercentageEl) completedPercentageEl.textContent = `${completedPercentage}%`;
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
    if (completedProgress) {
        completedProgress.style.width = `${completedPercentage}%`;
        completedProgress.setAttribute('aria-valuenow', completedPercentage);
    }
    if (answeredProgress) {
        answeredProgress.style.width = `${answeredPercentage}%`;
        answeredProgress.setAttribute('aria-valuenow', answeredPercentage);
    }
    if (unansweredProgress) {
        unansweredProgress.style.width = `${unansweredPercentage}%`;
        unansweredProgress.setAttribute('aria-valuenow', unansweredPercentage);
    }
    if (completedProgressText) completedProgressText.textContent = `${completedPercentage}%`;
    if (answeredProgressText) answeredProgressText.textContent = `${answeredPercentage}%`;
    if (unansweredProgressText) unansweredProgressText.textContent = `${unansweredPercentage}%`;
    if (completedCount2) completedCount2.textContent = completedCount;
    if (answeredCountEl) answeredCountEl.textContent = answeredCount;
    if (unansweredCount2) unansweredCount2.textContent = unansweredCount;
    
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
        const totalData = chartDates.map(date => dailyHistory[date]?.total || 0);
        const correctData = chartDates.map(date => dailyHistory[date]?.correct || 0);
        const incorrectData = chartDates.map(date => dailyHistory[date]?.incorrect || 0);
        
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
        if (!stats) return; // Skip if no data for this date
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
        questionListContainer.innerHTML = '<div class="alert alert-info">問題が見つかりませんでした</div>';
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
        
        const isFav = isFavorite(question);
        const favIcon = isFav ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>';
        
        card.innerHTML = `
            <div class="card-body" style="position: relative;">
                <button class="favorite-btn ${isFav ? 'favorited' : ''}" data-question-index="${quizData.indexOf(question)}">
                    ${favIcon}
                </button>
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
        
        // Add favorite button event
        const favoriteBtn = card.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const nowFavorited = toggleFavorite(question);
            favoriteBtn.className = `favorite-btn ${nowFavorited ? 'favorited' : ''}`;
            favoriteBtn.innerHTML = nowFavorited ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>';
        });
        
        // Add click event to navigate to this question
        // Store the question object directly to avoid inefficient lookup
        card.addEventListener('click', () => {
            startQuizFromQuestion(question);
        });
        
        questionListContainer.appendChild(card);
    });
}
