@extends('layouts.app')

@section('content')
    @if($question)
        <!-- Question Section -->
        <div class="card shadow-sm">
            <div class="card-body">
                <div class="mb-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">{{ $question['majorCategory'] }}</li>
                            <li class="breadcrumb-item">{{ $question['middleCategory'] }}</li>
                            <li class="breadcrumb-item active">{{ $question['minorCategory'] }}</li>
                        </ol>
                    </nav>
                </div>

                <h5 class="mb-4" id="questionText">{{ $question['question'] }}</h5>

                <div class="d-grid gap-2 mb-4" id="answersContainer">
                    <!-- Answers will be inserted by JavaScript with shuffling -->
                </div>

                <!-- Explanation box (hidden initially) -->
                <div id="explanationBox" class="alert d-none"></div>

                <div class="d-grid mb-3">
                    <button type="button" id="nextQuestionBtn" class="btn btn-success btn-lg d-none" onclick="loadNextQuestion()">
                        <i class="bi bi-arrow-right me-1"></i>次の問題へ
                    </button>
                </div>

                <div class="mt-3">
                    <a href="{{ route('quiz.index') }}" class="btn btn-outline-secondary">
                        <i class="bi bi-arrow-left me-1"></i>ホームへ戻る
                    </a>
                </div>
            </div>
        </div>
    @else
        <div class="alert alert-warning text-center">
            <h4>問題がありません</h4>
            <a href="{{ route('quiz.index') }}" class="btn btn-primary mt-3">ホームへ戻る</a>
        </div>
    @endif
@endsection

@push('scripts')
<script>
let selectedAnswer = null;
let currentQuestion = @json($question ?? null);
let shuffledAnswers = [];

// Shuffle answers on page load
if (currentQuestion) {
    shuffleQuestionAnswers(currentQuestion);
    displayShuffledAnswers();
}

function shuffleQuestionAnswers(question) {
    const answers = question.answers;
    const correctAnswer = question.correct ?? question.correctAnswer ?? 0;
    
    // Create array with original indices
    const indices = Array.from({length: answers.length}, (_, i) => i);
    
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    // Create shuffled answers with original index tracking
    shuffledAnswers = indices.map((originalIndex, displayIndex) => ({
        text: answers[originalIndex],
        originalIndex: originalIndex,
        displayIndex: displayIndex
    }));
    
    // Update correct answer to new position
    currentQuestion.shuffledCorrect = shuffledAnswers.findIndex(a => a.originalIndex === correctAnswer);
}

function displayShuffledAnswers() {
    const container = document.getElementById('answersContainer');
    if (!container) return;
    
    container.innerHTML = '';
    shuffledAnswers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary answer-btn';
        btn.dataset.answer = index;
        btn.textContent = answer.text;
        btn.onclick = () => selectAnswer(index);
        container.appendChild(btn);
    });
}

function selectAnswer(answerIndex) {
    if (selectedAnswer !== null) return; // Already answered
    
    selectedAnswer = answerIndex;
    const correctAnswer = currentQuestion.shuffledCorrect;
    const isCorrect = answerIndex === correctAnswer;
    
    // Disable all buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    // Show result immediately
    showResult(isCorrect, correctAnswer, answerIndex);
    
    // Save answer to server in background
    fetch('/api/quiz/answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ 
            answer: answerIndex,
            isCorrect: isCorrect 
        })
    })
    .catch(error => {
        console.error('Error saving answer:', error);
    });
}

function showResult(isCorrect, correctAnswer, userAnswer) {
    
    // Update button colors
    document.querySelectorAll('.answer-btn').forEach((btn, index) => {
        const btnAnswer = parseInt(btn.dataset.answer);
        
        if (btnAnswer === correctAnswer) {
            btn.classList.remove('btn-outline-primary');
            btn.classList.add('btn-success');
        } else if (btnAnswer === userAnswer && !isCorrect) {
            btn.classList.remove('btn-outline-primary');
            btn.classList.add('btn-danger');
        }
    });
    
    // Show explanation
    const explanationBox = document.getElementById('explanationBox');
    explanationBox.className = `alert ${isCorrect ? 'alert-success' : 'alert-danger'}`;
    const correctAnswerText = shuffledAnswers[correctAnswer].text;
    explanationBox.innerHTML = `
        <div class="mb-2">
            <strong>${isCorrect ? '✓ 正解！' : '✗ 不正解'}</strong>
        </div>
        ${currentQuestion.explanation ? `<div class="mb-2"><strong>解説:</strong> ${currentQuestion.explanation}</div>` : ''}
        <div><strong>正解:</strong> ${correctAnswerText}</div>
    `;
    explanationBox.classList.remove('d-none');
    
    // Show next question button
    document.getElementById('nextQuestionBtn').classList.remove('d-none');
}

function loadNextQuestion() {
    fetch('/api/quiz/next', {
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.question) {
            displayQuestion(data.question);
        } else {
            alert('これ以上問題がありません');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('エラーが発生しました');
    });
}

function displayQuestion(question) {
    selectedAnswer = null;
    currentQuestion = question;
    
    // Shuffle answers for new question
    shuffleQuestionAnswers(question);
    
    // Update breadcrumb
    document.querySelector('.breadcrumb').innerHTML = `
        <li class="breadcrumb-item">${question.majorCategory}</li>
        <li class="breadcrumb-item">${question.middleCategory}</li>
        <li class="breadcrumb-item active">${question.minorCategory}</li>
    `;
    
    // Update question text
    document.getElementById('questionText').textContent = question.question;
    
    // Display shuffled answers
    displayShuffledAnswers();
    
    // Hide explanation and next button
    document.getElementById('explanationBox').classList.add('d-none');
    document.getElementById('nextQuestionBtn').classList.add('d-none');
}
</script>
@endpush
