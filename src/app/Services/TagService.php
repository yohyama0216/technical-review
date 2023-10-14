<?php

namespace App\Services;

use App\Models\Tag;
use App\Services\Conditions\SearchCondition;

class TagService
{
    public function getAllTags($paginate = 10)
    {
        return Tag::paginate($paginate);
    }

    public function searchTags(SearchCondition $condition)
    {
        $query = Tag::query();

        if ($condition->searchQuestion) {
            $query->where('name', 'LIKE', '%' . $condition->searchQuestion . '%');
        }

        if ($condition->searchAnswer) {
            $query->where('price', '=', $condition->searchAnswer);
        }

        return $query->paginate();
    }
}
