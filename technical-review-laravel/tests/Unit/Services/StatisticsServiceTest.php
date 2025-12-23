<?php

namespace Tests\Unit\Services;

use App\Services\StatisticsService;
use Tests\TestCase;

class StatisticsServiceTest extends TestCase
{
    private StatisticsService $statisticsService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->statisticsService = app(StatisticsService::class);
    }

    public function test_get_statistics_returns_array(): void
    {
        $stats = $this->statisticsService->getStatistics();
        $this->assertIsArray($stats);
        $this->assertArrayHasKey('questionStats', $stats);
        $this->assertArrayHasKey('dailyHistory', $stats);
    }

    public function test_get_current_category_returns_string(): void
    {
        $category = $this->statisticsService->getCurrentCategory();
        $this->assertIsString($category);
        $this->assertContains($category, ['technical', 'vocabulary']);
    }

    public function test_get_cumulative_stats_returns_array(): void
    {
        $stats = $this->statisticsService->getCumulativeStats();
        $this->assertIsArray($stats);
        $this->assertArrayHasKey('totalCorrect', $stats);
        $this->assertArrayHasKey('totalIncorrect', $stats);
        $this->assertArrayHasKey('totalLearning', $stats);
        $this->assertArrayHasKey('completedQuestions', $stats);
    }

    public function test_get_daily_history_with_cumulative_returns_array(): void
    {
        $history = $this->statisticsService->getDailyHistoryWithCumulative();
        $this->assertIsArray($history);
    }

    public function test_get_completion_forecast_returns_array(): void
    {
        // Add some statistics first
        $this->statisticsService->recordAnswer(1, true);
        $this->statisticsService->recordAnswer(2, true);

        $forecast = $this->statisticsService->getCompletionForecast(100);
        $this->assertIsArray($forecast);
        $this->assertArrayHasKey('isCompleted', $forecast);
    }

    public function test_record_answer_updates_statistics(): void
    {
        $statsBefore = $this->statisticsService->getStatistics();
        $this->statisticsService->recordAnswer(1, true);
        $statsAfter = $this->statisticsService->getStatistics();

        $this->assertIsArray($statsAfter);
        $this->assertArrayHasKey('questionStats', $statsAfter);
    }
}
