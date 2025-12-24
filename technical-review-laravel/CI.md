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

# テスト実行（詳細）
php artisan test --coverage
```

## CI基準

- **Laravel Pint**: すべてパス
- **PHPStan Level 7**: 0エラー
- **PHPMD**: 警告のみ許容
- **PHP Insights**: Code 90%+, Complexity 90%+, Architecture 90%+
- **PHPUnit**: すべてのテストが合格
