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

    public function test_start_quiz_by_id_loads_specific_question(): void
    {
        // Get a valid question ID first
        $response = $this->getJson(route('api.quiz.next'));
        $questionId = $response->json('question.id');

        $response = $this->get(route('quiz.start.id', ['id' => $questionId]));
        $response->assertStatus(200);
        $response->assertViewIs('quiz.quiz');
    }

    public function test_start_quiz_by_invalid_id_redirects_with_error(): void
    {
        $response = $this->get(route('quiz.start.id', ['id' => 999999]));
        $response->assertRedirect(route('quiz.question-list'));
        $response->assertSessionHas('error');
    }

    public function test_submit_answer_without_question_returns_error(): void
    {
        $response = $this->postJson(route('api.quiz.answer'), [
            'answer' => 0,
        ]);

        $response->assertStatus(404);
        $response->assertJson(['error' => '問題が見つかりません']);
    }

    public function test_save_settings_with_category_redirects_to_index(): void
    {
        $response = $this->post(route('quiz.settings.save'), [
            'category' => 'vocabulary',
        ]);

        $response->assertRedirect(route('quiz.index'));
        $response->assertSessionHas('success', 'カテゴリを変更しました');
    }

    public function test_save_settings_without_category_redirects_to_stats(): void
    {
        $response = $this->post(route('quiz.settings.save'), [
            'target_date' => '2025-12-31',
        ]);

        $response->assertRedirect(route('quiz.stats'));
        $response->assertSessionHas('success', '目標日を保存しました');
    }

    public function test_question_list_with_search_filters_results(): void
    {
        $response = $this->get(route('quiz.question-list', ['search' => 'test']));
        $response->assertStatus(200);
        $response->assertViewIs('quiz.question-list');
    }

    public function test_question_list_with_status_filter(): void
    {
        $response = $this->get(route('quiz.question-list', ['status' => 'completed']));
        $response->assertStatus(200);
        $response->assertViewIs('quiz.question-list');
    }

    public function test_reset_statistics_endpoint(): void
    {
        $response = $this->postJson(route('api.statistics.reset'));
        $response->assertStatus(200);
    }
}
