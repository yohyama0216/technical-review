<?php

namespace App\ViewModels;

class QuestionListViewModel extends ViewModel
{
    public string $pageTitle;
    public string $appName;
    public array $questions;
    public array $majorCategories;
    public array $middleCategories;
    public array $minorCategories;
    public string $searchText;
    public string $majorFilter;
    public string $middleFilter;
    public string $minorFilter;
    public string $statusFilter;

    public function __construct(
        array $questions = [],
        array $majorCategories = [],
        array $middleCategories = [],
        array $minorCategories = [],
        string $searchText = '',
        string $majorFilter = '',
        string $middleFilter = '',
        string $minorFilter = '',
        string $statusFilter = 'all'
    ) {
        $this->pageTitle = '問題一覧';
        $this->appName = '技術面接クイズアプリ';
        $this->questions = $questions;
        $this->majorCategories = $majorCategories;
        $this->middleCategories = $middleCategories;
        $this->minorCategories = $minorCategories;
        $this->searchText = $searchText;
        $this->majorFilter = $majorFilter;
        $this->middleFilter = $middleFilter;
        $this->minorFilter = $minorFilter;
        $this->statusFilter = $statusFilter;
    }
}
