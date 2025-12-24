<?php

namespace App\Services;

use Illuminate\Support\Collection;

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
     * Load questions from JSON file
     */
    private function loadQuestions(): void
    {
        $category = $this->getCurrentCategory();
        $jsonPath = app_path("Data/{$category}/questions.json");

        if (! file_exists($jsonPath)) {
            $this->questions = collect([]);

            return;
        }

        $jsonContent = file_get_contents($jsonPath);
        if ($jsonContent === false) {
            $this->questions = collect([]);

            return;
        }

        $data = json_decode($jsonContent, true);

        if (! is_array($data)) {
            $this->questions = collect([]);

            return;
        }

        // Add ID to each question (using array index)
        $questionsWithId = array_map(function ($question, $index) {
            $question['id'] = $index + 1;
            $question['correctAnswer'] = $question['correct'] ?? 0;

            return $question;
        }, $data, array_keys($data));

        $this->questions = collect($questionsWithId);
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

        return $filtered->random();
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
}
