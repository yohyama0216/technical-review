<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;

return RectorConfig::configure()
    ->withPaths([
        __DIR__.'/app',
    ])
    ->withSkip([
        __DIR__.'/app/Http/Middleware',
        __DIR__.'/app/Exceptions',
    ])
    ->withPhpSets(php82: true);
