<?php

namespace App\ViewModels;

class SettingsViewModel extends ViewModel
{
    public string $pageTitle;
    public string $appName;

    public function __construct()
    {
        $this->pageTitle = '設定';
        $this->appName = '技術面接クイズアプリ';
    }
}
