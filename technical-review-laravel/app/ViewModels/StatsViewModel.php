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

    /** @var array<string, array<int, int|string>> */
    public array $chartData;

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

        $this->setCumulativeStats($cumulativeStats, $totalQuestions);
        $this->forecast = $forecast;
        $this->targetDate = $targetDate;
        $this->dailyHistory = $dailyHistory;
        $this->prepareChartData($dailyHistory);
    }

    /**
     * Set cumulative statistics
     *
     * @param  array<string, mixed>  $cumulativeStats
     */
    private function setCumulativeStats(array $cumulativeStats, int $totalQuestions): void
    {
        $this->totalCorrect = $cumulativeStats['totalCorrect'];
        $this->totalIncorrect = $cumulativeStats['totalIncorrect'];
        $this->totalLearning = $cumulativeStats['totalLearning'];
        $this->completedQuestions = $cumulativeStats['completedQuestions'];
        $this->answeredQuestionsCount = $cumulativeStats['answeredQuestionsCount'];
        $this->totalQuestions = $totalQuestions;

        $this->unansweredQuestions = $totalQuestions - $this->answeredQuestionsCount;
        $this->completedPercentage = $this->calculatePercentage($this->completedQuestions, $totalQuestions);
        $this->unansweredPercentage = $this->calculatePercentage($this->unansweredQuestions, $totalQuestions);
    }

    /**
     * Calculate percentage
     */
    private function calculatePercentage(int $value, int $total): int
    {
        return $total > 0 ? (int) round(($value / $total) * 100) : 0;
    }

    /**
     * Prepare chart data from daily history
     *
     * @param  array<int, array<string, mixed>>  $dailyHistory
     */
    private function prepareChartData(array $dailyHistory): void
    {
        $this->chartData = [
            'labels' => array_column($dailyHistory, 'date'),
            'cumulativeLearning' => array_column($dailyHistory, 'cumulativeLearning'),
            'cumulativeCorrect' => array_column($dailyHistory, 'cumulativeCorrect'),
            'cumulativeIncorrect' => array_column($dailyHistory, 'cumulativeIncorrect'),
            'dailyCorrect' => array_column($dailyHistory, 'dailyCorrect'),
            'dailyIncorrect' => array_column($dailyHistory, 'dailyIncorrect'),
            'dailyLearning' => array_column($dailyHistory, 'dailyLearning'),
        ];
    }
}
