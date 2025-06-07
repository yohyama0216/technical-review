<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;
use App\Models\User;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // すべてのユーザーに対してデフォルトの出題設定を作成
        $users = User::all();
        foreach ($users as $user) {
            Setting::create([
                'user_id' => $user->id,
                'question_limit' => 10, // 例: デフォルトでの出題数を10問とする
                'order_type' => 1, // 出題タイプ
            ]);
        }
    }
}
