@extends('front.layouts.app')

@section('content')
<script src="https://unpkg.com/vue@next"></script>
<div class="row">
    <div class="col-12">
        <div class="card" id="app">
            <quiz-component></quiz-component>
        </div>
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

            return {
                questions,
                currentQuestion,
                userAnswer,
                learningResults
                // 他のメソッドやcomputedプロパティ
            };
        },
        // テンプレート部分
        template: `
            <div class="card-header">
                <h4 class="card-title">学習画面（学習設定： 新しい順）</h4>
                <p class="card-category">[[ questions[currentQuestion].question ]]</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="answer,index in questions[currentQuestion].answers">
                        <input type="radio" :value="answer.id" v-model="userAnswer"></td>
                        <label>[[ answer.content ]]</label>
                </li>
            </ul>
            <button @click="checkAnswer()">次へ</button>
        `,
        methods: {
            getCollectAnswer() {
                let answers = this.questions[this.currentQuestion].answers
                let correct = answers.filter(item => item.is_correct === 1);
                return correct[0].id
            },
            checkAnswer() {
                let correct_id = this.getCollectAnswer()
                let result;
                if (this.userAnswer == correct_id) {
                    result = true
                    alert('正解')
                } else {
                    result = false
                    alert('不正解 正解は' + this.getCollectAnswer())
                }
                this.learningResults.push({
                    'question_id' : this.questions[this.currentQuestion].id,
                    'result' : result
                })
                this.submitResult()
                // if (this.currentQuestion == this.questions.length) {
                //     this.submitResult()
                // } else {
                //     this.currentQuestion++;
                // }
                // this.userAnswer = null;
            },
            submitResult() {
                const url = '/api/learning-history/create';
                console.log(this.learningResults)
                axios.post(url, {'data' : this.learningResults})
                    .then(response => {
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
@endsection
