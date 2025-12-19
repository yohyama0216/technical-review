// Quiz Data with Major, Middle, and Minor Categories
const quizData = [
    // Backend Technology -> Database Category
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'B-Treeインデックスの特徴として正しいものはどれですか？',
        answers: [
            '範囲検索に適している',
            '完全一致検索のみサポート',
            'メモリを使用しない',
            '更新時のオーバーヘッドがない'
        ],
        correct: 0,
        explanation: 'B-Treeインデックスは範囲検索、完全一致検索の両方に適しており、データベースで最も一般的に使用されるインデックスタイプです。'
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'カーディナリティが高いカラムにインデックスを作成する理由はどれですか？',
        answers: [
            'データの重複が多いため',
            'ユニークな値が多く、検索効率が上がるため',
            'ディスク容量を節約するため',
            '更新処理が速くなるため'
        ],
        correct: 1,
        explanation: 'カーディナリティが高い（ユニークな値が多い）カラムにインデックスを作成すると、検索時に絞り込みが効率的に行えます。'
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'クエリ最適化',
        question: 'EXPLAINコマンドの主な用途はどれですか？',
        answers: [
            'データベースのバックアップ',
            'クエリの実行計画を確認',
            'テーブルの作成',
            'データの暗号化'
        ],
        correct: 1,
        explanation: 'EXPLAINコマンドは、SQLクエリの実行計画を表示し、インデックスの使用状況やパフォーマンスの分析に使用されます。'
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'クエリ最適化',
        question: 'N+1問題が発生する主な原因はどれですか？',
        answers: [
            'インデックスの不足',
            '関連データを個別にクエリで取得',
            'トランザクション分離レベルの設定ミス',
            'データベース接続の切断'
        ],
        correct: 1,
        explanation: 'N+1問題は、親レコードを取得後、各親に対して関連レコードを個別にクエリすることで発生します。JOINやeager loadingで解決できます。'
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'トランザクション',
        question: 'ACID特性の「I」が表すものはどれですか？',
        answers: [
            'Integrity（整合性）',
            'Isolation（分離性）',
            'Identity（識別性）',
            'Indexing（索引）'
        ],
        correct: 1,
        explanation: 'ACIDのIはIsolation（分離性）を表し、複数のトランザクションが並行実行されても互いに影響を与えないことを保証します。'
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'トランザクション',
        question: 'デッドロックが発生する条件として正しくないものはどれですか？',
        answers: [
            '相互排除',
            '保持と待機',
            'ノンプリエンプション',
            'シングルスレッド実行'
        ],
        correct: 3,
        explanation: 'デッドロックの4つの条件は、相互排除、保持と待機、ノンプリエンプション、循環待機です。シングルスレッド実行では発生しません。'
    },
    
    // Frontend Technology -> App Performance Category
    {
        majorCategory: 'フロントエンド技術',
        middleCategory: 'アプリパフォーマンス',
        minorCategory: 'フロントエンド最適化',
        question: 'Critical Rendering Pathの最適化手法として正しいものはどれですか？',
        answers: [
            'すべてのJavaScriptをheadタグ内で読み込む',
            '重要なCSSをインライン化し、非同期でCSSを読み込む',
            '全ての画像を高解像度にする',
            'すべてのリソースを同期的に読み込む'
        ],
        correct: 1,
        explanation: 'Critical Rendering Pathを最適化するには、初期表示に必要なCSSをインライン化し、その他のCSSは非同期で読み込むことが効果的です。'
    },
    {
        majorCategory: 'フロントエンド技術',
        middleCategory: 'アプリパフォーマンス',
        minorCategory: 'フロントエンド最適化',
        question: 'Lazy Loadingの主な目的はどれですか？',
        answers: [
            'セキュリティの向上',
            '初期ページロード時間の短縮',
            'SEOの改善',
            'データベースの最適化'
        ],
        correct: 1,
        explanation: 'Lazy Loadingは、ビューポート外のコンテンツの読み込みを遅延させ、初期ページロード時間を短縮する技術です。'
    },
    {
        majorCategory: 'フロントエンド技術',
        middleCategory: 'アプリパフォーマンス',
        minorCategory: 'バンドル最適化',
        question: 'Tree Shakingの主な目的はどれですか？',
        answers: [
            'CSSの最適化',
            '未使用コードの削除によるバンドルサイズ削減',
            'HTMLの圧縮',
            '画像の最適化'
        ],
        correct: 1,
        explanation: 'Tree Shakingは、使用されていないコードを削除し、最終的なバンドルサイズを削減する最適化手法です。'
    },
    {
        majorCategory: 'フロントエンド技術',
        middleCategory: 'アプリパフォーマンス',
        minorCategory: 'レンダリング最適化',
        question: 'リフローを避けるための最適な方法はどれですか？',
        answers: [
            'DOMを頻繁に個別に更新する',
            'DocumentFragmentを使用してバッチ更新する',
            'インラインスタイルを多用する',
            '全てのスタイルをJavaScriptで設定する'
        ],
        correct: 1,
        explanation: 'DocumentFragmentを使用することで、DOM操作をバッチ化し、リフロー回数を最小限に抑えることができます。'
    },
    
    // DB Performance Category
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'クエリ最適化',
        question: 'データベースのスロークエリを特定する最適な方法はどれですか？',
        answers: [
            'すべてのクエリを手動で確認',
            'スロークエリログを有効にして分析',
            'データベースを再起動',
            'インデックスを全て削除'
        ],
        correct: 1,
        explanation: 'スロークエリログを有効にすることで、実行時間が閾値を超えるクエリを自動的に記録し、パフォーマンス問題を特定できます。'
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'インデックス最適化',
        question: 'カバリングインデックスの主な利点はどれですか？',
        answers: [
            'ディスク容量の削減',
            'テーブルアクセスなしでクエリを完結できる',
            'データの整合性向上',
            '更新処理の高速化'
        ],
        correct: 1,
        explanation: 'カバリングインデックスは、クエリに必要な全てのカラムをインデックスに含むため、テーブルへのアクセスが不要になり、パフォーマンスが向上します。'
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: 'データベース接続プーリングの主な目的はどれですか？',
        answers: [
            'セキュリティの向上',
            '接続の再利用によるオーバーヘッド削減',
            'データの暗号化',
            'バックアップの自動化'
        ],
        correct: 1,
        explanation: '接続プーリングは、データベース接続を再利用することで、接続確立のオーバーヘッドを削減し、アプリケーションのパフォーマンスを向上させます。'
    },

    // Cache Category
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'キャッシュ',
        minorCategory: 'HTTP キャッシング',
        question: 'Cache-Control: max-age=3600 の意味はどれですか？',
        answers: [
            '3600バイトまでキャッシュ可能',
            '3600秒（1時間）キャッシュが有効',
            '3600回までアクセス可能',
            '3600個のファイルをキャッシュ'
        ],
        correct: 1,
        explanation: 'max-age=3600は、リソースを3600秒（1時間）キャッシュすることを指示します。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'キャッシュ',
        minorCategory: 'アプリケーションキャッシュ',
        question: 'Service Workerのキャッシュ戦略で、ネットワークが利用できない場合にキャッシュを返す戦略はどれですか？',
        answers: [
            'Cache First',
            'Network First',
            'Cache Only',
            'Stale While Revalidate'
        ],
        correct: 1,
        explanation: 'Network First戦略は、まずネットワークを試み、失敗した場合にキャッシュにフォールバックします。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'キャッシュ',
        minorCategory: 'CDN',
        question: 'CDNの主な役割はどれですか？',
        answers: [
            'データベースの最適化',
            '地理的に分散されたサーバーからコンテンツ配信',
            'コードのコンパイル',
            'セキュリティスキャン'
        ],
        correct: 1,
        explanation: 'CDN（Content Delivery Network）は、地理的に分散されたエッジサーバーからコンテンツを配信し、レイテンシを削減します。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'キャッシュ',
        minorCategory: 'データベースキャッシュ',
        question: 'Redisなどのインメモリキャッシュの主な利点はどれですか？',
        answers: [
            '永続的なデータ保存',
            '高速なデータアクセス',
            '大容量データの保存',
            'トランザクションの保証'
        ],
        correct: 1,
        explanation: 'Redisなどのインメモリキャッシュは、メモリ上にデータを保持するため、ディスクベースのストレージよりも高速なアクセスが可能です。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'キャッシュ',
        minorCategory: 'キャッシュ戦略',
        question: 'Write-Through キャッシュ戦略の特徴はどれですか？',
        answers: [
            'データはキャッシュにのみ書き込まれる',
            'データはキャッシュとデータストアに同時に書き込まれる',
            '読み取り時にのみキャッシュを更新',
            'キャッシュは常に空'
        ],
        correct: 1,
        explanation: 'Write-Throughは、データをキャッシュとデータストアに同時に書き込むため、データの整合性が保たれますが、書き込み遅延が発生します。'
    },

    // API Design Category
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIで、リソースの部分更新に適したHTTPメソッドはどれですか？',
        answers: [
            'POST',
            'PUT',
            'PATCH',
            'UPDATE'
        ],
        correct: 2,
        explanation: 'PATCHメソッドはリソースの部分更新に使用されます。PUTは全体の置き換えに使用されます。'
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIのエンドポイント設計で推奨されるのはどれですか？',
        answers: [
            '/getUsers',
            '/users',
            '/user_list',
            '/fetchAllUsers'
        ],
        correct: 1,
        explanation: 'RESTful APIでは、リソースを名詞で表現し、HTTPメソッドで操作を示します。/usersが適切です。'
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'API認証エラーに適したHTTPステータスコードはどれですか？',
        answers: [
            '400 Bad Request',
            '401 Unauthorized',
            '403 Forbidden',
            '404 Not Found'
        ],
        correct: 1,
        explanation: '401 Unauthorizedは認証が必要、または認証に失敗したことを示します。403は認証されているが権限がない場合です。'
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'サーバー内部エラーを示すHTTPステータスコードはどれですか？',
        answers: [
            '400',
            '404',
            '500',
            '503'
        ],
        correct: 2,
        explanation: '500 Internal Server Errorは、サーバー側で予期しないエラーが発生したことを示します。'
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'API バージョニングの方法として一般的でないものはどれですか？',
        answers: [
            'URLパスにバージョンを含める（/v1/users）',
            'HTTPヘッダーでバージョンを指定',
            'クエリパラメータでバージョンを指定',
            'リクエストボディに必ずバージョンを含める'
        ],
        correct: 3,
        explanation: 'リクエストボディにバージョンを含める方法は一般的ではありません。URLパス、ヘッダー、クエリパラメータが主流です。'
    },

    // Security Category
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'セキュリティ',
        minorCategory: '認証・認可',
        question: 'JWTトークンの構成要素として正しくないものはどれですか？',
        answers: [
            'Header',
            'Payload',
            'Signature',
            'Encryption'
        ],
        correct: 3,
        explanation: 'JWTはHeader、Payload、Signatureの3つの部分から構成されます。JWTは署名されますが、暗号化はオプションです。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'セキュリティ',
        minorCategory: '認証・認可',
        question: 'OAuth 2.0で、サードパーティアプリがユーザーの代わりにリソースにアクセスするために使用するものはどれですか？',
        answers: [
            'パスワード',
            'アクセストークン',
            'Cookie',
            'セッションID'
        ],
        correct: 1,
        explanation: 'OAuth 2.0では、アクセストークンを使用してリソースサーバーにアクセスします。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'セキュリティ',
        minorCategory: '脆弱性対策',
        question: 'XSS攻撃の対策として適切でないものはどれですか？',
        answers: [
            '入力値のサニタイゼーション',
            '出力時のエスケープ処理',
            'Content Security Policyの設定',
            'SQLプリペアドステートメントの使用'
        ],
        correct: 3,
        explanation: 'SQLプリペアドステートメントはSQLインジェクション対策です。XSS対策には入力サニタイゼーション、出力エスケープ、CSPが有効です。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'セキュリティ',
        minorCategory: '脆弱性対策',
        question: 'OWASP Top 10に含まれていない脆弱性はどれですか？',
        answers: [
            'SQLインジェクション',
            'クロスサイトスクリプティング（XSS）',
            'ディレクトリトラバーサル',
            'タイポスクワッティング'
        ],
        correct: 3,
        explanation: 'タイポスクワッティングはドメイン名の悪用で、OWASP Top 10には含まれません。SQLインジェクション、XSS、パストラバーサルは含まれます。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'セキュリティ',
        minorCategory: '暗号化',
        question: 'ハッシュ関数として推奨されないものはどれですか？',
        answers: [
            'bcrypt',
            'SHA-256',
            'MD5',
            'Argon2'
        ],
        correct: 2,
        explanation: 'MD5は脆弱性が発見されており、パスワードハッシュには推奨されません。bcrypt、Argon2などを使用すべきです。'
    },

    // Cloud Infrastructure Category
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'クラウドインフラ',
        minorCategory: 'コンテナ技術',
        question: 'Dockerのマルチステージビルドの主な利点はどれですか？',
        answers: [
            'ビルド速度の低下',
            '最終イメージサイズの削減',
            'セキュリティの低下',
            'メモリ使用量の増加'
        ],
        correct: 1,
        explanation: 'マルチステージビルドは、ビルド依存関係を最終イメージに含めないため、イメージサイズを大幅に削減できます。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'クラウドインフラ',
        minorCategory: 'コンテナ技術',
        question: 'Kubernetesのリソースで、コンテナのグループを管理するものはどれですか？',
        answers: [
            'Node',
            'Pod',
            'Service',
            'Namespace'
        ],
        correct: 1,
        explanation: 'Podは1つ以上のコンテナをグループ化し、同じネットワークとストレージを共有する最小のデプロイ単位です。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'クラウドインフラ',
        minorCategory: 'CI/CD',
        question: 'ブルーグリーンデプロイメントの特徴はどれですか？',
        answers: [
            '段階的にトラフィックを新バージョンに移行',
            '2つの環境を用意し、一度に切り替え',
            '特定ユーザーのみに新機能を公開',
            'コンテナを順次再起動'
        ],
        correct: 1,
        explanation: 'ブルーグリーンデプロイメントは、本番環境（ブルー）と同一の環境（グリーン）を用意し、検証後に一度に切り替える手法です。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'クラウドインフラ',
        minorCategory: 'CI/CD',
        question: 'カナリアリリースの主な目的はどれですか？',
        answers: [
            '全ユーザーに即座に新機能を提供',
            '一部のユーザーで新バージョンを検証',
            'ダウンタイムの最大化',
            'コストの増加'
        ],
        correct: 1,
        explanation: 'カナリアリリースは、新バージョンを一部のユーザーに先行公開し、問題がないか検証してから全体に展開する手法です。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'クラウドインフラ',
        minorCategory: 'モニタリング',
        question: 'Prometheusの主な用途はどれですか？',
        answers: [
            'ログ管理',
            'メトリクス収集と監視',
            'トレーシング',
            'デプロイ自動化'
        ],
        correct: 1,
        explanation: 'Prometheusは、時系列データベースベースのメトリクス収集・監視システムで、クラウドネイティブアプリケーションの監視に広く使用されます。'
    },

    // System Design Category
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'システム設計',
        minorCategory: 'スケーラビリティ',
        question: '水平スケーリング（スケールアウト）の説明として正しいものはどれですか？',
        answers: [
            'サーバーのCPUやメモリを増強',
            'サーバーの台数を増やす',
            'データベースを1台の高性能サーバーに集約',
            'ネットワーク帯域を削減'
        ],
        correct: 1,
        explanation: '水平スケーリングは、サーバーの台数を増やして負荷を分散する手法です。垂直スケーリングはサーバーのスペックを上げる手法です。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'システム設計',
        minorCategory: 'スケーラビリティ',
        question: 'ロードバランサーの主な役割はどれですか？',
        answers: [
            'データの暗号化',
            '複数サーバーへのトラフィック分散',
            'データベースのバックアップ',
            'ログの集約'
        ],
        correct: 1,
        explanation: 'ロードバランサーは、複数のサーバーにリクエストを分散し、負荷を均等化する役割を持ちます。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'システム設計',
        minorCategory: 'マイクロサービス',
        question: 'マイクロサービスアーキテクチャの利点として正しくないものはどれですか？',
        answers: [
            '独立したデプロイが可能',
            '技術スタックの柔軟性',
            'サービス間通信のオーバーヘッドがない',
            '障害の影響範囲を限定できる'
        ],
        correct: 2,
        explanation: 'マイクロサービスはサービス間通信のオーバーヘッドが増加します。しかし、独立性、柔軟性、障害の分離などの利点があります。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'システム設計',
        minorCategory: 'マイクロサービス',
        question: 'サービス間通信パターンで、サービスが他のサービスを直接呼び出す方式はどれですか？',
        answers: [
            'イベント駆動',
            '同期的リクエスト/レスポンス',
            'メッセージキュー',
            'Pub/Sub'
        ],
        correct: 1,
        explanation: '同期的リクエスト/レスポンスは、REST APIやgRPCを使用してサービス間で直接通信する方式です。'
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'システム設計',
        minorCategory: '可用性設計',
        question: 'フェイルオーバーとフェイルバックの説明として正しいものはどれですか？',
        answers: [
            'フェイルオーバー: 障害時に予備系に切り替え、フェイルバック: 主系復旧後に戻す',
            'フェイルオーバー: バックアップ作成、フェイルバック: リストア',
            'フェイルオーバー: スケールアウト、フェイルバック: スケールイン',
            'フェイルオーバー: 負荷分散、フェイルバック: 負荷集約'
        ],
        correct: 0,
        explanation: 'フェイルオーバーは障害発生時に予備系（スタンバイ）に自動切り替えすること、フェイルバックは主系復旧後に元に戻すことです。'
    },

    // Frontend Architecture Category
    {
        majorCategory: 'フロントエンド技術',
        middleCategory: 'フロントエンド設計',
        minorCategory: '状態管理',
        question: 'Reduxの3原則に含まれないものはどれですか？',
        answers: [
            'Single source of truth',
            'State is read-only',
            'Changes are made with pure functions',
            'Components must be class-based'
        ],
        correct: 3,
        explanation: 'Reduxの3原則は、単一のストア、読み取り専用の状態、純粋関数による変更です。コンポーネントの実装方法は制約されません。'
    },
    {
        majorCategory: 'フロントエンド技術',
        middleCategory: 'フロントエンド設計',
        minorCategory: '状態管理',
        question: 'React Context APIの主な用途はどれですか？',
        answers: [
            'コンポーネント間のスタイル共有',
            'グローバル状態の管理とprop drillingの回避',
            'HTTPリクエストの送信',
            'ルーティングの管理'
        ],
        correct: 1,
        explanation: 'Context APIは、コンポーネントツリー全体でデータを共有し、深いネストでのprops渡し（prop drilling）を回避するために使用されます。'
    },
    {
        majorCategory: 'フロントエンド技術',
        middleCategory: 'フロントエンド設計',
        minorCategory: 'コンポーネント設計',
        question: 'Atomic Designのコンポーネント階層で最も小さい単位はどれですか？',
        answers: [
            'Molecules',
            'Atoms',
            'Organisms',
            'Templates'
        ],
        correct: 1,
        explanation: 'Atomic Designの階層は、Atoms（原子）が最小単位で、Molecules（分子）、Organisms（有機体）、Templates、Pagesと続きます。'
    },
    {
        majorCategory: 'フロントエンド技術',
        middleCategory: 'フロントエンド設計',
        minorCategory: 'コンポーネント設計',
        question: 'Presentational ComponentとContainer Componentの違いはどれですか？',
        answers: [
            'Presentationalはロジック、Containerは見た目を担当',
            'Presentationalは見た目、Containerはロジックとデータ取得を担当',
            '両者に違いはない',
            'Presentationalはクラス、Containerは関数コンポーネント'
        ],
        correct: 1,
        explanation: 'Presentational Componentは見た目に集中し、Container Componentはロジックやデータ取得を担当する設計パターンです。'
    },
    {
        majorCategory: 'フロントエンド技術',
        middleCategory: 'フロントエンド設計',
        minorCategory: 'パフォーマンス',
        question: 'React.memoの主な目的はどれですか？',
        answers: [
            'コンポーネントのメモリ使用量削減',
            '不要な再レンダリングの防止',
            'ストレージへのデータ保存',
            'HTTPキャッシュの管理'
        ],
        correct: 1,
        explanation: 'React.memoは、propsが変更されない限りコンポーネントの再レンダリングをスキップし、パフォーマンスを最適化します。'
    }
];

