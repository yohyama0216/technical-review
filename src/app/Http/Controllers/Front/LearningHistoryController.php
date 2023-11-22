<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Services\LearningHistoryService;
use App\Services\QuestionService;
use Illuminate\Http\Request;

class LearningHistoryController extends Controller
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
        $id = auth()->id();
        $id = 1;
        $data = [
            'stats' => [
                'start_date' => $this->learningHistoryService->getStartDateForUser($id),
                'latest_date' => $this->learningHistoryService->getLatestDateForUser($id),
                'average_study_per_day' => $this->learningHistoryService->calcAverageStudyPerDayForUser($id), //todo
                'total_questions_count' => $this->questionService->getTotalCount(), //todo
            ],
            'histories' => $this->learningHistoryService->getHistoriesForUser($id),
        ];
        return view('front.learning-history.index', $data);
    }

    public function store(Request $request)
    {
        $this->learningHistoryService->recordLearningHistory(1,$request['data']);
        return response()->json(['message' => '学習履歴が正常に保存されました', 'status' => 'OK']);
    }
}
