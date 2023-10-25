<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateAnswerHistoriesTable extends Migration
{
    public function up()
    {

        
        Schema::create('learning_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('question_id');
            $table->boolean('is_correct'); // 正解かどうかのフラグ
            $table->timestamp('answered_at'); // 回答日時
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('question_id')->references('id')->on('questions');
        });
    }

    public function down()
    {
        Schema::dropIfExists('learning_histories');
    }
}
