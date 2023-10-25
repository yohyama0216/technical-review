<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestionSettingsTable extends Migration
{
    public function up()
    {
        Schema::create('question_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->tinyInteger('order_type')->default(1); // 例: 出題順をランダムにするかどうか
            $table->integer('question_limit')->default(10); // 例: 一度に表示する質問の最大数
            // 他の設定を追加できます
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('question_settings');
    }
}
