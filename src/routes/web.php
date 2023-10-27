<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\LearningHistoryController;
use App\Http\Controllers\LearningController;
use App\Http\Controllers\QuestionSettingController;
use App\Http\Controllers\TopController;
use App\Http\Controllers\Admin\AuthController;

Route::get('/', [TopController::class, 'index'])->name('top.index');

Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login.form');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');


// 質問関連
Route::get('/questions/{question}/edit', [QuestionController::class, 'edit'])->middleware('auth')->name('questions.edit');
Route::get('/questions/create', [QuestionController::class, 'create'])->middleware('auth')->name('questions.create');
Route::resource('/questions', QuestionController::class)->except(['edit', 'create']);

// 学習
Route::get('/learning', [LearningController::class, 'index'])->name('learning.index');
Route::post('/learning', [LearningController::class, 'checkAnswer']);

// 学習履歴
Route::resource('/learning-history', LearningHistoryController::class);

// 学習設定の編集画面
Route::get('/settings/edit', [QuestionSettingController::class, 'edit'])->name('settings.edit');

// 出題設定の更新処理
Route::put('/settings/update', [QuestionSettingController::class, 'update'])->name('settings.update');
