<!-- Global Menu Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
  <div class="container">
    <a class="navbar-brand" href="#">Logo</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="{{ route('questions.index') }}">質問管理</a>
        </li>
        @auth
        <li class="nav-item">
          <a class="nav-link" href="{{ route('questions.create') }}">質問新規登録</a>
        </li>
        @endauth
        <li class="nav-item">
        @auth
        <a class="btn btn-sm btn-danger" href="{{ route('logout') }}">ログアウト</a>
        @else
        <a class="btn btn-sm btn-info" href="{{ route('login.form') }}">ログイン</a>
        @endauth
      </li>
      </ul>
    </div>
  </div>
</nav>