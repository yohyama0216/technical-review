@extends('front.layouts.app')

@section('content')
<div class="row">
    <div class="col-12" id="app">
            <quiz-component></quiz-component>
    </div>
</div>
<script>
    const questionData = @json($questions,JSON_UNESCAPED_UNICODE)
</script>
<script src="{{ mix('js/quiz.js') }}"></script>
@endsection
