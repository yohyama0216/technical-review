<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>自動化支援ツール</title>

        <!-- Fonts -->
        
        <!-- Styles -->
        <style>
        </style>
    </head>
    <body class="antialiased">
        <div>
            <h1>生成条件入力画面</h1>
            <section>
                <form method="POST" action="/wp_import_file">
                    @error('titles')
                        {{ $message }}
                    @enderror
                    <p>記事タイトル：<textarea name="titles" cols="50" rows="5"></textarea>
                    <p><input type="submit" value="送信する"></p>
                    <input type="reset" value="取消する">
                    @csrf
                </form>
            <section>
            <section>
            <a href="/">トップ</a>
            <section>
            // title使わない？　その場合あラジオボタン？
            // 文章生成
            // 記事のhtmlのテンプレート化
            // ログ
            // titleから記事生成
            // エクスポート
        </div>
    </body>
</html>
