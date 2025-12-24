# CI Tools

## 自動実行（GitHub Actions）

プッシュ時とプルリクエスト時に自動実行されます。

## 手動実行

### すべてのCIツールを実行

```bash
# Windowsの場合
.\ci-check.ps1

# Linux/Macの場合
./ci-check.sh
```

### 個別実行

```bash
# コードスタイルチェック
vendor/bin/pint --test

# PSR-12準拠チェック
vendor/bin/phpcs

# Psalm静的解析（セキュリティ含む）
vendor/bin/psalm

# 静的解析（レベル7）
vendor/bin/phpstan analyse --level=7

# コード品質分析
vendor/bin/phpmd app/ text phpmd.xml

# 総合品質チェック
php artisan insights --no-interaction

# テスト実行
php artisan test
```

## 修正コマンド

```bash
# コードスタイル自動修正
vendor/bin/pint

# PHPCS自動修正
vendor/bin/phpcbf

# テスト実行（詳細）
php artisan test --coverage
```

## CI基準

- **Laravel Pint**: すべてパス
- **PHPCS (PSR-12)**: すべてパス
- **Psalm**: レベル5、0エラー
- **PHPStan Level 7**: 0エラー
- **PHPMD**: 警告のみ許容
- **PHP Insights**: Code 90%+, Complexity 90%+, Architecture 90%+
- **PHPUnit**: すべてのテストが合格

## 各ツールの役割

### Laravel Pint
- Laravelの標準コードスタイルに準拠
- 自動修正機能あり

### PHPCS (PHP_CodeSniffer)
- PSR-12コーディング規約の厳格なチェック
- phpcbfで自動修正可能

### Psalm
- 型チェックとセキュリティ分析
- SQLインジェクション、XSS等の検出
- PHPStanより厳格な型チェック
- レベル5（バランス型）で実行

### PHPStan (Larastan)
- 型エラー、未定義変数、到達不能コードを検出
- レベル7で高品質な静的解析

### PHPMD (PHP Mess Detector)
- コード複雑度、コードサイズ、ネーミング規則をチェック
- クリーンコード原則に基づく

### PHP Insights
- 総合的なコード品質スコア
- 複数の観点から品質を評価

## 導入を見送ったツール

### PHPCPD (Copy/Paste Detector)
**見送り理由:**
- 依存関係の競合により、現在のPHP 8.2環境でのインストールに失敗
- PHPCPD 6.x系はPHP 7.3用、7.x系はまだ安定版がリリースされていない（開発版のみ）
- Composer依存関係の解決が困難（amphp/ampのバージョン競合）

**代替手段:**
- **Psalm**: 重複コードの一部を検出可能
- **PHPStan**: 未使用コードや重複ロジックを間接的に検出
- **PHP Insights**: 複雑度分析で重複コードの兆候を検出
- 手動: IDE（PhpStorm等）の重複検出機能を使用

**将来の対応:**
- PHPCPD 7.xの安定版リリース後に再検討
- または、PHAR版の直接ダウンロードによる導入を検討
