<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->text('question');   // 質問の内容
            $table->text('answer');     // 質問の回答
            $table->boolean('is_hidden')->default(false);  // 非表示フラグ
            $table->timestamps();       // created_at と updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
