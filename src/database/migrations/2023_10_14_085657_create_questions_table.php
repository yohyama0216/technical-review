<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateQuestionsTable extends Migration
{
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->text('question');   // 質問の内容
            $table->text('answer');     // 質問の回答
            $table->tinyInteger('difficulty')->default(0);     // 質問の回答
            $table->boolean('is_hidden')->default(false);  // 非表示フラグ
            $table->timestamps();       // created_at と updated_at
        });
    }

    public function down()
    {
        DB::statement('SET foreign_key_checks=0;');
        Schema::dropIfExists('questions');
        DB::statement('SET foreign_key_checks=1;');
    }
}
