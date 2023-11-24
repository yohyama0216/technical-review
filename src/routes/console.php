<?php

use App\Models\Xml\WpXml;
use Illuminate\Support\Carbon;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('mycommand:auto-wordpress', function () {
    $this->info(Carbon::now().' Start Generating...');
    $wpxml = new WpXml('career');
    $wpxml->createContent();
    $wpxml->save();
    $path = $wpxml->getPutFilePath();
    $this->info(Carbon::now().' Complete. '.$path);
})->describe('This is a custom command for demonstration purposes');