@extends('front.layouts.app')

@section('content')
<div class="row">
    <div class="col-12">
        <h2>学習統計</h2>

        <table class="table table-bordered">
            <thead>
                @foreach($stats as $key => $value)
                <tr>
                    <th>{{ $key }}</th><td>{{ $value }}</td>
                </tr>
                @endforeach
            </thead>
            <tbody>
        </table>
    </div>
</div>
<div class="row">
    <div class="col-12" id="app">
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
                    <td>{{ $history->date }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
