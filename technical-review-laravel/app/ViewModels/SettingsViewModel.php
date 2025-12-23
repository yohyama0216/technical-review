<?php

namespace App\ViewModels;

class SettingsViewModel extends ViewModel
{
    public string $pageTitle;
    public string $appName;
    public ?string $targetDate;

    public function __construct(?string $targetDate = null)
    {
        $this->pageTitle = '設定';
        $this->appName = '資格対策アプリ';
        $this->targetDate = $targetDate;
    }
}
