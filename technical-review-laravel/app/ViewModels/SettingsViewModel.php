<?php

namespace App\ViewModels;

class SettingsViewModel extends ViewModel
{
    public string $pageTitle;

    public string $appName;

    public ?string $targetDate;

    public string $currentCategory;

    /** @var array<string, string> */
    public array $availableCategories;

    /**
     * @param  array<string, string>  $availableCategories
     */
    public function __construct(?string $targetDate = null, string $currentCategory = 'technical', array $availableCategories = [])
    {
        $this->pageTitle = '設定';
        $this->appName = '資格対策アプリ';
        $this->targetDate = $targetDate;
        $this->currentCategory = $currentCategory;
        $this->availableCategories = $availableCategories;
    }
}
