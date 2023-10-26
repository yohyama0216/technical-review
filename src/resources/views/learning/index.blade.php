@extends('admin.layouts.app')

@section('content')
<div class="container">
    <h2>学習画面</h2>
    <div>
        学習設定： 新しい順 
    </div>
    <form action="{{ route('learning.index') }}" method="post">
        @csrf
        @foreach($questions as $key => $question)
        <h2>{{ $key + 1 }}/{{ count($questions) }} {{ $question->question }}</h2>
        <div class="form-group">
            <ul>
            @foreach($question->getShuffledAnswers() as $answers)
                <li>
                    <input type="radio" name="question_answers[{{ $question->id }}]" value="{{ $answers['value'] }}">
                    <label>{{ $answers['label']}}:</label>
                </li>    
            @endforeach
            </ul>
        </div>
        @endforeach
        <button type="submit" class="btn btn-primary">答え合わせ</button>
    </form>
</div>
@endsection
