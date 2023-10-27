<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuestionSetting;

class TopController extends Controller
{
    public function index()
    {
        $setting = ''; // todo
        return view('top.index', compact('setting'));
    }
}
