@extends('layouts.app')

@section('content')
    <a href="{{ route('quiz.index') }}" class="btn btn-outline-secondary mb-3">
        <i class="bi bi-arrow-left me-1"></i>ホームへ
    </a>
    
    <div class="text-center mb-4">
        <h2 class="fw-bold"><i class="bi bi-gear me-2"></i>設定</h2>
    </div>

    @if(session('success'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    @endif

    <!-- Category Selection Card -->
    <div class="card shadow-sm mb-4">
        <div class="card-header bg-white">
            <h5 class="mb-0"><i class="bi bi-collection me-2"></i>出題カテゴリ</h5>
        </div>
        <div class="card-body">
            <form method="POST" action="{{ route('quiz.settings.save') }}">
                @csrf
                <div class="mb-3">
                    <label for="category" class="form-label">学習カテゴリを選択</label>
                    <select id="category" name="category" class="form-select">
                        @foreach($availableCategories as $key => $label)
                            <option value="{{ $key }}" {{ $currentCategory === $key ? 'selected' : '' }}>
                                {{ $label }}
                            </option>
                        @endforeach
                    </select>
                    <div class="form-text">選択したカテゴリの問題が出題されます。カテゴリごとに学習履歴と統計が管理されます。</div>
                </div>
                <button type="submit" class="btn btn-primary">
                    <i class="bi bi-save me-2"></i>保存
                </button>
            </form>
        </div>
    </div>

    <!-- Target Date Settings Card -->
    <div class="card shadow-sm mb-4">
        <div class="card-header bg-white">
            <h5 class="mb-0"><i class="bi bi-calendar-event me-2"></i>学習目標設定</h5>
        </div>
        <div class="card-body">
            <form method="POST" action="{{ route('quiz.settings.save') }}">
                @csrf
                <div class="mb-3">
                    <label for="target_date" class="form-label">完了目標日</label>
                    <input type="date" id="target_date" name="target_date" class="form-control" 
                           value="{{ $targetDate }}">
                    <div class="form-text">全問題を完了させたい目標日を設定してください。統計画面で進捗予測と比較できます。</div>
                </div>
                <button type="submit" class="btn btn-primary">
                    <i class="bi bi-save me-2"></i>保存
                </button>
            </form>
        </div>
    </div>
@endsection
