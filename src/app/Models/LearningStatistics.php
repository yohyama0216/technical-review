<?php

namespace App\Models;

use Illuminate\Support\Collection;
use App\Models\Collection\LearningHistoryCollection;

class LearningStatistics extends Collection
{
    private $progress; // 進捗
    private $size; 
    private $countCorrectResult; //
    private $countWrongResult; //     
    private $days; // 学習日数
    
    public function __construct(LearningHistoryCollection $learningHistoryCollection)
    {
        $this->progress = ''; // todo
        $this->size = count($learningHistoryCollection); // todo
        $this->countCorrectResult = ''; // todo
        $this->countWrongResult = ''; // todo
        $this->days = ''; // todo
    }

    public function getSize()
    {
        return count($this);
    }
}
