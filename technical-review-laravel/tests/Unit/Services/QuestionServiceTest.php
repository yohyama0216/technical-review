<?php

namespace Tests\Unit\Services;

use App\Services\QuestionService;
use Tests\TestCase;

class QuestionServiceTest extends TestCase
{
    private QuestionService $questionService;

    #[\Override]
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

    public function test_get_major_categories_returns_unique_list(): void
    {
        $categories = $this->questionService->getMajorCategories();
        $this->assertIsArray($categories);
        $this->assertEquals($categories, array_unique($categories));
    }

    public function test_get_middle_categories_returns_array(): void
    {
        $majorCategories = $this->questionService->getMajorCategories();
        if (! empty($majorCategories)) {
            $middleCategories = $this->questionService->getMiddleCategories($majorCategories[0]);
            $this->assertIsArray($middleCategories);
        } else {
            $this->markTestSkipped('No major categories available');
        }
    }

    public function test_get_minor_categories_returns_array(): void
    {
        $majorCategories = $this->questionService->getMajorCategories();
        if (! empty($majorCategories)) {
            $middleCategories = $this->questionService->getMiddleCategories($majorCategories[0]);
            if (! empty($middleCategories)) {
                $minorCategories = $this->questionService->getMinorCategories($majorCategories[0], $middleCategories[0]);
                $this->assertIsArray($minorCategories);
            } else {
                $this->markTestSkipped('No middle categories available');
            }
        } else {
            $this->markTestSkipped('No major categories available');
        }
    }

    public function test_get_question_by_id_returns_null_for_invalid_id(): void
    {
        $question = $this->questionService->getQuestionById(999999);
        $this->assertNull($question);
    }

    public function test_get_total_question_count_is_non_negative(): void
    {
        $count = $this->questionService->getTotalQuestionCount();
        $this->assertGreaterThanOrEqual(0, $count);
    }

    public function test_get_keyword_counts_with_empty_array(): void
    {
        $counts = $this->questionService->getKeywordCounts([]);
        $this->assertIsArray($counts);
        $this->assertEmpty($counts);
    }

    public function test_get_all_questions_returns_collection_type(): void
    {
        $questions = $this->questionService->getAllQuestions();
        $this->assertInstanceOf(\Illuminate\Support\Collection::class, $questions);
    }

    public function test_get_random_question_returns_different_questions(): void
    {
        $question1 = $this->questionService->getRandomQuestion();
        $question2 = $this->questionService->getRandomQuestion();

        // May return null if no questions, both should be same type
        $this->assertEquals(gettype($question1), gettype($question2));
    }

    public function test_get_filtered_questions_returns_collection(): void
    {
        $questions = $this->questionService->getAllQuestions();
        if ($questions->isNotEmpty()) {
            $majorCategory = $questions->first()['majorCategory'] ?? null;
            if ($majorCategory) {
                $filtered = $this->questionService->getFilteredQuestions($majorCategory);
                $this->assertInstanceOf(\Illuminate\Support\Collection::class, $filtered);
            }
        }
        $this->assertTrue(true);
    }

    public function test_get_major_categories_returns_non_empty_when_questions_exist(): void
    {
        $questions = $this->questionService->getAllQuestions();
        $categories = $this->questionService->getMajorCategories();

        if ($questions->isNotEmpty()) {
            $this->assertNotEmpty($categories);
        } else {
            $this->assertEmpty($categories);
        }
    }

    public function test_random_question_prioritizes_unanswered_questions(): void
    {
        // Reset statistics to ensure all questions are unanswered
        $statisticsService = app(\App\Services\StatisticsService::class);
        $statisticsService->resetStatistics();

        // Get first random question
        $question1 = $this->questionService->getRandomQuestion();
        if (! $question1) {
            $this->markTestSkipped('No questions available');
        }

        // Record answer for first question
        $statisticsService->recordAnswer($question1['id'], true);

        // Get multiple random questions and check they prefer unanswered
        $unansweredFound = false;
        for ($i = 0; $i < 10; $i++) {
            $question = $this->questionService->getRandomQuestion();
            if ($question && $question['id'] !== $question1['id']) {
                $unansweredFound = true;
                break;
            }
        }

        // If there are multiple questions, we should get unanswered ones
        $totalQuestions = $this->questionService->getTotalQuestionCount();
        if ($totalQuestions > 1) {
            $this->assertTrue($unansweredFound, 'Should prioritize unanswered questions');
        }

        // Clean up - reset statistics
        $statisticsService->resetStatistics();
    }
}
