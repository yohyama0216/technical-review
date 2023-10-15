@extends('admin.layouts.app')

@section('content')

<div class="mb-4">
    <h2>質問編集</h2>

    <form action="{{ route('questions.update', $question->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label for="question" class="form-label">質問内容</label>
            <textarea class="form-control" id="question" name="question" rows="3">{{ $question->question }}</textarea>
        </div>
        
        <div class="mb-3">
            <label for="answer" class="form-label">回答</label>
            <textarea class="form-control" id="answer" name="answer" rows="3">{{ $question->answer }}</textarea>
        </div>
        
        <button type="submit" class="btn btn-primary">更新</button>
    </form>
</div>

@endsection
