import { createApp } from 'vue';
import QuizComponent from './components/QuizComponent.vue';

const app = createApp({});
app.component('quiz-component', QuizComponent);
app.mount('#app');
