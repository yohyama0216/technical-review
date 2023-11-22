<?php

namespace App\Services;

use App\Models\LearningHistory;
use App\Models\LearningStatistics;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Collection\LearningHistoryCollection;
use App\Models\Question;

class LearningHistoryService
{    
    public function getStartDateForUser($userId)
    {
        return LearningHistory::select('answered_at')->where('user_id', $userId)->orderBy('answered_at', 'desc')->first();
    }

    public function getLatestDateForUser($userId)
    {
        return LearningHistory::select('answered_at')->where('user_id', $userId)->orderBy('answered_at', 'asc')->first();
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
