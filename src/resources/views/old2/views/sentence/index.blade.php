@extends('layouts.layout')

@section('title','TOP')

@section('content')
@include('layouts.sidebarmenu', ['current' => 'top'])
<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">例文検索</h1>
        <div class="btn-toolbar mb-2 mb-md-0">

        </div>
    </div>
    <div class="row">
        <div class="col-6">
            <h4>統計</h4>
            <ul>
                <li>英文 <input type="text" name="sentence_en" value="" /> <button>検索</button></li>
                <li>和文 <input type="text" name="sentence_jp" value="" /> <button>検索</button></li>
            </ul>
        </div>
    </div>

    @if($sentences)
    <div class="table-responsive col-6">
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th>英文</th>
                    <th>和文</th>
                    <th>学習ポイント</th>
                </tr>
            </thead>
            <tbody>
                @foreach($sentences as $key => $sentence)
                    <tr>
                        <td>{{$sentence['en']}}</td>
                        <td>{{$sentence['jp']}}</td>
                        <td>{{$sentence['learn_point']}}</td>
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