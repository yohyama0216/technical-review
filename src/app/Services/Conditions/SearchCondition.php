<?php

namespace App\Services\Conditions;

use Illuminate\Http\Request;

class SearchCondition
{
    public $searchName;
    public $searchPrice;

    // コンストラクタはprivateとして、外部からの直接のインスタンス化を制限
    private function __construct()
    {
    }

    // 静的ファクトリメソッド
    public static function fromRequest(Request $request): self
    {
        $condition = new self();
        $condition->searchName = $request->input('searchName');
        $condition->searchPrice = $request->input('searchPrice');
        // 今後の条件追加もここで行う
        return $condition;
    }
}
