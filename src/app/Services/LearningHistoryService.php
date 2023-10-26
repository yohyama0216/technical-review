<?php

namespace App\Services;

use App\Models\LearningHistory;

class LearningHistoryService
{
    public function getHistoriesForUser($userId)
    {
        return LearningHistory::where('user_id', $userId)->with('question')->orderBy('answered_at', 'desc')->get();
    }

    public function recordLearningHistory($userId, $answers)
    {
        $learningHistory = [];
        foreach($answers as $question_id => $answer) {
            $learningHistory[] = [
                'user_id' => $userId,
                'question_id' => $question_id,
                'is_correct' => $answer,
            ];
        }
        return LearningHistory::insert($learningHistory);
    }
}
