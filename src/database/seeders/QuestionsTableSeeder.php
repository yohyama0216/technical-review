<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // DB::table('question_tag')->truncate();
        // DB::table('questions')->truncate();
        // DB::table('tags')->truncate();

        DB::table('questions')->insert([
            ['question' => '質問1', 'answer' => '回答1'], 
            ['question' => '質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1', 'answer' => '回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1'], 
        ]);

        DB::table('tags')->insert([
            ['name' => 'タグ1',], 
            ['name' => 'タグ2'], 
        ]);

        DB::table('question_tag')->insert([
            ['question_id' => '1','tag_id' => '1'], 
            ['question_id' => '2','tag_id' => '1'],
            ['question_id' => '2','tag_id' => '2'], 
        ]);
    }
}
