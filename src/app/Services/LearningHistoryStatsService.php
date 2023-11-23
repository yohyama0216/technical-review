<?php

namespace App\Services;

use App\Models\LearningHistory;
use App\Models\LearningStatistics;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Collection\LearningHistoryCollection;
use App\Models\Question;

class LearningHistoryStatsService
{
    private $learningHistoryService;

    public function __construct(LearningHistoryService $learningHistoryService)
    {
        $this->learningHistoryService = $learningHistoryService;
    }
    
    public function getStats($userId)
    {        
        // 苦手な問題 定義は？
        $startDate = $this->learningHistoryService->getStartDateForUser($userId); // 学習開始日
        $latestDate = $this->learningHistoryService->getLatestDateForUser($userId);; // 直近の学習日
        $firstLearningCompleted = ''; // 一回目学習完了率 / 1周正答率
        // 2周目学習率 / 2周正答率
        // 3周目学習率 / 3周正答率
        // 4周目学習率
        // 5周目学習率
        $averageStudyPerDay = ''; // １日あたりの平均回答数（直近１週間）
        $totalQuestionsCount = (Question::all())->count(); // 総問題数
        return [
            'start_date' => $startDate, 
            'latest_date' => $latestDate, 

        ];
    }
}
