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

### PHPStan (Larastan)
- 型エラー、未定義変数、到達不能コードを検出
- レベル7で高品質な静的解析

### PHPMD (PHP Mess Detector)
- コード複雑度、コードサイズ、ネーミング規則をチェック
- クリーンコード原則に基づく

### PHP Insights
- 総合的なコード品質スコア
- 複数の観点から品質を評価