// Get unique categories with three levels
function getCategories() {
    const categories = {};
    quizData.forEach(q => {
        if (!categories[q.majorCategory]) {
            categories[q.majorCategory] = {};
        }
        if (!categories[q.majorCategory][q.middleCategory]) {
            categories[q.majorCategory][q.middleCategory] = new Set();
        }
        categories[q.majorCategory][q.middleCategory].add(q.minorCategory);
    });
    
    // Convert Sets to Arrays
    Object.keys(categories).forEach(majorKey => {
        Object.keys(categories[majorKey]).forEach(middleKey => {
            categories[majorKey][middleKey] = Array.from(categories[majorKey][middleKey]);
        });
    });
    
    return categories;
}

// Get questions by all three categories
function getQuestionsByCategory(majorCat, middleCat, minorCat) {
    return quizData.filter(q => 
        q.majorCategory === majorCat && 
        q.middleCategory === middleCat && 
        q.minorCategory === minorCat
    );
}

// App State
let currentMajorCategory = '';
let currentMiddleCategory = '';
let currentMinorCategory = '';
let currentQuestionIndex = 0;
let selectedAnswer = null;
let quizResults = [];
let shuffledAnswers = [];

// DOM Elements
const majorCategoryScreen = document.getElementById('majorCategoryScreen');
const middleCategoryScreen = document.getElementById('middleCategoryScreen');
const minorCategoryScreen = document.getElementById('minorCategoryScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const reviewScreen = document.getElementById('reviewScreen');

const majorCategoryButtons = document.getElementById('majorCategoryButtons');
const middleCategoryButtons = document.getElementById('middleCategoryButtons');
const middleCategoryTitle = document.getElementById('middleCategoryTitle');
const minorCategoryButtons = document.getElementById('minorCategoryButtons');
const minorCategoryTitle = document.getElementById('minorCategoryTitle');
const backToMajorBtn = document.getElementById('backToMajorBtn');
const backToMiddleBtn = document.getElementById('backToMiddleBtn');

const backBtn = document.getElementById('backBtn');
const submitBtn = document.getElementById('submitBtn');
const reviewBtn = document.getElementById('reviewBtn');
const homeBtn = document.getElementById('homeBtn');
const reviewBackBtn = document.getElementById('reviewBackBtn');

const progressFill = document.getElementById('progressFill');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');
const categoryTitle = document.getElementById('categoryTitle');
const categoryBreadcrumb = document.getElementById('categoryBreadcrumb');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const resultContent = document.getElementById('resultContent');
const reviewContent = document.getElementById('reviewContent');
const statsDisplay = document.getElementById('statsDisplay');
const reviewCategoryTitle = document.getElementById('reviewCategoryTitle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    setupMajorCategories();
});

