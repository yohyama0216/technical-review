<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\LearningHistoryController;
use App\Http\Controllers\Admin\AuthController;

Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login.form');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');


// 質問関連
Route::get('/questions/{question}/edit', [QuestionController::class, 'edit'])->middleware('auth')->name('questions.edit');
Route::get('/questions/create', [QuestionController::class, 'create'])->middleware('auth')->name('questions.create');
Route::resource('/questions', QuestionController::class)->except(['edit', 'create']);

// 学習履歴
Route::resource('/learning-history', LearningHistoryController::class);
