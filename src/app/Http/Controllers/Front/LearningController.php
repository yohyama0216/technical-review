<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Services\LearningHistoryService;
use App\Services\QuestionService;
use Illuminate\Http\Request;

class LearningController extends Controller
{
    protected $learningHistoryService;
    protected $questionService;

    public function __construct(
        LearningHistoryService $learningHistoryService,
        QuestionService $questionService)
    {
        $this->learningHistoryService = $learningHistoryService;
        $this->questionService = $questionService;
    }

    public function index(Request $request)
    {
        $questions = $this->questionService->getQuestionsForLearning();
        return view('front.learning.index', compact('questions'));
    }

    public function checkAnswer(Request $request)
    {
        $answers = $request->input('question_answers'); // 仮定として、リクエストから答えを取得
       //$questionId = $request->input('question_id'); // 問題のIDも取得
        $userId = 1;
        $result = $this->learningHistoryService->recordLearningHistory($userId, $answers);

        // 結果に基づいて適切なレスポンスを返す
        if ($result) {
            return redirect('/learning')->with('success', 'Correct answer!');
        } else {
            return redirect('/learning')->with('error', 'Wrong answer. Try again.');
        }
    }
}
