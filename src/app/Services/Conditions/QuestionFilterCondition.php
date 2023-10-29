<?php

namespace App\Services\Conditions;

use Illuminate\Http\Request;

class QuestionFilterCondition
{
    public $filterQuestion;
    public $filterAnswer;

    public function __construct(Request $request)
    {
        $this->filterQuestion = $request->input('filterQuestion');
        $this->filterAnswer = $request->input('filterAnswer');
    }
}
