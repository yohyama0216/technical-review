@extends('admin.layouts.app')

@section('content')

<div class="mb-4">
    <h2>タグ管理</h2>
</div>

@if($tags->isEmpty())
    <p>タグがありません。</p>
@else
<table class="table table-fixed">
    <colgroup>
        <col style="width: 5%;">
        <col style="width: 65%;">
        <col style="width: 15%;">
        <col style="width: 15%;">
    </colgroup>
    <thead>
        <tr>
            <th>ID</th>
            <th>タグ名</th>
            <th>関連する質問数</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
        @foreach($tags as $tag)
        <tr>
            <td>{{ $tag->id }}</td>
            <td>{{ mb_strlen($tag->name) > 40 ? mb_substr($tag->name, 0, 40) . '...' : $tag->name }}</td>
            <td>{{ $tag->questions->count() }}</td>
            <td>
                <a href="{{ route('tags.edit', $tag) }}" class="btn btn-sm btn-warning">編集</a>
                <!-- 削除ボタンや他の操作ボタンもここに追加 -->
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
@endif

@endsection
