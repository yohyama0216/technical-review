<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;

// Page routes
Route::get('/', [QuizController::class, 'index'])->name('quiz.index');
Route::get('/quiz/start', [QuizController::class, 'startQuiz'])->name('quiz.start');
Route::get('/quiz/start/{id}', [QuizController::class, 'startQuizById'])->name('quiz.start.id');
Route::get('/question-list', [QuizController::class, 'questionList'])->name('quiz.question-list');
Route::get('/stats', [QuizController::class, 'stats'])->name('quiz.stats');
Route::get('/settings', [QuizController::class, 'settings'])->name('quiz.settings');

// API routes
Route::prefix('api')->group(function () {
    Route::post('/quiz/answer', [QuizController::class, 'submitQuizAnswer'])->name('api.quiz.answer');
    Route::get('/quiz/next', [QuizController::class, 'getNextQuestion'])->name('api.quiz.next');
    Route::post('/statistics/reset', [QuizController::class, 'resetStatistics'])->name('api.statistics.reset');
});

