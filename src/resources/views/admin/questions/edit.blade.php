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
            <label for="correct_answer" class="form-label"><strong>正答</strong></label>
            <input type="text" id="correct_answer" name="correct_answer" class="form-control" value="{{ $question->correct_answer }}">
        </div>

        <div class="mb-3">
            <label for="wrong_answer1" class="form-label">誤答1</label>
            <input type="text" id="wrong_answer1" name="wrong_answer1" class="form-control" value="{{ $question->wrong_answer1 }}">
        </div>

        <div class="mb-3">
            <label for="wrong_answer2" class="form-label">誤答2</label>
            <input type="text" id="wrong_answer2" name="wrong_answer2" class="form-control" value="{{ $question->wrong_answer3 }}">
        </div>

        <div class="mb-3">
            <label for="wrong_answer3" class="form-label">誤答3</label>
            <input type="text" id="wrong_answer3" name="wrong_answer3" class="form-control" value="{{ $question->wrong_answer3 }}">
        </div>

        <div class="mb-3">
            <label for="wrong_answer4" class="form-label">誤答4</label>
            <input type="text" id="wrong_answer4" name="wrong_answer4" class="form-control" value="{{ $question->wrong_answer4 }}">
        </div>

        <div class="mb-3">
            <label for="visible" class="form-label">公開 / 非公開</label>
            <div class="custom-control custom-radio">
                <input type="radio" id="customRadio1" name="visible" value="1" class="custom-control-input" {{ $question->visible == '1' ? 'checked' : '' }}>
                <label class="custom-control-label" for="customRadio1">公開</label>
            </div>
            <div class="custom-control custom-radio">
                <input type="radio" id="customRadio2" name="visible" value="0" class="custom-control-input" {{ $question->visible == '0' ? 'checked' : '' }}>
                <label class="custom-control-label" for="customRadio2">非公開</label>
            </div>
        </div>
        
        <button type="submit" class="btn btn-primary">更新</button>
    </form>
</div>

@endsection
