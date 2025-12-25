<?php

namespace Tests\Unit\ViewModels;

use App\ViewModels\StatsViewModel;
use Tests\TestCase;

class StatsViewModelTest extends TestCase
{
    public function test_stats_view_model_calculates_percentages_correctly(): void
    {
        $cumulativeStats = [
            'totalCorrect' => 30,
            'totalIncorrect' => 10,
            'totalLearning' => 40,
            'completedQuestions' => 10,
            'answeredQuestionsCount' => 20,
        ];
        
        $viewModel = new StatsViewModel($cumulativeStats, [], 100);
        
        $this->assertEquals(10, $viewModel->completedPercentage);
        $this->assertEquals(80, $viewModel->unansweredPercentage);
    }

    public function test_stats_view_model_handles_zero_total_questions(): void
    {
        $cumulativeStats = [
            'totalCorrect' => 0,
            'totalIncorrect' => 0,
            'totalLearning' => 0,
            'completedQuestions' => 0,
            'answeredQuestionsCount' => 0,
        ];
        
        $viewModel = new StatsViewModel($cumulativeStats, [], 0);
        
        $this->assertEquals(0, $viewModel->completedPercentage);
        $this->assertEquals(0, $viewModel->unansweredPercentage);
    }

    public function test_stats_view_model_prepares_chart_data(): void
    {
        $dailyHistory = [
            ['date' => '2025-12-01', 'cumulativeLearning' => 10, 'cumulativeCorrect' => 8, 'cumulativeIncorrect' => 2],
            ['date' => '2025-12-02', 'cumulativeLearning' => 15, 'cumulativeCorrect' => 12, 'cumulativeIncorrect' => 3],
        ];
        
        $cumulativeStats = [
            'totalCorrect' => 12,
            'totalIncorrect' => 3,
            'totalLearning' => 15,
            'completedQuestions' => 5,
            'answeredQuestionsCount' => 10,
        ];
        
        $viewModel = new StatsViewModel($cumulativeStats, $dailyHistory, 100);
        
        $this->assertIsArray($viewModel->chartData);
        $this->assertArrayHasKey('labels', $viewModel->chartData);
        $this->assertArrayHasKey('cumulativeLearning', $viewModel->chartData);
        $this->assertCount(2, $viewModel->chartData['labels']);
    }

    public function test_stats_view_model_handles_null_forecast(): void
    {
        $cumulativeStats = [
            'totalCorrect' => 0,
            'totalIncorrect' => 0,
            'totalLearning' => 0,
            'completedQuestions' => 0,
            'answeredQuestionsCount' => 0,
        ];
        
        $viewModel = new StatsViewModel($cumulativeStats, [], 100, null);
        
        $this->assertNull($viewModel->forecast);
    }

    public function test_stats_view_model_includes_forecast_when_provided(): void
    {
        $forecast = [
            'isCompleted' => false,
            'remainingCorrect' => 100,
            'estimatedDays' => 30,
            'averageDailyCorrect' => 3.33,
        ];
        
        $cumulativeStats = [
            'totalCorrect' => 50,
            'totalIncorrect' => 10,
            'totalLearning' => 60,
            'completedQuestions' => 20,
            'answeredQuestionsCount' => 30,
        ];
        
        $viewModel = new StatsViewModel($cumulativeStats, [], 100, $forecast);
        
        $this->assertIsArray($viewModel->forecast);
        $this->assertEquals(false, $viewModel->forecast['isCompleted']);
    }

    public function test_stats_view_model_to_array_contains_all_fields(): void
    {
        $cumulativeStats = [
            'totalCorrect' => 20,
            'totalIncorrect' => 5,
            'totalLearning' => 25,
            'completedQuestions' => 8,
            'answeredQuestionsCount' => 15,
        ];
        
        $viewModel = new StatsViewModel($cumulativeStats, [], 100);
        $array = $viewModel->toArray();
        
        $this->assertArrayHasKey('totalCorrect', $array);
        $this->assertArrayHasKey('totalIncorrect', $array);
        $this->assertArrayHasKey('completedPercentage', $array);
        $this->assertArrayHasKey('chartData', $array);
    }
}
