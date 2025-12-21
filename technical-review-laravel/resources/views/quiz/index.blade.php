@extends('layouts.app')

@section('content')
    <!-- Major Category Selection Screen (TOP Page) -->
    <div id="majorCategoryScreen" class="screen active">
        <div class="text-center mb-4">
            <h2 class="fw-bold">資格対策アプリ</h2>
            <p class="text-muted">ランダムに出題された問題に挑戦しましょう</p>
        </div>
        <div class="text-center">
            <a href="{{ route('quiz.start') }}" class="btn btn-primary btn-lg px-5 py-3">
                <i class="bi bi-shuffle me-2"></i>ランダム出題
            </a>
        </div>
    </div>
@endsection
