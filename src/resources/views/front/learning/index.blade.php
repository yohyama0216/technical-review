@extends('front.layouts.app')

@section('content')
<script src="https://unpkg.com/vue@next"></script>
<div class="row">
    <div class="col-6">
        <div class="card" id="app">
            <quiz-component></quiz-component>
        </div>
    </div>
</div>
    <script type="module">
    const { createApp, ref } = Vue;

    const QuizComponent = {
        setup() {
            const questions = ref(@json($questions,JSON_UNESCAPED_UNICODE)); // JSONデータを格納
            // const questions = ref([
            //     {
            //         "question": "日本の首都はどこですか？",
            //         "choices": ["東京", "大阪", "京都", "福岡"],
            //         "answer": "東京"
            //     },
            //     {
            //         "question": "HTMLの略語の意味は何ですか？",
            //         "choices": ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
            //         "answer": "Hyper Text Markup Language"
            //     }
            // ]); // JSONデータを格納
            const currentQuestion = ref(0);
            const userAnswer = ref(null);
            const score = ref(0);

            return {
                questions,
                currentQuestion,
                userAnswer,
                score
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
                <li class="list-group-item" v-for="choice,index in questions[currentQuestion]">
                        <input type="radio" :value="index + 1" v-model="questions[currentQuestion].value"></td>
                        <label>[[ label ]]</label>
                </li>
            </ul>
            <button @click="checkAnswer()">次へ</button>
        `,
        methods: {
            checkAnswer() {                
                if (this.questions[this.currentQuestion].answer == this.questions[this.currentQuestion].correct) {
                    alert('正解')
                    this.score++;
                } else {
                    alert('不正解')
                }

                this.currentQuestion++;
            }
        }
    };

    const app = createApp(QuizComponent);
    app.config.compilerOptions.delimiters = ['[[', ']]'];
    app.mount('#app');
</script>
@endsection
