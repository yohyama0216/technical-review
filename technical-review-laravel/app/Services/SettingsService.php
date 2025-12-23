<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class SettingsService
{
    private const SETTINGS_FILE = 'settings.json';

    /**
     * Get all settings
     */
    public function getSettings(): array
    {
        if (!Storage::exists(self::SETTINGS_FILE)) {
            return $this->getDefaultSettings();
        }

        $content = Storage::get(self::SETTINGS_FILE);
        $data = json_decode($content, true);

        return $data ?? $this->getDefaultSettings();
    }

    /**
     * Get default settings
     */
    private function getDefaultSettings(): array
    {
        return [
            'targetDate' => null,
        ];
    }

    /**
     * Save settings
     */
    public function saveSettings(array $settings): void
    {
        Storage::put(self::SETTINGS_FILE, json_encode($settings, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }

    /**
     * Get target date
     */
    public function getTargetDate(): ?string
    {
        $settings = $this->getSettings();
        return $settings['targetDate'] ?? null;
    }

    /**
     * Set target date
     */
    public function setTargetDate(?string $date): void
    {
        $settings = $this->getSettings();
        $settings['targetDate'] = $date;
        $this->saveSettings($settings);
    }
}
