<?php

namespace App\Services;

use App\Models\Question;
use App\Models\Setting;
use App\Services\Conditions\QuestionFilterCondition;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Exception;

class QuestionService
{
    public function getQuestionsForLearning()
    {
        $setting = Setting::where('user_id', 1)->first(); 
        // setting無い場合は？
        $questions = Question::with('answers')->limit($setting->question_limit)->get();
        //dd($questions);
        //var_dump($questions);
        // そのままだと正答と誤答の選択肢が一つの配列になっていないため、bladeで整形処理が必要になる。
        return $questions;
    }

    public function filterQuestions(QuestionFilterCondition $condition)
    {
        $query = Question::query();

        if ($condition->filterQuestion) {
            $query->where('question', 'LIKE', '%' . $condition->filterQuestion . '%');
        }

        if ($condition->filterAnswer) {
            $query->where('answer', 'LIKE', '%' . $condition->filterAnswer . '%');
        }
        return $query->paginate();
    }

    public function getQuestionById($id)
    {
        return Question::find($id);
    }

    public function update($id, $data)
    {
        $question = $this->getQuestionById($id);
        $question->update($data);
    }

    public function createQuestion($data)
    {
        return Question::create($data);
    }

    public function delete(Question $question)
    {
        $question->delete();
    }

    public function importCsv($filePath)
    {
        // ファイルが存在しない場合は処理を終了
        if (!file_exists($filePath)) {
            echo 'not found';
            return;
        }
        
        // 質問,選択肢1,選択肢2,選択肢3,選択肢4,選択肢5,正答の番号
        $file = fopen($filePath, 'r');
        //$header = fgetcsv($file);  // Assuming first row contains header

        $line = 1;
        while ($row = fgetcsv($file)) {
            $line++;
            if (count($row) != 7) {
                echo $line++ . '行目　データ異常：いずれかの項目が空です。'.PHP_EOL;
                continue;
            }

            
            $question = Question::create([
                'question' => $row[0],
                'category' => $this->getCategory($row[0]),
            ]);

            // 正答と誤答を追加
            foreach(range(1,5) as $num) {
                $question->answers()->create([
                    'content' => $row[$num],
                    'is_correct' => ($num == $row[6]),
                ]);
            }
        }
    
        fclose($file);
    }

    public function getCategory($text)
    {
        if($this->existsKeyword($text, ['法','組織','条例'])) {
            return 1;
        } else if ($this->existsKeyword($text, ['物質','蒸気','固体','気体','液体','酸素','水素'])) {
            return 2;
        } else if ($this->existsKeyword($text,['行動','対応','保管','消火','爆発','漏れた'.'入れた','飲んだ','毒性','危険物','可燃','予防','性状','引火','発火','火災','比重'])) {
            return 3;
        } else {
            return 0;
        }
    }

    private function existsKeyword($text, $keywords)
    {
        foreach($keywords as $keyword) {
            if (str_contains($text,$keyword)) {
                return true;
            }
        }
        return false;
    }
}