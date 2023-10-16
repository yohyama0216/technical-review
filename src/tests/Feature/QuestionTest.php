<?php

namespace Tests\Feature;

use App\Models\Question;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use Illuminate\Support\Facades\Route;

class QuestionTest extends TestCase
{
    use RefreshDatabase;  // データベースをリセット

    // public function test_question_index_loads_correctly()
    // {
    //     // 事前条件: ログインユーザーを作成
    //     // $user = User::factory()->create();
    //     // $this->actingAs($user);

    //     // アクション: 質問一覧ページにアクセス
    //     $response = $this->get(route('questions.index'));

    //     // 検証: ページが正常にロードされるか

    // }

    // public function test_questions_display_on_index()
    // {
    //     // 事前条件: ログインユーザーと質問を作成
    //     // $user = User::factory()->create();
    //     $question = Question::factory()->create();
    //     // $this->actingAs($user);

    //     // アクション: 質問一覧ページにアクセス

    


    //     // $this->assertEquals(url('/questions'), $response->baseResponse->headers->get('url'));
    //     // echo route('questions.index');
    //     // 検証: 質問がページに表示されているか
    //     // $response->assertSee($question->question);
    //     // $response->dump();
    // }

    // ... その他のテストケース
    // public function test_path_and_name_route()
    // {
    //     $pathAndNameRoute = [
    //         ['path' => 'login', 'nameRoute' => 'login.form', 'statusCode' => 200],
    //         ['path' => 'logout', 'nameRoute' => 'logout', 'statusCode' => 200],
    //         ['path' => 'questions', 'nameRoute' => 'questions.index', 'statusCode' => 200],
    //     ];

    //     foreach($pathAndNameRoute as $item) {

    //     }
    // }

    public function testMethodExistCheck()
    {
        $routes = Route::getRoutes();
        foreach ($routes as $route) {
            if(in_array($route->uri(),['sanctum/csrf-cookie','api/user']) || strpos($route->getName(), 'ignition') !== false) {
                continue ;
            }
            $methodName = 'test'.implode(array_map('ucfirst',explode('.',$route->getName())));
            
            if (!method_exists($this, $methodName)) {
                $this->markTestIncomplete($methodName.'() do not exist');
            }
            $this->assertTrue(method_exists($this, $methodName));
            // login.form - login - GET|HEAD<br/>
            // login - login - POST<br/>
            // logout - logout - GET|HEAD<br/>
            // questions.edit - questions/{question}/edit - GET|HEAD<br/>
            // questions.create - questions/create - GET|HEAD<br/>
            // questions.index - questions - GET|HEAD<br/>
            // questions.store - questions - POST<br/>
            // questions.show - questions/{question} - GET|HEAD<br/>
            // questions.update - questions/{question} - PUT|PATCH<br/>
            // questions.destroy - questions/{question} - DELETE<br/>
            // tags.index - tags - GET|HEAD<br/>
            // tags.create - tags/create - GET|HEAD<br/>
            // tags.store - tags - POST<br/>
            // tags.show - tags/{tag} - GET|HEAD<br/>
            // tags.edit - tags/{tag}/edit - GET|HEAD<br/>
            // tags.update - tags/{tag} - PUT|PATCH<br/>
            // tags.destroy - tags/{tag} - DELETE<br/>
        } 
    }

    public function testLoginForm()
    {
        $this->markTestIncomplete('@todo');
    }

    public function testLogin()
    {
        $this->markTestIncomplete('@todo');
    }

    public function testLogout()
    {
        $this->markTestIncomplete('@todo');
    }

    public function testQuestionsIndex()
    {
        $this->testPathAndNameRoute('questions','questions.index');
    }

    public function testQuestionsEdit()
    {
        $this->markTestIncomplete('@todo');
    }
    
    public function testQuestionsCreate()
    {
        $this->markTestIncomplete('@todo');
    }

    public function testQuestionsStore()
    {
        $this->markTestIncomplete('@todo');
    }

    public function testQuestionsShow()
    {
        $this->markTestIncomplete('@todo');
    }

    public function testQuestionsUpdate()
    {
        $this->markTestIncomplete('@todo');
    }

    public function testQuestionsDestroy()
    {
        $this->markTestIncomplete('@todo');
    }

    public function testTagsIndex()
    {
        $this->markTestIncomplete('@todo');
    }

    public function testTagsCreate()
    {
        $this->markTestIncomplete('@todo');
    }

    public function testTagsStore()
    {
        $this->markTestIncomplete('@todo');
    }

    public function testTagsShow()
    {
        $this->markTestIncomplete('@todo');
    }

    public function testTagsEdit()
    {
        $this->markTestIncomplete('@todo');
    }

    public function testTagsUpdate()
    {
        $this->markTestIncomplete('@todo');
    }

    public function testTagsDestroy()
    {
        $this->markTestIncomplete('@todo');
    }


    

    private function testPathAndNameRoute($path,$nameRoute)
    {
        $response = $this->get(route($nameRoute));
        $this->assertEquals($path, request()->path());
        $response->assertSuccessful();
    }
}
