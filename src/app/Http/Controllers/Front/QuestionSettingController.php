<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\QuestionSetting;

class QuestionSettingController extends Controller
{
    public function edit()
    {
        //$setting = auth()->user()->questionSetting;
        $setting = QuestionSetting::where('user_id', 1)->get();
        $setting = $setting[0];
        // dd($setting);
        return view('front.settings.edit', compact('setting'));
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'random_order' => 'required|boolean',
            'question_limit' => 'required|integer|min:1'
        ]);

        auth()->user()->questionSetting->update($data);

        return redirect()->back()->with('success', '設定を更新しました。');
    }
}
