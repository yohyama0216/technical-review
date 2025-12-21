<?php

namespace App\Http\Controllers;

use App\Services\QuestionService;
use App\Services\StatisticsService;
use App\ViewModels\IndexViewModel;
use App\ViewModels\QuestionListViewModel;
use App\ViewModels\StatsViewModel;
use App\ViewModels\SettingsViewModel;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\View\View;
use Illuminate\Support\Facades\Cache;

class QuizController extends Controller
{
    private QuestionService $questionService;
    private StatisticsService $statisticsService;

    public function __construct(QuestionService $questionService, StatisticsService $statisticsService)
    {
        $this->questionService = $questionService;
        $this->statisticsService = $statisticsService;
    }

    /**
     * Display the home page.
     */
    public function index(): View
    {
        $viewModel = new IndexViewModel();
        return view('quiz.index', $viewModel->toArray());
    }

    /**
     * Display the question list page.
     */
    public function questionList(Request $request): View
    {
        $allQuestions = $this->questionService->getAllQuestions();
        $stats = $this->statisticsService->getStatistics();

        // Add stats to questions
        $questionsWithStats = $allQuestions->map(function ($question) use ($stats) {
            $questionStat = $stats['questionStats'][$question['id']] ?? null;
            return array_merge($question, [
                'correctCount' => $questionStat['correctCount'] ?? 0,
                'incorrectCount' => $questionStat['incorrectCount'] ?? 0,
                'completed' => $questionStat['completed'] ?? false,
            ]);
        });

        // Apply filters
        $searchText = $request->query('search', '');
        $statusFilter = $request->query('status', 'all');

        $filteredQuestions = $questionsWithStats->filter(function ($question) use ($searchText, $statusFilter) {
            // Search filter
            if ($searchText && stripos($question['question'], $searchText) === false) {
                return false;
            }

            // Status filter
            if ($statusFilter !== 'all') {
                $hasAnswered = $question['correctCount'] > 0 || $question['incorrectCount'] > 0;
                $isCompleted = $question['completed'];

                if ($statusFilter === 'completed' && !$isCompleted) return false;
                if ($statusFilter === 'answered' && (!$hasAnswered || $isCompleted)) return false;
                if ($statusFilter === 'unanswered' && $hasAnswered) return false;
            }

            return true;
        })->values()->toArray();

        // Get keyword search counts (cached for 1 hour)
        $keywordCounts = Cache::remember('keyword_search_counts', 3600, function () {
            $keywords = [
                'API', 'REST', 'HTTP', 'HTTPS', 'JSON', 'XML',
                'SQL', 'データベース', 'インデックス', 'トランザクション', '正規化',
                'セキュリティ', '認証', '認可', 'OAuth', 'JWT', 'Cookie', 'Session',
                'CORS', 'CSRF', 'XSS', 'インジェクション', '暗号化', 'SSL',
                'キャッシュ', 'パフォーマンス', 'スケーリング', 'ロードバランサ',
                'テスト', '単体テスト', '結合テスト', 'CI/CD',
                'Git', 'Docker', 'デプロイ', 'バックアップ',
                '非同期', 'マイクロサービス', 'ログ', 'モニタリング',
                'エラー', 'バリデーション', 'リファクタリング', 'レビュー'
            ];
            return $this->questionService->getKeywordCounts($keywords);
        });

        $viewModel = new QuestionListViewModel(
            $filteredQuestions,
            $searchText,
            $statusFilter,
            $keywordCounts
        );
        return view('quiz.question-list', $viewModel->toArray());
    }

    /**
     * Display the statistics page.
     */
    public function stats(): View
    {
        $cumulativeStats = $this->statisticsService->getCumulativeStats();
        $dailyHistory = $this->statisticsService->getDailyHistoryWithCumulative();
        $totalQuestions = $this->questionService->getTotalQuestionCount();

        $viewModel = new StatsViewModel($cumulativeStats, $dailyHistory, $totalQuestions);
        return view('quiz.stats', $viewModel->toArray());
    }

    /**
     * Display the settings page.
     */
    public function settings(): View
    {
        $viewModel = new SettingsViewModel();
        return view('quiz.settings', $viewModel->toArray());
    }

    /**
     * Start a new quiz with random question
     */
    public function startQuiz(Request $request): View
    {
        $question = $this->questionService->getRandomQuestion();
        
        if (!$question) {
            return redirect()->route('quiz.index')->with('error', '問題が見つかりません');
        }

        // Store question in session
        $request->session()->put('current_question', $question);
        $request->session()->forget('quiz_result');

        $viewModel = new \App\ViewModels\QuizViewModel($question);
        return view('quiz.quiz', $viewModel->toArray());
    }

    /**
     * Start quiz with specific question by ID
     */
    public function startQuizById(Request $request, int $id): View
    {
        $question = $this->questionService->getQuestionById($id);
        
        if (!$question) {
            return redirect()->route('quiz.question-list')->with('error', '問題が見つかりません');
        }

        // Store question in session
        $request->session()->put('current_question', $question);
        $request->session()->forget('quiz_result');

        $viewModel = new \App\ViewModels\QuizViewModel($question);
        return view('quiz.quiz', $viewModel->toArray());
    }

    /**
     * Submit answer and return result as JSON
     */
    public function submitQuizAnswer(Request $request): JsonResponse
    {
        $currentQuestion = $request->session()->get('current_question');
        
        if (!$currentQuestion) {
            return response()->json(['error' => '問題が見つかりません'], 404);
        }

        $userAnswer = (int) $request->input('answer');
        $isCorrect = $userAnswer === $currentQuestion['correctAnswer'];

        // Record the answer in learningLog.json
        $this->statisticsService->recordAnswer($currentQuestion['id'], $isCorrect);

        return response()->json([
            'isCorrect' => $isCorrect,
            'correctAnswer' => $currentQuestion['correctAnswer'],
            'explanation' => $currentQuestion['explanation'] ?? '',
            'answers' => $currentQuestion['answers'],
        ]);
    }

    /**
     * Get next random question as JSON
     */
    public function getNextQuestion(Request $request): JsonResponse
    {
        $nextQuestion = $this->questionService->getRandomQuestion();
        
        if (!$nextQuestion) {
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
