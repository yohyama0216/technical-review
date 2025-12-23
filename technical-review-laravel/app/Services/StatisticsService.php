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
     * Get learning log file path for current category
     */
    private function getLearningLogFile(): string
    {
        $category = $this->getCurrentCategory();
        return sprintf(self::LEARNING_LOG_FILE_PATTERN, $category);
    }

    /**
     * Get all statistics data
     */
    public function getStatistics(): array
    {
        $file = $this->getLearningLogFile();
        if (!Storage::exists($file)) {
            return $this->getDefaultStatistics();
        }

        $content = Storage::get($file);
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
            'targetDate' => null,
            'currentCategory' => 'technical',
        ];
    }

    /**
     * Save statistics data
     */
    public function saveStatistics(array $data): void
    {
        $file = $this->getLearningLogFile();
        Storage::put($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
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
     * Get completion forecast based on recent learning pace
     */
    public function getCompletionForecast(int $totalQuestions): ?array
    {
        $stats = $this->getStatistics();
        $dailyHistory = $stats['dailyHistory'] ?? [];
        $questionStats = $stats['questionStats'] ?? [];
        
        if (empty($dailyHistory)) {
            return null;
        }
        
        // 完了基準: correctCount > 2 かつ correctCount - incorrectCount > 0
        // つまり各問題を完了させるには最低3回正解が必要
        $minCorrectForCompletion = 3;
        
        // 現在の総正解数を計算
        $totalCorrect = 0;
        foreach ($questionStats as $stat) {
            $totalCorrect += $stat['correctCount'] ?? 0;
        }
        
        // 全問題を完了させるのに必要な総正解数
        $requiredTotalCorrect = $totalQuestions * $minCorrectForCompletion;
        
        // 残り必要な正解数
        $remainingCorrectNeeded = $requiredTotalCorrect - $totalCorrect;
        
        if ($remainingCorrectNeeded <= 0) {
            return [
                'isCompleted' => true,
                'remainingCorrect' => 0,
                'estimatedDays' => 0,
                'estimatedDate' => null,
                'averageDailyCorrect' => 0,
            ];
        }
        
        // 最近7日間のデータから平均正解数を計算
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
        
        // 学習日がない場合は予測不可
        if ($daysWithActivity === 0) {
            return null;
        }
        
        // 平均日次正解数を計算（学習した日のみの平均）
        $averageDailyCorrect = $totalCorrectInPeriod / $daysWithActivity;
        
        // 完了までの推定日数を計算
        $estimatedDays = ceil($remainingCorrectNeeded / $averageDailyCorrect);
        
        // 完了予定日を計算
        $estimatedDate = date('Y-m-d', strtotime("+{$estimatedDays} days"));
        
        return [
            'isCompleted' => false,
            'remainingCorrect' => (int) $remainingCorrectNeeded,
            'requiredTotalCorrect' => $requiredTotalCorrect,
            'currentTotalCorrect' => $totalCorrect,
            'estimatedDays' => (int) $estimatedDays,
            'estimatedDate' => $estimatedDate,
            'averageDailyCorrect' => round($averageDailyCorrect, 1),
            'analyzedDays' => count($recentDays),
            'daysWithActivity' => $daysWithActivity,
        ];
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
