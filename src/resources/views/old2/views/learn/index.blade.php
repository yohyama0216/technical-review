@extends('layouts.layout')

@section('title','TOP')

@section('content')
@include('layouts.sidebarmenu', ['current' => 'top'])
<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="sentence">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2" v-text="getHeaderText()"></h1>
        <div class="btn-toolbar mb-2 mb-md-0">

        </div>
    </div>

    @if($data)
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
    <div class="table-responsive col-6">
        <h3>学習結果</h3>
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>英文</th>
                    <th>和文</th>
                    <th>回答</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td>#1</td>
                        <td>12</td>
                        <td>あああああ</td>
                        <td>AAAA</td>
                        <td></td>
                    </tr>
            </tbody>
        </table>
    </div>
    </section>
    @else
    <div>例文が見つかりませんでした。</div>
    @endif

</main>
<script>
        // settingをもとにしてあらかじめ全件とってくる
        const sentenceList = @json($data)
    </script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="{{asset('/js/sentence.js')}}"></script>
@endsection