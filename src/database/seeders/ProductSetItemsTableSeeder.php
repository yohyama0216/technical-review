<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSetItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // 仮のデータで、セット商品IDと商品IDの関係を示しています。
        // この関係は、実際のデータベースの内容に基づくものではないので、適切に調整してください。

        DB::table('product_set_items')->insert([
            ['product_set_id' => 1, 'product_id' => 1], // Tech BundleにSmartphoneを追加
            ['product_set_id' => 1, 'product_id' => 3], // Tech BundleにCoffee Makerを追加
            ['product_set_id' => 2, 'product_id' => 2], // Apparel ComboにT-shirtを追加
        ]);
    }
}
