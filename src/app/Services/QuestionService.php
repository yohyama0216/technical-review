<?php

namespace App\Services;

use App\Models\Question;
use App\Models\QuestionSetting;
use App\Services\Conditions\SearchCondition;

class QuestionService
{
    public function getQuestionsForLearning()
    {
        $setting = QuestionSetting::where('user_id', 1)->first(); 
        $questions = Question::limit($setting->question_limit)->get();
        //dd($questions);
        return $questions;
    }

    public function searchQuestions(SearchCondition $condition)
    {
        $query = Question::query();

        if ($condition->searchQuestion) {
            $query->where('question', 'LIKE', '%' . $condition->searchQuestion . '%');
        }

        if ($condition->searchAnswer) {
            $query->where('answer', 'LIKE', '%' . $condition->searchAnswer . '%');
        }
        return $query->paginate();
    }

    public function getQuestionById($id)
    {
        return Question::find($id);
    }

    public function update($id, $data)
    {
        $question = $this->getQuestionById($id);
        $question->update($data);
    }

    public function createQuestion($data)
    {
        return Question::create($data);
    }

    public function delete(Question $question)
    {
        $question->delete();
    }
}