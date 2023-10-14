@extends('admin.layouts.app')

@section('content')

<div class="mb-4">
    <h2>顧客管理</h2>
    
    <!-- 検索フォーム -->
    <form class="d-flex" method="GET" action="{{ route('admin.customers.index') }}">
        <input class="form-control me-2" type="search" placeholder="顧客名で検索" name="searchName" value="{{ request('searchName') }}">
        <input class="form-control me-2" type="search" placeholder="メールアドレスで検索" name="searchEmail" value="{{ request('searchEmail') }}">
        <button class="btn btn-outline-primary" type="submit">検索</button>
    </form>
</div>

@if($customers->isEmpty())
    <p>顧客がいません。</p>
@else
<table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>名前</th>
            <th>メールアドレス</th>
            <th>電話番号</th>
            <th>住所</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
        @foreach($customers as $customer)
        <tr>
            <td>{{ $customer->id }}</td>
            <td>{{ $customer->name }}</td>
            <td>{{ $customer->email }}</td>
            <td>{{ $customer->phone_number }}</td>
            <td>{{ $customer->address }}</td>
            <td>
                <a href="{{ route('admin.customers.edit', $customer) }}" class="btn btn-sm btn-warning">編集</a>
                <!-- 削除ボタンや他の操作ボタンもここに追加 -->
            </td>
        </tr>
        @endforeach
    </tbody>
</table>

<!-- ページネーション -->
{{ $customers->links('vendor.pagination.bootstrap-4') }}
@endif

@endsection
