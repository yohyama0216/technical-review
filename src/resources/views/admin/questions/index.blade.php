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
        <col style="width: 7.5%;">
        <col style="width: 40%;">
        <col style="width: 32.5%;">
    </colgroup>
    <thead>
        <tr>
            <th>ID</th>
            <th>状態</th>
            <th>操作</th>
            <th>難易度</th>
            <th>質問内容</th>
            <th>追加日</th>
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
            <td>{{ $question->difficulty == 0 ? 'ー' : $question->difficulty }}</td>
            <td><a href="">{{ mb_strlen($question->question) > 40 ? mb_substr($question->question, 0, 40) . '...' : $question->question }}</a></td>
            <td>{{ $question->created_at->format('Y-m-d H:i:s') }}</td>
            <!-- <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample-{{ $question->id }}" aria-expanded="false" aria-controls="collapseExample">
                        見る
                    </button>
                    <div class="collapse mt-3" id="collapseExample-{{ $question->id }}">
                        <div class="card card-body">
                        {{ mb_strlen($question->answer) > 40 ? mb_substr($question->answer, 0, 40) . '...' : $question->answer }}
                            ここは開閉するエリアです！
                        </div>
                    </div>
                 <div class="container mt-5">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        クリックしてエリアを開閉
                    </button>
                    <div class="collapse mt-3" id="collapseExample">
                        <div class="card card-body">
                        {{ mb_strlen($question->answer) > 40 ? mb_substr($question->answer, 0, 40) . '...' : $question->answer }}
                            ここは開閉するエリアです！
                        </div>
                    </div>
                </div> -->
        </tr>
        @endforeach
    </tbody>
</table>

<!-- ページネーション -->
{{ $questions->links('vendor.pagination.bootstrap-4') }}
@endif

@endsection
