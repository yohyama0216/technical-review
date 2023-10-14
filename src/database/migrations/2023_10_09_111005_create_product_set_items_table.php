<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductSetItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_set_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_set_id');
            $table->unsignedBigInteger('product_id');
            $table->unsignedInteger('quantity');

            $table->timestamps();

            $table->foreign('product_set_id')->references('id')->on('product_sets')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_set_items');
    }
}
