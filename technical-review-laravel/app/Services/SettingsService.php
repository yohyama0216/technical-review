<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use RuntimeException;

class SettingsService
{
    private const SETTINGS_FILE = 'settings.json';

    private StatisticsService $statisticsService;

    public function __construct(StatisticsService $statisticsService)
    {
        $this->statisticsService = $statisticsService;
    }

    /**
     * Get all settings from settings.json
     *
     * @return array<string, mixed>
     */
    private function getSettingsData(): array
    {
        if (! Storage::exists(self::SETTINGS_FILE)) {
            return [
                'currentGenre' => 'technical',
                'targetDate' => null,
            ];
        }

        $content = Storage::get(self::SETTINGS_FILE);
        $data = json_decode($content, true);

        return $data ?? [
            'currentGenre' => 'technical',
            'targetDate' => null,
        ];
    }

    /**
     * Save settings to settings.json
     *
     * @param  array<string, mixed>  $data
     */
    private function saveSettingsData(array $data): void
    {
        $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        if ($json === false) {
            throw new RuntimeException('Failed to encode settings data to JSON');
        }
        Storage::put(self::SETTINGS_FILE, $json);
    }

    /**
     * Get all settings
     *
     * @return array<string, mixed>
     */
    public function getSettings(): array
    {
        return [
            'targetDate' => $this->getTargetDate(),
            'currentGenre' => $this->getCurrentGenre(),
        ];
    }

    /**
     * Get target date
     */
    public function getTargetDate(): ?string
    {
        // Try genre-specific learningLog first, then settings.json
        $genreTargetDate = $this->statisticsService->getTargetDate();
        if ($genreTargetDate) {
            return $genreTargetDate;
        }

        $settings = $this->getSettingsData();

        return $settings['targetDate'] ?? null;
    }

    /**
     * Set target date
     */
    public function setTargetDate(?string $date): void
    {
        $this->statisticsService->setTargetDate($date);
    }

    /**
     * Get current genre
     */
    public function getCurrentGenre(): string
    {
        $settings = $this->getSettingsData();

        return $settings['currentGenre'] ?? 'technical';
    }

    /**
     * Set current genre
     */
    public function setCurrentGenre(string $genre): void
    {
        $settings = $this->getSettingsData();
        $settings['currentGenre'] = $genre;
        $this->saveSettingsData($settings);
    }

    /**
     * Get available genres
     *
     * @return array<string, string>
     */
    public function getAvailableGenres(): array
    {
        return [
            'technical' => '技術面接',
            'vocabulary' => '英単語',
            'python' => 'Python資格',
        ];
    }
}
