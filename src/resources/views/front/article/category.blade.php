@extends('front.layouts.app')

@section('content')
<div class="container py-4">
    <h1 class="mb-4">カテゴリ: {{ $category }}</h1>
    @forelse($articles as $article)
        <div class="card mb-3">
            <div class="card-body">
                <h2 class="card-title">{{ $article['title'] }}</h2>
                <p class="card-text">{{ $article['body'] }}</p>
                <a href="{{ route('article.show', $article['id']) }}" class="btn btn-primary">続きを読む</a>
            </div>
            <div class="card-footer text-muted">
                投稿日: {{ $article['date'] }}
            </div>
        </div>
    @empty
        <p>このカテゴリの記事はありません。</p>
    @endforelse
    <a href="{{ route('article.index') }}" class="btn btn-secondary">記事一覧へ戻る</a>
</div>
@endsection 