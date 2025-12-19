// Get unique categories with three levels
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
    
    // Convert Sets to Arrays
    Object.keys(categories).forEach(majorKey => {
        Object.keys(categories[majorKey]).forEach(middleKey => {
            categories[majorKey][middleKey] = Array.from(categories[majorKey][middleKey]);
        });
    });
    
    return categories;
}

// Get questions by all three categories
function getQuestionsByCategory(majorCat, middleCat, minorCat) {
    return quizData.filter(q => 
        q.majorCategory === majorCat && 
        q.middleCategory === middleCat && 
        q.minorCategory === minorCat
    );
}

// App State
let currentMajorCategory = '';
let currentMiddleCategory = '';
let currentMinorCategory = '';
let currentQuestionIndex = 0;
let selectedAnswer = null;
let quizResults = [];
let shuffledAnswers = [];

// DOM Elements
const majorCategoryScreen = document.getElementById('majorCategoryScreen');
const middleCategoryScreen = document.getElementById('middleCategoryScreen');
const minorCategoryScreen = document.getElementById('minorCategoryScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const reviewScreen = document.getElementById('reviewScreen');

const majorCategoryButtons = document.getElementById('majorCategoryButtons');
const middleCategoryButtons = document.getElementById('middleCategoryButtons');
const middleCategoryTitle = document.getElementById('middleCategoryTitle');
const minorCategoryButtons = document.getElementById('minorCategoryButtons');
const minorCategoryTitle = document.getElementById('minorCategoryTitle');
const backToMajorBtn = document.getElementById('backToMajorBtn');
const backToMiddleBtn = document.getElementById('backToMiddleBtn');

const backBtn = document.getElementById('backBtn');
const submitBtn = document.getElementById('submitBtn');
const reviewBtn = document.getElementById('reviewBtn');
const homeBtn = document.getElementById('homeBtn');
const reviewBackBtn = document.getElementById('reviewBackBtn');

const progressFill = document.getElementById('progressFill');
const categoryTitle = document.getElementById('categoryTitle');
const categoryBreadcrumb = document.getElementById('categoryBreadcrumb');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const resultContent = document.getElementById('resultContent');
const reviewContent = document.getElementById('reviewContent');
const statsDisplay = document.getElementById('statsDisplay');
const reviewCategoryTitle = document.getElementById('reviewCategoryTitle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    setupMajorCategories();
});

// Setup Major Categories
function setupMajorCategories() {
    const categories = getCategories();
    majorCategoryButtons.innerHTML = '';
    
    Object.keys(categories).forEach((category, index) => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = category;
        btn.addEventListener('click', () => showMiddleCategories(category));
        majorCategoryButtons.appendChild(btn);
    });
}

// Show Middle Categories
function showMiddleCategories(majorCat) {
    currentMajorCategory = majorCat;
    const categories = getCategories();
    const middleCats = Object.keys(categories[majorCat]);
    
    middleCategoryTitle.textContent = `${majorCat} - 中カテゴリを選択`;
    middleCategoryButtons.innerHTML = '';
    
    middleCats.forEach(middleCat => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = middleCat;
        btn.addEventListener('click', () => showMinorCategories(majorCat, middleCat));
        middleCategoryButtons.appendChild(btn);
    });
    
    showScreen('middle');
}

// Show Minor Categories
function showMinorCategories(majorCat, middleCat) {
    currentMajorCategory = majorCat;
    currentMiddleCategory = middleCat;
    const categories = getCategories();
    const minorCats = categories[majorCat][middleCat];
    
    minorCategoryTitle.textContent = `${middleCat} - 小カテゴリを選択`;
    minorCategoryButtons.innerHTML = '';
    
    minorCats.forEach(minorCat => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = minorCat;
        btn.addEventListener('click', () => startQuiz(majorCat, middleCat, minorCat));
        minorCategoryButtons.appendChild(btn);
    });
    
    showScreen('minor');
}

// Return to Major Categories
function returnToMajorCategories() {
    showScreen('major');
}

// Return to Middle Categories
function returnToMiddleCategories() {
    if (currentMajorCategory) {
        showMiddleCategories(currentMajorCategory);
    } else {
        returnToMajorCategories();
    }
}

