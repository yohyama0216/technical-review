@extends('layouts.layout')

@section('title','TOP')

@section('content')
@include('layouts.sidebarmenu', ['current' => 'top'])
<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">学習設定</h1>
        <div class="btn-toolbar mb-2 mb-md-0">

        </div>
    </div>
<form action="{{url('/setting/store')}}" method="post">
    {{ csrf_field() }}
    // todo デザイン修正？　エラー時のメッセージは？
    <div class="row">
        <div class="col-md-2 mb-3">
            <label for="sentence_count">出題数</label>
            <select class="custom-select d-block w-50" name="sentence_count">
            @foreach(range(5,50,10) as $number)
            <option value="{{$number}}"
            @if ($data['sentence_count'] == $number) selected="selected" @endif
            >{{$number}}</option>
            @endforeach
            </select>
        </div>
        <div class="col-md-2 mb-3">
            <label for="category">カテゴリー</label>
            <select class="custom-select d-block w-50" name="category">
            <option value="0">すべて</option>
            @foreach(range(1,5) as $number)
            <option value="{{$number}}">{{$number}}</option>
            @endforeach
            </select>
        </div>
    </div>
    <div class="row">
        <div class="col-md-2 mb-3">
            <label for="word_limit">単語数上限</label>
            <select class="custom-select d-block w-50" name="word_limit">
            @foreach(range(4,20,2) as $number)
            <option value="{{$number}}">{{$number}}</option>
            @endforeach
            </select>
            </div>
            <div class="col-md-2 mb-3">
            <label for="last_learn_date">前回学習日</label>
            <select class="custom-select d-block w-50" name="last_learn_date">
            @foreach(range(1,10) as $number)
            <option value="{{$number}}">{{$number}}日以上前</option>
            @endforeach
            </select>
        </div>
    </div>

              <div class="col-md-2">
            <button>設定を保存</button>
        </div>
        @if ($errors->any())
    <div class="alert alert-danger mt-3">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
    </div>
</main>
@endsection

@section('side')
  @parent
  <ul>
    <li>ccc</li>
    <li>ddd</li>
  </ul>
@endsection