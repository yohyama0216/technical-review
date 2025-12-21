@extends('layouts.app')

@section('content')
    <!-- Question List Screen -->
    <div id="questionListScreen" class="screen active">
        <a href="{{ route('quiz.index') }}" class="btn btn-outline-secondary mb-3">
            <i class="bi bi-arrow-left me-1"></i>ホームへ
        </a>
        <div class="text-center mb-4">
            <h2 class="fw-bold"><i class="bi bi-list-ul me-2"></i>問題一覧</h2>
            <p class="text-muted">カテゴリを選択して問題を絞り込めます</p>
        </div>
        
        <!-- Search and Filter -->
        <div class="card shadow-sm mb-4">
            <div class="card-body">
                <form method="GET" action="{{ route('quiz.question-list') }}" id="filterForm">
                    <div class="row g-3 mb-3">
                        <div class="col-12">
                            <label for="questionSearch" class="form-label">問題文検索</label>
                            <input type="text" id="questionSearch" name="search" class="form-control" 
                                   placeholder="問題文を入力して検索..." value="{{ $searchText }}">
                        </div>
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-md-3">
                            <label for="majorCategoryFilter" class="form-label">大カテゴリ</label>
                            <select id="majorCategoryFilter" name="major" class="form-select" onchange="this.form.submit()">
                                <option value="">すべて</option>
                                @foreach($majorCategories as $category)
                                    <option value="{{ $category }}" {{ $majorFilter === $category ? 'selected' : '' }}>
                                        {{ $category }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="middleCategoryFilter" class="form-label">中カテゴリ</label>
                            <select id="middleCategoryFilter" name="middle" class="form-select" onchange="this.form.submit()">
                                <option value="">すべて</option>
                                @foreach($middleCategories as $category)
                                    <option value="{{ $category }}" {{ $middleFilter === $category ? 'selected' : '' }}>
                                        {{ $category }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="minorCategoryFilter" class="form-label">小カテゴリ</label>
                            <select id="minorCategoryFilter" name="minor" class="form-select" onchange="this.form.submit()">
                                <option value="">すべて</option>
                                @foreach($minorCategories as $category)
                                    <option value="{{ $category }}" {{ $minorFilter === $category ? 'selected' : '' }}>
                                        {{ $category }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="answerStatusFilter" class="form-label">回答状態</label>
                            <select id="answerStatusFilter" name="status" class="form-select" onchange="this.form.submit()">
                                <option value="all" {{ $statusFilter === 'all' ? 'selected' : '' }}>すべて</option>
                                <option value="completed" {{ $statusFilter === 'completed' ? 'selected' : '' }}>完了</option>
                                <option value="answered" {{ $statusFilter === 'answered' ? 'selected' : '' }}>回答済（未完了）</option>
                                <option value="unanswered" {{ $statusFilter === 'unanswered' ? 'selected' : '' }}>未回答</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">検索</button>
                            <a href="{{ route('quiz.question-list') }}" class="btn btn-secondary">クリア</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Question Count -->
        <div class="mb-3">
            <p class="text-muted">
                表示中: <strong id="questionCount">{{ count($questions) }}</strong> 問
            </p>
        </div>
        <!-- Question List -->
        <div id="questionListContainer">
            @forelse($questions as $question)
                <a href="{{ route('quiz.start.id', ['id' => $question['id']]) }}" class="text-decoration-none">
                    <div class="card mb-3" style="cursor: pointer; transition: transform 0.2s;" 
                         onmouseover="this.style.transform='translateY(-2px)'" 
                         onmouseout="this.style.transform='translateY(0)'">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="card-title mb-0 text-dark">{{ $question['question'] }}</h6>
                                @if($question['completed'])
                                    <span class="badge bg-success">完了</span>
                                @elseif($question['correctCount'] > 0 || $question['incorrectCount'] > 0)
                                    <span class="badge bg-warning">回答済</span>
                                @else
                                    <span class="badge bg-secondary">未回答</span>
                                @endif
                            </div>
                            <div class="mb-2">
                                <span class="badge bg-light text-dark">{{ $question['majorCategory'] }}</span>
                                <span class="badge bg-light text-dark">{{ $question['middleCategory'] }}</span>
                                <span class="badge bg-light text-dark">{{ $question['minorCategory'] }}</span>
                            </div>
                            @if($question['correctCount'] > 0 || $question['incorrectCount'] > 0)
                                <small class="text-muted">正解: {{ $question['correctCount'] }} / 不正解: {{ $question['incorrectCount'] }}</small>
                            @endif
                        </div>
                    </div>
                </a>
            @empty
                <div class="alert alert-info">該当する問題が見つかりませんでした。</div>
            @endforelse
        </div>
    </div>
@endsection
