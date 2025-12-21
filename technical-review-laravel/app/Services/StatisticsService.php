<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class StatisticsService
{
    private const LEARNING_LOG_FILE = 'learningLog.json';

    /**
     * Get all statistics data
     */
    public function getStatistics(): array
    {
        if (!Storage::exists(self::LEARNING_LOG_FILE)) {
            return $this->getDefaultStatistics();
        }

        $content = Storage::get(self::LEARNING_LOG_FILE);
        $data = json_decode($content, true);

        return $data ?? $this->getDefaultStatistics();
    }

    /**
     * Get default statistics structure
     */
    private function getDefaultStatistics(): array
    {
        return [
            'questionStats' => [],
            'dailyHistory' => [],
        ];
    }

    /**
     * Save statistics data
     */
    public function saveStatistics(array $data): void
    {
        Storage::put(self::LEARNING_LOG_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }

    /**
     * Record question answer
     */
    public function recordAnswer(int $questionId, bool $isCorrect): void
    {
        $stats = $this->getStatistics();
        $today = date('Y-m-d');

        // Update question stats
        if (!isset($stats['questionStats'][$questionId])) {
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

        // 正解数が3回以上かつ不正解数を上回っている場合のみ完了
        $correctCount = $stats['questionStats'][$questionId]['correctCount'];
        $incorrectCount = $stats['questionStats'][$questionId]['incorrectCount'];
        $stats['questionStats'][$questionId]['completed'] = ($correctCount > 2) && (($correctCount - $incorrectCount) > 0);

        // Update daily history
        if (!isset($stats['dailyHistory'][$today])) {
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

        // Count unique completed questions for the day
        $completedToday = array_filter($stats['questionStats'], function ($stat) {
            return $stat['completed'] ?? false;
        });
        $stats['dailyHistory'][$today]['completed'] = count($completedToday);

        $this->saveStatistics($stats);
    }

    /**
     * Get cumulative statistics
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
     */
    public function getDailyHistoryWithCumulative(): array
    {
        $stats = $this->getStatistics();
        $dailyHistory = $stats['dailyHistory'] ?? [];

        // Sort by date
        ksort($dailyHistory);

        $result = [];
        $cumulativeCorrect = 0;
        $cumulativeIncorrect = 0;
        $cumulativeLearning = 0;

        foreach ($dailyHistory as $date => $data) {
            $cumulativeCorrect += $data['correct'] ?? 0;
            $cumulativeIncorrect += $data['incorrect'] ?? 0;
            $cumulativeLearning += ($data['correct'] ?? 0) + ($data['incorrect'] ?? 0);

            $result[] = [
                'date' => $date,
                'dailyCorrect' => $data['correct'] ?? 0,
                'dailyIncorrect' => $data['incorrect'] ?? 0,
                'dailyLearning' => ($data['correct'] ?? 0) + ($data['incorrect'] ?? 0),
                'cumulativeCorrect' => $cumulativeCorrect,
                'cumulativeIncorrect' => $cumulativeIncorrect,
                'cumulativeLearning' => $cumulativeLearning,
            ];
        }

        return $result;
    }

    /**
     * Get question statistics
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
     * Reset all statistics
     */
    public function resetStatistics(): void
    {
        Storage::delete(self::LEARNING_LOG_FILE);
    }
}
