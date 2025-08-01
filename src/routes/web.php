<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\Front\LearningHistoryController;
use App\Http\Controllers\Front\LearningController;
use App\Http\Controllers\Front\SettingController;
use App\Http\Controllers\Front\TopController;
use App\Http\Controllers\Front\WordPressController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Front\ArticleController;

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
Route::get('/setting/edit', [SettingController::class, 'edit'])->name('setting.edit');
Route::put('/setting/update', [SettingController::class, 'update'])->name('setting.update');

// ブログ記事関連
Route::get('/blog', [ArticleController::class, 'index'])->name('article.index');
Route::get('/blog/{id}', [ArticleController::class, 'show'])->name('article.show');
Route::get('/category/{category}', [ArticleController::class, 'category'])->name('article.category');
Route::get('/blog/create', [ArticleController::class, 'create'])->name('article.create');
Route::get('/blog/{id}/edit', [ArticleController::class, 'edit'])->name('article.edit');
Route::get('/profile', [ArticleController::class, 'profile'])->name('article.profile');
Route::get('/contact', [ArticleController::class, 'contact'])->name('article.contact');
Route::post('/blog', [ArticleController::class, 'store'])->name('article.store');
Route::patch('/blog/{id}', [ArticleController::class, 'update'])->name('article.update');
