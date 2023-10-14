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

@if($questions->isEmpty())
    <p>質問がありません。</p>
@else
<table class="table table-fixed">
    <colgroup>
        <col style="width: 5%;">
        <col style="width: 7.5%;">
        <col style="width: 7.5%;">
        <col style="width: 40%;">
        <col style="width: 40%;">
    </colgroup>
    <thead>
        <tr>
            <th>ID</th>
            <th>状態</th>
            <th>操作</th>
            <th>質問内容</th>
            <th>回答</th>
        </tr>
    </thead>
    <tbody>
        @foreach($questions as $question)
        <tr>
            <td>{{ $question->id }}</td>
            <td>
            @if($question->is_hidden)
                <span class="badge bg-danger">非表示</span>
            @else
                <span class="badge bg-success">表示</span>
            @endif
            </td>
            <td>
                <a href="{{ route('questions.edit', $question) }}" class="btn btn-sm btn-warning">編集</a>
                <!-- 削除ボタンや他の操作ボタンもここに追加 -->
            </td>
            <td>{{ mb_strlen($question->question) > 40 ? mb_substr($question->question, 0, 40) . '...' : $question->question }}</td>
            <td>{{ mb_strlen($question->answer) > 40 ? mb_substr($question->answer, 0, 40) . '...' : $question->answer }}</td>
        </tr>
        @endforeach
    </tbody>
</table>

<!-- ページネーション -->
{{ $questions->links('vendor.pagination.bootstrap-4') }}
@endif

@endsection
