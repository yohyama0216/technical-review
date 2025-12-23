<?php

namespace Tests\Unit\Services;

use App\Services\QuestionService;
use Tests\TestCase;

class QuestionServiceTest extends TestCase
{
    private QuestionService $questionService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->questionService = app(QuestionService::class);
    }

    public function test_get_all_questions_returns_collection(): void
    {
        $questions = $this->questionService->getAllQuestions();
        $this->assertIsObject($questions);
    }

    public function test_get_total_question_count_returns_integer(): void
    {
        $count = $this->questionService->getTotalQuestionCount();
        $this->assertIsInt($count);
        $this->assertGreaterThanOrEqual(0, $count);
    }

    public function test_get_random_question_returns_array_or_null(): void
    {
        $question = $this->questionService->getRandomQuestion();
        $this->assertTrue(is_array($question) || is_null($question));
    }

    public function test_get_question_by_id_returns_valid_question(): void
    {
        $questions = $this->questionService->getAllQuestions();
        if ($questions->isNotEmpty()) {
            $firstQuestion = $questions->first();
            $question = $this->questionService->getQuestionById($firstQuestion['id']);
            $this->assertIsArray($question);
            $this->assertArrayHasKey('id', $question);
            $this->assertArrayHasKey('question', $question);
        } else {
            $this->markTestSkipped('No questions available');
        }
    }

    public function test_get_filtered_questions_filters_by_major_category(): void
    {
        $questions = $this->questionService->getAllQuestions();
        if ($questions->isNotEmpty()) {
            $majorCategory = $questions->first()['majorCategory'] ?? null;
            if ($majorCategory) {
                $filtered = $this->questionService->getFilteredQuestions($majorCategory);
                $this->assertGreaterThan(0, $filtered->count());
            }
        }
        $this->assertTrue(true);
    }

    public function test_get_keyword_counts_returns_array(): void
    {
        $keywords = ['test', 'example'];
        $counts = $this->questionService->getKeywordCounts($keywords);
        $this->assertIsArray($counts);
    }
}