// Setup Major Categories
function setupMajorCategories() {
    const categories = getCategories();
    majorCategoryButtons.innerHTML = '';
    
    Object.keys(categories).forEach((category, index) => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = category;
        btn.addEventListener('click', () => showMiddleCategories(category));
        majorCategoryButtons.appendChild(btn);
    });
}

// Show Middle Categories
function showMiddleCategories(majorCat) {
    currentMajorCategory = majorCat;
    const categories = getCategories();
    const middleCats = Object.keys(categories[majorCat]);
    
    middleCategoryTitle.textContent = `${majorCat} - 中カテゴリを選択`;
    middleCategoryButtons.innerHTML = '';
    
    middleCats.forEach(middleCat => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = middleCat;
        btn.addEventListener('click', () => showMinorCategories(majorCat, middleCat));
        middleCategoryButtons.appendChild(btn);
    });
    
    showScreen('middle');
}

// Show Minor Categories
function showMinorCategories(majorCat, middleCat) {
    currentMajorCategory = majorCat;
    currentMiddleCategory = middleCat;
    const categories = getCategories();
    const minorCats = categories[majorCat][middleCat];
    
    minorCategoryTitle.textContent = `${middleCat} - 小カテゴリを選択`;
    minorCategoryButtons.innerHTML = '';
    
    minorCats.forEach(minorCat => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = minorCat;
        btn.addEventListener('click', () => startQuiz(majorCat, middleCat, minorCat));
        minorCategoryButtons.appendChild(btn);
    });
    
    showScreen('minor');
}