// Start Quiz
function startQuiz(majorCat, middleCat, minorCat) {
    currentMajorCategory = majorCat;
    currentMiddleCategory = middleCat;
    currentMinorCategory = minorCat;
    currentQuestionIndex = 0;
    quizResults = [];

    const questions = getQuestionsByCategory(majorCat, middleCat, minorCat);
    
    showScreen('quiz');
    categoryTitle.textContent = majorCat;
    categoryBreadcrumb.textContent = `${majorCat} > ${middleCat} > ${minorCat}`;
    
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const questions = getQuestionsByCategory(currentMajorCategory, currentMiddleCategory, currentMinorCategory);
    const question = questions[currentQuestionIndex];
    
    selectedAnswer = null;
    submitBtn.style.display = 'none'; // Hide submit button
    
    // Hide explanation box
    const explanationBox = document.getElementById('explanationBox');
    if (explanationBox) {
        explanationBox.style.display = 'none';
    }
    
    questionText.textContent = question.question;
    
    // Update progress
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Shuffle answers
    shuffledAnswers = question.answers.map((answer, index) => ({
        text: answer,
        originalIndex: index
    }));
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }
    
    // Render answers
    answersContainer.innerHTML = '';
    shuffledAnswers.forEach((answerObj, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answerObj.text;
        btn.addEventListener('click', () => selectAnswer(answerObj.originalIndex, btn));
        answersContainer.appendChild(btn);
    });
}

// Select Answer
function selectAnswer(index, btn) {
    // Prevent selecting another answer if already answered
    if (selectedAnswer !== null) return;
    
    selectedAnswer = index;
    
    const questions = getQuestionsByCategory(currentMajorCategory, currentMiddleCategory, currentMinorCategory);
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correct;
    
    // Record result
    quizResults.push({
        questionIndex: currentQuestionIndex,
        selectedAnswer: selectedAnswer,
        correct: isCorrect
    });
    
    // Show correct/incorrect immediately
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach((button, displayIndex) => {
        button.classList.add('disabled');
        const originalIndex = shuffledAnswers[displayIndex].originalIndex;
        
        if (originalIndex === question.correct) {
            button.classList.add('correct');
        } else if (originalIndex === selectedAnswer && !isCorrect) {
            button.classList.add('incorrect');
        }
    });
    
    // Hide submit button and show explanation
    submitBtn.style.display = 'none';
    showExplanation(question, isCorrect);
    
    // Auto-advance to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    }, 3000);
}

