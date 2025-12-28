<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class QuestionService
{
    /** @var Collection<int, array<string, mixed>> */
    private Collection $questions;

    private StatisticsService $statisticsService;

    public function __construct(StatisticsService $statisticsService)
    {
        $this->statisticsService = $statisticsService;
        $this->loadQuestions();
    }

    /**
     * Get current category
     */
    private function getCurrentCategory(): string
    {
        return $this->statisticsService->getCurrentCategory();
    }

    /**
     * Load questions from JSON file with caching
     */
    private function loadQuestions(): void
    {
        $category = $this->getCurrentCategory();
        $cacheKey = "questions.{$category}";

        // Cache for 1 hour (3600 seconds)
        $this->questions = Cache::remember($cacheKey, 3600, function () use ($category) {
            $jsonPath = app_path("Data/{$category}/questions.json");

            if (! file_exists($jsonPath)) {
                return collect([]);
            }

            $jsonContent = $this->readJsonFile($jsonPath);
            if ($jsonContent === null) {
                return collect([]);
            }

            return collect($this->addIdsToQuestions($jsonContent));
        });
    }

    /**
     * Read and decode JSON file
     *
     * @return array<int, array<string, mixed>>|null
     */
    private function readJsonFile(string $path): ?array
    {
        $jsonContent = file_get_contents($path);
        if ($jsonContent === false) {
            return null;
        }

        $data = json_decode($jsonContent, true);

        return is_array($data) ? $data : null;
    }

    /**
     * Add IDs to questions
     *
     * @param  array<int, array<string, mixed>>  $questions
     * @return array<int, array<string, mixed>>
     */
    private function addIdsToQuestions(array $questions): array
    {
        return array_map(function ($question, $index) {
            $question['id'] = $index + 1;

            return $question;
        }, $questions, array_keys($questions));
    }

    /**
     * Get all questions
     *
     * @return Collection<int, array<string, mixed>>
     */
    public function getAllQuestions(): Collection
    {
        return $this->questions;
    }

    /**
     * Get question by ID
     *
     * @return array<string, mixed>|null
     */
    public function getQuestionById(int $id): ?array
    {
        return $this->questions->firstWhere('id', $id);
    }

    /**
     * Get all major categories
     *
     * @return array<int, string>
     */
    public function getMajorCategories(): array
    {
        return $this->questions
            ->pluck('majorCategory')
            ->unique()
            ->values()
            ->all();
    }

    /**
     * Get middle categories by major category
     *
     * @return array<int, string>
     */
    public function getMiddleCategories(string $majorCategory): array
    {
        return $this->questions
            ->where('majorCategory', $majorCategory)
            ->pluck('middleCategory')
            ->unique()
            ->values()
            ->all();
    }

    /**
     * Get minor categories by major and middle category
     *
     * @return array<int, string>
     */
    public function getMinorCategories(string $majorCategory, string $middleCategory): array
    {
        return $this->questions
            ->where('majorCategory', $majorCategory)
            ->where('middleCategory', $middleCategory)
            ->pluck('minorCategory')
            ->unique()
            ->values()
            ->all();
    }

    /**
     * Get filtered questions
     *
     * @return Collection<int, array<string, mixed>>
     */
    public function getFilteredQuestions(
        ?string $majorCategory = null,
        ?string $middleCategory = null,
        ?string $minorCategory = null
    ): Collection {
        $filtered = $this->questions;

        if ($majorCategory) {
            $filtered = $filtered->where('majorCategory', $majorCategory);
        }

        if ($middleCategory) {
            $filtered = $filtered->where('middleCategory', $middleCategory);
        }

        if ($minorCategory) {
            $filtered = $filtered->where('minorCategory', $minorCategory);
        }

        return $filtered;
    }

    /**
     * Get random question from filtered set
     *
     * @return array<string, mixed>|null
     */
    public function getRandomQuestion(
        ?string $majorCategory = null,
        ?string $middleCategory = null,
        ?string $minorCategory = null
    ): ?array {
        $filtered = $this->getFilteredQuestions($majorCategory, $middleCategory, $minorCategory);

        if ($filtered->isEmpty()) {
            return null;
        }

        $unansweredQuestions = $this->getUnansweredQuestions($filtered);

        return $unansweredQuestions->isNotEmpty()
            ? $unansweredQuestions->random()
            : $filtered->random();
    }

    /**
     * Filter unanswered questions from collection
     *
     * @param  \Illuminate\Support\Collection<int, array<string, mixed>>  $questions
     * @return \Illuminate\Support\Collection<int, array<string, mixed>>
     */
    private function getUnansweredQuestions($questions)
    {
        $stats = $this->statisticsService->getStatistics();
        $questionStats = $stats['questionStats'] ?? [];

        return $questions->filter(function ($question) use ($questionStats) {
            $questionId = $question['id'];

            return ! isset($questionStats[$questionId]) ||
                   ($questionStats[$questionId]['correctCount'] == 0 &&
                    $questionStats[$questionId]['incorrectCount'] == 0);
        });
    }

    /**
     * Get total question count
     */
    public function getTotalQuestionCount(): int
    {
        return $this->questions->count();
    }

    /**
     * Get keyword search counts
     *
     * @param  array<int, string>  $keywords
     * @return array<string, int>
     */
    public function getKeywordCounts(array $keywords): array
    {
        $counts = [];

        foreach ($keywords as $keyword) {
            $count = $this->questions->filter(function ($question) use ($keyword) {
                return stripos($question['question'], $keyword) !== false;
            })->count();

            if ($count > 0) {
                $counts[$keyword] = $count;
            }
        }

        return $counts;
    }

    /**
     * Clear questions cache for current category
     */
    public function clearCache(): void
    {
        $category = $this->getCurrentCategory();
        Cache::forget("questions.{$category}");
    }

    /**
     * Clear cache for all categories
     */
    public function clearAllCache(): void
    {
        $categories = ['technical', 'vocabulary'];
        foreach ($categories as $category) {
            Cache::forget("questions.{$category}");
        }
    }
}
