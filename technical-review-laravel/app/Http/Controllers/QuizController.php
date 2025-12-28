<?php

namespace App\Http\Controllers;

use App\Services\QuestionService;
use App\Services\SettingsService;
use App\Services\StatisticsService;
use App\ViewModels\IndexViewModel;
use App\ViewModels\QuestionListViewModel;
use App\ViewModels\QuizViewModel;
use App\ViewModels\SettingsViewModel;
use App\ViewModels\StatsViewModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\View\View;

class QuizController extends Controller
{
    private QuestionService $questionService;

    private StatisticsService $statisticsService;

    private SettingsService $settingsService;

    public function __construct(QuestionService $questionService, StatisticsService $statisticsService, SettingsService $settingsService)
    {
        $this->questionService = $questionService;
        $this->statisticsService = $statisticsService;
        $this->settingsService = $settingsService;
    }

    /**
     * Display the home page.
     */
    public function index(): View
    {
        $viewModel = new IndexViewModel;

        return view('quiz.index', $viewModel->toArray());
    }

    /**
     * Display the question list page.
     */
    public function questionList(Request $request): View
    {
        $allQuestions = $this->questionService->getAllQuestions();
        $stats = $this->statisticsService->getStatistics();
        $questionsWithStats = $this->addStatsToQuestions($allQuestions, $stats);

        $searchText = $request->query('search', '');
        $statusFilter = $request->query('status', 'all');
        $filteredQuestions = $this->filterQuestions($questionsWithStats, $searchText, $statusFilter);

        $currentGenre = $this->statisticsService->getCurrentGenre();
        $keywordCounts = $this->getKeywordCounts($currentGenre, $questionsWithStats);

        $viewModel = new QuestionListViewModel(
            $filteredQuestions,
            $searchText,
            $statusFilter,
            $keywordCounts,
            $currentGenre
        );

        return view('quiz.question-list', $viewModel->toArray());
    }

    /**
     * Add statistics to questions
     *
     * @param  \Illuminate\Support\Collection<int, array<string, mixed>>  $questions
     * @param  array<string, mixed>  $stats
     * @return \Illuminate\Support\Collection<int, non-empty-array<string, mixed>>
     */
    private function addStatsToQuestions($questions, array $stats)
    {
        return $questions->map(function ($question) use ($stats) {
            $questionStat = $stats['questionStats'][$question['id']] ?? null;

            return array_merge($question, [
                'correctCount' => $questionStat['correctCount'] ?? 0,
                'incorrectCount' => $questionStat['incorrectCount'] ?? 0,
                'completed' => $questionStat['completed'] ?? false,
            ]);
        });
    }

    /**
     * Filter questions by search text and status
     *
     * @param  \Illuminate\Support\Collection<int, non-empty-array<string, mixed>>  $questions
     * @return array<int, array<string, mixed>>
     */
    private function filterQuestions($questions, string $searchText, string $statusFilter): array
    {
        return $questions->filter(function ($question) use ($searchText, $statusFilter) {
            if ($searchText && stripos($question['question'], $searchText) === false) {
                return false;
            }

            if ($statusFilter === 'all') {
                return true;
            }

            return $this->matchesStatusFilter($question, $statusFilter);
        })->values()->toArray();
    }

    /**
     * Check if question matches status filter
     *
     * @param  array<string, mixed>  $question
     */
    private function matchesStatusFilter(array $question, string $statusFilter): bool
    {
        $hasAnswered = $question['correctCount'] > 0 || $question['incorrectCount'] > 0;
        $isCompleted = $question['completed'];

        return match ($statusFilter) {
            'completed' => $isCompleted,
            'answered' => $hasAnswered && ! $isCompleted,
            'unanswered' => ! $hasAnswered,
            default => true,
        };
    }

    /**
     * Get keyword counts based on genre
     *
     * @param  \Illuminate\Support\Collection<int, non-empty-array<string, mixed>>  $questions
     * @return array<string, int>
     */
    private function getKeywordCounts(string $genre, $questions): array
    {
        if ($genre === 'vocabulary' || $genre === 'python') {
            return $questions->groupBy('middleCategory')
                ->map(fn ($group) => $group->count())
                ->sortKeys()
                ->toArray();
        }

        return Cache::remember('keyword_search_counts', 3600, function () {
            $keywords = [
                'API', 'REST', 'HTTP', 'HTTPS', 'JSON', 'XML',
                'SQL', 'データベース', 'インデックス', 'トランザクション', '正規化',
                'セキュリティ', '認証', '認可', 'OAuth', 'JWT', 'Cookie', 'Session',
                'CORS', 'CSRF', 'XSS', 'インジェクション', '暗号化', 'SSL',
                'キャッシュ', 'パフォーマンス', 'スケーリング', 'ロードバランサ',
                'テスト', '単体テスト', '結合テスト', 'CI/CD',
                'Git', 'Docker', 'デプロイ', 'バックアップ',
                '非同期', 'マイクロサービス', 'ログ', 'モニタリング',
                'エラー', 'バリデーション', 'リファクタリング', 'レビュー',
                'EC2', 'RDS', 'ALB', 'ELB', 'CloudFront', 'S3', 'EBS', 'EFS',
                'Athena', 'Kinesis', 'Lambda',
            ];

            return $this->questionService->getKeywordCounts($keywords);
        });
    }

