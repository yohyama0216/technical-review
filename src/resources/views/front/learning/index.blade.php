@extends('front.layouts.app')

@section('content')
<script src="https://unpkg.com/vue@next"></script>
<div class="row">
    <div class="col-12" id="app">
            <quiz-component></quiz-component>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <script type="module">
    const { createApp, ref } = Vue;

    const QuizComponent = {
        setup() {
            const questions = ref(@json($questions,JSON_UNESCAPED_UNICODE)); // JSONデータを格納
            const currentQuestion = ref(0);
            const userAnswer = ref(null);
            const learningResults = ref([]);
            const complete = ref(false);

            return {
                questions,
                currentQuestion,
                userAnswer,
                learningResults,
                complete
            };
        },
        // テンプレート部分
        template: `
            <div class="card" v-if="!complete">
                <div class="card-header">
                    <h4 class="card-title">学習画面（学習設定： 新しい順）</h4>
                    <p class="card-category">[[ questions[currentQuestion].question ]]</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="answer,index in questions[currentQuestion].answers">
                            <input type="radio" :id="answer.id" :value="answer.id" v-model="userAnswer">
                            <label :for="answer.id">[[ answer.content ]]</label>
                    </li>
                </ul>
                <button @click="checkAnswer()">次へ</button>
            </div>
            <div class="card" v-else>
                <div class="card-header">
                    <h4 class="card-title">完了</h4>
                    <p class="card-category">おつかれさまでした</p>
                </div>
                <a href="/learning" class="btn">もう一度学習する</a>
            </div>
        `,
        methods: {
            getCollectAnswer() {
                let answers = this.questions[this.currentQuestion].answers
                let correct = answers.filter(item => item.is_correct === 1);
                return correct[0]
            },
            checkAnswer() {
                let correct = this.getCollectAnswer()
                let result;
                if (this.userAnswer == correct.id) {
                    result = true
                    alert('正解')
                } else {
                    result = false
                    alert('不正解 正解は' + correct.content)
                }
                this.learningResults.push({
                    'question_id' : this.questions[this.currentQuestion].id,
                    'result' : result
                })
                
                if (this.currentQuestion == (this.questions.length - 1)) {
                    this.submitResult()
                } else {
                    this.currentQuestion++
                }
                this.userAnswer = null;
            },
            submitResult() {
                const url = '/api/learning-history/create';
                axios.post(url, {'data' : this.learningResults})
                    .then(response => {
                        this.complete++
                        console.log('レスポンス:', response.data);
                    })
                    .catch(error => {
                        console.error('エラー:', error);
                    });
                }

            }
        };


    const app = createApp(QuizComponent);
    app.config.compilerOptions.delimiters = ['[[', ']]'];
    app.mount('#app');
</script>
<!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="{{asset('/js/sentence.js')}}"></script> -->
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
