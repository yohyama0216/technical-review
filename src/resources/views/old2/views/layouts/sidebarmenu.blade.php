<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/learn">
                <span class="bi bi-play-fill"></span>
                    学習開始
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/setting">
                    <span class="bi bi-gear-fill"></span>
                    学習設定
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/history">
                <i class="bi bi-card-list"></i>
                    学習履歴
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link  @if($current == 'search')active @endif" href="/sentence">
                    <span class="bi bi-search"></span>
                    英文、和文検索
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link  @if($current == 'search')active @endif" href="/user">
                    <span class="bi bi-person-fill"></span>
                    学習者一覧
                </a>
            </li>
        </ul>
    </div>
</nav>