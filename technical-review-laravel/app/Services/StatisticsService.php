<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class StatisticsService
{
    private const LEARNING_LOG_FILE_PATTERN = '%s/learningLog.json';

    /**
     * Get current category from the main learningLog file or return default
     */
    public function getCurrentCategory(): string
    {
        // Read from settings.json to avoid circular dependency
        if (Storage::exists('settings.json')) {
            $content = Storage::get('settings.json');
            $data = json_decode($content, true);
            if (isset($data['currentCategory'])) {
                return $data['currentCategory'];
            }
        }

        return 'technical';
    }

    /**
     * Calculate total correct count from question stats
     *
     * @param  array<int|string, array<string, mixed>>  $questionStats
     */
    private function calculateTotalCorrectCount(array $questionStats): int
    {
        $totalCorrect = 0;
        foreach ($questionStats as $stat) {
            $totalCorrect += $stat['correctCount'] ?? 0;
        }

        return $totalCorrect;
    }

    /**
     * Build forecast result for completed learning
     *
     * @return array<string, mixed>
     */
    private function buildCompletedForecast(): array
    {
        return [
            'isCompleted' => true,
            'remainingCorrect' => 0,
            'estimatedDays' => 0,
            'estimatedDate' => null,
            'averageDailyCorrect' => 0,
        ];
    }

    /**
     * Calculate recent learning statistics
     *
     * @param  array<string, array<string, mixed>>  $dailyHistory
     * @return array<string, mixed>
     */
    private function calculateRecentLearningStats(array $dailyHistory): array
    {
        ksort($dailyHistory);
        $recentDays = array_slice($dailyHistory, -7, 7, true);

        $totalCorrectInPeriod = 0;
        $daysWithActivity = 0;

        foreach ($recentDays as $data) {
            $dailyCorrect = $data['correct'] ?? 0;
            if ($dailyCorrect > 0) {
                $totalCorrectInPeriod += $dailyCorrect;
                $daysWithActivity++;
            }
        }

        $averageDailyCorrect = $daysWithActivity > 0
            ? $totalCorrectInPeriod / $daysWithActivity
            : 0;

        return [
            'averageDailyCorrect' => $averageDailyCorrect,
            'daysWithActivity' => $daysWithActivity,
            'analyzedDays' => count($recentDays),
        ];
    }

    /**
     * Calculate estimated completion date
     */
    private function calculateEstimatedDate(float $estimatedDays): string
    {
        $timestamp = strtotime("+{$estimatedDays} days");
        if ($timestamp === false) {
            throw new \RuntimeException('Failed to calculate estimated date');
        }

        return date('Y-m-d', $timestamp);
    }

    /**
     * Build forecast result array
     *
     * @param  array<string, mixed>  $recentStats
     * @return array<string, mixed>
     */
    private function buildForecastResult(
        float $remainingCorrectNeeded,
        int $requiredTotalCorrect,
        int $totalCorrect,
        float $estimatedDays,
        string $estimatedDate,
        array $recentStats
    ): array {
        return [
            'isCompleted' => false,
            'remainingCorrect' => (int) $remainingCorrectNeeded,
            'requiredTotalCorrect' => $requiredTotalCorrect,
            'currentTotalCorrect' => $totalCorrect,
            'estimatedDays' => (int) $estimatedDays,
            'estimatedDate' => $estimatedDate,
            'averageDailyCorrect' => round($recentStats['averageDailyCorrect'], 1),
            'analyzedDays' => $recentStats['analyzedDays'],
            'daysWithActivity' => $recentStats['daysWithActivity'],
        ];
    }

    /**
     * Get learning log file path for current category
     */
    private function getLearningLogFile(): string
    {
        $category = $this->getCurrentCategory();

        return sprintf(self::LEARNING_LOG_FILE_PATTERN, $category);
    }

    /**
     * Get all statistics data
     *
     * @return array<string, mixed>
     */
    public function getStatistics(): array
    {
        $file = $this->getLearningLogFile();
        if (! Storage::exists($file)) {
            return $this->getDefaultStatistics();
        }

        $content = Storage::get($file);
        $data = json_decode($content, true);

        return $data ?? $this->getDefaultStatistics();
    }

    /**
     * Get default statistics structure
     *
     * @return array<string, mixed>
     */
    private function getDefaultStatistics(): array
    {
        return [
            'questionStats' => [],
            'dailyHistory' => [],
            'targetDate' => null,
            'currentCategory' => 'technical',
        ];
    }

    /**
     * Save statistics data
     *
     * @param  array<string, mixed>  $data
     */
    public function saveStatistics(array $data): void
    {
        $file = $this->getLearningLogFile();
        $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        if ($json === false) {
            throw new \RuntimeException('Failed to encode statistics data to JSON');
        }
        Storage::put($file, $json);
    }

    /**
     * Record question answer
     */
    public function recordAnswer(int $questionId, bool $isCorrect): void
    {
        $stats = $this->getStatistics();
        $today = date('Y-m-d');

        $this->updateQuestionStats($stats, $questionId, $isCorrect);
        $this->updateDailyHistory($stats, $today, $isCorrect);

        $this->saveStatistics($stats);
    }

    /**
     * Update question statistics
     *
     * @param  array<string, mixed>  $stats
     */
    private function updateQuestionStats(array &$stats, int $questionId, bool $isCorrect): void
    {
        if (! isset($stats['questionStats'][$questionId])) {
            $stats['questionStats'][$questionId] = [
                'correctCount' => 0,
                'incorrectCount' => 0,
                'completed' => false,
            ];
        }

        if ($isCorrect) {
            $stats['questionStats'][$questionId]['correctCount']++;
        } else {
            $stats['questionStats'][$questionId]['incorrectCount']++;
        }

        $correctCount = $stats['questionStats'][$questionId]['correctCount'];
        $incorrectCount = $stats['questionStats'][$questionId]['incorrectCount'];
        $stats['questionStats'][$questionId]['completed'] = ($correctCount > 2) && (($correctCount - $incorrectCount) > 0);
    }

    /**
     * Update daily history statistics
     *
     * @param  array<string, mixed>  $stats
     */
    private function updateDailyHistory(array &$stats, string $today, bool $isCorrect): void
    {
        if (! isset($stats['dailyHistory'][$today])) {
            $stats['dailyHistory'][$today] = [
                'correct' => 0,
                'incorrect' => 0,
                'completed' => 0,
            ];
        }

        if ($isCorrect) {
            $stats['dailyHistory'][$today]['correct']++;
        } else {
            $stats['dailyHistory'][$today]['incorrect']++;
        }

        $completedToday = array_filter($stats['questionStats'], fn ($stat) => $stat['completed'] ?? false);
        $stats['dailyHistory'][$today]['completed'] = count($completedToday);
    }

    /**
     * Get cumulative statistics
     *
     * @return array<string, mixed>
     */
    public function getCumulativeStats(): array
    {
        $stats = $this->getStatistics();
        $questionStats = $stats['questionStats'] ?? [];

        $totalCorrect = 0;
        $totalIncorrect = 0;
        $completedCount = 0;
        $answeredCount = 0;

        foreach ($questionStats as $stat) {
            $totalCorrect += $stat['correctCount'] ?? 0;
            $totalIncorrect += $stat['incorrectCount'] ?? 0;

            // 完了（正解した）問題数
            if ($stat['completed'] ?? false) {
                $completedCount++;
            }

            // 回答済み（正解でも不正解でも回答した）問題数
            if (($stat['correctCount'] ?? 0) > 0 || ($stat['incorrectCount'] ?? 0) > 0) {
                $answeredCount++;
            }
        }

        return [
            'totalCorrect' => $totalCorrect,
            'totalIncorrect' => $totalIncorrect,
            'totalLearning' => $totalCorrect + $totalIncorrect, // 累計学習数（総回答数）
            'completedQuestions' => $completedCount, // 1回以上正解した問題数
            'answeredQuestionsCount' => $answeredCount, // 1回以上回答した問題数
        ];
    }

    /**
     * Get daily history with cumulative data
     *
     * @return array<int, array<string, mixed>>
     */
    public function getDailyHistoryWithCumulative(): array
    {
        $stats = $this->getStatistics();
        $dailyHistory = $stats['dailyHistory'] ?? [];
        ksort($dailyHistory);

        $cumulatives = ['correct' => 0, 'incorrect' => 0, 'learning' => 0];
        $result = [];

        foreach ($dailyHistory as $date => $data) {
            $result[] = $this->buildDailyHistoryRow($date, $data, $cumulatives);
        }

        return $result;
    }

    /**
     * Build a single daily history row with cumulative data
     *
     * @param  array<string, int>  $data
     * @param  array<string, int>  $cumulatives
     * @return array<string, mixed>
     */
    private function buildDailyHistoryRow(string $date, array $data, array &$cumulatives): array
    {
        $dailyCorrect = $data['correct'] ?? 0;
        $dailyIncorrect = $data['incorrect'] ?? 0;
        $dailyLearning = $dailyCorrect + $dailyIncorrect;

        $cumulatives['correct'] += $dailyCorrect;
        $cumulatives['incorrect'] += $dailyIncorrect;
        $cumulatives['learning'] += $dailyLearning;

        return [
            'date' => $date,
            'dailyCorrect' => $dailyCorrect,
            'dailyIncorrect' => $dailyIncorrect,
            'dailyLearning' => $dailyLearning,
            'cumulativeCorrect' => $cumulatives['correct'],
            'cumulativeIncorrect' => $cumulatives['incorrect'],
            'cumulativeLearning' => $cumulatives['learning'],
        ];
    }

    /**
     * Get question statistics
     *
     * @return array<string, mixed>|null
     */
    public function getQuestionStats(int $questionId): ?array
    {
        $stats = $this->getStatistics();

        return $stats['questionStats'][$questionId] ?? null;
    }

    /**
     * Check if question is completed
     */
    public function isQuestionCompleted(int $questionId): bool
    {
        $stat = $this->getQuestionStats($questionId);

        return $stat['completed'] ?? false;
    }

    /**
     * Get completion forecast based on recent learning pace
     *
     * @return array<string, mixed>|null
     */
    public function getCompletionForecast(int $totalQuestions): ?array
    {
        $stats = $this->getStatistics();
        $dailyHistory = $stats['dailyHistory'] ?? [];
        $questionStats = $stats['questionStats'] ?? [];

        if (empty($dailyHistory)) {
            return null;
        }

        $totalCorrect = $this->calculateTotalCorrectCount($questionStats);
        $requiredTotalCorrect = $totalQuestions * 3; // 3 correct answers per question
        $remainingCorrectNeeded = $requiredTotalCorrect - $totalCorrect;

        if ($remainingCorrectNeeded <= 0) {
            return $this->buildCompletedForecast();
        }

        $recentStats = $this->calculateRecentLearningStats($dailyHistory);

        if ($recentStats['daysWithActivity'] === 0) {
            return null;
        }

        $estimatedDays = ceil($remainingCorrectNeeded / $recentStats['averageDailyCorrect']);
        $estimatedDate = $this->calculateEstimatedDate($estimatedDays);

        return $this->buildForecastResult(
            $remainingCorrectNeeded,
            $requiredTotalCorrect,
            $totalCorrect,
            $estimatedDays,
            $estimatedDate,
            $recentStats
        );
    }

    /**
     * Reset all statistics
     */
    public function resetStatistics(): void
    {
        $file = $this->getLearningLogFile();
        Storage::delete($file);
    }

    /**
     * Get target date
     */
    public function getTargetDate(): ?string
    {
        $stats = $this->getStatistics();

        return $stats['targetDate'] ?? null;
    }

    /**
     * Set target date
     */
    public function setTargetDate(?string $date): void
    {
        $stats = $this->getStatistics();
        $stats['targetDate'] = $date;
        $this->saveStatistics($stats);
    }
}
