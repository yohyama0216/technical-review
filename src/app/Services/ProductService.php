<?php

namespace App\Services;

use App\Models\Product;
use App\Services\Conditions\SearchCondition;

class ProductService
{
    public function getAllProducts($paginate = 10)
    {
        return Product::paginate($paginate);
    }

    public function searchProducts(SearchCondition $condition)
    {
        $query = Product::query();

        if ($condition->searchName) {
            $query->where('name', 'LIKE', '%' . $condition->searchName . '%');
        }

        if ($condition->searchPrice) {
            $query->where('price', '=', $condition->searchPrice);
        }

        return $query->paginate();
    }
}
