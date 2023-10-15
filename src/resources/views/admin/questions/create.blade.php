@extends('admin.layouts.app')

@section('content')
<div class="container">
    <h2>質問の新規登録</h2>

    <form action="{{ route('questions.store') }}" method="post">
        @csrf
        
        <div class="mb-3">
            <label for="question" class="form-label">質問</label>
            <textarea id="question" name="question" class="form-control" rows="3" required>{{ old('question') }}</textarea>
        </div>
        
        <div class="mb-3">
            <label for="answer" class="form-label">回答 (オプション)</label>
            <textarea id="answer" name="answer" class="form-control" rows="3">{{ old('answer') }}</textarea>
        </div>

        <button type="submit" class="btn btn-primary">登録</button>
    </form>

    <div class="mt-4">
        <a href="{{ route('questions.index') }}" class="btn btn-secondary">質問一覧に戻る</a>
    </div>
</div>
@endsection
