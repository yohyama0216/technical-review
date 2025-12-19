// Quiz Data with Major and Minor Categories
const quizData = [
    // Database Category
    {
        majorCategory: 'データベース',
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
        majorCategory: 'データベース',
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
        majorCategory: 'データベース',
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
        majorCategory: 'データベース',
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
        majorCategory: 'データベース',
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
        majorCategory: 'データベース',
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
    
    // Web Performance Category
    {
        majorCategory: 'Webパフォーマンス',
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
        majorCategory: 'Webパフォーマンス',
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
        majorCategory: 'Webパフォーマンス',
        minorCategory: 'キャッシング戦略',
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
        majorCategory: 'Webパフォーマンス',
        minorCategory: 'キャッシング戦略',
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
        majorCategory: 'Webパフォーマンス',
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

    // API Design Category
    {
        majorCategory: 'API設計',
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
        majorCategory: 'API設計',
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
        majorCategory: 'API設計',
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
        majorCategory: 'API設計',
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
        majorCategory: 'API設計',
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
        majorCategory: 'セキュリティ',
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
        majorCategory: 'セキュリティ',
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
        majorCategory: 'セキュリティ',
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
        majorCategory: 'セキュリティ',
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
        majorCategory: 'セキュリティ',
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
        majorCategory: 'クラウドインフラ',
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
        majorCategory: 'クラウドインフラ',
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
        majorCategory: 'クラウドインフラ',
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
        majorCategory: 'クラウドインフラ',
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
        majorCategory: 'クラウドインフラ',
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
        majorCategory: 'システム設計',
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
        majorCategory: 'システム設計',
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
        majorCategory: 'システム設計',
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
        majorCategory: 'システム設計',
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
        majorCategory: 'システム設計',
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

    // Frontend Architecture Category
    {
        majorCategory: 'フロントエンド設計',
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
        majorCategory: 'フロントエンド設計',
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
        majorCategory: 'フロントエンド設計',
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
        majorCategory: 'フロントエンド設計',
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
        majorCategory: 'フロントエンド設計',
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

// Get unique major categories
function getMajorCategories() {
    const categories = {};
    quizData.forEach(q => {
        if (!categories[q.majorCategory]) {
            categories[q.majorCategory] = new Set();
        }
        categories[q.majorCategory].add(q.minorCategory);
    });
    
    // Convert Sets to Arrays
    Object.keys(categories).forEach(key => {
        categories[key] = Array.from(categories[key]);
    });
    
    return categories;
}

// Get questions by categories
function getQuestionsByCategory(majorCat, minorCat) {
    return quizData.filter(q => 
        q.majorCategory === majorCat && q.minorCategory === minorCat
    );
}

// App State
let currentMajorCategory = '';
let currentMinorCategory = '';
let currentQuestionIndex = 0;
let selectedAnswer = null;
let quizResults = [];
let shuffledAnswers = [];

// DOM Elements
const majorCategoryScreen = document.getElementById('majorCategoryScreen');
const minorCategoryScreen = document.getElementById('minorCategoryScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const reviewScreen = document.getElementById('reviewScreen');

const majorCategoryButtons = document.getElementById('majorCategoryButtons');
const minorCategoryButtons = document.getElementById('minorCategoryButtons');
const minorCategoryTitle = document.getElementById('minorCategoryTitle');
const backToMajorBtn = document.getElementById('backToMajorBtn');

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
    const categories = getMajorCategories();
    majorCategoryButtons.innerHTML = '';
    
    Object.keys(categories).forEach((category, index) => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = category;
        btn.addEventListener('click', () => showMinorCategories(category));
        majorCategoryButtons.appendChild(btn);
    });
}

// Show Minor Categories
function showMinorCategories(majorCat) {
    currentMajorCategory = majorCat;
    const categories = getMajorCategories();
    const minorCats = categories[majorCat];
    
    minorCategoryTitle.textContent = `${majorCat} - 小カテゴリを選択`;
    minorCategoryButtons.innerHTML = '';
    
    minorCats.forEach(minorCat => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = minorCat;
        btn.addEventListener('click', () => startQuiz(majorCat, minorCat));
        minorCategoryButtons.appendChild(btn);
    });
    
    showScreen('minor');
}

// Return to Major Categories
function returnToMajorCategories() {
    showScreen('major');
}

// Start Quiz
function startQuiz(majorCat, minorCat) {
    currentMajorCategory = majorCat;
    currentMinorCategory = minorCat;
    currentQuestionIndex = 0;
    quizResults = [];

    const questions = getQuestionsByCategory(majorCat, minorCat);
    
    showScreen('quiz');
    categoryTitle.textContent = majorCat;
    categoryBreadcrumb.textContent = `${majorCat} > ${minorCat}`;
    totalQuestionsEl.textContent = questions.length;
    
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const questions = getQuestionsByCategory(currentMajorCategory, currentMinorCategory);
    const question = questions[currentQuestionIndex];
    
    selectedAnswer = null;
    submitBtn.disabled = true;
    
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
    document.querySelectorAll('.answer-btn').forEach(b => {
        b.classList.remove('selected');
    });
    
    btn.classList.add('selected');
    selectedAnswer = index;
    submitBtn.disabled = false;
}

// Submit Answer
function submitAnswer() {
    if (selectedAnswer === null) return;
    
    const questions = getQuestionsByCategory(currentMajorCategory, currentMinorCategory);
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correct;
    
    quizResults.push({
        questionIndex: currentQuestionIndex,
        selectedAnswer: selectedAnswer,
        correct: isCorrect
    });
    
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach((btn, displayIndex) => {
        btn.classList.add('disabled');
        const originalIndex = shuffledAnswers[displayIndex].originalIndex;
        
        if (originalIndex === question.correct) {
            btn.classList.add('correct');
        } else if (originalIndex === selectedAnswer && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    submitBtn.disabled = true;
    
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    }, 1500);
}

// Finish Quiz
function finishQuiz() {
    const correctCount = quizResults.filter(r => r.correct).length;
    const totalCount = quizResults.length;
    const percentage = Math.round((correctCount / totalCount) * 100);
    
    saveQuizResult(currentMajorCategory, currentMinorCategory, correctCount, totalCount);
    
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
            <p>${currentMajorCategory} > ${currentMinorCategory}</p>
        </div>
    `;
}

// Show Review
function showReview() {
    showScreen('review');
    reviewCategoryTitle.textContent = `${currentMajorCategory} > ${currentMinorCategory} - 復習`;
    
    const questions = getQuestionsByCategory(currentMajorCategory, currentMinorCategory);
    
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
function saveQuizResult(majorCat, minorCat, correct, total) {
    const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
    const key = `${majorCat}::${minorCat}`;
    
    if (!results[key]) {
        results[key] = {
            majorCategory: majorCat,
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
    
    // Group by major category
    const grouped = {};
    Object.values(results).forEach(result => {
        if (!grouped[result.majorCategory]) {
            grouped[result.majorCategory] = [];
        }
        grouped[result.majorCategory].push(result);
    });
    
    Object.keys(grouped).forEach(majorCat => {
        const majorItem = document.createElement('div');
        majorItem.style.marginBottom = '15px';
        
        const majorTitle = document.createElement('h4');
        majorTitle.textContent = majorCat;
        majorTitle.style.marginBottom = '8px';
        majorTitle.style.color = '#667eea';
        majorItem.appendChild(majorTitle);
        
        grouped[majorCat].forEach(result => {
            const avgPercentage = Math.round((result.totalCorrect / result.totalQuestions) * 100);
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';
            statItem.innerHTML = `
                <span class="category-name">${result.minorCategory}</span>
                <span class="score">平均正解率: ${avgPercentage}% (${result.attempts}回挑戦)</span>
            `;
            majorItem.appendChild(statItem);
        });
        
        statsDisplay.appendChild(majorItem);
    });
}

// Show Screen
function showScreen(screen) {
    majorCategoryScreen.classList.remove('active');
    minorCategoryScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    reviewScreen.classList.remove('active');
    
    switch (screen) {
        case 'major':
            majorCategoryScreen.classList.add('active');
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
backBtn.addEventListener('click', () => {
    if (currentMajorCategory) {
        showMinorCategories(currentMajorCategory);
    } else {
        returnToCategories();
    }
});
submitBtn.addEventListener('click', submitAnswer);
reviewBtn.addEventListener('click', showReview);
homeBtn.addEventListener('click', returnToCategories);
reviewBackBtn.addEventListener('click', returnToResults);
