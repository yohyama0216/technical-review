<?php

namespace Database\Seeders;

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
        DB::table('questions')->truncate();
        DB::table('tags')->truncate();
        DB::statement('SET foreign_key_checks=1;');

        $this->import();

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
        foreach ($lines as $line) {
            // それぞれの行を質問としてデータベースに保存
            DB::table('questions')->insert([
                ['question' => $line,'updated_at' => Carbon::now(), 'created_at' => Carbon::now()],  
            ]);
        }
    }
}
