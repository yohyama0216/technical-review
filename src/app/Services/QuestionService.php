<?php

namespace App\Services;

use App\Models\Question;
use App\Services\Conditions\SearchCondition;

class QuestionService
{
    public function getAllQuestions($paginate = 10)
    {
        //return Question::paginate($paginate);
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
}