<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Services\LearningHistoryService;
use Illuminate\Http\Request;

class LearningHistoryController extends Controller
{
    protected $learningHistoryService;

    public function __construct(LearningHistoryService $service)
    {
        $this->learningHistoryService = $service;
    }

    public function index(Request $request)
    {
        $id = auth()->id();
        $id = 1;
        $histories = $this->learningHistoryService->getHistoriesForUser($id);
        return view('front.learning-history.index', compact('histories'));
    }

    public function store(Request $request)
    {
        // $data = [
        //     ['question_id' => 1,'result' => 1],
        //     ['question_id' => 2,'result' => 1],
        // ];
        //var_dump($request->data);
        //$this->learningHistoryService->recordLearningHistory(1,$request['learning-results']);

        return response()->json(['message' => '学習履歴が正常に保存されました', 'learningHistory' => 'OK']);
    }
}
