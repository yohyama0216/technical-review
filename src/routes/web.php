<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\Admin\TagController;

// 質問関連
Route::resource('/questions', QuestionController::class);

// タグ
Route::resource('/tags', TagController::class);
