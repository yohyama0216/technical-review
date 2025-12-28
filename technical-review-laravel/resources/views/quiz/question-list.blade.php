@extends('layouts.app')

@section('content')
    <!-- Question List Screen -->
    <div id="questionListScreen" class="screen active">
        <a href="{{ route('quiz.index') }}" class="btn btn-outline-secondary mb-3">
            <i class="bi bi-arrow-left me-1"></i>ホームへ
        </a>
        <div class="text-center mb-4">
            <h2 class="fw-bold"><i class="bi bi-list-ul me-2"></i>問題一覧</h2>
            <p class="text-muted">カテゴリを選択して問題を絞り込むことができます</p>
        </div>
        
        <!-- Quick Keyword Search / Category Counts -->
        <div class="card shadow-sm mb-4">
            <div class="card-body">
                @if($currentGenre === 'vocabulary')
                    <h6 class="mb-3"><i class="bi bi-bookmark me-2"></i>カテゴリ別問題数</h6>
                    <div class="d-flex flex-wrap gap-2">
                        @foreach($keywordCounts as $category => $count)
                            <span class="btn btn-sm btn-outline-secondary" style="cursor: default;">
                                <i class="bi bi-folder me-1"></i>{{ $category }}
                                <span class="badge bg-secondary ms-1">{{ $count }}</span>
                            </span>
                        @endforeach
                    </div>
                @else
                    <h6 class="mb-3"><i class="bi bi-tags me-2"></i>よく検索されるキーワード</h6>
                    <div class="d-flex flex-wrap gap-2">
                        @foreach($keywordCounts as $keyword => $count)
                            <a href="{{ route('quiz.question-list', ['search' => $keyword]) }}" 
                               class="btn btn-sm {{ $searchText === $keyword ? 'btn-primary' : 'btn-outline-primary' }}">
                                <i class="bi bi-search me-1"></i>{{ $keyword }}
                                <span class="badge {{ $searchText === $keyword ? 'bg-light text-dark' : 'bg-primary' }} ms-1">{{ $count }}</span>
                            </a>
                        @endforeach
                    </div>
                @endif
            </div>
        </div>
        
        <!-- Search and Filter -->
        <div class="card shadow-sm mb-4">
            <div class="card-body">
                <form method="GET" action="{{ route('quiz.question-list') }}" id="filterForm">
                    <div class="row g-3 mb-3">
                        <div class="col-md-9">
                            <label for="questionSearch" class="form-label">問題文検索</label>
                            <input type="text" id="questionSearch" name="search" class="form-control" 
                                   placeholder="問題文を入力して検索..." value="{{ $searchText }}">
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
