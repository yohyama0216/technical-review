@extends('layouts.layout')

@section('title','TOP')

@section('content')
@include('layouts.sidebarmenu', ['current' => 'top'])
<main class="container">
    <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-primary rounded shadow-sm">
        <div class="lh-100">
            <h6 class="mb-0 text-white lh-100"><i class="bi bi-search"></i> 対戦動画検索</h6>
        </div>
    </div>
    <div class="my-3 p-3 bg-white rounded shadow-sm">
        <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-secondary rounded shadow-sm">
            <div class="lh-100">
                <h6 class="mb-0 text-white lh-100">検索結果</h6>
                <small>検索条件：なし</small>
            </div>
        </div>
        <h6 class="border-bottom border-gray pb-2 mb-0">検索件数：10件</h6>
        <div class="media text-muted pt-3">
            @foreach($battles as $key => $battle)
            <div class="d-flex align-items-center p-1 my-3 text-white bg-secondary rounded shadow-sm">
                @foreach($battle->players as $player)
                <div class="col-6 text-center bg-info">
                    <div class="row p-1">
                    @foreach($player->decks as $deck)
                    <p>@if ($player['result']) WIN @else LOSE @endif <br/>{{$deck['name']}}</p>    
                        <div class="col-2 d-flex align-items-center">
                            <a href="{{$battle->getDeckCopyUrl('winner')}}">
                                <img height="35" src="https://cdn.statsroyale.com/images/copy.png">
                            </a>
                        </div>
                        <div class="col-10">
                            @foreach($deck->cards as $card)
                            <img height="40" src="https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/{{$card->key}}.png" alt="">
                            @endforeach
                        </div>
                    @endforeach
                    </div>
                </div>
                @endforeach
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="ratio ratio-16x9">
                        @include('parts.embed_battle', ['url' => $battle->url])
                    </div>
                </div>
            </div>               
            @endforeach
            <small class="d-block text-right mt-3">
            <a href="#">All updates</a>
            </small>
        </div>
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