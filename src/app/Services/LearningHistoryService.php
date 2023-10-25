<?php

namespace App\Services;

use App\Models\LearningHistory;

class LearningHistoryService
{
    public function getHistoriesForUser($userId)
    {
        return LearningHistory::where('user_id', $userId)->with('question')->orderBy('answered_at', 'desc')->get();
    }
}
