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

        if ($condition->searchName) {
            $query->where('name', 'LIKE', '%' . $condition->searchName . '%');
        }

        if ($condition->searchPrice) {
            $query->where('price', '=', $condition->searchPrice);
        }

        return $query->paginate();
    }
}
