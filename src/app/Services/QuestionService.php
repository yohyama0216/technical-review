<?php

namespace App\Services;

use App\Models\Question;
use App\Models\QuestionSetting;
use App\Services\Conditions\QuestionFilterCondition;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Exception;

class QuestionService
{
    public function getQuestionsForLearning()
    {
        $setting = QuestionSetting::where('user_id', 1)->first(); 
        $questions = Question::limit($setting->question_limit)->get();
        //dd($questions);
        return $questions;
    }

    public function searchQuestions(QuestionFilterCondition $condition)
    {
        $query = Question::query();

        if ($condition->searchQuestion) {
            $query->where('question', 'LIKE', '%' . $condition->searchQuestion . '%');
        }

        if ($condition->searchAnswer) {
            $query->where('answer', 'LIKE', '%' . $condition->searchAnswer . '%');
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

        $questions = [];
        while ($row = fgetcsv($file)) {
            $question = [
                'question' => $row[0]
            ];
            $tmp = [];
            foreach(range(1,5) as $num) {
                if ($num == $row[6]) {
                    $question['correct_answer'] = $row[$num];
                } else {
                    $tmp[] = $row[$num]; 
                }
            }
            foreach($tmp as $key => $item){
                $label = 'wrong_answer'.($key + 1);
                $question[$label] = $item;
            }
            $question['category'] = $this->getCategory($row[0]);
            $question['created_at'] = Carbon::now();
            $question['updated_at'] = Carbon::now();
            $questions[] = $question;;
        }
    
        fclose($file);

        DB::beginTransaction();
        try {
            Question::insertOrIgnore($questions);
            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            throw $e;
        }
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