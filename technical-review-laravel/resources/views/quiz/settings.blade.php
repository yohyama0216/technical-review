@extends('layouts.app')

@section('content')
    <a href="{{ route('quiz.index') }}" class="btn btn-outline-secondary mb-3">
        <i class="bi bi-arrow-left me-1"></i>ホームへ
    </a>
    
    <div class="text-center mb-4">
        <h2 class="fw-bold"><i class="bi bi-gear me-2"></i>設定</h2>
    </div>

    <!-- Storage Info Card -->
    <div class="card shadow-sm mb-4">
        <div class="card-header bg-white">
            <h5 class="mb-0"><i class="bi bi-database me-2"></i>ローカルストレージ情報</h5>
        </div>
        <div class="card-body">
            <div class="row g-3 mb-3">
                <div class="col-md-4">
                    <div class="card text-center bg-light">
                        <div class="card-body">
                            <h6 class="card-title text-muted">回答統計</h6>
                            <h3 id="statsCount">0</h3>
                            <small class="text-muted">問題</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center bg-light">
                        <div class="card-body">
                            <h6 class="card-title text-muted">学習履歴</h6>
                            <h3 id="historyCount">0</h3>
                            <small class="text-muted">日分</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center bg-light">
                        <div class="card-body">
                            <h6 class="card-title text-muted">総データサイズ</h6>
                            <h3 id="storageSize">0</h3>
                            <small class="text-muted">KB</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Data Management Card -->
    <div class="card shadow-sm mb-4">
        <div class="card-header bg-white">
            <h5 class="mb-0"><i class="bi bi-sliders me-2"></i>データ管理</h5>
        </div>
        <div class="card-body">
            <div class="alert alert-warning">
                <i class="bi bi-exclamation-triangle me-2"></i>
                <strong>注意:</strong> データをクリアすると、すべての学習履歴と統計情報が削除されます。この操作は元に戻せません。
            </div>
            
            <div class="d-grid gap-3">
                <button id="clearStatsBtn" class="btn btn-outline-danger">
                    <i class="bi bi-trash me-2"></i>回答統計をクリア
                </button>
                <button id="clearHistoryBtn" class="btn btn-outline-danger">
                    <i class="bi bi-trash me-2"></i>学習履歴をクリア
                </button>
                <button id="clearAllBtn" class="btn btn-danger">
                    <i class="bi bi-trash-fill me-2"></i>すべてのデータをクリア
                </button>
            </div>
        </div>
    </div>

    <!-- Export/Import Card -->
    <div class="card shadow-sm mb-4">
        <div class="card-header bg-white">
            <h5 class="mb-0"><i class="bi bi-arrow-left-right me-2"></i>データのエクスポート / インポート</h5>
        </div>
        <div class="card-body">
            <p class="text-muted">学習データをバックアップまたは復元できます</p>
            
            <div class="d-grid gap-3">
                <button id="exportDataBtn" class="btn btn-primary">
                    <i class="bi bi-download me-2"></i>データをエクスポート
                </button>
                <div>
                    <label for="importDataFile" class="form-label">データをインポート</label>
                    <input type="file" id="importDataFile" class="form-control" accept=".json">
                    <button id="importDataBtn" class="btn btn-success mt-2 w-100">
                        <i class="bi bi-upload me-2"></i>インポート実行
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- App Info Card -->
    <div class="card shadow-sm">
        <div class="card-header bg-white">
            <h5 class="mb-0"><i class="bi bi-info-circle me-2"></i>アプリ情報</h5>
        </div>
        <div class="card-body">
            <dl class="row mb-0">
                <dt class="col-sm-4">アプリ名</dt>
                <dd class="col-sm-8">技術面接クイズアプリ</dd>
                
                <dt class="col-sm-4">バージョン</dt>
                <dd class="col-sm-8">1.0.0</dd>
                
                <dt class="col-sm-4">問題総数</dt>
                <dd class="col-sm-8" id="totalQuestionsInfo">0</dd>
                
                <dt class="col-sm-4">ストレージ</dt>
                <dd class="col-sm-8">LocalStorage</dd>
            </dl>
        </div>
    </div>
@endsection
