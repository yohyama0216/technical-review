<?php

namespace App\ViewModels;

class QuestionListViewModel extends ViewModel
{
    public string $pageTitle;
    public string $appName;
    public array $questions;
    public string $searchText;
    public string $statusFilter;
    public array $keywordCounts;

    public function __construct(
        array $questions = [],
        string $searchText = '',
        string $statusFilter = 'all',
        array $keywordCounts = []
    ) {
        $this->pageTitle = '問題一覧';
        $this->appName = '資格対策アプリ';
        $this->questions = $questions;
        $this->searchText = $searchText;
        $this->statusFilter = $statusFilter;
        $this->keywordCounts = $keywordCounts;
    }
}
