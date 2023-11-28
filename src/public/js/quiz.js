const { createApp, ref } = Vue;

const QuizComponent = {
    setup() {
        const currentQuestion = ref(0);
        const userAnswer = ref(null);
        const learningResults = ref([]);
        const complete = ref(false);
        const questions = ref(questionData || []); // JSONデータを格納
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