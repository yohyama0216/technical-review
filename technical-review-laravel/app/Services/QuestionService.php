<?php

namespace App\Services;

use Illuminate\Support\Collection;

class QuestionService
{
    private Collection $questions;

    public function __construct()
    {
        $this->loadQuestions();
    }

    /**
     * Load questions from JSON file
     */
    private function loadQuestions(): void
    {
        $jsonPath = app_path('Data/questions.json');
        
        if (!file_exists($jsonPath)) {
            $this->questions = collect([]);
            return;
        }

        $jsonContent = file_get_contents($jsonPath);
        $data = json_decode($jsonContent, true);
        
        // Add ID to each question (using array index)
        $questionsWithId = array_map(function($question, $index) {
            $question['id'] = $index + 1;
            $question['correctAnswer'] = $question['correct'] ?? 0;
            return $question;
        }, $data, array_keys($data));
        
        $this->questions = collect($questionsWithId);
    }

    /**
     * Get all questions
     */
    public function getAllQuestions(): Collection
    {
        return $this->questions;
    }

    /**
     * Get question by ID
     */
    public function getQuestionById(int $id): ?array
    {
        return $this->questions->firstWhere('id', $id);
    }

    /**
     * Get all major categories
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
     */
    public function getKeywordCounts(array $keywords): array
    {
        $counts = [];
        
        foreach ($keywords as $keyword) {
            $count = $this->questions->filter(function ($question) use ($keyword) {
                return stripos($question['question'], $keyword) !== false ||
                       stripos($question['explanation'] ?? '', $keyword) !== false ||
                       collect($question['answers'] ?? [])->contains(function ($answer) use ($keyword) {
                           return stripos($answer, $keyword) !== false;
                       });
            })->count();
            
            if ($count > 0) {
                $counts[$keyword] = $count;
            }
        }
        
        return $counts;
    }
}
