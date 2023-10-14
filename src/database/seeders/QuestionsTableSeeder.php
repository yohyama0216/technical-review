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
        DB::table('questions')->truncate();
        DB::table('questions')->insert([
            ['question' => '質問1', 'answer' => '回答1'], 
            ['question' => '質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1質問1', 'answer' => '回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1回答1'], 
        ]);
    }
}
