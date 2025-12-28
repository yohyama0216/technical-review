@extends('layouts.app')

@section('content')
    <a href="{{ route('quiz.index') }}" class="btn btn-outline-secondary mb-3">
        <i class="bi bi-arrow-left me-1"></i>ホームへ
    </a>
    
    <div class="text-center mb-4">
        <h2 class="fw-bold"><i class="bi bi-gear me-2"></i>設定</h2>
        <p class="text-muted">ジャンルの切り替えはヘッダーの「ジャンル」メニューから行えます。</p>
    </div>

    @if(session('success'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    @endif

    <div class="card shadow-sm">
        <div class="card-body text-center py-5">
            <i class="bi bi-gear-fill text-muted" style="font-size: 4rem;"></i>
            <h5 class="mt-3 text-muted">現在、こちらで設定できる項目はありません。</h5>
            <p class="text-muted">ジャンルの切り替えはヘッダーのメニューから、<br>目標日の設定は統計画面から行えます。</p>
        </div>
    </div>

@endsection
