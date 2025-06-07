@extends('front.layouts.app')

@section('content')
<div class="container py-4">
    <h1 class="mb-4">記事一覧</h1>
    @foreach($articles as $article)
        <div class="card mb-3">
            <div class="card-body">
                <h2 class="card-title">{{ $article['title'] }}</h2>
                <p class="card-text">{{ $article['body'] }}</p>
                <a href="{{ route('article.show', $article['id']) }}" class="btn btn-primary">続きを読む</a>
            </div>
            <div class="card-footer text-muted">
                カテゴリ: <a href="{{ route('article.category', $article['category']) }}">{{ $article['category'] }}</a> | 投稿日: {{ $article['date'] }}
            </div>
        </div>
    @endforeach
</div>
@endsection 