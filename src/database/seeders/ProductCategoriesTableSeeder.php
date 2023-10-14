<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // カテゴリのサンプルデータ
        $categories = [
            ['name' => 'Electronics'],
            ['name' => 'Apparel'],
            ['name' => 'Home & Garden'],
            ['name' => 'Toys & Hobbies'],
        ];

        // データを挿入
        DB::table('product_categories')->insert($categories);
    }
}
