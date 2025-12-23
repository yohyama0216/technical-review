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
            '更新時のオーバーヘッドがない',
        ],
        correct: 0,
        explanation:
            'B-Treeインデックスは範囲検索、完全一致検索の両方に適しており、データベースで最も一般的に使用されるインデックスタイプです。',
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
            '更新処理が速くなるため',
        ],
        correct: 1,
        explanation:
            'カーディナリティが高い（ユニークな値が多い）カラムにインデックスを作成すると、検索時に絞り込みが効率的に行えます。',
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
            'データの暗号化',
        ],
        correct: 1,
        explanation:
            'EXPLAINコマンドは、SQLクエリの実行計画を表示し、インデックスの使用状況やパフォーマンスの分析に使用されます。',
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
            'データベース接続の切断',
        ],
        correct: 1,
        explanation:
            'N+1問題は、親レコードを取得後、各親に対して関連レコードを個別にクエリすることで発生します。JOINやeager loadingで解決できます。',
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
            'Indexing（索引）',
        ],
        correct: 1,
        explanation:
            'ACIDのIはIsolation（分離性）を表し、複数のトランザクションが並行実行されても互いに影響を与えないことを保証します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'トランザクション',
        question: 'デッドロックが発生する条件として正しくないものはどれですか？',
        answers: ['相互排除', '保持と待機', 'ノンプリエンプション', 'シングルスレッド実行'],
        correct: 3,
        explanation:
            'デッドロックの4つの条件は、相互排除、保持と待機、ノンプリエンプション、循環待機です。シングルスレッド実行では発生しません。',
    },

    // Backend Technology -> DB Performance Category
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'クエリ最適化',
        question: 'クエリのパフォーマンスチューニングで最初に確認すべきことはどれですか？',
        answers: [
            'サーバーのメモリ増設',
            'インデックスの有無と実行計画',
            'データベースの再起動',
            'ハードウェアの交換',
        ],
        correct: 1,
        explanation:
            'クエリチューニングでは、まずEXPLAINでインデックスが使用されているか、実行計画が適切かを確認することが重要です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'インデックス最適化',
        question: '複合インデックスで効率的な検索を行うための原則はどれですか？',
        answers: [
            '検索条件の順序は関係ない',
            'カーディナリティが低い列を先頭にする',
            'カーディナリティが高い列を先頭にする',
            '常にすべての列にインデックスを作成',
        ],
        correct: 2,
        explanation:
            '複合インデックスでは、カーディナリティが高い（選択性が高い）列を先頭に配置すると、効率的に絞り込めます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'カバリングインデックス（Covering Index）の利点はどれですか？',
        answers: [
            'インデックスサイズを小さくできる',
            'テーブルへのアクセスなしでクエリを完結できる',
            '更新処理が高速化される',
            'ディスク容量を節約できる',
        ],
        correct: 1,
        explanation:
            'カバリングインデックスは、クエリで必要なすべての列をインデックスに含めることで、テーブル本体へのアクセスを回避し、パフォーマンスを向上させます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'ハッシュインデックスの特徴として正しいものはどれですか？',
        answers: [
            '範囲検索に最適',
            '完全一致検索に特化し、非常に高速',
            'ソート操作が高速',
            'データ圧縮に優れている',
        ],
        correct: 1,
        explanation:
            'ハッシュインデックスは完全一致検索に特化しており、O(1)の時間複雑度で非常に高速ですが、範囲検索やソートには使用できません。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'パーシャルインデックス（部分インデックス）を使用する主な理由はどれですか？',
        answers: [
            '全データにインデックスを作成するため',
            '特定の条件を満たす行のみをインデックス化してストレージを節約',
            'インデックスの作成速度を上げるため',
            'セキュリティを向上させるため',
        ],
        correct: 1,
        explanation:
            'パーシャルインデックスは、WHERE条件で指定した特定の行のみをインデックス化することで、ストレージ効率とパフォーマンスを向上させます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'インデックス最適化',
        question:
            'インデックスのフラグメンテーション（断片化）が発生した場合の対処法はどれですか？',
        answers: [
            'インデックスを削除する',
            'インデックスを再構築またはリオーガナイズする',
            'データベースを再起動する',
            'テーブルをドロップする',
        ],
        correct: 1,
        explanation:
            'インデックスのフラグメンテーションは、REBUILD（再構築）やREORGANIZE（リオーガナイズ）によって解消でき、検索パフォーマンスを回復できます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'インデックス最適化',
        question:
            '複合インデックス(A, B, C)が存在する場合、効率的に利用できるクエリ条件はどれですか？',
        answers: ['WHERE B = ? AND C = ?', 'WHERE C = ?', 'WHERE A = ? AND B = ?', 'WHERE B = ?'],
        correct: 2,
        explanation:
            '複合インデックスは左端の列から順に利用されます。(A, B, C)のインデックスは、A単独、AとB、AとBとCの検索に有効ですが、BやCから始まる条件では効率的に使えません。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: 'データベース接続プールの主な利点はどれですか？',
        answers: [
            '接続数を無制限に増やせる',
            '接続の作成・破棄のオーバーヘッドを削減',
            'セキュリティの向上',
            'ストレージ容量の削減',
        ],
        correct: 1,
        explanation:
            '接続プールは接続を再利用することで、接続の作成・破棄に伴うオーバーヘッドを削減し、パフォーマンスを向上させます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: '接続プールのサイズを決定する際に考慮すべき要素はどれですか？',
        answers: [
            '開発者の人数',
            'アプリケーションの同時リクエスト数とデータベースの処理能力',
            'コードの行数',
            'テーブルの数',
        ],
        correct: 1,
        explanation:
            '接続プールのサイズは、アプリケーションの同時リクエスト数、データベースサーバーの処理能力、ハードウェアリソースなどを考慮して決定します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: '接続リークが発生する主な原因はどれですか？',
        answers: [
            '接続プールのサイズが大きすぎる',
            '接続を使用後に適切にクローズしない',
            '接続プールを使用している',
            'トランザクションを使用している',
        ],
        correct: 1,
        explanation:
            '接続リークは、データベース接続を使用後に適切にクローズしないことで発生します。finally句やtry-with-resourcesで確実にクローズすることが重要です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: '接続タイムアウトの設定が重要な理由はどれですか？',
        answers: [
            'パフォーマンスを向上させるため',
            '無応答の接続がリソースを占有し続けるのを防ぐため',
            'セキュリティを強化するため',
            'ログを詳細に記録するため',
        ],
        correct: 1,
        explanation:
            '接続タイムアウトを設定することで、ネットワーク障害などで無応答になった接続がリソースを占有し続けることを防ぎます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: '読み取り専用レプリカを使用する主な目的はどれですか？',
        answers: [
            'データのバックアップ',
            '読み取り負荷を分散し、マスターの負担を軽減',
            'データの暗号化',
            'ストレージ容量の削減',
        ],
        correct: 1,
        explanation:
            '読み取り専用レプリカは、SELECT クエリの負荷をマスターデータベースから分散させ、システム全体のパフォーマンスを向上させます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: 'コネクションプールのアイドルタイムアウトを設定する目的はどれですか？',
        answers: [
            '使用されていない接続を自動的に解放してリソースを節約',
            '接続速度を向上させる',
            'データの整合性を保つ',
            'トランザクション処理を高速化',
        ],
        correct: 0,
        explanation:
            'アイドルタイムアウトは、一定時間使用されていない接続を自動的に閉じることで、不要なリソース消費を防ぎます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: 'データベース接続のヘルスチェックを行う理由はどれですか？',
        answers: [
            '無効な接続をプールから除外し、アプリケーションエラーを防ぐ',
            'セキュリティを強化する',
            'クエリを高速化する',
            'ストレージを最適化する',
        ],
        correct: 0,
        explanation:
            'ヘルスチェックにより、ネットワーク切断などで無効になった接続を検出し、プールから除外することで、アプリケーションの安定性を保ちます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: 'マイクロサービスアーキテクチャにおける接続管理のベストプラクティスはどれですか？',
        answers: [
            '全サービスで単一の巨大な接続プールを共有',
            '各サービスが独自の接続プールを持ち、適切にサイズ設定',
            '接続プールを使用しない',
            '全てのサービスが同じ接続を使い回す',
        ],
        correct: 1,
        explanation:
            'マイクロサービスでは、各サービスが独自の接続プールを持ち、そのサービスの負荷に応じて適切にサイズ設定することが推奨されます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: '接続プールの最小接続数（min pool size）を設定する目的はどれですか？',
        answers: [
            'メモリを節約する',
            '初期応答時間を短縮し、常に即座に利用可能な接続を確保',
            'セキュリティを向上させる',
            'データベースの負荷を増やす',
        ],
        correct: 1,
        explanation:
            '最小接続数を設定することで、リクエストが来た際に接続作成を待つ必要がなく、初期応答時間を短縮できます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: 'データベース接続のSSL/TLS暗号化を有効にする主な理由はどれですか？',
        answers: [
            'クエリのパフォーマンスを向上',
            'ネットワーク経由のデータ転送を暗号化しセキュリティを強化',
            'ストレージ容量を削減',
            '接続速度を向上',
        ],
        correct: 1,
        explanation:
            'SSL/TLS暗号化により、データベースとアプリケーション間の通信が暗号化され、盗聴や改ざんから保護されます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: '長時間実行されるクエリの接続管理で注意すべきことはどれですか？',
        answers: [
            '通常の接続プールとは別の専用接続を使用するか、タイムアウトを調整',
            '必ず接続プールの最小サイズを使用',
            '接続プールを使用しない',
            '全ての接続を長時間用に設定',
        ],
        correct: 0,
        explanation:
            '長時間クエリは接続を占有するため、通常のトランザクション用とは別の接続を使用するか、適切なタイムアウトを設定することが推奨されます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: 'データベース接続の認証情報を安全に管理する方法はどれですか？',
        answers: [
            'ソースコードに直接記述',
            '環境変数やシークレット管理サービス（AWS Secrets Manager等）を使用',
            'プレーンテキストファイルに保存',
            '全ての開発者に共有',
        ],
        correct: 1,
        explanation:
            '認証情報は環境変数や専用のシークレット管理サービスで管理し、ソースコードやリポジトリに含めないことが重要です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: '接続プールの待機キュー（wait queue）が満杯になった場合の適切な対処はどれですか？',
        answers: [
            'アプリケーションをクラッシュさせる',
            'タイムアウトエラーを返し、適切なエラーハンドリングを行う',
            '無限に待機し続ける',
            'データベースを再起動する',
        ],
        correct: 1,
        explanation:
            '待機キューが満杯の場合、タイムアウトエラーを適切に処理し、ユーザーに適切なメッセージを表示することが重要です。また、接続プールサイズの見直しも検討します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: 'ステートメントキャッシュ（準備済みステートメントのキャッシュ）の利点はどれですか？',
        answers: [
            'ディスク容量の削減',
            '同じクエリの解析・コンパイルを省略してパフォーマンス向上',
            'セキュリティの低下',
            'メモリ使用量の削減',
        ],
        correct: 1,
        explanation:
            'ステートメントキャッシュにより、繰り返し実行されるクエリの解析とコンパイルを省略でき、パフォーマンスが向上します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: 'データベース接続のモニタリングで追跡すべき重要なメトリクスはどれですか？',
        answers: [
            'コードの行数',
            'アクティブ接続数、待機接続数、接続エラー率',
            '開発者の数',
            'テーブルの名前の長さ',
        ],
        correct: 1,
        explanation:
            '接続管理では、アクティブ接続数、プール内の待機接続数、接続取得時間、接続エラー率などをモニタリングすることが重要です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: 'N個のアプリケーションインスタンスがある場合の接続プールサイズの考慮事項はどれですか？',
        answers: [
            '各インスタンスのプールサイズ × インスタンス数がDBの最大接続数を超えないよう設定',
            '全インスタンスで同じ固定値を使用',
            'インスタンス数は無関係',
            '最大値に設定',
        ],
        correct: 0,
        explanation:
            '複数のアプリケーションインスタンスがある場合、各インスタンスの接続プールサイズの合計がデータベースの最大接続数を超えないよう計画する必要があります。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: 'サーバーレス環境（AWS Lambda等）でのデータベース接続のベストプラクティスはどれですか？',
        answers: [
            '各Lambda実行で新しい接続を作成',
            'RDS Proxyなどの接続プーリングサービスを使用',
            '接続プールを使用しない',
            '永続的な接続を保持',
        ],
        correct: 1,
        explanation:
            'サーバーレス環境では関数の並行実行により接続数が急増する可能性があるため、RDS ProxyやAurora Serverlessなどの接続管理サービスの使用が推奨されます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: '接続プールの検証クエリ（validation query）を設定する目的はどれですか？',
        answers: [
            'データの整合性を確認',
            '接続が有効かどうかを確認し、無効な接続の使用を防ぐ',
            'パフォーマンスを測定',
            'ログを記録',
        ],
        correct: 1,
        explanation:
            '検証クエリ（例：SELECT 1）により、プールから取得した接続が実際に使用可能かを確認し、タイムアウトした接続による エラーを防ぎます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: 'トランザクションのコミット後に接続をプールに返却する重要性はどれですか？',
        answers: [
            'メモリリークを防ぐ',
            '他のリクエストが接続を再利用でき、リソースを効率的に使用',
            'セキュリティを強化',
            'データを暗号化',
        ],
        correct: 1,
        explanation:
            'トランザクション完了後に速やかに接続をプールに返却することで、他のリクエストがその接続を再利用でき、システム全体のスループットが向上します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: 'データベース接続の圧縮を有効にする利点はどれですか？',
        answers: [
            'CPU使用率の削減',
            'ネットワーク帯域幅の削減とデータ転送の高速化',
            'ストレージ容量の削減',
            'クエリ実行時間の短縮',
        ],
        correct: 1,
        explanation:
            '接続レベルでの圧縮により、特に大量のデータを転送する場合にネットワーク帯域幅を節約し、全体的な転送時間を短縮できます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: '接続管理',
        question: '接続プールの最大接続数（max pool size）を無制限に設定すべきでない理由はどれですか？',
        answers: [
            'コストが高くなる',
            'データベースサーバーのリソース（メモリ、CPU）が枯渇する可能性',
            'セキュリティリスクが増加',
            'コードが複雑になる',
        ],
        correct: 1,
        explanation:
            '接続数が多すぎるとデータベースサーバーのメモリやCPUリソースが枯渇し、全体のパフォーマンスが低下します。適切な上限設定が重要です。',
    },

    // Backend Technology -> API Design Category
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIでリソースの一覧を取得するHTTPメソッドはどれですか？',
        answers: ['POST', 'GET', 'PUT', 'DELETE'],
        correct: 1,
        explanation: 'GETメソッドはリソースの取得に使用され、副作用がなく冪等性があります。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIでユーザー一覧を取得するエンドポイントとして適切なものはどれですか？',
        answers: ['/getUsers', '/users', '/fetchAllUsers', '/retrieveUserList'],
        correct: 1,
        explanation:
            'RESTful APIでは、リソースを名詞で表現し、HTTPメソッドで操作を示します。/usersが適切です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIでHTTP PUTメソッドの特徴として正しいものはどれですか？',
        answers: ['常に新規作成', '冪等性がある', '部分更新のみ', '削除に使用'],
        correct: 1,
        explanation:
            'PUTは冪等性を持ち、同じリクエストを複数回送っても結果が同じになります。通常、リソース全体の更新に使用されます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIでHTTP PATCHメソッドの用途はどれですか？',
        answers: ['リソースの削除', 'リソースの部分更新', 'リソースの完全置換', 'リソースの取得'],
        correct: 1,
        explanation:
            'PATCHはリソースの部分更新に使用され、PUTとは異なり変更したい部分のみを送信できます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIで適切なURLの命名規則はどれですか？',
        answers: [
            '動詞を使う（/createUser）',
            '名詞の複数形を使う（/users）',
            '全て大文字（/USERS）',
            'ファイル拡張子を含める（/users.json）',
        ],
        correct: 1,
        explanation:
            'RESTful APIでは、リソースを名詞の複数形で表現し、動作はHTTPメソッドで表現します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'ステータスコード201 Createdを返すべき場面はどれですか？',
        answers: ['リソースの取得成功', 'リソースの新規作成成功', 'リソースの更新成功', 'リソースの削除成功'],
        correct: 1,
        explanation:
            '201 Createdは、POSTリクエストで新しいリソースが正常に作成された際に返されます。Locationヘッダーで新リソースのURIを示します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'ステータスコード204 No Contentの適切な使用場面はどれですか？',
        answers: [
            'エラー発生時',
            '成功したが返すコンテンツがない時（DELETE成功等）',
            'リダイレクト時',
            '認証エラー時',
        ],
        correct: 1,
        explanation:
            '204 No Contentは、リクエストは成功したが返すべきコンテンツがない場合に使用されます。DELETEの成功時によく使われます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIのHATEOAS原則とは何ですか？',
        answers: [
            '暗号化の原則',
            'ハイパーメディアで関連リソースへのリンクを提供',
            '高速化の技術',
            'セキュリティプロトコル',
        ],
        correct: 1,
        explanation:
            'HATEOASは、レスポンスに次に可能なアクションへのハイパーリンクを含めることで、APIの自己記述性を高める原則です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIで適切なページネーションの実装方法はどれですか？',
        answers: [
            '全データを一度に返す',
            'クエリパラメータでpage, limitを指定',
            'POST bodyで指定',
            'Cookieで管理',
        ],
        correct: 1,
        explanation:
            'ページネーションは、クエリパラメータ（?page=1&limit=20）で実装し、レスポンスには総ページ数や次ページのリンクを含めます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTfulなフィルタリングの実装方法として適切なものはどれですか？',
        answers: [
            'POSTボディに条件を記述',
            'クエリパラメータで条件を指定',
            'ヘッダーで指定',
            '専用のフィルター用エンドポイント',
        ],
        correct: 1,
        explanation:
            'フィルタリングはクエリパラメータ（?status=active&role=admin）で実装するのが一般的です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIでソート順を指定する方法として適切なものはどれですか？',
        answers: [
            'POSTボディで指定',
            'クエリパラメータ（?sort=created_at&order=desc）',
            'HTTPヘッダー',
            'Cookie',
        ],
        correct: 1,
        explanation:
            'ソート順はクエリパラメータで指定し、複数フィールドのソートにも対応できるようにします。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'ステータスコード304 Not Modifiedの用途は何ですか？',
        answers: [
            'エラー通知',
            'キャッシュが有効でリソース未変更を示す',
            'リダイレクト',
            '認証要求',
        ],
        correct: 1,
        explanation:
            '304 Not Modifiedは、クライアントのキャッシュが有効であり、リソースが変更されていないことを示します。If-Modified-SinceやETagと組み合わせて使用します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIでサブリソースの表現として適切なものはどれですか？',
        answers: [
            '/users-comments/1',
            '/users/1/comments',
            '/comments?user_id=1のみ',
            '/getUserComments/1',
        ],
        correct: 1,
        explanation:
            'サブリソースは親リソースのパスの下に配置します（/users/{userId}/comments）。これにより階層関係が明確になります。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIでバルク操作を実装する方法として適切なものはどれですか？',
        answers: [
            '複数のPOSTリクエストを送信',
            'POSTで配列を送信',
            'GETで複数ID指定',
            '専用のバルクエンドポイント',
        ],
        correct: 1,
        explanation:
            'バルク操作は、POSTリクエストのボディに配列を含めるか、専用のバルクエンドポイント（/users/bulk）を用意します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'ステータスコード409 Conflictを返すべき状況はどれですか？',
        answers: [
            '認証失敗',
            'リソースの状態競合や重複作成時',
            '不正なリクエスト',
            'リソースが見つからない',
        ],
        correct: 1,
        explanation:
            '409 Conflictは、リクエストがリソースの現在の状態と矛盾する場合（例：既に存在するメールアドレスでの登録）に返されます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIでカスタムHTTPヘッダーの命名規則はどれですか？',
        answers: [
            '小文字のみ',
            'X-プレフィックス（非推奨だが広く使用）',
            '全て大文字',
            '数字始まり',
        ],
        correct: 1,
        explanation:
            'カスタムヘッダーには従来X-プレフィックスが使われましたが、現在は非推奨です。ただし広く使用されています。ベンダー固有の名前空間を使うこともあります。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIでのレート制限情報の伝達方法として適切なものはどれですか？',
        answers: [
            'エラーメッセージに含める',
            'X-RateLimit-*ヘッダーを使用',
            'Cookieで管理',
            'URLパラメータ',
        ],
        correct: 1,
        explanation:
            'レート制限は、X-RateLimit-Limit、X-RateLimit-Remaining、X-RateLimit-Resetなどのヘッダーで伝達します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIで条件付きリクエストに使用するヘッダーはどれですか？',
        answers: [
            'Authorization',
            'If-Match / If-None-Match（ETag）',
            'Content-Type',
            'User-Agent',
        ],
        correct: 1,
        explanation:
            'If-MatchやIf-None-MatchヘッダーをETagと組み合わせて使用することで、条件付きリクエストを実現できます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIでのエラーレスポンスの構造として適切なものはどれですか？',
        answers: [
            'エラーメッセージのみ',
            'エラーコード、メッセージ、詳細を含むJSON',
            'HTMLエラーページ',
            'ステータスコードのみ',
        ],
        correct: 1,
        explanation:
            'エラーレスポンスには、エラーコード、人間が読めるメッセージ、詳細情報、関連ドキュメントへのリンクなどを含むJSON構造が推奨されます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'RESTful設計',
        question: 'RESTful APIでコンテンツネゴシエーションに使用するヘッダーはどれですか？',
        answers: [
            'Authorization',
            'Accept（クライアント）とContent-Type（サーバー）',
            'User-Agent',
            'Cookie',
        ],
        correct: 1,
        explanation:
            'クライアントはAcceptヘッダーで希望する形式（application/json等）を指定し、サーバーはContent-Typeヘッダーで実際の形式を返します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'API認証エラーに適したHTTPステータスコードはどれですか？',
        answers: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '404 Not Found'],
        correct: 1,
        explanation:
            '401 Unauthorizedは認証が必要、または認証に失敗したことを示します。403は認証されているが権限がない場合です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'サーバー内部エラーを示すHTTPステータスコードはどれですか？',
        answers: ['400', '404', '500', '503'],
        correct: 2,
        explanation:
            '500 Internal Server Errorは、サーバー側で予期しないエラーが発生したことを示します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'APIで入力値のバリデーションエラーに適したHTTPステータスコードはどれですか？',
        answers: ['500', '400 Bad Request', '401', '404'],
        correct: 1,
        explanation:
            '400 Bad Requestは、クライアントのリクエストが不正（バリデーションエラー等）な場合に使用します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'ステータスコード422 Unprocessable Entityの用途はどれですか？',
        answers: [
            'サーバーエラー',
            '文法は正しいが意味的に処理できないリクエスト',
            'サービス停止',
            'リダイレクト',
        ],
        correct: 1,
        explanation:
            '422は、リクエストの文法は正しいが、意味的なエラー（ビジネスロジック違反等）で処理できない場合に使用されます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'ステータスコード429 Too Many Requestsの意味はどれですか？',
        answers: ['リソース不足', 'レート制限超過', '認証失敗', '不正なリクエスト'],
        correct: 1,
        explanation:
            '429は、クライアントが短時間に送信したリクエストが多すぎる（レート制限超過）ことを示します。Retry-Afterヘッダーで再試行時間を示すことができます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'ステータスコード503 Service Unavailableを返すべき状況はどれですか？',
        answers: [
            '認証エラー',
            'メンテナンス中やサーバー過負荷',
            'リソースが見つからない',
            '不正なリクエスト',
        ],
        correct: 1,
        explanation:
            '503は、サーバーが一時的に利用できない状態（メンテナンス、過負荷等）を示します。Retry-Afterヘッダーで復旧予定時刻を伝えられます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'APIエラーレスポンスに含めるべき情報として適切でないものはどれですか？',
        answers: [
            'エラーコード',
            'エラーメッセージ',
            'スタックトレース（本番環境）',
            'エラー詳細',
        ],
        correct: 2,
        explanation:
            '本番環境では、セキュリティリスクを避けるためスタックトレースを返すべきではありません。ログには記録し、エラーIDで紐付けます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'グローバルエラーハンドラーを実装する主な目的はどれですか？',
        answers: [
            'パフォーマンス向上',
            '捕捉されていない例外を一元的に処理',
            'セキュリティ強化のみ',
            'ログ削減',
        ],
        correct: 1,
        explanation:
            'グローバルエラーハンドラーにより、予期しない例外を一箇所で捕捉し、適切なエラーレスポンスを返し、ログを記録できます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'APIでタイムアウトエラーに適したステータスコードはどれですか？',
        answers: ['500', '504 Gateway Timeout', '400', '401'],
        correct: 1,
        explanation: '504 Gateway Timeoutは、上流サーバーからの応答がタイムアウトした場合に使用します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'ステータスコード403 Forbiddenを返すべき状況はどれですか？',
        answers: [
            '認証情報がない',
            '認証済みだが権限不足',
            'リソースが見つからない',
            'サーバーエラー',
        ],
        correct: 1,
        explanation:
            '403は、ユーザーは認証されているが、リソースへのアクセス権限がない場合に使用します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'エラーログに記録すべき情報として適切なものはどれですか？',
        answers: [
            'ユーザーのパスワード',
            'タイムスタンプ、ユーザーID、エラー詳細、リクエスト情報',
            'クレジットカード番号',
            'なし',
        ],
        correct: 1,
        explanation:
            'エラーログには、問題の調査に必要な情報（時刻、ユーザー、エラー詳細、リクエスト）を記録しますが、機密情報は除外します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'APIでのサーキットブレーカーパターンの目的はどれですか？',
        answers: [
            'セキュリティ向上',
            '障害の連鎖を防ぎシステムを保護',
            'パフォーマンス向上のみ',
            'ログ管理',
        ],
        correct: 1,
        explanation:
            'サーキットブレーカーは、依存サービスの障害時に即座にエラーを返すことで、タイムアウト待ちによるリソース枯渇を防ぎます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'APIエラーの相関ID（correlation ID）を使用する目的はどれですか？',
        answers: [
            'セキュリティトークン',
            '複数のサービスやログをまたいでリクエストを追跡',
            'キャッシュキー',
            'セッション管理',
        ],
        correct: 1,
        explanation:
            '相関IDにより、マイクロサービス環境で1つのリクエストが複数のサービスにまたがる場合でも、ログを追跡できます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'APIでリトライロジックを実装する際の注意点はどれですか？',
        answers: [
            '無限にリトライ',
            '指数バックオフとジッター（ランダム遅延）を使用',
            '即座にリトライ',
            'リトライしない',
        ],
        correct: 1,
        explanation:
            'リトライは指数バックオフ（待ち時間を徐々に増やす）とジッターを使用して、サーバー過負荷を防ぎます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'APIでのバリデーションエラーの詳細を返す際の適切な形式はどれですか？',
        answers: [
            '文字列のみ',
            'フィールドごとのエラーメッセージを含むJSON配列/オブジェクト',
            'HTMLエラーページ',
            'エラーコードのみ',
        ],
        correct: 1,
        explanation:
            'フィールドごとのエラーを明示することで、クライアント側で適切にエラーを表示できます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'APIでの楽観的ロックの実装に使用するHTTPヘッダーはどれですか？',
        answers: ['Authorization', 'ETag / If-Match', 'Content-Type', 'User-Agent'],
        correct: 1,
        explanation:
            'ETagとIf-Matchヘッダーを使用することで、楽観的ロックを実装し、競合を検出できます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'ステータスコード410 Goneの意味はどれですか？',
        answers: [
            '一時的に利用不可',
            'リソースが永久に削除された',
            'サーバーエラー',
            'リダイレクト',
        ],
        correct: 1,
        explanation:
            '410 Goneは、リソースがかつて存在したが永久に削除され、今後も利用できないことを示します。404との違いは意図的な削除である点です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'APIでのグレースフルデグラデーション（段階的機能縮退）の例はどれですか？',
        answers: [
            '全機能停止',
            '重要な機能は維持し、補助的な機能を一時無効化',
            '即座にエラー',
            'リダイレクト',
        ],
        correct: 1,
        explanation:
            'グレースフルデグラデーションにより、依存サービスの障害時でもコア機能を提供し続けることができます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'APIでのエラー処理でDRY原則を適用する方法はどれですか？',
        answers: [
            '各エンドポイントで個別にエラー処理',
            'ミドルウェアやグローバルハンドラーで共通化',
            'エラー処理をしない',
            '全てtry-catchで囲む',
        ],
        correct: 1,
        explanation:
            'エラー処理ロジックをミドルウェアやグローバルハンドラーに集約することで、コードの重複を避け、一貫性を保てます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'エラーハンドリング',
        question: 'APIでのエラーモニタリングで追跡すべき重要なメトリクスはどれですか？',
        answers: [
            'コード行数',
            'エラー率、エラー種別、レスポンス時間、影響を受けたユーザー数',
            'サーバーの色',
            '開発者の数',
        ],
        correct: 1,
        explanation:
            'エラー率、エラーの種類、レスポンス時間、影響範囲などを追跡することで、問題の早期発見と対応が可能になります。',
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
            'リクエストボディに必ずバージョンを含める',
        ],
        correct: 3,
        explanation:
            'リクエストボディにバージョンを含める方法は一般的ではありません。URLパス、ヘッダー、クエリパラメータが主流です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'セマンティックバージョニング（Semantic Versioning）の形式はどれですか？',
        answers: ['MAJOR.MINOR', 'MAJOR.MINOR.PATCH', 'VERSION.RELEASE', 'V1.V2.V3.V4'],
        correct: 1,
        explanation:
            'セマンティックバージョニングはMAJOR.MINOR.PATCH形式で、破壊的変更、機能追加、バグ修正をそれぞれ区別します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'URLパスにバージョンを含める方式（/v1/users）の利点はどれですか？',
        answers: [
            'セキュリティが高い',
            '明示的で分かりやすく、ブラウザで直接テスト可能',
            '常に最新バージョンを使用',
            'サーバー負荷が低い',
        ],
        correct: 1,
        explanation:
            'URLパスにバージョンを含める方式は、最も明示的でブラウザのアドレスバーやcURLで簡単にテストでき、広く採用されています。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'HTTPヘッダーでバージョンを指定する方法の例はどれですか？',
        answers: [
            'Content-Type: application/json',
            'Accept: application/vnd.api+json;version=2',
            'Authorization: Bearer token',
            'User-Agent: Chrome',
        ],
        correct: 1,
        explanation:
            'Acceptヘッダーにバージョン情報を含めることで、コンテンツネゴシエーションの一部としてバージョンを指定できます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'APIの後方互換性を保つことが重要な理由はどれですか？',
        answers: [
            'パフォーマンス向上',
            '既存のクライアントが引き続き動作する',
            'セキュリティ強化',
            'ストレージ削減',
        ],
        correct: 1,
        explanation:
            '後方互換性により、既存のクライアントがAPIの新バージョンでも動作し続けるため、段階的な移行が可能になります。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: '破壊的変更（Breaking Change）の例として適切なものはどれですか？',
        answers: [
            '新しいオプショナルフィールドの追加',
            '既存フィールドの削除や型変更',
            'バグ修正',
            '新しいエンドポイントの追加',
        ],
        correct: 1,
        explanation:
            '既存フィールドの削除や型変更は、既存クライアントを壊す可能性があるため破壊的変更です。メジャーバージョンアップが必要です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'APIバージョンの非推奨（Deprecation）を通知する方法として適切なものはどれですか？',
        answers: [
            '予告なく削除',
            'Deprecationヘッダーと十分な移行期間の提供',
            'エラーを返す',
            '何もしない',
        ],
        correct: 1,
        explanation:
            'Deprecationヘッダーで非推奨を通知し、Sunset  ヘッダーで廃止予定日を示すことで、クライアントに移行の準備時間を与えます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'マイクロバージョニング（例：v1.2.3）の.PATCH部分を上げるべき変更はどれですか？',
        answers: [
            '新機能の追加',
            'バグ修正や軽微な改善',
            '破壊的変更',
            'アーキテクチャの全面刷新',
        ],
        correct: 1,
        explanation:
            'PATCHバージョンは、後方互換性のあるバグ修正や軽微な改善で上げます。機能追加はMINOR、破壊的変更はMAJORです。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'APIバージョン管理でサンセットポリシー（Sunset Policy）とは何ですか？',
        answers: [
            'API使用時間帯の制限',
            '古いバージョンの廃止計画と期限',
            'レート制限',
            'セキュリティポリシー',
        ],
        correct: 1,
        explanation:
            'サンセットポリシーは、古いAPIバージョンをいつ廃止するかを明確にし、クライアントに移行のための十分な時間を提供する計画です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'カナリアリリースとAPIバージョニングの関係で正しいものはどれですか？',
        answers: [
            '無関係',
            '新バージョンを一部ユーザーで先行テスト可能',
            'バージョニングの代替手段',
            'セキュリティ機能',
        ],
        correct: 1,
        explanation:
            'カナリアリリースにより、新しいAPIバージョンを一部のユーザーやトラフィックで先行テストし、問題を早期発見できます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'APIバージョンのデフォルト動作として推奨されるものはどれですか？',
        answers: [
            'バージョン未指定時はエラー',
            '最新の安定バージョンまたは明示的なデフォルトバージョンを使用',
            'ランダムなバージョンを使用',
            '最も古いバージョンを使用',
        ],
        correct: 1,
        explanation:
            'バージョン未指定時の動作を明確に定義し、通常は最新の安定バージョンまたは特定のデフォルトバージョンを使用します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'Content Negotiationを使ったバージョニングの利点はどれですか？',
        answers: [
            'URLが変わらない',
            'セキュリティが高い',
            'パフォーマンスが良い',
            'データベースが不要',
        ],
        correct: 0,
        explanation:
            'Content Negotiationでは、URLを変えずにAcceptヘッダーでバージョンを指定できるため、URLの一貫性を保てます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'APIバージョン管理でのチェンジログ（Changelog）の重要性はどれですか？',
        answers: [
            '不要',
            'バージョン間の変更内容を明確に伝え、移行を支援',
            'セキュリティ目的のみ',
            'パフォーマンス測定',
        ],
        correct: 1,
        explanation:
            'チェンジログにより、各バージョンでの変更内容、追加機能、破壊的変更を明確に伝え、開発者の移行作業を支援します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'GraphQL APIのバージョニング戦略として推奨されるものはどれですか？',
        answers: [
            '従来のREST同様のバージョニング',
            'スキーマの進化とフィールドの非推奨化で対応',
            'バージョン管理しない',
            '毎日新バージョン',
        ],
        correct: 1,
        explanation:
            'GraphQLでは、スキーマの進化的設計と@deprecatedディレクティブを使用し、明示的なバージョニングを避けることが推奨されます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'APIバージョンをクエリパラメータで指定する方式（/users?version=2）の欠点はどれですか？',
        answers: [
            '技術的に不可能',
            'キャッシュやルーティングが複雑になる可能性',
            'セキュリティリスクが高い',
            'パフォーマンスが極端に悪い',
        ],
        correct: 1,
        explanation:
            'クエリパラメータ方式は、HTTPキャッシュやCDNのルーティングが同じURLでバージョンごとに異なるため複雑になる場合があります。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'マイクロサービスアーキテクチャでのAPIバージョニング戦略として重要なことはどれですか？',
        answers: [
            '全サービスを同時にバージョンアップ',
            '各サービスが独立してバージョン管理し、下位互換性を保つ',
            'バージョン管理しない',
            '中央集権的な管理のみ',
        ],
        correct: 1,
        explanation:
            'マイクロサービスでは、各サービスが独立してバージョン管理できるよう、下位互換性を保ちつつ進化させることが重要です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'APIバージョンの同時サポート数を決定する際の考慮事項はどれですか？',
        answers: [
            '無限にサポート',
            'メンテナンスコストとユーザーニーズのバランス',
            '常に1バージョンのみ',
            'ランダムに決定',
        ],
        correct: 1,
        explanation:
            '多くのバージョンを同時サポートするとメンテナンスコストが増加するため、ユーザーのニーズと移行状況を考慮して決定します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'APIバージョニングドキュメントに含めるべき情報として適切でないものはどれですか？',
        answers: [
            'バージョン間の変更内容',
            '移行ガイド',
            'サーバーの管理者パスワード',
            '非推奨機能の一覧',
        ],
        correct: 2,
        explanation:
            'バージョニングドキュメントには、変更内容、移行ガイド、非推奨機能などを含めますが、機密情報は含めません。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'Blue-Green DeploymentとAPIバージョニングの関係で正しいものはどれですか？',
        answers: [
            '無関係',
            '新バージョンのリスクを低減し、即座にロールバック可能',
            'バージョニングの代替',
            'セキュリティ機能',
        ],
        correct: 1,
        explanation:
            'Blue-Green Deploymentにより、新バージョンを本番と同じ環境でテストし、問題があれば即座に旧バージョンにロールバックできます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'API設計',
        minorCategory: 'バージョニング',
        question: 'APIバージョンの統合テストで重要なことはどれですか？',
        answers: [
            'テストは不要',
            '複数バージョン間の互換性と各バージョンの独立した動作を確認',
            '最新バージョンのみテスト',
            'ランダムにテスト',
        ],
        correct: 1,
        explanation:
            '各バージョンが正しく動作し、バージョン間で予期しない相互作用がないことを確認することが重要です。',
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
            'すべてのリソースを同期的に読み込む',
        ],
        correct: 1,
        explanation:
            'Critical CSSをインライン化し、非クリティカルなCSSを非同期で読み込むことで、First Paintを高速化できます。',
    },
    {
        majorCategory: 'フロントエンド技術',
        middleCategory: 'アプリパフォーマンス',
        minorCategory: 'バンドル最適化',
        question: 'Webpackのコード分割（Code Splitting）の主な目的はどれですか？',
        answers: [
            'ビルド時間の短縮',
            '初期読み込みサイズの削減',
            'デバッグの簡易化',
            'コードの暗号化',
        ],
        correct: 1,
        explanation:
            'コード分割により、必要なコードのみを初期読み込みし、その他は必要に応じて遅延読み込みすることで、初期表示を高速化します。',
    },
    {
        majorCategory: 'フロントエンド技術',
        middleCategory: 'アプリパフォーマンス',
        minorCategory: 'バンドル最適化',
        question: 'Tree Shakingの説明として正しいものはどれですか？',
        answers: [
            '使用されていないコードをバンドルから除外',
            'ファイルサイズを増やす処理',
            'コードを難読化する処理',
            'テストコードの自動生成',
        ],
        correct: 0,
        explanation:
            'Tree Shakingは、ESモジュールの静的解析により、使用されていないコード（Dead Code）をバンドルから除外する最適化手法です。',
    },
    {
        majorCategory: 'フロントエンド技術',
        middleCategory: 'アプリパフォーマンス',
        minorCategory: 'レンダリング最適化',
        question: 'Virtual DOMの主な利点はどれですか？',
        answers: [
            '常に実DOMより遅い',
            '差分のみを実DOMに反映し、パフォーマンス向上',
            'メモリ使用量が実DOMより多い',
            'SEOに不利',
        ],
        correct: 1,
        explanation:
            'Virtual DOMは変更箇所を効率的に検出し、必要な部分のみを実DOMに反映することで、レンダリングパフォーマンスを向上させます。',
    },

    // Infrastructure & Operations -> Cache Category
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'キャッシュ',
        minorCategory: 'HTTPキャッシング',
        question: 'Cache-Control: max-age=3600の意味はどれですか？',
        answers: [
            '3600バイトまでキャッシュ可能',
            '3600秒（1時間）キャッシュを保持',
            '3600個のリソースをキャッシュ',
            '3600回アクセスまでキャッシュ有効',
        ],
        correct: 1,
        explanation:
            'max-ageディレクティブは、リソースがキャッシュされる最大時間を秒単位で指定します。',
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'キャッシュ',
        minorCategory: 'アプリケーションキャッシュ',
        question: 'Redisのデータ構造でないものはどれですか？',
        answers: ['String', 'List', 'Set', 'Tree'],
        correct: 3,
        explanation:
            'Redisは、String、List、Set、Sorted Set、Hashなどをサポートしますが、Treeは基本データ構造に含まれません。',
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'キャッシュ',
        minorCategory: 'CDN',
        question: 'CDN（Content Delivery Network）の主な目的はどれですか？',
        answers: [
            'データベースのバックアップ',
            '静的コンテンツを地理的に分散して配信',
            'アプリケーションのデプロイ',
            'ユーザー認証',
        ],
        correct: 1,
        explanation:
            'CDNは、静的コンテンツを地理的に分散したサーバーから配信し、ユーザーに近い場所から高速に提供します。',
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'キャッシュ',
        minorCategory: 'データベースキャッシュ',
        question: 'クエリ結果キャッシュの無効化が必要なタイミングはどれですか？',
        answers: [
            'データが更新された時',
            'サーバーを再起動した時のみ',
            'ユーザーがログアウトした時',
            '決して無効化しない',
        ],
        correct: 0,
        explanation:
            'データが更新された場合、古いキャッシュを無効化しないと、ユーザーに古い情報が表示されてしまいます。',
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'キャッシュ',
        minorCategory: 'キャッシュ戦略',
        question: 'Write-Throughキャッシュ戦略の特徴はどれですか？',
        answers: [
            'キャッシュとデータベースを同時に更新',
            'キャッシュのみ更新し、データベースは更新しない',
            '読み取り時のみキャッシュを使用',
            'キャッシュを使用しない',
        ],
        correct: 0,
        explanation:
            'Write-Throughは、データ書き込み時にキャッシュとデータベースの両方を同時に更新する戦略で、データの一貫性が保たれます。',
    },

    // Security Category
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'セキュリティ',
        minorCategory: '認証・認可',
        question: 'JWTトークンの構成要素として正しくないものはどれですか？',
        answers: ['Header', 'Payload', 'Signature', 'Encryption'],
        correct: 3,
        explanation:
            'JWTはHeader、Payload、Signatureの3つの部分から構成されます。JWTは署名されますが、暗号化はオプションです。',
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'セキュリティ',
        minorCategory: '認証・認可',
        question:
            'OAuth 2.0で、サードパーティアプリがユーザーの代わりにリソースにアクセスするために使用するものはどれですか？',
        answers: ['パスワード', 'アクセストークン', 'Cookie', 'セッションID'],
        correct: 1,
        explanation: 'OAuth 2.0では、アクセストークンを使用してリソースサーバーにアクセスします。',
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
            'SQLプリペアドステートメントの使用',
        ],
        correct: 3,
        explanation:
            'SQLプリペアドステートメントはSQLインジェクション対策です。XSS対策には入力サニタイゼーション、出力エスケープ、CSPが有効です。',
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
            'タイポスクワッティング',
        ],
        correct: 3,
        explanation:
            'タイポスクワッティングはドメイン名の悪用で、OWASP Top 10には含まれません。SQLインジェクション、XSS、パストラバーサルは含まれます。',
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'セキュリティ',
        minorCategory: '暗号化',
        question: 'ハッシュ関数として推奨されないものはどれですか？',
        answers: ['bcrypt', 'SHA-256', 'MD5', 'Argon2'],
        correct: 2,
        explanation:
            'MD5は脆弱性が発見されており、パスワードハッシュには推奨されません。bcrypt、Argon2などを使用すべきです。',
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
            'メモリ使用量の増加',
        ],
        correct: 1,
        explanation:
            'マルチステージビルドは、ビルド依存関係を最終イメージに含めないため、イメージサイズを大幅に削減できます。',
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'クラウドインフラ',
        minorCategory: 'コンテナ技術',
        question: 'Kubernetesのリソースで、コンテナのグループを管理するものはどれですか？',
        answers: ['Node', 'Pod', 'Service', 'Namespace'],
        correct: 1,
        explanation:
            'Podは1つ以上のコンテナをグループ化し、同じネットワークとストレージを共有する最小のデプロイ単位です。',
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
            'コンテナを順次再起動',
        ],
        correct: 1,
        explanation:
            'ブルーグリーンデプロイメントは、本番環境（ブルー）と同一の環境（グリーン）を用意し、検証後に一度に切り替える手法です。',
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
            'コストの増加',
        ],
        correct: 1,
        explanation:
            'カナリアリリースは、新バージョンを一部のユーザーに先行公開し、問題がないか検証してから全体に展開する手法です。',
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'クラウドインフラ',
        minorCategory: 'モニタリング',
        question: 'Prometheusの主な用途はどれですか？',
        answers: ['ログ管理', 'メトリクス収集と監視', 'トレーシング', 'デプロイ自動化'],
        correct: 1,
        explanation:
            'Prometheusは、時系列データベースベースのメトリクス収集・監視システムで、クラウドネイティブアプリケーションの監視に広く使用されます。',
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
            'ネットワーク帯域を削減',
        ],
        correct: 1,
        explanation:
            '水平スケーリングは、サーバーの台数を増やして負荷を分散する手法です。垂直スケーリングはサーバーのスペックを上げる手法です。',
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
            'ログの集約',
        ],
        correct: 1,
        explanation:
            'ロードバランサーは、複数のサーバーにリクエストを分散し、負荷を均等化する役割を持ちます。',
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
            '障害の影響範囲を限定できる',
        ],
        correct: 2,
        explanation:
            'マイクロサービスはサービス間通信のオーバーヘッドが増加します。しかし、独立性、柔軟性、障害の分離などの利点があります。',
    },
    {
        majorCategory: 'インフラ・運用',
        middleCategory: 'システム設計',
        minorCategory: 'マイクロサービス',
        question:
            'サービス間通信パターンで、サービスが他のサービスを直接呼び出す方式はどれですか？',
        answers: ['イベント駆動', '同期的リクエスト/レスポンス', 'メッセージキュー', 'Pub/Sub'],
        correct: 1,
        explanation:
            '同期的リクエスト/レスポンスは、REST APIやgRPCを使用してサービス間で直接通信する方式です。',
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
            'フェイルオーバー: 負荷分散、フェイルバック: 負荷集約',
        ],
        correct: 0,
        explanation:
            'フェイルオーバーは障害発生時に予備系（スタンバイ）に自動切り替えすること、フェイルバックは主系復旧後に元に戻すことです。',
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
            'Components must be class-based',
        ],
        correct: 3,
        explanation:
            'Reduxの3原則は、単一のストア、読み取り専用の状態、純粋関数による変更です。コンポーネントの実装方法は制約されません。',
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
            'ルーティングの管理',
        ],
        correct: 1,
        explanation:
            'Context APIは、コンポーネントツリー全体でデータを共有し、深いネストでのprops渡し（prop drilling）を回避するために使用されます。',
    },
    {
        majorCategory: 'フロントエンド技術',
        middleCategory: 'フロントエンド設計',
        minorCategory: 'コンポーネント設計',
        question: 'Atomic Designのコンポーネント階層で最も小さい単位はどれですか？',
        answers: ['Molecules', 'Atoms', 'Organisms', 'Templates'],
        correct: 1,
        explanation:
            'Atomic Designの階層は、Atoms（原子）が最小単位で、Molecules（分子）、Organisms（有機体）、Templates、Pagesと続きます。',
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
            'Presentationalはクラス、Containerは関数コンポーネント',
        ],
        correct: 1,
        explanation:
            'Presentational Componentは見た目に集中し、Container Componentはロジックやデータ取得を担当する設計パターンです。',
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
            'HTTPキャッシュの管理',
        ],
        correct: 1,
        explanation:
            'React.memoは、propsが変更されない限りコンポーネントの再レンダリングをスキップし、パフォーマンスを最適化します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'ビットマップインデックスが最も効果的なケースはどれですか？',
        answers: [
            'カーディナリティが非常に高い列',
            'カーディナリティが低く、読み取り専用に近いデータ',
            '頻繁に更新される列',
            '主キー列',
        ],
        correct: 1,
        explanation:
            'ビットマップインデックスは、性別や都道府県など値の種類が少ない（低カーディナリティ）列で、特にデータウェアハウスなど読み取り中心の環境で効果的です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'GINインデックス（Generalized Inverted Index）が適しているデータ型はどれですか？',
        answers: ['整数型', '配列型やJSONB型など複数の値を持つ型', '日付型', '文字列型（固定長）'],
        correct: 1,
        explanation:
            'GINインデックスは配列、JSONB、全文検索など、1つの行に複数の値や要素を持つデータ型に最適化されたインデックスです。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question:
            'インデックスのフィルファクター（Fill Factor）を100%未満に設定する理由はどれですか？',
        answers: [
            'ストレージ容量を節約するため',
            '将来の挿入・更新時のページ分割を減らすため',
            '検索速度を向上させるため',
            'インデックスのサイズを大きくするため',
        ],
        correct: 1,
        explanation:
            'フィルファクターを100%未満（例：80%）にすることで、インデックスページに空き領域を確保し、データ挿入時のページ分割によるフラグメンテーションを減らせます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'インデックス最適化',
        question: 'インデックスオンリースキャン（Index-Only Scan）が可能になる条件はどれですか？',
        answers: [
            'テーブルにインデックスが1つだけ存在する',
            'クエリで必要な全ての列がインデックスに含まれている',
            '主キーインデックスを使用している',
            'WHERE句がない',
        ],
        correct: 1,
        explanation:
            'インデックスオンリースキャンは、クエリで参照する全ての列がインデックスに含まれている場合に可能で、テーブル本体へのアクセスを回避できます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'クエリ最適化',
        question: 'SELECT COUNT(*)のパフォーマンスを改善する方法として適切でないものはどれですか？',
        answers: [
            '近似値で良ければ統計情報を使用',
            '必要に応じてマテリアライズドビューやカウンターテーブルを使用',
            '全てのテーブルをメモリに読み込む',
            'インデックスオンリースキャンを活用',
        ],
        correct: 2,
        explanation:
            '大きなテーブルを全てメモリに読み込むのは非現実的です。統計情報の利用、カウンターテーブル、インデックスオンリースキャンが実用的な最適化手法です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'クエリ最適化',
        question: 'サブクエリをJOINに書き換えることで得られる利点はどれですか？',
        answers: [
            '常にクエリが遅くなる',
            'オプティマイザによる最適化の機会が増える',
            'コードの可読性が必ず低下する',
            'メモリ使用量が必ず増加する',
        ],
        correct: 1,
        explanation:
            'サブクエリをJOINに書き換えることで、オプティマイザがより効率的な実行計画を選択できる可能性が高まります。特に相関サブクエリの場合、パフォーマンス改善が顕著です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'クエリ最適化',
        question: 'WHERE句でインデックス列に関数を適用した場合の影響はどれですか？',
        answers: [
            'インデックスが使用されなくなる可能性が高い',
            'クエリが高速化される',
            'インデックスの効果が向上する',
            '影響はない',
        ],
        correct: 0,
        explanation:
            "WHERE UPPER(name) = 'JOHN'のように列に関数を適用すると、通常のインデックスは使用されません。関数ベースインデックスまたは計算列へのインデックスが必要です。",
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: '関数ベースインデックス（Function-Based Index）の用途はどれですか？',
        answers: [
            'テーブルの容量削減',
            '計算式や関数の結果に対する検索の高速化',
            'データの暗号化',
            'トランザクション分離レベルの向上',
        ],
        correct: 1,
        explanation:
            '関数ベースインデックスは、UPPER(name)やDATE(created_at)など、列に関数や計算式を適用した結果にインデックスを作成し、そのような検索を高速化します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'クエリ最適化',
        question: 'UNION ALLとUNIONの違いとして正しいものはどれですか？',
        answers: [
            'UNION ALLは重複を除去し、UNIONは重複を許可',
            'UNION ALLは重複を許可し、UNIONは重複を除去するためソートが発生',
            '両者に違いはない',
            'UNION ALLは使用できないSQL構文',
        ],
        correct: 1,
        explanation:
            'UNION ALLは重複を許可し高速です。UNIONは重複除去のためソート処理が発生しコストが高くなります。重複がないことが分かっている場合はUNION ALLを使用すべきです。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'クエリ最適化',
        question: 'OR条件が多い検索クエリの最適化手法として適切なものはどれですか？',
        answers: [
            '全てのOR条件列にインデックスを作成',
            'UNION ALLで分割して個別にインデックスを利用',
            'OR条件を増やす',
            'インデックスを削除する',
        ],
        correct: 1,
        explanation:
            'WHERE a = 1 OR b = 2のようなOR条件は、それぞれの条件をUNION ALLで分割することで、各条件が別々のインデックスを効率的に使用できます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'クラスタインデックス（Clustered Index）の特徴はどれですか？',
        answers: [
            'テーブルに複数作成できる',
            'テーブルに1つだけ作成でき、データの物理的な並び順を決定',
            'インデックスとデータが別の場所に格納される',
            '検索速度は非クラスタインデックスより常に遅い',
        ],
        correct: 1,
        explanation:
            'クラスタインデックスはテーブルに1つだけ作成でき、データの物理的な配置順序を決定します。範囲検索で特に効果的ですが、更新時のコストは高くなります。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'クエリ最適化',
        question: 'EXISTS句とIN句の使い分けとして適切なものはどれですか？',
        answers: [
            '常にINを使用すべき',
            'サブクエリが大量の行を返す場合はEXISTSが効率的',
            'EXISTSは廃止された構文',
            'どちらも同じパフォーマンス',
        ],
        correct: 1,
        explanation:
            'EXISTSは条件に一致する行が1つ見つかった時点で処理を終了します。サブクエリが多くの行を返す可能性がある場合、EXISTSの方が効率的です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'インデックスのセレクティビティ（選択性）が高いとはどういう状態ですか？',
        answers: [
            '重複する値が多い状態',
            'ユニークな値が多く、少数の行に絞り込める状態',
            'インデックスのサイズが大きい状態',
            '全ての値が同じ状態',
        ],
        correct: 1,
        explanation:
            'セレクティビティが高いとは、カーディナリティが高く、検索条件で少数の行に絞り込める状態を指します。このような列へのインデックスは効果的です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'クエリ最適化',
        question:
            "LIKE '%keyword%'のような前方一致でない検索のパフォーマンス問題を解決する方法はどれですか？",
        answers: [
            '通常のB-Treeインデックスで解決できる',
            '全文検索インデックス（Full-Text Search）を使用',
            'インデックスを削除する',
            '解決方法はない',
        ],
        correct: 1,
        explanation:
            "LIKE '%keyword%'のような部分一致検索では通常のインデックスは使用できません。全文検索インデックス（PostgreSQLのGIN、MySQLのFULLTEXT）を使用することで効率的に検索できます。",
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'クエリ最適化',
        question: 'クエリヒント（Query Hint）を使用する場合の注意点はどれですか？',
        answers: [
            '常にヒントを使用すべき',
            'データ量や分布が変わると最適でなくなる可能性があるため慎重に使用',
            'ヒントは全てのDBMSで同じ構文',
            'パフォーマンスに影響しない',
        ],
        correct: 1,
        explanation:
            'クエリヒントでインデックスやJOIN方法を強制指定できますが、データの成長や分布変化で最適でなくなる可能性があります。オプティマイザに任せる方が長期的には良い場合が多いです。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'インクルードカラム（Included Columns）を持つインデックスの利点はどれですか？',
        answers: [
            'インデックスのサイズが小さくなる',
            'インデックスキーではないがSELECT句で必要な列を含めてカバリングインデックスを実現',
            '更新性能が向上する',
            '検索条件に使用できる',
        ],
        correct: 1,
        explanation:
            'インクルードカラムは、インデックスキーには含めないが、インデックスリーフレベルに格納する列です。これによりテーブルアクセスなしでクエリを完結できます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: '一意制約（UNIQUE制約）とユニークインデックスの関係はどれですか？',
        answers: [
            '全く無関係',
            '一意制約は内部的にユニークインデックスで実装される',
            'ユニークインデックスの方が遅い',
            '一意制約はインデックスを使用しない',
        ],
        correct: 1,
        explanation:
            '多くのRDBMSでは、一意制約は内部的にユニークインデックスとして実装されるため、重複チェックと高速検索の両方が実現されます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: '外部キー制約のある列にインデックスを作成する理由はどれですか？',
        answers: [
            '必須ではないが、JOIN性能と参照整合性チェックの高速化のため',
            '外部キーには自動的にインデックスが作成される（全DBMS）',
            'インデックスは不要',
            'セキュリティ向上のため',
        ],
        correct: 0,
        explanation:
            '外部キー列にインデックスがないと、JOINやCASCADE削除時のパフォーマンスが低下します。PostgreSQLなど一部のDBMSでは自動作成されませんが、作成が推奨されます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'インデックスの統計情報を更新する必要がある理由はどれですか？',
        answers: [
            'セキュリティ強化',
            'オプティマイザが正確な実行計画を立てるため',
            'ストレージ削減',
            'バックアップのため',
        ],
        correct: 1,
        explanation:
            'インデックスの統計情報（カーディナリティ、データ分布等）が古いと、オプティマイザが非効率な実行計画を選択する可能性があります。定期的な更新が重要です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'NULL値を含む列のインデックス動作で正しいものはどれですか？',
        answers: [
            'NULLはインデックスに含まれない（全DBMS）',
            'DBMSによって動作が異なり、一部はNULLを含む',
            'NULLは常にインデックスに含まれる',
            'NULLは検索できない',
        ],
        correct: 1,
        explanation:
            'Oracle等一部のDBMSではNULLはB-Treeインデックスに含まれませんが、PostgreSQLやMySQLでは含まれます。DBMS固有の動作を理解することが重要です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: '降順インデックス（Descending Index）が有用なケースはどれですか？',
        answers: [
            '常に昇順より高速',
            'ORDER BY DESC句での検索やソート',
            'セキュリティ向上',
            '使用されない',
        ],
        correct: 1,
        explanation:
            '降順インデックスは、ORDER BY column DESC での検索やソートを高速化します。複合インデックスで列ごとに異なるソート順が必要な場合にも有用です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'インデックスのブロッキングファクター（Blocking Factor）が高いことの意味はどれですか？',
        answers: [
            'パフォーマンスが悪い',
            '1ブロックに多くのインデックスエントリが格納され、I/O効率が良い',
            'インデックスが使用されない',
            'セキュリティが高い',
        ],
        correct: 1,
        explanation:
            'ブロッキングファクターが高いと、1回のI/Oで多くのインデックスエントリを読み込めるため、ディスクI/Oが削減され、パフォーマンスが向上します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'インデックスのリーフノードのチェーン構造の利点はどれですか？',
        answers: [
            'ランダムアクセスの高速化',
            '範囲検索でリーフノード間を効率的にスキャン可能',
            'ストレージ削減',
            'セキュリティ向上',
        ],
        correct: 1,
        explanation:
            'B-Treeインデックスのリーフノードは通常双方向リンクリストで接続されており、範囲検索時にリーフノードを順次スキャンできます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'インデックス設計',
        question: 'インデックスのキー圧縮（Key Compression）の目的はどれですか？',
        answers: [
            'セキュリティ強化',
            'インデックスサイズを削減しメモリ効率とキャッシュヒット率を向上',
            'クエリ速度の低下',
            'データの暗号化',
        ],
        correct: 1,
        explanation:
            'インデックスのキー圧縮により、共通のプレフィックスを共有することでストレージを節約し、より多くのインデックスエントリをメモリにキャッシュできます。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'クエリ最適化',
        question: 'ウィンドウ関数（Window Function）とGROUP BYの違いとして正しいものはどれですか？',
        answers: [
            'ウィンドウ関数は行を集約せず、各行に集計結果を付加できる',
            'GROUP BYの方が常に高速',
            'ウィンドウ関数は使用できない',
            '両者に違いはない',
        ],
        correct: 0,
        explanation:
            'ウィンドウ関数（ROW_NUMBER、RANK、SUM() OVERなど）は各行に対して集計結果を計算できます。GROUP BYは行を集約しますが、ウィンドウ関数は元の行数を維持します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'データベース',
        minorCategory: 'クエリ最適化',
        question: 'マテリアライズドビュー（Materialized View）の主な用途はどれですか？',
        answers: [
            'リアルタイムデータの更新',
            '複雑な集計クエリの結果を事前計算して保存',
            'データの削除',
            'トランザクション管理',
        ],
        correct: 1,
        explanation:
            'マテリアライズドビューは、複雑なJOINや集計の結果を物理的に保存し、クエリパフォーマンスを向上させます。定期的なリフレッシュが必要です。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'インデックス最適化',
        question:
            'インデックススキャンとテーブルスキャンのコスト比較で考慮すべき要素はどれですか？',
        answers: [
            'インデックスは常にテーブルスキャンより高速',
            '取得する行の割合、インデックスの選択性、I/Oコスト',
            'インデックスのサイズのみ',
            'テーブル名の長さ',
        ],
        correct: 1,
        explanation:
            '取得行が全体の10-15%を超える場合、インデックススキャンよりテーブルスキャンの方が効率的な場合があります。オプティマイザは選択性やI/Oコストを考慮して判断します。',
    },
    {
        majorCategory: 'バックエンド技術',
        middleCategory: 'DBパフォーマンス',
        minorCategory: 'クエリ最適化',
        question:
            'クエリのバッファプール（Buffer Pool）ヒット率を改善する方法として適切でないものはどれですか？',
        answers: [
            '頻繁にアクセスするデータのメモリ配分を増やす',
            '不要なデータの読み込みを減らす（SELECT * を避ける）',
            '全てのテーブルにインデックスを大量に作成',
            '適切なインデックスでI/Oを削減',
        ],
        correct: 2,
        explanation:
            '過剰なインデックスは更新時のオーバーヘッドを増やし、バッファプールを圧迫します。必要なデータのみを読み込み、適切なインデックスでI/Oを削減することが重要です。',
    },

    // English Vocabulary -> 990+ Category
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"prevalent" の意味として最も適切なものはどれですか？',
        answers: ['予防的な', '広く行き渡った、流行している', '以前の', '好ましい'],
        correct: 1,
        explanation:
            'prevalent は「広く行き渡った、流行している、よくある」という意味です。The disease is prevalent in tropical regions. のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"lucrative" の意味として最も適切なものはどれですか？',
        answers: ['透明な', '利益の上がる、儲かる', '論理的な', '贅沢な'],
        correct: 1,
        explanation:
            'lucrative は「利益の上がる、儲かる」という意味です。a lucrative business deal（儲かるビジネス取引）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"mitigate" の意味として最も適切なものはどれですか？',
        answers: ['移住する', '模倣する', '和らげる、緩和する', '仲介する'],
        correct: 2,
        explanation:
            'mitigate は「和らげる、緩和する、軽減する」という意味です。mitigate risks（リスクを軽減する）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"scrutinize" の意味として最も適切なものはどれですか？',
        answers: ['精査する、詳しく調べる', '批判する', '削減する', '分類する'],
        correct: 0,
        explanation:
            'scrutinize は「精査する、詳しく調べる、吟味する」という意味です。scrutinize the contract（契約書を精査する）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"expedite" の意味として最も適切なものはどれですか？',
        answers: ['遠征する', '追放する', '迅速に処理する、促進する', '期待する'],
        correct: 2,
        explanation:
            'expedite は「迅速に処理する、促進する、早める」という意味です。expedite the process（プロセスを迅速化する）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"discrepancy" の意味として最も適切なものはどれですか？',
        answers: ['不一致、食い違い', '裁量', '識別', '破棄'],
        correct: 0,
        explanation:
            'discrepancy は「不一致、食い違い、矛盾」という意味です。a discrepancy in the data（データの不一致）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"substantiate" の意味として最も適切なものはどれですか？',
        answers: ['代用する', '立証する、実証する', '従属させる', '要約する'],
        correct: 1,
        explanation:
            'substantiate は「立証する、実証する、裏付ける」という意味です。substantiate a claim（主張を立証する）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"proliferate" の意味として最も適切なものはどれですか？',
        answers: ['抗議する', '急増する、増殖する', '提案する', '禁止する'],
        correct: 1,
        explanation:
            'proliferate は「急増する、増殖する、拡散する」という意味です。The use of smartphones proliferated rapidly.（スマートフォンの使用が急速に広がった）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"meticulous" の意味として最も適切なものはどれですか？',
        answers: ['奇跡的な', '細心の注意を払う、綿密な', '謙虚な', '神秘的な'],
        correct: 1,
        explanation:
            'meticulous は「細心の注意を払う、綿密な、几帳面な」という意味です。meticulous attention to detail（細部への綿密な注意）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"detrimental" の意味として最も適切なものはどれですか？',
        answers: ['有害な、不利な', '決定的な', '細部の', '検出可能な'],
        correct: 0,
        explanation:
            'detrimental は「有害な、不利な、損害を与える」という意味です。detrimental effects（有害な影響）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"commensurate" の意味として最も適切なものはどれですか？',
        answers: ['開始する', '記念する', '釣り合った、相応の', '通勤する'],
        correct: 2,
        explanation:
            'commensurate は「釣り合った、相応の、比例した」という意味です。salary commensurate with experience（経験に見合った給与）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"tangible" の意味として最も適切なものはどれですか？',
        answers: ['複雑な', '具体的な、実体のある', '一時的な', '穏やかな'],
        correct: 1,
        explanation:
            'tangible は「具体的な、実体のある、触れることができる」という意味です。tangible results（具体的な結果）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"pragmatic" の意味として最も適切なものはどれですか？',
        answers: ['実用的な、現実的な', '悲観的な', '劇的な', '体系的な'],
        correct: 0,
        explanation:
            'pragmatic は「実用的な、現実的な、実際的な」という意味です。a pragmatic approach（実用的なアプローチ）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"ambiguous" の意味として最も適切なものはどれですか？',
        answers: ['野心的な', 'あいまいな、不明確な', '十分な', '意欲的な'],
        correct: 1,
        explanation:
            'ambiguous は「あいまいな、不明確な、多義的な」という意味です。an ambiguous statement（あいまいな声明）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"convoluted" の意味として最も適切なものはどれですか？',
        answers: ['進化した', '巻き込まれた', '複雑に入り組んだ', '確信した'],
        correct: 2,
        explanation:
            'convoluted は「複雑に入り組んだ、込み入った」という意味です。a convoluted explanation（複雑で分かりにくい説明）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"arduous" の意味として最も適切なものはどれですか？',
        answers: ['熱心な', '骨の折れる、困難な', '論証的な', '人工的な'],
        correct: 1,
        explanation:
            'arduous は「骨の折れる、困難な、きつい」という意味です。an arduous task（困難な仕事）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"inadvertent" の意味として最も適切なものはどれですか？',
        answers: ['不注意な、うっかりした', '不適切な', '不十分な', '不利な'],
        correct: 0,
        explanation:
            'inadvertent は「不注意な、うっかりした、意図しない」という意味です。an inadvertent error（うっかりミス）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"stringent" の意味として最も適切なものはどれですか？',
        answers: ['厳しい、厳格な', '強い', '奇妙な', '構造的な'],
        correct: 0,
        explanation:
            'stringent は「厳しい、厳格な、厳重な」という意味です。stringent regulations（厳しい規制）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"conducive" の意味として最も適切なものはどれですか？',
        answers: ['導電性の', '助けとなる、~に役立つ', '結論的な', '同時発生の'],
        correct: 1,
        explanation:
            'conducive は「助けとなる、~に役立つ、促進する」という意味です。conducive to learning（学習に役立つ）のように使われます。',
    },
    {
        majorCategory: '英単語',
        middleCategory: '990+',
        minorCategory: 'ビジネス・経済',
        question: '"exacerbate" の意味として最も適切なものはどれですか？',
        answers: ['悪化させる', '詳述する', '正確にする', '検査する'],
        correct: 0,
        explanation:
            'exacerbate は「悪化させる、激化させる」という意味です。exacerbate the problem（問題を悪化させる）のように使われます。',
    },
];
