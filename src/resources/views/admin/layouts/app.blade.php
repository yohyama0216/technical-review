<!DOCTYPE html>
<html lang="en">
@include('admin.partials.head')
<body>

@include('admin.partials.navbar')

<div class="container mt-5">
    @yield('content')
</div>

@include('admin.partials.footer')

</body>
</html>
