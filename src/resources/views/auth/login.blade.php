@extends('admin.layouts.app')

@section('content')
<!-- resources/views/auth/login.blade.php -->
<form method="post" action="{{ route('login') }}">
    @csrf
    <input type="email" name="email" required>
    <input type="password" name="password" required>
    <button type="submit">Login</button>
</form>
@endsection