<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->colorName . ' ' . $this->faker->word,
            'description' => $this->faker->sentence,
            'price' => $this->faker->randomFloat(2, 1, 1000),  // ランダムな金額を生成
            'stock' => $this->faker->numberBetween(1, 100), // 在庫数を1から100の間でランダムに生成
            'category_id' => $this->faker->numberBetween(1, 4) // 仮のカテゴリIDを生成
        ];
    }
}
