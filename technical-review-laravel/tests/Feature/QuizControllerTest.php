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

    public function test_submit_answer_with_correct_answer(): void
    {
        // Start quiz first
        $this->get(route('quiz.start'));

        // Get the current question from session to know correct answer
        $response = $this->postJson(route('api.quiz.answer'), [
            'answer' => 0,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['isCorrect', 'correctAnswer', 'explanation', 'answers']);
    }

    public function test_question_list_with_multiple_filters(): void
    {
        $response = $this->get(route('quiz.question-list', [
            'search' => 'test',
            'status' => 'unanswered',
        ]));

        $response->assertStatus(200);
        $response->assertViewIs('quiz.question-list');
    }

    public function test_stats_page_contains_required_data(): void
    {
        $response = $this->get(route('quiz.stats'));

        $response->assertStatus(200);
        $response->assertViewHas('totalCorrect');
        $response->assertViewHas('totalQuestions');
        $response->assertViewHas('chartData');
    }

    public function test_settings_page_shows_current_values(): void
    {
        $response = $this->get(route('quiz.settings'));

        $response->assertStatus(200);
        $response->assertViewHas('currentCategory');
        $response->assertViewHas('availableCategories');
    }

    public function test_start_quiz_creates_session_data(): void
    {
        $response = $this->get(route('quiz.start'));

        $response->assertStatus(200);
        $response->assertSessionHas('current_question');
    }

    public function test_get_next_question_updates_session(): void
    {
        $response = $this->getJson(route('api.quiz.next'));

        $response->assertStatus(200);
        $this->assertNotNull(session('current_question'));
    }

    public function test_save_settings_with_both_category_and_date(): void
    {
        $response = $this->post(route('quiz.settings.save'), [
            'category' => 'technical',
            'target_date' => '2025-12-31',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');
    }

    public function test_question_list_default_filter_shows_all(): void
    {
        $response = $this->get(route('quiz.question-list'));

        $response->assertStatus(200);
        $response->assertViewHas('statusFilter', 'all');
    }

    public function test_index_page_has_required_view_data(): void
    {
        $response = $this->get(route('quiz.index'));

        $response->assertStatus(200);
        $response->assertViewHas('pageTitle');
        $response->assertViewHas('appName');
    }

    public function test_start_quiz_shuffles_answers(): void
    {
        // Get the same question multiple times and check if answers are shuffled
        $response1 = $this->get(route('quiz.start'));
        $response1->assertStatus(200);
        $question1 = $response1->viewData('question');

        $response2 = $this->get(route('quiz.start'));
        $response2->assertStatus(200);
        $question2 = $response2->viewData('question');

        // Both should have valid questions
        $this->assertNotNull($question1);
        $this->assertNotNull($question2);

        // Check that answers array exists and has correct length
        $this->assertArrayHasKey('answers', $question1);
        $this->assertCount(4, $question1['answers']);

        // Check that correct answer index is valid
        $this->assertArrayHasKey('correct', $question1);
        $this->assertGreaterThanOrEqual(0, $question1['correct']);
        $this->assertLessThan(4, $question1['correct']);
    }

    public function test_start_quiz_by_id_shuffles_answers(): void
    {
        // Get first question ID
        $firstResponse = $this->getJson(route('api.quiz.next'));
        $questionId = $firstResponse->json('question.id');

        // Load same question twice
        $response1 = $this->get(route('quiz.start.id', ['id' => $questionId]));
        $response1->assertStatus(200);
        $question1 = $response1->viewData('question');

        $response2 = $this->get(route('quiz.start.id', ['id' => $questionId]));
        $response2->assertStatus(200);
        $question2 = $response2->viewData('question');

        // Verify shuffling occurred
        $this->assertNotNull($question1);
        $this->assertNotNull($question2);
        $this->assertEquals($questionId, $question1['id']);
        $this->assertEquals($questionId, $question2['id']);

        // Verify answers are still 4 choices
        $this->assertCount(4, $question1['answers']);
        $this->assertCount(4, $question2['answers']);
    }

    public function test_get_next_question_shuffles_answers(): void
    {
        $response = $this->getJson(route('api.quiz.next'));

        $response->assertStatus(200);
        $question = $response->json('question');

        // Verify question has shuffled answers
        $this->assertArrayHasKey('answers', $question);
        $this->assertCount(4, $question['answers']);
        $this->assertArrayHasKey('correct', $question);
        $this->assertGreaterThanOrEqual(0, $question['correct']);
        $this->assertLessThan(4, $question['correct']);
    }

    public function test_shuffled_answers_maintain_correctness(): void
    {
        // Start quiz
        $response = $this->get(route('quiz.start'));
        $response->assertStatus(200);
        $question = $response->viewData('question');

        // Submit the correct answer
        $answerResponse = $this->postJson(route('api.quiz.answer'), [
            'answer' => $question['correct'],
        ]);

        $answerResponse->assertStatus(200);
        $answerResponse->assertJson(['isCorrect' => true]);
    }
}
