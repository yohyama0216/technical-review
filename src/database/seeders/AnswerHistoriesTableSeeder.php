<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class AnswerHistoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET foreign_key_checks=0;');    
        DB::table('learning_histories')->truncate();
        DB::statement('SET foreign_key_checks=1;');
        
        DB::table('learning_histories')->insert([
            [
                'question_id' => 1,
                'user_id' => 1,
                'is_correct' => 1,
                'updated_at' => Carbon::now(), 
                'created_at' => Carbon::now()
            ],  
        ]);
    }
}
