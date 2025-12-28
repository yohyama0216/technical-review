<?php

namespace Tests\Unit\Services;

use App\Services\SettingsService;
use Tests\TestCase;

class SettingsServiceTest extends TestCase
{
    private SettingsService $settingsService;

    #[\Override]
    protected function setUp(): void
    {
        parent::setUp();
        $this->settingsService = app(SettingsService::class);
    }

    public function test_get_settings_returns_array(): void
    {
        $settings = $this->settingsService->getSettings();
        $this->assertIsArray($settings);
    }

    public function test_get_current_genre_returns_string(): void
    {
        $genre = $this->settingsService->getCurrentGenre();
        $this->assertIsString($genre);
        $this->assertContains($genre, ['technical', 'vocabulary']);
    }

    public function test_get_available_genres_returns_array(): void
    {
        $genres = $this->settingsService->getAvailableGenres();
        $this->assertIsArray($genres);
        $this->assertArrayHasKey('technical', $genres);
        $this->assertArrayHasKey('vocabulary', $genres);
    }

    public function test_set_current_genre_changes_genre(): void
    {
        $originalGenre = $this->settingsService->getCurrentGenre();
        $newGenre = $originalGenre === 'technical' ? 'vocabulary' : 'technical';

        $this->settingsService->setCurrentGenre($newGenre);
        $currentGenre = $this->settingsService->getCurrentGenre();

        $this->assertEquals($newGenre, $currentGenre);

        // Restore original
        $this->settingsService->setCurrentGenre($originalGenre);
    }

    public function test_get_target_date_returns_string_or_null(): void
    {
        $targetDate = $this->settingsService->getTargetDate();
        $this->assertTrue(is_string($targetDate) || is_null($targetDate));
    }

    public function test_set_target_date_updates_date(): void
    {
        $date = '2025-12-31';
        $this->settingsService->setTargetDate($date);
        $retrievedDate = $this->settingsService->getTargetDate();

        $this->assertEquals($date, $retrievedDate);
    }

    public function test_settings_persist_after_multiple_changes(): void
    {
        $this->settingsService->setCurrentGenre('technical');
        $this->settingsService->setTargetDate('2025-12-25');

        $settings = $this->settingsService->getSettings();

        $this->assertEquals('technical', $settings['currentGenre']);
        $this->assertEquals('2025-12-25', $settings['targetDate']);
    }

    public function test_set_target_date_accepts_null(): void
    {
        $this->settingsService->setTargetDate(null);
        $targetDate = $this->settingsService->getTargetDate();

        $this->assertNull($targetDate);
    }

    public function test_get_settings_contains_required_keys(): void
    {
        $settings = $this->settingsService->getSettings();

        $this->assertArrayHasKey('currentGenre', $settings);
        $this->assertArrayHasKey('targetDate', $settings);
    }
}