// Return to Major Categories
function returnToMajorCategories() {
    showScreen('major');
}

// Return to Middle Categories
function returnToMiddleCategories() {
    if (currentMajorCategory) {
        showMiddleCategories(currentMajorCategory);
    } else {
        returnToMajorCategories();
    }
}

// Start Quiz
function startQuiz(majorCat, middleCat, minorCat) {
    currentMajorCategory = majorCat;
    currentMiddleCategory = middleCat;
    currentMinorCategory = minorCat;
    currentQuestionIndex = 0;
    quizResults = [];

    const questions = getQuestionsByCategory(majorCat, middleCat, minorCat);
    
    showScreen('quiz');
    categoryTitle.textContent = majorCat;
    categoryBreadcrumb.textContent = `${majorCat} > ${middleCat} > ${minorCat}`;
    totalQuestionsEl.textContent = questions.length;
    
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const questions = getQuestionsByCategory(currentMajorCategory, currentMiddleCategory, currentMinorCategory);
    const question = questions[currentQuestionIndex];
    
    selectedAnswer = null;
    submitBtn.style.display = 'none'; // Hide submit button
    
    // Hide explanation box
    const explanationBox = document.getElementById('explanationBox');
    if (explanationBox) {
        explanationBox.style.display = 'none';
    }
    
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    questionText.textContent = question.question;
    
    // Update progress
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Shuffle answers
    shuffledAnswers = question.answers.map((answer, index) => ({
        text: answer,
        originalIndex: index
    }));
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }
    
    // Render answers
    answersContainer.innerHTML = '';
    shuffledAnswers.forEach((answerObj, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answerObj.text;
        btn.addEventListener('click', () => selectAnswer(answerObj.originalIndex, btn));
        answersContainer.appendChild(btn);
    });
}

