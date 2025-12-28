<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $pageTitle }} - {{ $appName }}</title>
    <!-- Bootstrap 5 CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    @stack('styles')
</head>
<body class="bg-light">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div class="container-fluid">
            @php
                $currentGenre = app(\App\Services\StatisticsService::class)->getCurrentGenre();
                $genreNames = [
                    'technical' => '技術面接',
                    'vocabulary' => '英単語',
                    'python' => 'Python資格'
                ];
                $genreName = $genreNames[$currentGenre] ?? '技術面接';
            @endphp
            <a class="navbar-brand fw-bold" href="{{ route('quiz.index') }}">
                <i class="bi bi-mortarboard-fill me-2"></i>{{ $appName }}（{{ $genreName }}）
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link {{ Request::routeIs('quiz.start') ? 'active' : '' }}" href="{{ route('quiz.start') }}">
                            <i class="bi bi-shuffle me-1"></i>ランダム問題
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ Request::routeIs('quiz.question-list') ? 'active' : '' }}" href="{{ route('quiz.question-list') }}">
                            <i class="bi bi-list-ul me-1"></i>問題一覧
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ Request::routeIs('quiz.stats') ? 'active' : '' }}" href="{{ route('quiz.stats') }}">
                            <i class="bi bi-graph-up me-1"></i>統計
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="categoryDropdown" role="button" 
                           data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-collection me-1"></i>ジャンル
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="categoryDropdown">
                            @php
                                $currentGenre = app(\App\Services\StatisticsService::class)->getCurrentGenre();
                                $categories = [
                                    'technical' => '💻 技術面接',
                                    'vocabulary' => '📚 英単語 (TOEIC)',
                                    'python' => '🐍 Python資格'
                                ];
                            @endphp
                            @foreach($categories as $key => $label)
                                <li>
                                    <form method="POST" action="{{ route('quiz.settings.save') }}" class="d-inline">
                                        @csrf
                                        <input type="hidden" name="genre" value="{{ $key }}">
                                        <button type="submit" class="dropdown-item {{ $currentGenre === $key ? 'active' : '' }}">
                                            {{ $label }}
                                            @if($currentGenre === $key)
                                                <i class="bi bi-check-circle-fill ms-2"></i>
                                            @endif
                                        </button>
                                    </form>
                                </li>
                            @endforeach
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container my-4">
        @yield('content')
    </div>

    <!-- Bootstrap 5 JS Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    @stack('scripts')
</body>
</html>
