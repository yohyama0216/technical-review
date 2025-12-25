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
        $viewModel = new SettingsViewModel('2025-12-31', 'technical', ['technical' => 'Technical']);
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

    public function test_quiz_view_model_with_null_question(): void
    {
        $viewModel = new QuizViewModel(null);
        $array = $viewModel->toArray();

        $this->assertIsArray($array);
        $this->assertNull($array['question']);
        $this->assertEquals('クイズ', $array['pageTitle']);
    }

    public function test_index_view_model_has_correct_page_title(): void
    {
        $viewModel = new IndexViewModel;
        $this->assertEquals('ホーム', $viewModel->pageTitle);
        $this->assertEquals('資格対策アプリ', $viewModel->appName);
    }

    public function test_question_list_view_model_with_empty_data(): void
    {
        $viewModel = new QuestionListViewModel;
        $array = $viewModel->toArray();

        $this->assertEmpty($array['questions']);
        $this->assertEquals('all', $array['statusFilter']);
        $this->assertEquals('', $array['searchText']);
        $this->assertEquals('technical', $array['currentCategory']);
    }

    public function test_question_list_view_model_with_filters(): void
    {
        $questions = [
            ['id' => 1, 'question' => 'Test 1'],
            ['id' => 2, 'question' => 'Test 2'],
        ];
        $keywordCounts = ['API' => 5, 'REST' => 3];

        $viewModel = new QuestionListViewModel(
            $questions,
            'test search',
            'completed',
            $keywordCounts,
            'vocabulary'
        );

        $this->assertCount(2, $viewModel->questions);
        $this->assertEquals('test search', $viewModel->searchText);
        $this->assertEquals('completed', $viewModel->statusFilter);
        $this->assertEquals('vocabulary', $viewModel->currentCategory);
        $this->assertArrayHasKey('API', $viewModel->keywordCounts);
    }

    public function test_settings_view_model_with_null_target_date(): void
    {
        $categories = ['technical' => 'Technical', 'vocabulary' => 'Vocabulary'];
        $viewModel = new SettingsViewModel(null, 'technical', $categories);

        $this->assertNull($viewModel->targetDate);
        $this->assertEquals('technical', $viewModel->currentCategory);
        $this->assertCount(2, $viewModel->availableCategories);
    }

    public function test_settings_view_model_with_all_parameters(): void
    {
        $targetDate = '2025-12-31';
        $categories = ['technical' => 'Technical'];
        $viewModel = new SettingsViewModel($targetDate, 'vocabulary', $categories);

        $this->assertEquals($targetDate, $viewModel->targetDate);
        $this->assertEquals('vocabulary', $viewModel->currentCategory);
        $this->assertEquals('設定', $viewModel->pageTitle);
    }

    public function test_stats_view_model_calculates_unanswered_questions(): void
    {
        $cumulativeStats = [
            'totalCorrect' => 20,
            'totalIncorrect' => 5,
            'totalLearning' => 25,
            'completedQuestions' => 8,
            'answeredQuestionsCount' => 15,
        ];

        $viewModel = new StatsViewModel($cumulativeStats, [], 100);

        $this->assertEquals(85, $viewModel->unansweredQuestions);
    }

    public function test_all_view_models_have_common_properties(): void
    {
        $viewModels = [
            new IndexViewModel,
            new QuestionListViewModel,
            new QuizViewModel,
            new SettingsViewModel,
            new StatsViewModel(
                ['totalCorrect' => 0, 'totalIncorrect' => 0, 'totalLearning' => 0, 'completedQuestions' => 0, 'answeredQuestionsCount' => 0],
                [],
                0
            ),
        ];

        foreach ($viewModels as $viewModel) {
            $this->assertObjectHasProperty('pageTitle', $viewModel);
            $this->assertObjectHasProperty('appName', $viewModel);
        }
    }
}
