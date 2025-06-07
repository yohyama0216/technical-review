@extends('front.layouts.app')

@section('content')
<div class="container py-4">
    <h1 class="mb-4">記事投稿</h1>
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <form method="POST" action="{{ route('article.store') }}">
        @csrf
        <div class="mb-3">
            <label for="title" class="form-label">タイトル</label>
            <input type="text" class="form-control" id="title" name="title" required value="{{ old('title') }}">
        </div>
        <div class="mb-3">
            <label for="category" class="form-label">カテゴリ</label>
            <select class="form-select" id="category" name="category">
                <option>お知らせ</option>
                <option>日記</option>
                <option>技術</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="body" class="form-label">本文</label>
            <textarea class="form-control" id="body" name="body" rows="5" required>{{ old('body') }}</textarea>
        </div>
        <button type="submit" class="btn btn-primary">投稿する</button>
        <a href="{{ route('article.index') }}" class="btn btn-secondary">戻る</a>
    </form>
</div>
@endsection 