<?php

namespace App\ViewModels;

class SettingsViewModel extends ViewModel
{
    public string $pageTitle;

    public string $appName;

    public ?string $targetDate;

    public string $currentGenre;

    /** @var array<string, string> */
    public array $availableGenres;

    /**
     * @param  array<string, string>  $availableGenres
     */
    public function __construct(?string $targetDate = null, string $currentGenre = 'technical', array $availableGenres = [])
    {
        $this->pageTitle = '設定';
        $this->appName = '資格対策アプリ';
        $this->targetDate = $targetDate;
        $this->currentGenre = $currentGenre;
        $this->availableGenres = $availableGenres;
    }
}
