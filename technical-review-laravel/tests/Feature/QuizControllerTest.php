<?php

namespace Tests\Feature;

use Tests\TestCase;

class QuizControllerTest extends TestCase
{
    public function test_index_page_loads_successfully(): void
    {
        $response = $this->get(route('quiz.index'));
        $response->assertStatus(200);
        $response->assertViewIs('quiz.index');
    }

    public function test_question_list_page_loads_successfully(): void
    {
        $response = $this->get(route('quiz.question-list'));
        $response->assertStatus(200);
        $response->assertViewIs('quiz.question-list');
    }

    public function test_stats_page_loads_successfully(): void
    {
        $response = $this->get(route('quiz.stats'));
        $response->assertStatus(200);
        $response->assertViewIs('quiz.stats');
    }

    public function test_settings_page_loads_successfully(): void
    {
        $response = $this->get(route('quiz.settings'));
        $response->assertStatus(200);
        $response->assertViewIs('quiz.settings');
    }

    public function test_start_quiz_loads_successfully(): void
    {
        $response = $this->get(route('quiz.start'));
        $response->assertStatus(200);
    }

    public function test_save_settings_redirects_with_success(): void
    {
        $response = $this->post(route('quiz.settings.save'), [
            'category' => 'technical',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');
    }

    public function test_submit_answer_returns_json(): void
    {
        // Start a quiz first to get a question
        $this->get(route('quiz.start'));

        $response = $this->postJson(route('api.quiz.answer'), [
            'answer' => 0,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'isCorrect',
            'correctAnswer',
            'explanation',
            'answers',
        ]);
    }

    public function test_get_next_question_returns_json(): void
    {
        $response = $this->getJson(route('api.quiz.next'));

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'question' => [
                'id',
                'question',
                'answers',
            ],
        ]);
    }
}
