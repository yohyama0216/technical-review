@extends('front.layouts.app')

@section('content')
<div class="row">
    <div class="col-12" id="app">
        <quiz-component :questions="{{ json_encode($questions, JSON_UNESCAPED_UNICODE) }}"></quiz-component>
    </div>
</div>
<script src="{{ mix('js/quiz.js') }}"></script>
@endsection
