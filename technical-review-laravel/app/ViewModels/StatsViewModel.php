<?php

namespace App\ViewModels;

class StatsViewModel extends ViewModel
{
    public string $pageTitle;
    public string $appName;
    public int $totalCorrect;
    public int $totalIncorrect;
    public int $totalLearning;
    public int $completedQuestions;
    public int $answeredQuestionsCount;
    public int $unansweredQuestions;
    public int $totalQuestions;
    public int $completedPercentage;
    public int $unansweredPercentage;
    public array $dailyHistory;
    public array $chartLabels;
    public array $chartCumulativeLearning;
    public array $chartCumulativeCorrect;
    public array $chartCumulativeIncorrect;
    public array $chartDailyCorrect;
    public array $chartDailyIncorrect;
    public array $chartDailyLearning;

    public function __construct(
        array $cumulativeStats,
        array $dailyHistory,
        int $totalQuestions
    ) {
        $this->pageTitle = '統計';
        $this->appName = '技術面接クイズアプリ';
        
        $this->totalCorrect = $cumulativeStats['totalCorrect'];
        $this->totalIncorrect = $cumulativeStats['totalIncorrect'];
        $this->totalLearning = $cumulativeStats['totalLearning'];
        $this->completedQuestions = $cumulativeStats['completedQuestions'];
        $this->answeredQuestionsCount = $cumulativeStats['answeredQuestionsCount'];
        $this->totalQuestions = $totalQuestions;
        
        // 未回答問題数 = 総問題数 - 回答済み問題数（正解でも不正解でも回答した問題）
        $answeredQuestionsCount = $cumulativeStats['answeredQuestionsCount'] ?? 0;
        $this->unansweredQuestions = $totalQuestions - $answeredQuestionsCount;
        
        $this->completedPercentage = $totalQuestions > 0 
            ? (int) round(($cumulativeStats['completedQuestions'] / $totalQuestions) * 100)
            : 0;
        $this->unansweredPercentage = $totalQuestions > 0
            ? (int) round(($this->unansweredQuestions / $totalQuestions) * 100)
            : 0;
        
        $this->dailyHistory = $dailyHistory;
        
        // Prepare chart data
        $this->chartLabels = array_column($dailyHistory, 'date');
        $this->chartCumulativeLearning = array_column($dailyHistory, 'cumulativeLearning');
        $this->chartCumulativeCorrect = array_column($dailyHistory, 'cumulativeCorrect');
        $this->chartCumulativeIncorrect = array_column($dailyHistory, 'cumulativeIncorrect');
        $this->chartDailyCorrect = array_column($dailyHistory, 'dailyCorrect');
        $this->chartDailyIncorrect = array_column($dailyHistory, 'dailyIncorrect');
        $this->chartDailyLearning = array_column($dailyHistory, 'dailyLearning');
    }
}
