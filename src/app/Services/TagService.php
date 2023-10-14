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

        if ($condition->searchName) {
            $query->where('name', 'LIKE', '%' . $condition->searchName . '%');
        }

        if ($condition->searchPrice) {
            $query->where('price', '=', $condition->searchPrice);
        }

        return $query->paginate();
    }
}
