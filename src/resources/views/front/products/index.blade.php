@extends('front/layouts.app')

@section('title', '商品一覧')

@section('content')
<h2>商品一覧</h2>

<div class="row">
    @foreach($products as $product)
    <div class="col-md-4 mb-4">
        <div class="card">
            <img src="{{ $product->image_url }}" class="card-img-top" alt="{{ $product->name }}">
            <div class="card-body">
                <h5 class="card-title">{{ $product->name }}</h5>
                <p class="card-text">価格: ¥{{ number_format($product->price) }}</p>
                <a href="#" class="btn btn-primary">詳細を見る</a>
            </div>
        </div>
    </div>
    @endforeach
</div>
@endsection
