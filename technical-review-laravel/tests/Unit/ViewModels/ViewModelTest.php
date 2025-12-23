<?php

namespace Tests\Unit\ViewModels;

use App\ViewModels\IndexViewModel;
use App\ViewModels\QuestionListViewModel;
use App\ViewModels\QuizViewModel;
use App\ViewModels\SettingsViewModel;
use App\ViewModels\StatsViewModel;
use Tests\TestCase;

class ViewModelTest extends TestCase
{
    public function test_index_view_model_to_array(): void
    {
        $viewModel = new IndexViewModel;
        $array = $viewModel->toArray();

        $this->assertIsArray($array);
        $this->assertArrayHasKey('pageTitle', $array);
        $this->assertArrayHasKey('appName', $array);
    }

    public function test_question_list_view_model_to_array(): void
    {
        $viewModel = new QuestionListViewModel([], '', 'all', [], 'technical');
        $array = $viewModel->toArray();

        $this->assertIsArray($array);
        $this->assertArrayHasKey('questions', $array);
        $this->assertArrayHasKey('searchText', $array);
        $this->assertArrayHasKey('statusFilter', $array);
        $this->assertArrayHasKey('keywordCounts', $array);
        $this->assertArrayHasKey('currentCategory', $array);
    }

    public function test_quiz_view_model_to_array(): void
    {
        $question = [
            'id' => 1,
            'question' => 'Test?',
            'answers' => ['A', 'B', 'C', 'D'],
            'correctAnswer' => 0,
        ];

        $viewModel = new QuizViewModel($question);
        $array = $viewModel->toArray();

        $this->assertIsArray($array);
        $this->assertArrayHasKey('question', $array);
        $this->assertArrayHasKey('pageTitle', $array);
    }

    public function test_settings_view_model_to_array(): void
    {
        $viewModel = new SettingsViewModel('technical', ['technical' => 'Technical'], '2025-12-31');
        $array = $viewModel->toArray();

        $this->assertIsArray($array);
        $this->assertArrayHasKey('currentCategory', $array);
        $this->assertArrayHasKey('availableCategories', $array);
        $this->assertArrayHasKey('targetDate', $array);
    }

    public function test_stats_view_model_to_array(): void
    {
        $cumulativeStats = [
            'totalCorrect' => 10,
            'totalIncorrect' => 5,
            'totalLearning' => 15,
            'completedQuestions' => 2,
            'completedPercentage' => 20,
            'answeredQuestionsCount' => 5,
            'unansweredQuestions' => 5,
        ];

        $dailyHistory = [];
        $totalQuestions = 10;

        $viewModel = new StatsViewModel($cumulativeStats, $dailyHistory, $totalQuestions);
        $array = $viewModel->toArray();

        $this->assertIsArray($array);
        $this->assertArrayHasKey('totalCorrect', $array);
        $this->assertArrayHasKey('totalIncorrect', $array);
        $this->assertArrayHasKey('totalQuestions', $array);
    }
}
