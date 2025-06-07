@extends('front.layouts.app')

@section('content')
<div class="container py-4">
    <h1 class="mb-4">お問い合わせ</h1>
    <form>
        <div class="mb-3">
            <label for="name" class="form-label">お名前</label>
            <input type="text" class="form-control" id="name" name="name" required>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">メールアドレス</label>
            <input type="email" class="form-control" id="email" name="email" required>
        </div>
        <div class="mb-3">
            <label for="message" class="form-label">お問い合わせ内容</label>
            <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">送信する</button>
        <a href="{{ route('article.index') }}" class="btn btn-secondary">戻る</a>
    </form>
</div>
@endsection 