<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSetsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('product_sets')->insert([
            ['name' => 'Tech Bundle', 'description' => 'A bundle of popular tech items', 'price' => 499.99],
            ['name' => 'Apparel Combo', 'description' => 'Combo of fashion items', 'price' => 59.99],
        ]);
    }
}
