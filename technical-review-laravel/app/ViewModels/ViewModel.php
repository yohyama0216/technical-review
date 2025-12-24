<?php

namespace App\ViewModels;

use Illuminate\Contracts\Support\Arrayable;

/**
 * @implements Arrayable<string, mixed>
 */
abstract class ViewModel implements Arrayable
{
    /**
     * Convert the view model to an array.
     */
    #[\Override]
    public function toArray(): array
    {
        return get_object_vars($this);
    }
}
