<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['order_type', 'question_limit'];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