// Show Explanation
function showExplanation(question, isCorrect) {
    let explanationBox = document.getElementById('explanationBox');
    
    if (!explanationBox) {
        // Create explanation box if it doesn't exist
        explanationBox = document.createElement('div');
        explanationBox.id = 'explanationBox';
        explanationBox.className = 'explanation-box';
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

// Finish Quiz
function finishQuiz() {
    const correctCount = quizResults.filter(r => r.correct).length;
    const totalCount = quizResults.length;
    const percentage = Math.round((correctCount / totalCount) * 100);
    
    saveQuizResult(currentMajorCategory, currentMiddleCategory, currentMinorCategory, correctCount, totalCount);
    
    showScreen('result');
    
    let message = '';
    if (percentage >= 90) {
        message = '素晴らしい！完璧に近い理解度です！';
    } else if (percentage >= 70) {
        message = 'よくできました！良い理解度です。';
    } else if (percentage >= 50) {
        message = 'まずまずです。復習してさらに理解を深めましょう。';
    } else {
        message = 'もう少し頑張りましょう。復習をおすすめします。';
    }
    
    resultContent.innerHTML = `
        <div class="result-score">${correctCount} / ${totalCount}</div>
        <div class="result-message">${message}</div>
        <div class="result-details">
            <h3>正解率: ${percentage}%</h3>
            <p>${currentMajorCategory} > ${currentMiddleCategory} > ${currentMinorCategory}</p>
        </div>
    `;
}

// Show Review
function showReview() {
    showScreen('review');
    reviewCategoryTitle.textContent = `${currentMajorCategory} > ${currentMiddleCategory} > ${currentMinorCategory} - 復習`;
    
    const questions = getQuestionsByCategory(currentMajorCategory, currentMiddleCategory, currentMinorCategory);
    
    reviewContent.innerHTML = '';
    questions.forEach((question, index) => {
        const result = quizResults[index];
        const isCorrect = result.correct;
        
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item' + (isCorrect ? '' : ' incorrect');
        
        const answersHtml = question.answers.map((answer, ansIndex) => {
            let className = 'review-answer';
            if (ansIndex === question.correct) {
                className += ' correct';
            } else if (ansIndex === result.selectedAnswer && !isCorrect) {
                className += ' selected-incorrect';
            } else {
                className += ' not-selected';
            }
            
            return `<div class="${className}">${answer}</div>`;
        }).join('');
        
        reviewItem.innerHTML = `
            <div class="review-question">
                問題 ${index + 1}: ${question.question}
            </div>
            <div class="review-answers">
                ${answersHtml}
            </div>
            <div class="review-explanation">
                <strong>解説:</strong> ${question.explanation}
            </div>
        `;
        
        reviewContent.appendChild(reviewItem);
    });
}

// Return to Results
function returnToResults() {
    showScreen('result');
}

// Return to Categories
function returnToCategories() {
    showScreen('major');
    loadStats();
}

// Save Quiz Result to localStorage
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

// Load Stats
function loadStats() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
    
    if (Object.keys(results).length === 0) {
        statsDisplay.innerHTML = '<p style="text-align: center; color: #666;">まだ統計情報がありません</p>';
        return;
    }
    
    statsDisplay.innerHTML = '';
    
    // Group by major category, then middle category
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
    
    Object.keys(grouped).forEach(majorCat => {
        const majorItem = document.createElement('div');
        majorItem.style.marginBottom = '20px';
        
        const majorTitle = document.createElement('h4');
        majorTitle.textContent = majorCat;
        majorTitle.style.marginBottom = '10px';
        majorTitle.style.color = '#667eea';
        majorTitle.style.fontWeight = 'bold';
        majorItem.appendChild(majorTitle);
        
        Object.keys(grouped[majorCat]).forEach(middleCat => {
            const middleTitle = document.createElement('h5');
            middleTitle.textContent = middleCat;
            middleTitle.style.marginBottom = '5px';
            middleTitle.style.marginLeft = '15px';
            middleTitle.style.color = '#764ba2';
            majorItem.appendChild(middleTitle);
            
            grouped[majorCat][middleCat].forEach(result => {
                const avgPercentage = Math.round((result.totalCorrect / result.totalQuestions) * 100);
                const statItem = document.createElement('div');
                statItem.className = 'stat-item';
                statItem.style.marginLeft = '20px';
                statItem.innerHTML = `
                    <span class="category-name">${result.minorCategory}</span>
                    <span class="score">平均正解率: ${avgPercentage}% (${result.attempts}回挑戦)</span>
                `;
                majorItem.appendChild(statItem);
            });
        });
        
        statsDisplay.appendChild(majorItem);
    });
}

// Show Screen
function showScreen(screen) {
    majorCategoryScreen.classList.remove('active');
    middleCategoryScreen.classList.remove('active');
    minorCategoryScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    reviewScreen.classList.remove('active');
    
    switch (screen) {
        case 'major':
            majorCategoryScreen.classList.add('active');
            break;
        case 'middle':
            middleCategoryScreen.classList.add('active');
            break;
        case 'minor':
            minorCategoryScreen.classList.add('active');
            break;
        case 'quiz':
            quizScreen.classList.add('active');
            break;
        case 'result':
            resultScreen.classList.add('active');
            break;
        case 'review':
            reviewScreen.classList.add('active');
            break;
    }
}

// Event Listeners
backToMajorBtn.addEventListener('click', returnToMajorCategories);
backToMiddleBtn.addEventListener('click', returnToMiddleCategories);
backBtn.addEventListener('click', () => {
    if (currentMiddleCategory && currentMinorCategory) {
        showMinorCategories(currentMajorCategory, currentMiddleCategory);
    } else if (currentMajorCategory) {
        showMiddleCategories(currentMajorCategory);
    } else {
        returnToCategories();
    }
});
// submitBtn.addEventListener('click', submitAnswer); // Not needed - instant feedback on selection
reviewBtn.addEventListener('click', showReview);
homeBtn.addEventListener('click', returnToCategories);
reviewBackBtn.addEventListener('click', returnToResults);
