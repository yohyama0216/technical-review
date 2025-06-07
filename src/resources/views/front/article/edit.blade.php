@extends('front.layouts.app')

@section('content')
<div class="container py-4">
    <h1 class="mb-4">記事編集</h1>
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <form method="POST" action="{{ route('article.update', $article->id) }}">
        @csrf
        @method('PATCH')
        <div class="mb-3">
            <label for="title" class="form-label">タイトル</label>
            <input type="text" class="form-control" id="title" name="title" value="{{ old('title', $article->title) }}" required>
        </div>
        <div class="mb-3">
            <label for="category" class="form-label">カテゴリ</label>
            <select class="form-select" id="category" name="category">
                <option {{ old('category', $article->category) == 'お知らせ' ? 'selected' : '' }}>お知らせ</option>
                <option {{ old('category', $article->category) == '日記' ? 'selected' : '' }}>日記</option>
                <option {{ old('category', $article->category) == '技術' ? 'selected' : '' }}>技術</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="body" class="form-label">本文</label>
            <textarea class="form-control" id="body" name="body" rows="5" required>{{ old('body', $article->body) }}</textarea>
        </div>
        <button type="submit" class="btn btn-primary">更新する</button>
        <a href="{{ route('article.index') }}" class="btn btn-secondary">戻る</a>
    </form>
</div>
@endsection 