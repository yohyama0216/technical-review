@extends('admin.layouts.app')

@section('content')
    <h1>出題設定</h1>

    <form action="{{ route('settings.update') }}" method="post">
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
@endsection