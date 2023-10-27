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
            $table->string('question')->unique();   // 質問の内容
            $table->text('correct_answer');     // 質問の正答
            $table->text('wrong_answer1');     // 質問の誤答1
            $table->text('wrong_answer2');     // 質問の誤答2
            $table->text('wrong_answer3');     // 質問の誤答3
            $table->text('wrong_answer4');     // 質問の誤答4
            $table->tinyInteger('category'); // 分野
            $table->boolean('visible')->default(true);  // 非表示フラグ
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
