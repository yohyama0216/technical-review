<?php

namespace Tests\Unit\Services;

use App\Services\StatisticsService;
use Tests\TestCase;

class StatisticsServiceTest extends TestCase
{
    private StatisticsService $statisticsService;

    #[\Override]
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

    public function test_get_question_stats_returns_array_for_existing_question(): void
    {
        $this->statisticsService->recordAnswer(1, true);
        $stats = $this->statisticsService->getQuestionStats(1);
        
        $this->assertIsArray($stats);
        $this->assertArrayHasKey('correctCount', $stats);
        $this->assertArrayHasKey('incorrectCount', $stats);
    }

    public function test_get_question_stats_returns_null_for_unanswered_question(): void
    {
        $stats = $this->statisticsService->getQuestionStats(999999);
        $this->assertNull($stats);
    }

    public function test_is_question_completed_returns_false_for_new_question(): void
    {
        $isCompleted = $this->statisticsService->isQuestionCompleted(999998);
        $this->assertFalse($isCompleted);
    }

    public function test_is_question_completed_returns_true_after_three_correct(): void
    {
        $questionId = 12345;
        $this->statisticsService->recordAnswer($questionId, true);
        $this->statisticsService->recordAnswer($questionId, true);
        $this->statisticsService->recordAnswer($questionId, true);

        $isCompleted = $this->statisticsService->isQuestionCompleted($questionId);
        $this->assertTrue($isCompleted);
    }

    public function test_record_incorrect_answer_updates_stats(): void
    {
        $questionId = 54321;
        $this->statisticsService->recordAnswer($questionId, false);
        
        $stats = $this->statisticsService->getQuestionStats($questionId);
        $this->assertNotNull($stats);
        $this->assertGreaterThan(0, $stats['incorrectCount']);
    }

    public function test_get_completion_forecast_with_no_history_returns_null(): void
    {
        // Reset stats to ensure no history
        $this->statisticsService->resetStatistics();
        
        $forecast = $this->statisticsService->getCompletionForecast(100);
        $this->assertNull($forecast);
    }

    public function test_reset_statistics_clears_data(): void
    {
        $this->statisticsService->recordAnswer(1, true);
        $this->statisticsService->resetStatistics();
        
        $stats = $this->statisticsService->getStatistics();
        $this->assertEmpty($stats['questionStats']);
        $this->assertEmpty($stats['dailyHistory']);
    }
}