// Select Answer
function selectAnswer(index, btn) {
    // Prevent selecting another answer if already answered
    if (selectedAnswer !== null) return;
    
    selectedAnswer = index;
    
    const questions = getQuestionsByCategory(currentMajorCategory, currentMiddleCategory, currentMinorCategory);
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correct;
    
    // Record result
    quizResults.push({
        questionIndex: currentQuestionIndex,
        selectedAnswer: selectedAnswer,
        correct: isCorrect
    });
    
    // Show correct/incorrect immediately
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach((button, displayIndex) => {
        button.classList.add('disabled');
        const originalIndex = shuffledAnswers[displayIndex].originalIndex;
        
        if (originalIndex === question.correct) {
            button.classList.add('correct');
        } else if (originalIndex === selectedAnswer && !isCorrect) {
            button.classList.add('incorrect');
        }
    });
    
    // Hide submit button and show explanation
    submitBtn.style.display = 'none';
    showExplanation(question, isCorrect);
    
    // Auto-advance to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    }, 3000);
}

// Show Explanation
function showExplanation(question, isCorrect) {
    const explanationDiv = document.getElementById('explanationBox');
    if (!explanationDiv) {
        // Create explanation box if it doesn't exist
        const box = document.createElement('div');
        box.id = 'explanationBox';
        box.className = 'explanation-box';
        document.querySelector('.quiz-content').appendChild(box);
    }
    
    const explanationBox = document.getElementById('explanationBox');
    explanationBox.innerHTML = `
        <div class="explanation-result ${isCorrect ? 'correct-result' : 'incorrect-result'}">
            ${isCorrect ? '✓ 正解！' : '✗ 不正解'}
        </div>
        <div class="explanation-text">
            <strong>解説:</strong> ${question.explanation}
        </div>
        <div class="explanation-correct-answer">
            <strong>正解:</strong> ${question.answers[question.correct]}
        </div>
    `;
    explanationBox.style.display = 'block';
}

