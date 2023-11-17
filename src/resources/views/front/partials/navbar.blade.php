<!-- Global Menu Navbar -->
<nav class="navbar navbar-expand-lg navbar-light sticky-top">
  <div class="container">
    <a class="navbar-brand" href="">乙四くん</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="{{ route('learning.index') }}">
            学習開始
            <!-- <i class="fas fa-play"></i> -->
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="{{ route('learning-history.index') }}">学習履歴</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="{{ route('setting.edit') }}">学習設定</a>
        </li>
        @auth
        <li class="nav-item">
          <a class="nav-link" href="{{ route('questions.index') }}">質問管理</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="{{ route('questions.create') }}">質問新規登録</a>
        </li>
        @endauth
        <li class="nav-item">
        @auth
        <a class="nav-link btn btn-sm btn-danger" href="{{ route('logout') }}">ログアウト</a>
        @else
        <a class="nav-link btn btn-sm btn-info" href="{{ route('login.form') }}">ログイン</a>
        @endauth
      </li>
      </ul>
    </div>
  </div>
</nav>