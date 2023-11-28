@extends('front.layouts.app')

@section('content')
<script src="https://unpkg.com/vue@next"></script>
<div class="row">
    <div class="col-12" id="app">
            <quiz-component></quiz-component>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
    const questionData = @json($questions,JSON_UNESCAPED_UNICODE)
</script>
<script src="{{ asset('js/quiz.js') }}"></script>
@if (false)
<section v-if="state == 'ready'"><!-- 学習準備画面 -->
        <div class="row" >
            <div class="col-2">
                <button @click="changeState('now')">学習開始</button>                       
            </div>
        </div>
    </section>
    <section v-else-if="state == 'now'">
        <div class="row">
            <div class="col-6">
                <p><strong v-text="sentenceList[index].value.sentence_jp"></strong></p>
                <button @click="showSentenceEn">show Answer</button>
                <p v-text="sentenceList[index].value.sentence_en" v-if="displaySentenceEn"></p>
            </div>
        </div>
        <div class="row">
            <div class="col-2">
                <button @click="setResult(sentenceList[index].key, 1)">まったく違った</button>
            </div>
            <div class="col-2">
                <button @click="setResult(sentenceList[index].key, 2)">少し違った</button>
            </div>
            <div class="col-2">
                <button @click="setResult(sentenceList[index].key, 4)">だいたいOK</button>
            </div>
            <div class="col-2">
                <button @click="setResult(sentenceList[index].key, 8)">大正解</button>
            </div>
        </div>
    </section>
    <section v-else-if="state == 'end'"><!-- 学習完了画面 -->
    <div class="row">
        <h3>お疲れさまでした。</h3>
        <button>終了する</button>
        <button>続けて学習する</button>
    </div>
    @endif
@endsection
