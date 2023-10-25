@extends('admin.layouts.app')

@section('content')
<div class="container">
    <h2>学習履歴</h2>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>質問</th>
                <th>正解か</th>
                <th>回答日時</th>
            </tr>
        </thead>
        <tbody>
            @foreach($histories as $history)
            <tr>
                <td>{{ $history->question->question }}</td>
                <td>{{ $history->is_correct ? '正解' : '不正解' }}</td>
                <td>{{ $history->answered_at }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
