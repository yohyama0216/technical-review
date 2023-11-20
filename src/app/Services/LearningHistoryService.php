<?php

namespace App\Services;

use App\Models\LearningHistory;
use App\Models\LearningStatistics;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Collection\LearningHistoryCollection;

class LearningHistoryService
{
    public function getStatistics($userId)
    {
        return new LearningStatistics($this->getHistoriesForUser($userId));
    }
    
    public function getHistoriesForUser($userId)
    {
        $collection = LearningHistory::select(
            DB::raw('question_id, DATE(answered_at) as date, is_correct'))->where('user_id', $userId)->with('question')->orderBy('answered_at', 'desc')->get();
        return new LearningHistoryCollection($collection);
    }

    public function recordLearningHistory($userId, $answers)
    {
        $learningHistory = [];
        foreach($answers as $answer) {
            $learningHistory[] = [
                'user_id' => $userId,
                'question_id' => $answer['question_id'],
                'is_correct' => $answer['result'], //なんか変
                'answered_at' => Carbon::now()
            ];
        }
        return LearningHistory::insert($learningHistory);
    }
}
