<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LearningHistory extends Model
{
    use HasFactory;

    protected $fillable = ['question_id', 'user_id', 'is_correct'];

    // この学習履歴に関連する質問を取得
    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    // この学習履歴に関連するユーザーを取得
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
