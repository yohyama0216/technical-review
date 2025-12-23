# CI/CD セットアップ

このプロジェクトでは、コードをプッシュするたびに自動的にコード検査が実行されます。

## 🔍 実装されている自動検査

### フロントエンド (JavaScript/HTML/CSS)

**ワークフロー**: `.github/workflows/frontend-ci.yml`

以下のツールでコード品質を自動検査します：

1. **ESLint** - JavaScriptの静的解析
    - 設定ファイル: `.eslintrc.json`
    - コードの潜在的なエラーやベストプラクティス違反を検出
    - 実行コマンド: `npm run lint`

2. **Prettier** - コードフォーマッター
    - 設定ファイル: `.prettierrc.json`
    - コードスタイルの一貫性を確保
    - 実行コマンド: `npm run format:check`

3. **自動テスト** (設定済み)
    - 実行コマンド: `npm run test`

### バックエンド (Laravel)

**ワークフロー**: `.github/workflows/laravel-ci.yml`

以下のツールでコード品質を自動検査します：

1. **Laravel Pint** - PHPコードフォーマッター
    - 設定ファイル: `technical-review-laravel/pint.json`
    - Laravel標準のコーディングスタイルに準拠
    - 実行コマンド: `./vendor/bin/pint --test`

2. **Composer Audit** - セキュリティ脆弱性チェック
    - Composerに組み込み済みの機能
    - 既知のセキュリティ脆弱性を持つ依存関係を検出
    - 実行コマンド: `composer audit`

3. **Larastan (PHPStan)** - 静的解析ツール
    - 設定ファイル: `technical-review-laravel/phpstan.neon`
    - 型エラー、未定義変数、到達不能コードなどを検出
    - 解析レベル: 6（推奨レベル - 厳格さと実用性のバランス）
    - 実行コマンド: `./vendor/bin/phpstan analyse`

4. **PHPUnit** - ユニットテスト & コードカバレッジ
    - 設定ファイル: `technical-review-laravel/phpunit.xml`
    - コードカバレッジレポート生成（分岐網羅を含む）
    - 最低カバレッジ: 80%
    - 実行コマンド: `php artisan test --coverage`

#### 📌 ツール選定の理由

**Larastan (PHPStan) を選んだ理由：**
- 型安全性の向上：実行前にバグを検出
- Laravel専用の最適化：Eloquent、Facades、Containerなどに対応
- コミュニティで広く使われているスタンダードツール
- 段階的に導入可能（レベル0〜9）

**Composer Audit を選んだ理由：**
- 追加インストール不要（Composer組み込み機能）
- セキュリティ脆弱性の早期発見
- GitHub Advisory Databaseとの連携
- CI/CDでの自動実行に最適

**その他の候補について：**
- ❌ **PHPMD (PHP Mess Detector)**: PHPStanで大部分がカバーされ、重複が多い
- ❌ **PHP_CodeSniffer**: Laravel Pintで十分カバーされている
- ✅ **Laravel Pint**: PSR-12準拠、Laravel標準で十分
- ✅ **PHPUnit**: Laravel標準のテストフレームワーク

## 🚀 ローカルでの実行方法

### フロントエンド

```bash
# 依存関係のインストール
npm install

# ESLintでコードチェック
npm run lint

# ESLintで自動修正
npm run lint:fix

# Prettierでフォーマットチェック
npm run format:check

# Prettierでコード整形
npm run format

# テスト実行
npm run test
```

### Laravel

```bash
# プロジェクトディレクトリに移動
cd technical-review-laravel

# 依存関係のインストール
composer install

# .envファイルの作成
cp .env.example .env

# アプリケーションキーの生成
php artisan key:generate

# Laravel Pintでコードチェック
./vendor/bin/pint --test

# Laravel Pintでコード整形
./vendor/bin/pint

# Composer Auditでセキュリティ脆弱性チェック
composer audit

# Larastan (PHPStan)で静的解析実行
./vendor/bin/phpstan analyse

# メモリ制限を増やして実行（大規模プロジェクト向け）
./vendor/bin/phpstan analyse --memory-limit=2G

# PHPUnitでテスト実行
php artisan test

# PHPUnitでコードカバレッジレポート生成
php artisan test --coverage

# 最低カバレッジ80%でテスト実行
php artisan test --coverage --min=80
```

## 📋 CI/CD トリガー条件

### フロントエンドCI

- `main`または`master`ブランチへのプッシュ
- プルリクエスト作成時
- 以下のファイルが変更された場合にのみ実行:
    - `*.js`, `*.html`, `*.css`
    - `package.json`, `package-lock.json`
    - ESLint/Prettier設定ファイル

### LaravelCI

- `main`または`master`ブランチへのプッシュ
- プルリクエスト作成時
- `technical-review-laravel/`ディレクトリ内のファイルが変更された場合にのみ実行

## ✅ コミット前のチェックリスト

コードをプッシュする前に、以下を確認してください：

- [ ] `npm run lint` が成功する
- [ ] `npm run format:check` が成功する
- [ ] `cd technical-review-laravel && ./vendor/bin/pint --test` が成功する
- [ ] `cd technical-review-laravel && composer audit` が成功する
- [ ] `cd technical-review-laravel && ./vendor/bin/phpstan analyse` が成功する
- [ ] `cd technical-review-laravel && php artisan test` が成功する

## 🔧 設定ファイル一覧

| ファイル                                  | 用途                 |
| ----------------------------------------- | -------------------- |
| `.eslintrc.json`                          | ESLint設定           |
| `.prettierrc.json`                        | Prettier設定         |
| `.eslintignore`                           | ESLint除外ファイル   |
| `.prettierignore`                         | Prettier除外ファイル |
| `technical-review-laravel/pint.json`      | Laravel Pint設定     |
| `technical-review-laravel/phpstan.neon`   | PHPStan設定          |
| `technical-review-laravel/phpunit.xml`    | PHPUnit設定          |
| `.github/workflows/frontend-ci.yml`       | フロントエンドCI設定 |
| `.github/workflows/laravel-ci.yml`        | LaravelCI設定        |

## 🎯 コーディング規約

### JavaScript

- セミコロンを使用
- シングルクォートを使用
- インデント: 4スペース
- 最大行幅: 100文字

### PHP (Laravel)

- Laravel標準のコーディングスタイル（PSR-12準拠）
- Laravel Pintによる自動整形

## 📚 参考資料

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [Laravel Pint Documentation](https://laravel.com/docs/pint)
- [PHPStan Documentation](https://phpstan.org/user-guide/getting-started)
- [Larastan Documentation](https://github.com/larastan/larastan)
- [PHPUnit Documentation](https://phpunit.de/documentation.html)
- [Composer Audit](https://getcomposer.org/doc/03-cli.md#audit)
- [GitHub Actions Documentation](https://docs.github.com/ja/actions)
