# 技術面接クイズアプリ

HTML、JavaScript、CSSのみで作成された技術面接対策のクイズアプリケーションです。

## 特徴

- 4つのカテゴリ（Web基礎、Web応用、Webセキュリティ、AWS）
- 各カテゴリ10問の4択問題
- LocalStorageによる進捗保存
- レスポンシブデザイン

## 使い方

1. `index.html` をブラウザで開く
2. カテゴリを選択
3. 問題に回答
4. 結果を確認し、復習機能で理解を深める

## 技術スタック

- HTML5
- CSS3（Flexbox、Grid）
- Vanilla JavaScript（ES6+）
- LocalStorage API

## 開発環境

### コード品質管理

このプロジェクトでは、コードをプッシュするたびに自動的にコード検査が実行されます。

- **ESLint**: JavaScript静的解析
- **Prettier**: コードフォーマッター
- **Laravel Pint**: PHP/Laravelコードフォーマッター
- **PHPUnit**: ユニットテスト

詳細は [CI/CD_SETUP.md](./CI_CD_SETUP.md) をご覧ください。

### セットアップ

```bash
# フロントエンド依存関係のインストール
npm install

# コードチェック
npm run lint
npm run format:check

# コード整形
npm run format
```
