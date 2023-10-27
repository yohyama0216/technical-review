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
}
