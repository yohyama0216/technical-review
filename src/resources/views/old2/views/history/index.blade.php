@extends('layouts.layout')

@section('title','TOP')

@section('content')
@include('layouts.sidebarmenu', ['current' => 'top'])
<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">学習履歴</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
        </div>
    </div>
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

    @if($data)
    <div class="table-responsive col-6">
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th>学習日時</th>
                    <th>学習アイテム数</th>
                    <th>学習ポイント</th>
                </tr>
            </thead>
            <tbody>
                @foreach($data as $key => $item)
                    <tr>
                        <td>{{$item['date_group']}}</td>
                        <td>{{$item['count']}}</td>
                        <td>{{$item['answer']}}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @else
    <div>見つかりませんでした。</div>
    @endif
</main>
@endsection

@section('side')
  @parent
  <ul>
    <li>ccc</li>
    <li>ddd</li>
  </ul>
@endsection