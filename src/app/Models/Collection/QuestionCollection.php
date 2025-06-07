<?php

namespace App\Models\Collection;

use Illuminate\Support\Collection;
use App\Models\Question;
use InvalidArgumentException;

class QuestionCollection extends Collection
{
    public function __construct($items = [])
    {
        // ここで型チェックを行うことで、特定の型のオブジェクトのみを受け入れることができます。
        foreach ($items as $item) {
            if (! $item instanceof Question) {
                throw new InvalidArgumentException('Item is not a Question instance.');
            }
        }

        parent::__construct($items);
    }
}
