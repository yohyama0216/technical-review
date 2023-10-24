@extends('admin.layouts.app')

@section('content')
<div class="container">
    <h2>{{ $question->question }}</h2>
    
    <div class="card mt-4">
        <div class="card-body">
            <h4 class="card-title">選択肢:</h4>
            <ul>
            @foreach($question->getAnswers() as $answer)

                <p class="card-text">
                    @if($answer['value'])
                        <strong>正答：{{ $answer['label'] }} {{ $answer['value'] }}</strong>
                    @else
                        誤答：{{ $answer['label'] }} {{ $answer['value'] }}
                    @endif
                </p>
            @endforeach
            </ul>
        </div>
    </div>
                <!-- <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample-{{ $question->id }}" aria-expanded="false" aria-controls="collapseExample">
                        見る
                    </button>
                    <div class="collapse mt-3" id="collapseExample-{{ $question->id }}">
                        <div class="card card-body">
                        {{ mb_strlen($question->answer) > 40 ? mb_substr($question->answer, 0, 40) . '...' : $question->answer }}
                            ここは開閉するエリアです！
                        </div>
                    </div>
                 <div class="container mt-5">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        クリックしてエリアを開閉
                    </button>
                    <div class="collapse mt-3" id="collapseExample">
                        <div class="card card-body">
                        {{ mb_strlen($question->answer) > 40 ? mb_substr($question->answer, 0, 40) . '...' : $question->answer }}
                            ここは開閉するエリアです！
                        </div>
                    </div>
                </div> -->

    <div class="mt-4">
        <a href="{{ route('questions.index') }}" class="btn btn-secondary">質問一覧に戻る</a>
    </div>


</div>
@endsection
