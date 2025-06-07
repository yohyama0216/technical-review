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
            <label for="correct_answer" class="form-label">正答</label>
            <input type="text" id="correct_answer" name="correct_answer" class="form-control" value="{{ old('correct_answer') }}">
        </div>

        @foreach(range(1,4) as $num)
        <div class="mb-3">
            <label for="wrong_answer{{ $num }}" class="form-label">誤答{{ $num }}</label>
            <input type="text" id="wrong_answer{{ $num }}" name="wrong_answer{{ $num }}" class="form-control" value="{{ old('wrong_answer'.$num) }}">
        </div>
        @endforeach
        <button type="submit" class="btn btn-primary">登録</button>
    </form>

    <div class="mt-4">
        <a href="{{ route('questions.index') }}" class="btn btn-secondary">質問一覧に戻る</a>
    </div>
</div>
@endsection
 