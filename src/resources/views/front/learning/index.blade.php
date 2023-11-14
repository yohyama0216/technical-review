@extends('front.layouts.app')

@section('content')
<script src="https://unpkg.com/vue@next"></script>
<div class="container">
    <h2>学習画面</h2>
    <div>
        学習設定： 新しい順 
    </div>
    <div id="app">
        <quiz-component></quiz-component>
    </div>

    <script type="module">
    const { createApp, ref } = Vue;

    const QuizComponent = {
        setup() {
            const questions = ref([
                {
                    "question": "日本の首都はどこですか？",
                    "choices": ["東京", "大阪", "京都", "福岡"],
                    "answer": "東京"
                },
                {
                    "question": "HTMLの略語の意味は何ですか？",
                    "choices": ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
                    "answer": "Hyper Text Markup Language"
                }
            ]); // JSONデータを格納
            const currentQuestion = ref(0);
            const userAnswer = ref(null);
            const score = ref(0);

            // JSONデータの読み込み
            // fetch('path_to_your_questions.json')
            //     .then(response => response.json())
            //     .then(data => {
            //         questions.value = data;
            //     });

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
            <div>
                <h2>[[ questions[currentQuestion].question ]]</h2>
                <ul>
                    <li v-for="choice in questions[currentQuestion].choices" :key="choice">
                        <button @click="checkAnswer(choice)">[[ choice ]]</button>
                    </li>
                </ul>
            </div>
        `,
        methods: {
            checkAnswer(choice) {
                if (choice === this.questions[this.currentQuestion].answer) {
                    this.score++;
                }
                this.currentQuestion++;
            }
        }
    };

    const app = createApp(QuizComponent);
    app.config.compilerOptions.delimiters = ['[[', ']]'];
    app.mount('#app');
</script>
// 最終的に答えと結果のみ送信する。
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
