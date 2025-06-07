<?php

namespace App\Services;

use App\Models\Question;
use App\Models\Setting;
use App\Services\Conditions\QuestionFilterCondition;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class SettingService
{
    public function getQuestionById($id)
    {
        return Setting::find($id);
    }

    public function update($data)
    {
        $question = $this->getQuestionById(1);
        $question->update($data);
    }

    public function createQuestion($data)
    {
        return Setting::create($data);
    }

    public function delete(Setting $question)
    {
        $question->delete();
    }
}