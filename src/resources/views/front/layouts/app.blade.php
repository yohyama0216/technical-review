<!DOCTYPE html>
<html lang="en">
@include('front.partials.head')
<body>

@include('front.partials.navbar')

<div class="container mt-5">
    @yield('content')
</div>

@include('front.partials.footer')

</body>
</html>