// Submit Answer (kept for compatibility but hidden)
function submitAnswer() {
    // This function is no longer used as answers are checked immediately
}

// Finish Quiz
function finishQuiz() {
    const correctCount = quizResults.filter(r => r.correct).length;
    const totalCount = quizResults.length;
    const percentage = Math.round((correctCount / totalCount) * 100);
    
    saveQuizResult(currentMajorCategory, currentMiddleCategory, currentMinorCategory, correctCount, totalCount);
    
    showScreen('result');
    
    let message = '';
    if (percentage >= 90) {
        message = '素晴らしい！完璧に近い理解度です！';
    } else if (percentage >= 70) {
        message = 'よくできました！良い理解度です。';
    } else if (percentage >= 50) {
        message = 'まずまずです。復習してさらに理解を深めましょう。';
    } else {
        message = 'もう少し頑張りましょう。復習をおすすめします。';
    }
    
    resultContent.innerHTML = `
        <div class="result-score">${correctCount} / ${totalCount}</div>
        <div class="result-message">${message}</div>
        <div class="result-details">
            <h3>正解率: ${percentage}%</h3>
            <p>${currentMajorCategory} > ${currentMiddleCategory} > ${currentMinorCategory}</p>
        </div>
    `;
}

// Show Review
function showReview() {
    showScreen('review');
    reviewCategoryTitle.textContent = `${currentMajorCategory} > ${currentMiddleCategory} > ${currentMinorCategory} - 復習`;
    
    const questions = getQuestionsByCategory(currentMajorCategory, currentMiddleCategory, currentMinorCategory);
    
    reviewContent.innerHTML = '';
    questions.forEach((question, index) => {
        const result = quizResults[index];
        const isCorrect = result.correct;
        
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item' + (isCorrect ? '' : ' incorrect');
        
        const answersHtml = question.answers.map((answer, ansIndex) => {
            let className = 'review-answer';
            if (ansIndex === question.correct) {
                className += ' correct';
            } else if (ansIndex === result.selectedAnswer && !isCorrect) {
                className += ' selected-incorrect';
            } else {
                className += ' not-selected';
            }
            
            return `<div class="${className}">${answer}</div>`;
        }).join('');
        
        reviewItem.innerHTML = `
            <div class="review-question">
                問題 ${index + 1}: ${question.question}
            </div>
            <div class="review-answers">
                ${answersHtml}
            </div>
            <div class="review-explanation">
                <strong>解説:</strong> ${question.explanation}
            </div>
        `;
        
        reviewContent.appendChild(reviewItem);
    });
}

