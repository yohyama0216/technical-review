<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Models\Xml\WpXml;
use Illuminate\Http\Request;

class WordPressController extends Controller
{
    public function index()
    {
        return view('wp_import_file.input');
    }

    public function generate(Request $request)
    {
        $wpxml = new WpXml('career');
        $wpxml->createContent();
        $wpxml->save();
        $path = $wpxml->getPutFilePath();
        
        $mimeType = Storage::mimeType($path);
        $headers = [['Content-Type' => $mimeType]];
        return response()->download(Storage::path($path),$wpxml->getFilename(), $headers)->deleteFileAfterSend();
    }
}