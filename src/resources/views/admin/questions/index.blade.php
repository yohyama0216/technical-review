@extends('admin.layouts.app')

@section('content')

<div class="mb-4">
    <h2>質問管理</h2>
    
    <!-- 検索フォーム -->
    <form class="d-flex" method="GET" action="{{ route('questions.index') }}">
        <input class="form-control me-2" type="search" placeholder="質問内容で検索" name="searchQuestion" value="{{ request('searchQuestion') }}">
        <button class="btn btn-outline-primary" type="submit">検索</button>
    </form>
</div>
<!-- タグ一覧 -->
<div class="mb-3">
    <a href="/questions?searchQuestion=アルゴリズム" class="btn btn-sm btn-info me-2">アルゴリズム</a>
    <a href="/questions?searchQuestion=キャッシュ" class="btn btn-sm btn-info me-2">キャッシュ</a>
    <a href="/questions?searchQuestion=木" class="btn btn-sm btn-info">木</a>
</div>
@if (session('status'))
    <div class="alert alert-success">
        {{ session('status') }}
    </div>
@endif
@if($questions->isEmpty())
    <p>質問がありません。</p>
@else
<table class="table table-fixed">
    <colgroup>
        <col style="width: 5%;">
        @auth
        <col style="width: 10%;">   
        @endauth
        <!-- <col style="width: 10%;"> -->
        <col>
        <col style="width: 20%;">
        <col style="width: 20%;">
    </colgroup>
    <thead>
        <tr>
            <th>ID</th>
            @auth
            <th>編集</th>
            @endauth
            <!-- <th>難易度</th> -->
            <th>質問内容</th>
            <th>更新日</th>
            <th>追加日</th>
        </tr>
    </thead>
    <tbody>
        @foreach($questions as $question)
        <tr>
            <td>{{ $question->id }}</td>
            @auth
            <td>
                <!-- 削除ボタンの追加 -->
                <form action="{{ route('questions.destroy', $question) }}" method="POST" onsubmit="return confirm('本当に削除しますか？');" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-sm btn-danger">削除</button>
                </form>
                <a href="{{ route('questions.edit', $question) }}" class="btn btn-sm btn-warning">編集</a>
            </td>
            @endauth
            <!-- <td>{{ $question->difficulty == 0 ? 'ー' : $question->difficulty }}</td> -->
            <td>
                @auth
                @if($question->is_hidden)
                    <span class="badge bg-danger">非表示</span>
                @else
                    <span class="badge bg-success">表示</span>
                @endif
                @endauth
                <a href="{{ route('questions.show', $question) }}">{{ mb_strlen($question->question) > 40 ? mb_substr($question->question, 0, 40) . '...' : $question->question }}</a>
            </td>
            <td>{{ $question->created_at->format('Y-m-d H:i:s') }}</td>
            <td>{{ $question->updated_at->format('Y-m-d H:i:s') }}</td>
        </tr>
        @endforeach
    </tbody>
</table>

<!-- ページネーション -->
{{ $questions->links('vendor.pagination.bootstrap-4') }}
@endif

@endsection
