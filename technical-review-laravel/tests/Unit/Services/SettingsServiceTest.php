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

    public function test_get_current_category_returns_string(): void
    {
        $category = $this->settingsService->getCurrentCategory();
        $this->assertIsString($category);
        $this->assertContains($category, ['technical', 'vocabulary']);
    }

    public function test_get_available_categories_returns_array(): void
    {
        $categories = $this->settingsService->getAvailableCategories();
        $this->assertIsArray($categories);
        $this->assertArrayHasKey('technical', $categories);
        $this->assertArrayHasKey('vocabulary', $categories);
    }

    public function test_set_current_category_changes_category(): void
    {
        $originalCategory = $this->settingsService->getCurrentCategory();
        $newCategory = $originalCategory === 'technical' ? 'vocabulary' : 'technical';

        $this->settingsService->setCurrentCategory($newCategory);
        $currentCategory = $this->settingsService->getCurrentCategory();

        $this->assertEquals($newCategory, $currentCategory);

        // Restore original
        $this->settingsService->setCurrentCategory($originalCategory);
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
        $this->settingsService->setCurrentCategory('technical');
        $this->settingsService->setTargetDate('2025-12-25');
        
        $settings = $this->settingsService->getSettings();
        
        $this->assertEquals('technical', $settings['currentCategory']);
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
        
        $this->assertArrayHasKey('currentCategory', $settings);
        $this->assertArrayHasKey('targetDate', $settings);
    }
}
