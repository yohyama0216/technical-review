@extends('front.layouts.app')

@section('content')
    <h1>出題設定</h1>

    <form action="{{ route('setting.update') }}" method="post">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label>出題方式:</label>
            <input type="checkbox" name="order_type" value="1" {{ $setting->order_type ? 'checked' : '' }}>
        </div>

        <div class="form-group">
            <label>質問の最大数:</label>
            <input type="number" name="question_limit" value="{{ $setting->question_limit }}">
        </div>

        <button type="submit" class="btn btn-primary">保存</button>
    </form>
    @if ($errors->any())
    <div class="alert alert-danger mt-3">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endsection