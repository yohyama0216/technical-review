<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use App\Services\SettingService;

class SettingController extends Controller
{
    protected $settingService;

    public function __construct(SettingService $service)
    {
        $this->settingService = $service;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {        
        $id = 1;
        $setting = $this->settingService->getQuestionById($id);
        return view('front.setting.edit', ['setting' => $setting]);
    }

    public function update(Request $request)
    {
        // validate クラス使えたような
        $data = $request->validate([
            // 'random_order' => 'required|boolean',
            'question_limit' => 'required|integer|min:1'
        ]);
        $this->settingService->update($data);

        return redirect()->back()->with('success', '設定を更新しました。');
    }
}