    /**
     * Display the statistics page.
     */
    public function stats(): View
    {
        $cumulativeStats = $this->statisticsService->getCumulativeStats();
        $dailyHistory = $this->statisticsService->getDailyHistoryWithCumulative();
        $totalQuestions = $this->questionService->getTotalQuestionCount();
        $forecast = $this->statisticsService->getCompletionForecast($totalQuestions);
        $targetDate = $this->settingsService->getTargetDate();

        $viewModel = new StatsViewModel($cumulativeStats, $dailyHistory, $totalQuestions, $forecast, $targetDate);

        return view('quiz.stats', $viewModel->toArray());
    }

    /**
     * Display the settings page.
     */
    public function settings(): View
    {
        $targetDate = $this->settingsService->getTargetDate();
        $currentGenre = $this->settingsService->getCurrentGenre();
        $availableGenres = $this->settingsService->getAvailableGenres();
        $viewModel = new SettingsViewModel($targetDate, $currentGenre, $availableGenres);

        return view('quiz.settings', $viewModel->toArray());
    }

    /**
     * Save settings
     */
    public function saveSettings(Request $request): RedirectResponse
    {
        $targetDate = $request->input('target_date');
        $genre = $request->input('genre');

        $this->settingsService->setTargetDate($targetDate);

        if ($genre) {
            $this->settingsService->setCurrentGenre($genre);

            return redirect()->route('quiz.index')->with('success', 'カテゴリを変更しました');
        }

        return redirect()->route('quiz.stats')->with('success', '目標日を保存しました');
    }

    /**
     * Start a new quiz with random question
     */
    public function startQuiz(Request $request): View|RedirectResponse
    {
        $question = $this->questionService->getRandomQuestion();

        if (! $question) {
            return redirect()->route('quiz.index')->with('error', '問題が見つかりません');
        }

        // Store question in session
        $request->session()->put('current_question', $question);
        $request->session()->forget('quiz_result');

        $viewModel = new QuizViewModel($question);

        return view('quiz.quiz', $viewModel->toArray());
    }

    /**
     * Start quiz with specific question by ID
     */
    public function startQuizById(Request $request, int $id): View|RedirectResponse
    {
        $question = $this->questionService->getQuestionById($id);

        if (! $question) {
            return redirect()->route('quiz.question-list')->with('error', '問題が見つかりません');
        }

        // Store question in session
        $request->session()->put('current_question', $question);
        $request->session()->forget('quiz_result');

        $viewModel = new QuizViewModel($question);

        return view('quiz.quiz', $viewModel->toArray());
    }

    /**
     * Submit answer and save result (判定はクライアント側で実施済み)
     */
    public function submitQuizAnswer(Request $request): JsonResponse
    {
        $currentQuestion = $request->session()->get('current_question');

        if (! $currentQuestion) {
            return response()->json(['error' => '問題が見つかりません'], 404);
        }

        // クライアント側で判定済みの結果を受け取る
        $isCorrect = (bool) $request->input('isCorrect');

        // Record the answer in learningLog.json
        $this->statisticsService->recordAnswer($currentQuestion['id'], $isCorrect);

        return response()->json([
            'success' => true,
            'message' => '回答を保存しました',
        ]);
    }

    /**
     * Get next random question as JSON
     */
    public function getNextQuestion(Request $request): JsonResponse
    {
        $nextQuestion = $this->questionService->getRandomQuestion();

        if (! $nextQuestion) {
            return response()->json(['error' => '問題が見つかりません'], 404);
        }

        $request->session()->put('current_question', $nextQuestion);

        return response()->json([
            'question' => $nextQuestion,
        ]);
    }

    /**
     * Reset statistics
     */
    public function resetStatistics(): JsonResponse
    {
        $this->statisticsService->resetStatistics();

        return response()->json(['message' => '統計データをリセットしました']);
    }
}
