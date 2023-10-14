<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET foreign_key_checks=0;');
        DB::table('question_tag')->truncate();
        DB::table('questions')->truncate();
        DB::table('tags')->truncate();
        DB::statement('SET foreign_key_checks=1;');

        DB::table('questions')->insert([
            ['question' => '質問1', 'answer' => '回答1','updated_at' => Carbon::now(), 'created_at' => Carbon::now()], 
            ['question' => '質問2', 'answer' => '回答2','updated_at' => Carbon::now(), 'created_at' => Carbon::now()], 
        ]);

        DB::table('tags')->insert([
            ['name' => 'タグ1','updated_at' => Carbon::now(), 'created_at' => Carbon::now()], 
            ['name' => 'タグ2','updated_at' => Carbon::now(), 'created_at' => Carbon::now()], 
        ]);

        DB::table('question_tag')->insert([
            ['question_id' => '1','tag_id' => '1','updated_at' => Carbon::now(), 'created_at' => Carbon::now()],  
            ['question_id' => '2','tag_id' => '1','updated_at' => Carbon::now(), 'created_at' => Carbon::now()], 
            ['question_id' => '2','tag_id' => '2','updated_at' => Carbon::now(), 'created_at' => Carbon::now()],  
        ]);
    }
}
