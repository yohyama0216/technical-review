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

    /** @var array<int, array<string, mixed>> */
    public array $dailyHistory;

    /** @var array<int, string> */
    public array $chartLabels;

    /** @var array<int, int> */
    public array $chartCumulativeLearning;

    /** @var array<int, int> */
    public array $chartCumulativeCorrect;

    /** @var array<int, int> */
    public array $chartCumulativeIncorrect;

    /** @var array<int, int> */
    public array $chartDailyCorrect;

    /** @var array<int, int> */
    public array $chartDailyIncorrect;

    /** @var array<int, int> */
    public array $chartDailyLearning;

    /** @var array<string, mixed>|null */
    public ?array $forecast;

    public ?string $targetDate;

    /**
     * @param  array<string, mixed>  $cumulativeStats
     * @param  array<int, array<string, mixed>>  $dailyHistory
     * @param  array<string, mixed>|null  $forecast
     */
    public function __construct(
        array $cumulativeStats,
        array $dailyHistory,
        int $totalQuestions,
        ?array $forecast = null,
        ?string $targetDate = null
    ) {
        $this->pageTitle = '統計';
        $this->appName = '資格対策アプリ';

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

        $this->forecast = $forecast;
        $this->targetDate = $targetDate;
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
