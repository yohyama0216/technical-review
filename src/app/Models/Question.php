<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = ['question', 'answer', 'visible'];

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function getAnswers()
    {
        $answers = [
            ['label' => $this->correct_answer,'value' => 1],
            ['label' => $this->wrong_answer1,'value' => 0],
            ['label' => $this->wrong_answer2,'value' => 0],
            ['label' => $this->wrong_answer3,'value' => 0],
            ['label' => $this->wrong_answer4,'value' => 0],
        ];
        return $answers;
    }

    public function getShuffledAnswers()
    {
        $answers = $this->getAnswers();
        shuffle($answers);
        return $answers;
    }

    // この質問に関する学習履歴を取得
    public function answerHistories()
    {
        return $this->hasMany(LearningHistory::class);
    }
}
