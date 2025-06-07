@extends('front.layouts.app')

@section('content')
<div class="container py-4">
    <div class="row mb-4">
        <div class="col-12 text-center">
            <h1 class="display-4">My Blog</h1>
            <p class="lead">ようこそ、サンプルブログへ！</p>
        </div>
    </div>
    <div class="row">
        <!-- メイン記事リスト -->
        <div class="col-md-8">
            <div class="card mb-4">
                <div class="card-body">
                    <h2 class="card-title">ダミー記事タイトル1</h2>
                    <p class="card-text">これはダミー記事1の本文です。ブログの内容がここに表示されます。</p>
                    <a href="#" class="btn btn-primary">続きを読む</a>
                </div>
                <div class="card-footer text-muted">2024-06-01 投稿</div>
            </div>
            <div class="card mb-4">
                <div class="card-body">
                    <h2 class="card-title">ダミー記事タイトル2</h2>
                    <p class="card-text">これはダミー記事2の本文です。ブログの内容がここに表示されます。</p>
                    <a href="#" class="btn btn-primary">続きを読む</a>
                </div>
                <div class="card-footer text-muted">2024-05-28 投稿</div>
            </div>
            <div class="card mb-4">
                <div class="card-body">
                    <h2 class="card-title">ダミー記事タイトル3</h2>
                    <p class="card-text">これはダミー記事3の本文です。ブログの内容がここに表示されます。</p>
                    <a href="#" class="btn btn-primary">続きを読む</a>
                </div>
                <div class="card-footer text-muted">2024-05-20 投稿</div>
            </div>
        </div>
        <!-- サイドバー -->
        <div class="col-md-4">
            <div class="card mb-4">
                <div class="card-header">プロフィール</div>
                <div class="card-body text-center">
                    <img src="https://via.placeholder.com/100" class="rounded-circle mb-2" alt="プロフィール画像">
                    <h5 class="card-title">管理人</h5>
                    <p class="card-text">サンプルブログの管理人です。よろしくお願いします。</p>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-header">カテゴリ</div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">お知らせ</li>
                    <li class="list-group-item">日記</li>
                    <li class="list-group-item">技術</li>
                </ul>
            </div>
        </div>
    </div>
</div>
@endsection
