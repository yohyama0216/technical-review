<?php

namespace App\ViewModels;

class QuestionListViewModel extends ViewModel
{
    public string $pageTitle;

    public string $appName;

    /** @var array<int, array<string, mixed>> */
    public array $questions;

    public string $searchText;

    public string $statusFilter;

    /** @var array<string, int> */
    public array $keywordCounts;

    public string $currentGenre;

    /**
     * @param  array<int, array<string, mixed>>  $questions
     * @param  array<string, int>  $keywordCounts
     */
    public function __construct(
        array $questions = [],
        string $searchText = '',
        string $statusFilter = 'all',
        array $keywordCounts = [],
        string $currentGenre = 'technical'
    ) {
        $this->pageTitle = '問題一覧';
        $this->appName = '資格対策アプリ';
        $this->questions = $questions;
        $this->searchText = $searchText;
        $this->statusFilter = $statusFilter;
        $this->keywordCounts = $keywordCounts;
        $this->currentGenre = $currentGenre;
    }
}
