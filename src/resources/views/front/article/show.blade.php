@extends('front.layouts.app')

@section('content')
<div class="container py-4">
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">{{ $article['title'] }}</h1>
            <div class="mb-2 text-muted">カテゴリ: <a href="{{ route('article.category', $article['category']) }}">{{ $article['category'] }}</a> | 投稿日: {{ $article['date'] }}</div>
            <p class="card-text">{{ $article['body'] }}</p>
            <a href="{{ route('article.index') }}" class="btn btn-secondary">記事一覧へ戻る</a>
        </div>
    </div>
</div>
@endsection 