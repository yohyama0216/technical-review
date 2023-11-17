<!DOCTYPE html>
<html lang="en">
@include('front.partials.head')
<body>

@include('front.partials.navbar')

<div class="content">
    <div class="container-fluid">
        @yield('content')
    </div>
</div>

@include('front.partials.footer')

</body>
</html>
