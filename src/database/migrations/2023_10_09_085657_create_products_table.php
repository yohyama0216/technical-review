<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // ID
            $table->unsignedBigInteger('category_id'); // 商品カテゴリID (外部キー)
            $table->string('name'); // 商品名
            $table->text('description')->nullable(); // 商品の説明 (任意)
            $table->decimal('price', 8, 2); // 価格
            $table->integer('stock')->default(0);; // 在庫数
            $table->timestamps(); // created_at, updated_at

            // 外部キー制約
            $table->foreign('category_id')
                  ->references('id')->on('product_categories')
                  ->onDelete('cascade'); // カテゴリが削除されたら、関連する商品も削除
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}
