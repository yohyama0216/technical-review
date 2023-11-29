<template>
  <div class="card" v-if="!complete">
    <div class="card-header">
      <h4 class="card-title">学習画面（学習設定： 新しい順）</h4>
      <p class="card-category">{{ questions[currentQuestion].question }}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="(answer, index) in questions[currentQuestion].answers" :key="answer.id">
        <input type="radio" :id="answer.id" :value="answer.id" v-model="userAnswer">
        <label :for="answer.id">{{ answer.content }}</label>
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
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  props: {
    questions: Array
  },
  setup(props) {
    const currentQuestion = ref(0);
    const userAnswer = ref(null);
    const learningResults = ref([]);
    const complete = ref(false);

    function getCollectAnswer() {
      let answers = props.questions[currentQuestion.value].answers;
      let correct = answers.find(item => item.is_correct === 1);
      return correct;
    }

    function checkAnswer() {
      let correct = getCollectAnswer();
      let result;
      if (userAnswer.value == correct.id) {
        result = true;
        alert('正解');
      } else {
        result = false;
        alert('不正解 正解は' + correct.content);
      }
      learningResults.value.push({
        'question_id': props.questions[currentQuestion.value].id,
        'result': result
      });

      if (currentQuestion.value == (props.questions.length - 1)) {
        submitResult();
      } else {
        currentQuestion.value++;
      }
      userAnswer.value = null;
    }

    function submitResult() {
      const url = '/api/learning-history/create';
      console.log('レスポンス:', learningResults.value);
      axios.post(url, { 'data': learningResults.value })
        .then(response => {
          complete.value = true;
          console.log('レスポンス:', response.data);
        })
        .catch(error => {
          console.error('エラー:', error);
        });
    }

    return {
      currentQuestion,
      userAnswer,
      learningResults,
      complete,
      checkAnswer
    };
  }
};
</script>

<style>
/* CSSスタイル */
</style>
