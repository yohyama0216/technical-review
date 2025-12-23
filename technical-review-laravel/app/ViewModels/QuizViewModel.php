<?php

namespace App\ViewModels;

class QuizViewModel extends ViewModel
{
    public string $pageTitle;

    public string $appName;

    public ?array $question;

    public function __construct(
        ?array $question = null,
    ) {
        $this->pageTitle = 'クイズ';
        $this->appName = 'Technical Review Quiz';
        $this->question = $question;
    }
}
