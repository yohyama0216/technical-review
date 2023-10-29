<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;

class TopController extends Controller
{
    public function index()
    {
        $setting = ''; // todo
        return view('front.top.index', compact('setting'));
    }
}
