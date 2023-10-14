<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\QuestionController;

// 質問関連
Route::resource('/questions', QuestionController::class,['as' => 'admin']);
