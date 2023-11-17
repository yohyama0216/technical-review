<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = ['question', 'visible'];

    // Answerモデルへのリレーション
    public function answers()
    {
        return $this->hasMany(Answer::class, 'question_id');
    }

    private $categoryLabels = [
        '0' => 'その他',
        '1' => '危険物に関する法令問題', 
        '2' => '基礎物理学及び基礎化学',
        '3' => '危険物の性質並びに火災予防及び消火の方法'
    ];


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

    public function getCategoryLabel()
    {
        if (array_key_exists($this->category,$this->categoryLabels)) {
            return $this->categoryLabels[$this->category];
        }
        return 'なし';
    }
}
