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
        DB::table('answers')->truncate();
        DB::table('questions')->truncate();
        DB::statement('SET foreign_key_checks=1;');

        $this->import();
    }

    private function import()
    {
        $filePath = storage_path('app/public/questions.csv');

        $questionService = new QuestionService();
        $questionService->importCsv($filePath);
    }
}
