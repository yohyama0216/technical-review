<?php

namespace App\ViewModels;

class QuizViewModel extends ViewModel
{
    public string $pageTitle;

    public string $appName;

    /** @var array<string, mixed>|null */
    public ?array $question;

    /**
     * @param  array<string, mixed>|null  $question
     */
    public function __construct(
        ?array $question = null,
    ) {
        $this->pageTitle = 'クイズ';
        $this->appName = 'Technical Review Quiz';
        $this->question = $question;
    }
}
