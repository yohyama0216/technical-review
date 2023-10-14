<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductCategoryController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\SaleController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\LogController;

Route::prefix('admin')->group(function () {
    // ログイン・認証関連
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('admin.logout');

    // 認証が必要なルートはこのミドルウェア内に配置
    // Route::middleware(['auth:admin'])->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');

        // 商品関連
        Route::resource('/products', ProductController::class, ['as' => 'admin']);

        // カテゴリ関連
        Route::resource('/product-categories', ProductCategoryController::class);

        // 注文関連
        Route::resource('/orders', OrderController::class);

        // ユーザー・顧客関連
        Route::resource('/users', UserController::class);

        // ユーザー・顧客関連
        Route::resource('/customers', CustomerController::class, ['as' => 'admin']);

        // レビュー・フィードバック関連
        Route::resource('/reviews', ReviewController::class);

        // セールス・プロモーション関連
        Route::resource('/sales', SaleController::class);

        // 設定・その他
        Route::get('/settings', [SettingController::class, 'index'])->name('admin.settings');
        Route::get('/logs', [LogController::class, 'index'])->name('admin.logs');
    // });
});