// Return to Results
function returnToResults() {
    showScreen('result');
}

// Return to Categories
function returnToCategories() {
    showScreen('major');
    loadStats();
}

// Save Quiz Result to localStorage
function saveQuizResult(majorCat, middleCat, minorCat, correct, total) {
    const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
    const key = `${majorCat}::${middleCat}::${minorCat}`;
    
    if (!results[key]) {
        results[key] = {
            majorCategory: majorCat,
            middleCategory: middleCat,
            minorCategory: minorCat,
            attempts: 0,
            totalCorrect: 0,
            totalQuestions: 0
        };
    }
    
    results[key].attempts++;
    results[key].totalCorrect += correct;
    results[key].totalQuestions += total;
    
    localStorage.setItem('quizResults', JSON.stringify(results));
}

// Load Stats
function loadStats() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
    
    if (Object.keys(results).length === 0) {
        statsDisplay.innerHTML = '<p style="text-align: center; color: #666;">まだ統計情報がありません</p>';
        return;
    }
    
    statsDisplay.innerHTML = '';
    
    // Group by major category, then middle category
    const grouped = {};
    Object.values(results).forEach(result => {
        if (!grouped[result.majorCategory]) {
            grouped[result.majorCategory] = {};
        }
        if (!grouped[result.majorCategory][result.middleCategory]) {
            grouped[result.majorCategory][result.middleCategory] = [];
        }
        grouped[result.majorCategory][result.middleCategory].push(result);
    });
    
    Object.keys(grouped).forEach(majorCat => {
        const majorItem = document.createElement('div');
        majorItem.style.marginBottom = '20px';
        
        const majorTitle = document.createElement('h4');
        majorTitle.textContent = majorCat;
        majorTitle.style.marginBottom = '10px';
        majorTitle.style.color = '#667eea';
        majorTitle.style.fontWeight = 'bold';
        majorItem.appendChild(majorTitle);
        
        Object.keys(grouped[majorCat]).forEach(middleCat => {
            const middleTitle = document.createElement('h5');
            middleTitle.textContent = middleCat;
            middleTitle.style.marginBottom = '5px';
            middleTitle.style.marginLeft = '15px';
            middleTitle.style.color = '#764ba2';
            majorItem.appendChild(middleTitle);
            
            grouped[majorCat][middleCat].forEach(result => {
                const avgPercentage = Math.round((result.totalCorrect / result.totalQuestions) * 100);
                const statItem = document.createElement('div');
                statItem.className = 'stat-item';
                statItem.style.marginLeft = '20px';
                statItem.innerHTML = `
                    <span class="category-name">${result.minorCategory}</span>
                    <span class="score">平均正解率: ${avgPercentage}% (${result.attempts}回挑戦)</span>
                `;
                majorItem.appendChild(statItem);
            });
        });
        
        statsDisplay.appendChild(majorItem);
    });
}

