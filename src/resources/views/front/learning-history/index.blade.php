@extends('front.layouts.app')

@section('content')
<div class="row">
    <div class="col-2">
        <h4>統計</h4>
        <ul>
            <li>総例文数:3000</li>
            <li>未着手  :2000</li>
            <li>暗記中  :290</li>
            <li>暗記完了:100</li>
        </ul>
    </div>
    <div class="col-2">
        <h4>学習ペース</h4>
        <ul>
            <li>新規:2.5</li>
            <li>復習:2.5</li>
            <li>完了:1.2</li>
        </ul>
    </div>
    <div class="col-2">
        <h4>学習ポイント</h4>
        <ul>
            <li>合計:1200</li>
        </ul>
    </div>
</div>
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
