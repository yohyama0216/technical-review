<!DOCTYPE html>
<html lang="en">
@include('front.partials.head')
<body>

@include('front.partials.navbar')

<div class="container-fluid mt-3">
    @yield('content')
</div>

@include('front.partials.footer')

</body>
</html>
