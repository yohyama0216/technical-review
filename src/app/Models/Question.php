<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = ['question', 'answer', 'is_hidden'];

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function getAnswers()
    {
        $answers = [
            ['label' => $this->correct_answer,'value' => true],
            ['label' => $this->wrong_answer1,'value' => false],
            ['label' => $this->wrong_answer2,'value' => false],
            ['label' => $this->wrong_answer3,'value' => false],
            ['label' => $this->wrong_answer4,'value' => false],
        ];
        return $answers;
    }

    public function getShuffledAnswers()
    {
        $answers = $this->getAnswers();
        shuffle($answers);
        return $answers;
    }
}
