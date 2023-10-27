<?php

namespace Database\Seeders;

use App\Services\QuestionService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

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
        DB::table('questions')->truncate();
        DB::statement('SET foreign_key_checks=1;');

        $this->import();
        $data = [];
        // foreach(range(1,30) as $num) {
        //     $data[] = [
        //         'question' => '質問'.$num.'-'.uniqid(),
        //         'correct_answer' => '正答',
        //         'wrong_answer1' => '誤答1',
        //         'wrong_answer2' => '誤答2',
        //         'wrong_answer3' => '誤答3',
        //         'wrong_answer4' => '誤答4',
        //         'category' => ($num % 4),
        //         'visible' => ($num % 5 !== 0),
        //         'updated_at' => Carbon::now(), 
        //         'created_at' => Carbon::now()
        //     ];
        // }

        DB::table('questions')->insert($data);
    }

    private function import()
    {
        $filePath = storage_path('app/public/questions.csv');

        $questionService = new QuestionService();
        $questionService->importCsv($filePath);
    }
}
