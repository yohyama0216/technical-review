<?php

namespace App\ViewModels;

class IndexViewModel extends ViewModel
{
    public string $pageTitle;
    public string $appName;

    public function __construct()
    {
        $this->pageTitle = 'ホーム';
        $this->appName = '資格対策アプリ';
    }
}
