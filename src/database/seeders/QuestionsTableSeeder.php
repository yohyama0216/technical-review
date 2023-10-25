<?php

namespace Database\Seeders;

use App\Services\TagService;
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
        DB::table('question_tag')->truncate();
        DB::statement('SET foreign_key_checks=1;');

        //$this->import();
        DB::table('questions')->insert([
            [
                'question' => '質問'.uniqid(),
                'correct_answer' => '正答',
                'wrong_answer1' => '誤答1',
                'wrong_answer2' => '誤答2',
                'wrong_answer3' => '誤答3',
                'wrong_answer4' => '誤答4',
                'visible' => true,
                'updated_at' => Carbon::now(), 
                'created_at' => Carbon::now()
            ],  
        ]);
    }

    private function import()
    {
        $filePath = storage_path('app/public/questions.txt');

        // ファイルが存在しない場合は処理を終了
        if (!file_exists($filePath)) {
            $this->command->info('File not found!');
            return;
        }

        // ファイルを行ごとに読み取る
        $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $key => $line) {
            // それぞれの行を質問としてデータベースに保存
            $id = $key + 1;
            // DB::table('questions')->insert([
            //     [
            //         'id' => $id, 
            //         'question' => $line,
            //         'correct_answer' => '正答',
            //         ''
            //         'updated_at' => Carbon::now(), 
            //         'created_at' => Carbon::now()],  
            // ]);
            // TagService::createTags($line);
            // foreach($tags as $tag) {
            //     DB::table('question_tags')->insert([
            //         ['question_id' => $id, ''updated_at' => Carbon::now(), 'created_at' => Carbon::now()],  
            //     ]);
            // }
        }
    }
}
