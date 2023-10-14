@extends('admin.layouts.app')

@section('content')

<div class="mb-4">
    <h2>商品管理</h2>
    
    <!-- 検索フォーム -->
    <form class="d-flex" method="GET" action="{{ route('admin.products.index') }}">
    <input class="form-control me-2" type="search" placeholder="商品名で検索" name="searchName" value="{{ request('searchName') }}">
    <input class="form-control me-2" type="number" placeholder="価格で検索" name="searchPrice" value="{{ request('searchPrice') }}">
    <button class="btn btn-outline-primary" type="submit">検索</button>
</form>
</div>

@if($products->isEmpty())
    <p>商品がありません。</p>
@else
<table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>商品名</th>
            <th>価格</th>
            <th>在庫</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
        @foreach($products as $product)
        <tr>
            <td>{{ $product->id }}</td>
            <td>{{ $product->name }}</td>
            <td>{{ $product->price }}</td>
            <td>{{ $product->stock }}</td>
            <td>
                <a href="{{ route('admin.products.edit', $product) }}" class="btn btn-sm btn-warning">編集</a>
                <!-- 削除ボタンや他の操作ボタンもここに追加 -->
            </td>
        </tr>
        @endforeach
    </tbody>
</table>

<!-- ページネーション -->
{{ $products->links('vendor.pagination.bootstrap-4') }}
@endif

@endsection