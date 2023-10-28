<?php

namespace App\Models\Collection;

use Illuminate\Support\Collection;
use App\Models\LearningHistory;
use InvalidArgumentException;

class LearningHistoryCollection extends Collection
{
    public function __construct($items = [])
    {
        // ここで型チェックを行うことで、特定の型のオブジェクトのみを受け入れることができます。
        foreach ($items as $item) {
            if (! $item instanceof LearningHistory) {
                throw new InvalidArgumentException('Item is not a LearningHistory instance.');
            }
        }

        parent::__construct($items);
    }

    public function toArrayForLearningHistories()
    {
        $result = [];
        foreach($this as $item) {
            $key = $item['date'];
            $result[$key] = [];
            $result[$key][] = $item; 
        }
        return $result;
    }
}
