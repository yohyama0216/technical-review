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
            $table->string('question');   // 質問の内容
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
