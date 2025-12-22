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

2. **PHPUnit** - ユニットテスト
    - 設定ファイル: `technical-review-laravel/phpunit.xml`
    - 実行コマンド: `php artisan test`

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

# PHPUnitでテスト実行
php artisan test
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
- [ ] `cd technical-review-laravel && php artisan test` が成功する

## 🔧 設定ファイル一覧

| ファイル                               | 用途                 |
| -------------------------------------- | -------------------- |
| `.eslintrc.json`                       | ESLint設定           |
| `.prettierrc.json`                     | Prettier設定         |
| `.eslintignore`                        | ESLint除外ファイル   |
| `.prettierignore`                      | Prettier除外ファイル |
| `technical-review-laravel/pint.json`   | Laravel Pint設定     |
| `technical-review-laravel/phpunit.xml` | PHPUnit設定          |
| `.github/workflows/frontend-ci.yml`    | フロントエンドCI設定 |
| `.github/workflows/laravel-ci.yml`     | LaravelCI設定        |

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
- [PHPUnit Documentation](https://phpunit.de/documentation.html)
- [GitHub Actions Documentation](https://docs.github.com/ja/actions)
