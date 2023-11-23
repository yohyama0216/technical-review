@extends('layouts.layout')

@section('title','TOP')

@section('content')
@include('layouts.sidebarmenu', ['current' => 'top'])
<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="sentence">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1>トップ画面</h1>
        <div class="btn-toolbar mb-2 mb-md-0">

        </div>
    </div>

    @if($data)
    <section>
        <div class="row" >
            <div class="col-2">
                トップ画面 
            </div>
        </div>
    </section>
    @else
    <div>例文が見つかりませんでした。</div>
    @endif

</main>
<script>
        // settingをもとにしてあらかじめ全件とってくる
        const sentenceList = @json($data)
    </script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="{{asset('/js/sentence.js')}}"></script>
@endsection