// Show Screen
function showScreen(screen) {
    majorCategoryScreen.classList.remove('active');
    middleCategoryScreen.classList.remove('active');
    minorCategoryScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    reviewScreen.classList.remove('active');
    
    switch (screen) {
        case 'major':
            majorCategoryScreen.classList.add('active');
            break;
        case 'middle':
            middleCategoryScreen.classList.add('active');
            break;
        case 'minor':
            minorCategoryScreen.classList.add('active');
            break;
        case 'quiz':
            quizScreen.classList.add('active');
            break;
        case 'result':
            resultScreen.classList.add('active');
            break;
        case 'review':
            reviewScreen.classList.add('active');
            break;
    }
}

// Event Listeners
backToMajorBtn.addEventListener('click', returnToMajorCategories);
backToMiddleBtn.addEventListener('click', returnToMiddleCategories);
backBtn.addEventListener('click', () => {
    if (currentMiddleCategory && currentMinorCategory) {
        showMinorCategories(currentMajorCategory, currentMiddleCategory);
    } else if (currentMajorCategory) {
        showMiddleCategories(currentMajorCategory);
    } else {
        returnToCategories();
    }
});
submitBtn.addEventListener('click', submitAnswer);
reviewBtn.addEventListener('click', showReview);
homeBtn.addEventListener('click', returnToCategories);
reviewBackBtn.addEventListener('click', returnToResults);
