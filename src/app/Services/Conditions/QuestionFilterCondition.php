<?php

namespace App\Services\Conditions;

use Illuminate\Http\Request;

class QuestionFilterCondition
{
    public $searchQuestion;
    public $searchAnswer;

    // コンストラクタはprivateとして、外部からの直接のインスタンス化を制限
    private function __construct()
    {
    }

    // 静的ファクトリメソッド
    public static function fromRequest(Request $request): self
    {
        $condition = new self();
        $condition->searchQuestion = $request->input('searchQuestion');
        $condition->searchAnswer = $request->input('searchAnswer');
        // 今後の条件追加もここで行う
        return $condition;
    }
}
