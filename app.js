// Quiz Data
const quizData = {
    'web-basics': {
        title: 'Web基礎',
        questions: [
            {
                question: 'HTTPメソッドの中で、サーバーにデータを送信し、新しいリソースを作成する際に使用されるのはどれですか？',
                answers: ['GET', 'POST', 'PUT', 'DELETE'],
                correct: 1,
                explanation: 'POSTメソッドは新しいリソースを作成する際に使用されます。GETは取得、PUTは更新、DELETEは削除に使用されます。'
            },
            {
                question: 'HTMLのセマンティック要素として正しくないものはどれですか？',
                answers: ['<article>', '<section>', '<div>', '<header>'],
                correct: 2,
                explanation: '<div>は汎用的なコンテナ要素で、セマンティックな意味を持ちません。他の要素は特定の意味を持つセマンティック要素です。'
            },
            {
                question: 'CSSのbox-modelにおいて、要素の実際の幅を計算する際に含まれないものはどれですか？',
                answers: ['content', 'padding', 'border', 'margin'],
                correct: 3,
                explanation: 'marginは要素の外側の余白であり、要素の実際の幅には含まれません。content、padding、borderが要素の幅を構成します。'
            },
            {
                question: 'JavaScriptで変数を宣言する方法のうち、ブロックスコープを持ち、再代入可能なのはどれですか？',
                answers: ['var', 'let', 'const', 'function'],
                correct: 1,
                explanation: 'letはブロックスコープを持ち、再代入が可能です。constは再代入不可、varは関数スコープを持ちます。'
            },
            {
                question: 'DNSの役割として正しいものはどれですか？',
                answers: ['データの暗号化', 'ドメイン名をIPアドレスに変換', 'ファイルの圧縮', 'データベースの管理'],
                correct: 1,
                explanation: 'DNS（Domain Name System）は、人間が読みやすいドメイン名を、コンピュータが理解できるIPアドレスに変換する役割を持ちます。'
            },
            {
                question: 'RESTful APIにおいて、既存のリソースを更新する際に使用する適切なHTTPメソッドはどれですか？',
                answers: ['GET', 'POST', 'PUT', 'DELETE'],
                correct: 2,
                explanation: 'PUTメソッドは既存のリソース全体を更新する際に使用されます。部分更新にはPATCHが使われることもあります。'
            },
            {
                question: 'CSSのflexboxで、子要素を主軸に沿って中央揃えにするプロパティと値の組み合わせはどれですか？',
                answers: ['align-items: center', 'justify-content: center', 'text-align: center', 'vertical-align: middle'],
                correct: 1,
                explanation: 'justify-contentは主軸（デフォルトでは横方向）に沿った配置を制御します。align-itemsは交差軸の配置を制御します。'
            },
            {
                question: 'JavaScriptの非同期処理を扱うために、ES2017で導入された構文はどれですか？',
                answers: ['callback', 'Promise', 'async/await', 'setTimeout'],
                correct: 2,
                explanation: 'async/awaitはES2017（ES8）で導入され、Promiseベースの非同期処理をより読みやすく書くことができます。'
            },
            {
                question: 'HTTPステータスコードで「404」が示す意味はどれですか？',
                answers: ['成功', 'リダイレクト', 'クライアントエラー（リソースが見つからない）', 'サーバーエラー'],
                correct: 2,
                explanation: '404 Not Foundは、要求されたリソースがサーバー上に存在しないことを示すクライアントエラーです。'
            },
            {
                question: 'ブラウザのローカルストレージ（localStorage）について正しい説明はどれですか？',
                answers: [
                    '有効期限があり、一定期間後に自動削除される',
                    'データは明示的に削除するまで永続的に保存される',
                    'ページを閉じると自動的に削除される',
                    'サーバーに自動的に同期される'
                ],
                correct: 1,
                explanation: 'localStorageは明示的に削除しない限りブラウザに永続的に保存されます。sessionStorageはタブを閉じると削除されます。'
            }
        ]
    },
    'web-advanced': {
        title: 'Web応用',
        questions: [
            {
                question: 'Single Page Application（SPA）の主な利点はどれですか？',
                answers: [
                    'SEOが自動的に最適化される',
                    'ページ遷移時のリロードが不要で、スムーズなユーザー体験を提供',
                    'サーバーの負荷が完全になくなる',
                    'JavaScriptを使用しなくても動作する'
                ],
                correct: 1,
                explanation: 'SPAは必要な部分のみを動的に更新するため、ページ全体のリロードが不要で、スムーズなユーザー体験を提供します。'
            },
            {
                question: 'WebSocketの特徴として正しいものはどれですか？',
                answers: [
                    '一方向通信のみをサポート',
                    'HTTPと同じリクエスト・レスポンス型',
                    'クライアントとサーバー間で双方向のリアルタイム通信が可能',
                    'REST APIの一種である'
                ],
                correct: 2,
                explanation: 'WebSocketは、クライアントとサーバー間で双方向のリアルタイム通信を可能にするプロトコルです。'
            },
            {
                question: 'JavaScriptのクロージャについて正しい説明はどれですか？',
                answers: [
                    '関数が終了すると全ての変数が破棄される',
                    '関数が外部スコープの変数を参照し続けることができる仕組み',
                    'クラスの継承機能',
                    'エラーハンドリングの方法'
                ],
                correct: 1,
                explanation: 'クロージャは、関数が定義されたスコープの変数を、関数が実行される際にも参照し続けることができる仕組みです。'
            },
            {
                question: 'Progressive Web App（PWA）の特徴として正しくないものはどれですか？',
                answers: [
                    'オフラインでも動作可能',
                    'ホーム画面に追加可能',
                    'プッシュ通知を送信可能',
                    'App StoreやGoogle Playの審査が必須'
                ],
                correct: 3,
                explanation: 'PWAはWebアプリケーションであり、App StoreやGoogle Playの審査は不要です。ブラウザから直接インストールできます。'
            },
            {
                question: 'Virtual DOMを使用するフレームワークの主な利点はどれですか？',
                answers: [
                    'ファイルサイズが小さくなる',
                    'DOM操作のパフォーマンスが向上する',
                    'CSSが自動的に最適化される',
                    'サーバーの負荷が減る'
                ],
                correct: 1,
                explanation: 'Virtual DOMは、実際のDOMに対する変更を最小限に抑えることで、DOM操作のパフォーマンスを向上させます。'
            },
            {
                question: 'CORSエラーが発生する主な原因はどれですか？',
                answers: [
                    'ネットワークの接続が遅い',
                    '異なるオリジン間でのリソース共有が制限されている',
                    'JavaScriptの構文エラー',
                    'HTMLの記述ミス'
                ],
                correct: 1,
                explanation: 'CORS（Cross-Origin Resource Sharing）エラーは、セキュリティ上の理由から、異なるオリジン間でのリソース共有が制限されているために発生します。'
            },
            {
                question: 'サーバーサイドレンダリング（SSR）の主な利点はどれですか？',
                answers: [
                    'クライアントのJavaScript実行が不要になる',
                    'SEOの改善と初期表示速度の向上',
                    'サーバーのコストが削減される',
                    'オフライン動作が可能になる'
                ],
                correct: 1,
                explanation: 'SSRは、サーバー側でHTMLを生成するため、検索エンジンのクローラーが内容を読み取りやすく、初期表示も高速になります。'
            },
            {
                question: 'Web Workersの主な用途はどれですか？',
                answers: [
                    'DOMの直接操作',
                    '重い計算処理をバックグラウンドで実行',
                    'CSSアニメーションの制御',
                    'HTTPリクエストの送信'
                ],
                correct: 1,
                explanation: 'Web Workersは、メインスレッドとは別のバックグラウンドスレッドで重い処理を実行し、UIのブロッキングを防ぎます。'
            },
            {
                question: 'GraphQLの特徴として正しいものはどれですか？',
                answers: [
                    'REST APIと同じエンドポイント構造',
                    'クライアントが必要なデータのみを要求できる',
                    'SQLデータベースでのみ使用可能',
                    'GET、POSTなどのHTTPメソッドを使用しない'
                ],
                correct: 1,
                explanation: 'GraphQLは、クライアントが必要なデータの構造を正確に指定でき、過不足なくデータを取得できるクエリ言語です。'
            },
            {
                question: 'Service Workerの主な機能はどれですか？',
                answers: [
                    'DOMの操作',
                    'オフラインキャッシュとプッシュ通知',
                    'データベースの管理',
                    'CSSのプリプロセス'
                ],
                correct: 1,
                explanation: 'Service Workerは、ネットワークリクエストをインターセプトし、オフラインキャッシュやプッシュ通知などの機能を提供します。'
            }
        ]
    },
    'web-security': {
        title: 'Webセキュリティ',
        questions: [
            {
                question: 'XSS（クロスサイトスクリプティング）攻撃を防ぐための最も効果的な対策はどれですか？',
                answers: [
                    'HTTPSを使用する',
                    'ユーザー入力をエスケープ処理する',
                    'パスワードを強化する',
                    'ファイアウォールを設定する'
                ],
                correct: 1,
                explanation: 'XSS攻撃を防ぐには、ユーザー入力を適切にエスケープ処理し、スクリプトとして実行されないようにすることが重要です。'
            },
            {
                question: 'CSRF（クロスサイトリクエストフォージェリ）攻撃を防ぐための対策はどれですか？',
                answers: [
                    'SQLインジェクション対策',
                    'CSRFトークンの使用',
                    'パスワードの暗号化',
                    'HTTPSの使用'
                ],
                correct: 1,
                explanation: 'CSRFトークンは、正規のリクエストであることを確認するための秘密のトークンで、CSRF攻撃の防止に効果的です。'
            },
            {
                question: 'SQLインジェクション攻撃を防ぐための最適な方法はどれですか？',
                answers: [
                    'ユーザー入力をそのままSQLクエリに埋め込む',
                    'プリペアドステートメント（パラメータ化クエリ）を使用する',
                    'データベースのパスワードを複雑にする',
                    'データベースを暗号化する'
                ],
                correct: 1,
                explanation: 'プリペアドステートメントを使用することで、ユーザー入力がSQLコードとして解釈されることを防ぎ、SQLインジェクションを防止できます。'
            },
            {
                question: 'Content Security Policy（CSP）の主な目的はどれですか？',
                answers: [
                    'データベースの保護',
                    'XSS攻撃の軽減',
                    'パスワードの強化',
                    'ネットワーク速度の向上'
                ],
                correct: 1,
                explanation: 'CSPは、信頼できるコンテンツソースのみを許可することで、XSS攻撃やデータインジェクション攻撃を軽減するセキュリティ機能です。'
            },
            {
                question: 'Same-Origin Policy（同一オリジンポリシー）の目的はどれですか？',
                answers: [
                    'パフォーマンスの向上',
                    '異なるオリジン間での不正なデータアクセスを防ぐ',
                    'ファイルサイズの削減',
                    'SEOの改善'
                ],
                correct: 1,
                explanation: 'Same-Origin Policyは、異なるオリジンのWebページが互いのリソースに不正にアクセスすることを防ぐセキュリティ機構です。'
            },
            {
                question: 'HTTPヘッダーの「X-Frame-Options」の目的はどれですか？',
                answers: [
                    'キャッシュの制御',
                    'クリックジャッキング攻撃の防止',
                    'データの圧縮',
                    'リダイレクトの設定'
                ],
                correct: 1,
                explanation: 'X-Frame-Optionsヘッダーは、ページがiframeに埋め込まれることを制御し、クリックジャッキング攻撃を防止します。'
            },
            {
                question: 'HTTPS通信で使用される暗号化プロトコルはどれですか？',
                answers: [
                    'FTP',
                    'SSL/TLS',
                    'SSH',
                    'SMTP'
                ],
                correct: 1,
                explanation: 'HTTPSは、SSL/TLS（Transport Layer Security）プロトコルを使用して通信を暗号化し、データの機密性と完全性を保護します。'
            },
            {
                question: 'セッションハイジャック攻撃を防ぐための対策として適切でないものはどれですか？',
                answers: [
                    'HTTPSを使用する',
                    'セッションIDを定期的に再生成する',
                    'セッションIDをURLに含める',
                    'セッションタイムアウトを設定する'
                ],
                correct: 2,
                explanation: 'セッションIDをURLに含めると、リファラーやブラウザ履歴から漏洩するリスクがあります。Cookieに格納すべきです。'
            },
            {
                question: 'パスワードを保存する際の最も安全な方法はどれですか？',
                answers: [
                    '平文で保存',
                    'Base64エンコード',
                    'MD5ハッシュ',
                    'bcryptなどの強力なハッシュアルゴリズムとソルト'
                ],
                correct: 3,
                explanation: 'bcryptやArgon2などの強力なハッシュアルゴリズムにソルトを組み合わせることで、レインボーテーブル攻撃などから保護できます。'
            },
            {
                question: 'HTTPヘッダーの「Strict-Transport-Security」の目的はどれですか？',
                answers: [
                    'キャッシュの制御',
                    'ブラウザに常にHTTPSを使用させる',
                    'データの圧縮',
                    'Cookieの制御'
                ],
                correct: 1,
                explanation: 'HSTS（HTTP Strict Transport Security）は、ブラウザに対してそのサイトへは常にHTTPS接続を使用するよう指示するセキュリティヘッダーです。'
            }
        ]
    },
    'aws': {
        title: 'AWS',
        questions: [
            {
                question: 'Amazon S3の特徴として正しいものはどれですか？',
                answers: [
                    'リレーショナルデータベースサービス',
                    'オブジェクトストレージサービス',
                    '仮想サーバーサービス',
                    'コンテナオーケストレーションサービス'
                ],
                correct: 1,
                explanation: 'Amazon S3（Simple Storage Service）は、スケーラブルなオブジェクトストレージサービスで、任意の量のデータを保存・取得できます。'
            },
            {
                question: 'Amazon EC2インスタンスを停止した場合、課金されなくなるものはどれですか？',
                answers: [
                    'インスタンス使用料',
                    'EBSストレージ',
                    'Elastic IP（使用中）',
                    'すべて課金されなくなる'
                ],
                correct: 0,
                explanation: 'EC2インスタンスを停止すると、インスタンスの使用料は課金されませんが、EBSボリュームや割り当てられたElastic IPは引き続き課金されます。'
            },
            {
                question: 'AWS Lambdaの特徴として正しいものはどれですか？',
                answers: [
                    'サーバーの管理が必要',
                    'サーバーレスで実行時間に応じた課金',
                    '24時間365日稼働が必須',
                    'OSの選択が必要'
                ],
                correct: 1,
                explanation: 'AWS Lambdaはサーバーレスコンピューティングサービスで、コードの実行時間に応じて課金され、サーバー管理が不要です。'
            },
            {
                question: 'Amazon RDSで利用できないデータベースエンジンはどれですか？',
                answers: [
                    'MySQL',
                    'PostgreSQL',
                    'MongoDB',
                    'Oracle'
                ],
                correct: 2,
                explanation: 'MongoDBはNoSQLデータベースで、RDSではサポートされていません。MongoDBにはAmazon DocumentDBが提供されています。'
            },
            {
                question: 'Amazon VPCの主な目的はどれですか？',
                answers: [
                    'データベースの管理',
                    '論理的に分離されたネットワーク環境の構築',
                    'ファイルストレージ',
                    'メール送信'
                ],
                correct: 1,
                explanation: 'VPC（Virtual Private Cloud）は、AWS上に論理的に分離された仮想ネットワーク環境を構築するためのサービスです。'
            },
            {
                question: 'Amazon CloudFrontの主な機能はどれですか？',
                answers: [
                    'データベースのレプリケーション',
                    'コンテンツ配信ネットワーク（CDN）',
                    '仮想サーバーの管理',
                    'メール送信サービス'
                ],
                correct: 1,
                explanation: 'CloudFrontは、グローバルに配置されたエッジロケーションを通じて、コンテンツを高速に配信するCDNサービスです。'
            },
            {
                question: 'AWS IAMのベストプラクティスとして正しいものはどれですか？',
                answers: [
                    'ルートアカウントを日常的に使用する',
                    '最小権限の原則に従う',
                    '全ユーザーに管理者権限を付与する',
                    'パスワードは変更しない'
                ],
                correct: 1,
                explanation: 'IAMのベストプラクティスは、必要最小限の権限のみを付与する「最小権限の原則」に従うことです。'
            },
            {
                question: 'Amazon EBSの特徴として正しいものはどれですか？',
                answers: [
                    'オブジェクトストレージ',
                    'EC2インスタンス用のブロックストレージ',
                    'ファイル共有サービス',
                    'データベースサービス'
                ],
                correct: 1,
                explanation: 'EBS（Elastic Block Store）は、EC2インスタンスで使用するための永続的なブロックストレージサービスです。'
            },
            {
                question: 'Amazon DynamoDBの特徴として正しいものはどれですか？',
                answers: [
                    'リレーショナルデータベース',
                    'NoSQLデータベース',
                    'オブジェクトストレージ',
                    'ファイルシステム'
                ],
                correct: 1,
                explanation: 'DynamoDBは、フルマネージドなNoSQLデータベースサービスで、高速で予測可能なパフォーマンスを提供します。'
            },
            {
                question: 'AWS Auto Scalingの主な目的はどれですか？',
                answers: [
                    'データのバックアップ',
                    '需要に応じてリソースを自動的に増減',
                    'セキュリティの強化',
                    'コストの固定化'
                ],
                correct: 1,
                explanation: 'Auto Scalingは、トラフィックの需要に応じてEC2インスタンスなどのリソースを自動的にスケールアップ/ダウンする機能です。'
            }
        ]
    }
};

// App State
let currentCategory = '';
let currentQuestionIndex = 0;
let selectedAnswer = null;
let quizResults = [];
let answeredQuestions = [];
let shuffledAnswers = []; // Store shuffled answers with original indices

// DOM Elements
const categoryScreen = document.getElementById('categoryScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const reviewScreen = document.getElementById('reviewScreen');

const categoryButtons = document.querySelectorAll('.category-btn');
const backBtn = document.getElementById('backBtn');
const submitBtn = document.getElementById('submitBtn');
const reviewBtn = document.getElementById('reviewBtn');
const homeBtn = document.getElementById('homeBtn');
const reviewBackBtn = document.getElementById('reviewBackBtn');

const progressFill = document.getElementById('progressFill');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');
const categoryTitle = document.getElementById('categoryTitle');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const resultContent = document.getElementById('resultContent');
const reviewContent = document.getElementById('reviewContent');
const statsDisplay = document.getElementById('statsDisplay');
const reviewCategoryTitle = document.getElementById('reviewCategoryTitle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => startQuiz(btn.dataset.category));
    });

    backBtn.addEventListener('click', returnToCategories);
    submitBtn.addEventListener('click', submitAnswer);
    reviewBtn.addEventListener('click', showReview);
    homeBtn.addEventListener('click', returnToCategories);
    reviewBackBtn.addEventListener('click', returnToResults);
}

// Start Quiz
function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    quizResults = [];
    answeredQuestions = [];

    showScreen('quiz');
    categoryTitle.textContent = quizData[category].title;
    totalQuestionsEl.textContent = quizData[category].questions.length;
    
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const question = quizData[currentCategory].questions[currentQuestionIndex];
    
    selectedAnswer = null;
    submitBtn.disabled = true;
    
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    questionText.textContent = question.question;
    
    // Update progress
    const progress = ((currentQuestionIndex) / quizData[currentCategory].questions.length) * 100;
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
    // Remove previous selection
    document.querySelectorAll('.answer-btn').forEach(b => {
        b.classList.remove('selected');
    });
    
    // Set new selection
    btn.classList.add('selected');
    selectedAnswer = index;
    submitBtn.disabled = false;
}

// Submit Answer
function submitAnswer() {
    if (selectedAnswer === null) return;
    
    const question = quizData[currentCategory].questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correct;
    
    // Save result
    quizResults.push({
        questionIndex: currentQuestionIndex,
        selectedAnswer: selectedAnswer,
        correct: isCorrect
    });
    
    // Show correct/incorrect feedback
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
    
    // Disable submit button
    submitBtn.disabled = true;
    
    // Move to next question after delay
    submitBtn.disabled = true;
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizData[currentCategory].questions.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    }, 1500);
}

// Finish Quiz
function finishQuiz() {
    // Calculate score
    const correctCount = quizResults.filter(r => r.correct).length;
    const totalCount = quizResults.length;
    const percentage = Math.round((correctCount / totalCount) * 100);
    
    // Save to localStorage
    saveQuizResult(currentCategory, correctCount, totalCount);
    
    // Show result screen
    showScreen('result');
    
    // Display results
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
        </div>
    `;
}

// Show Review
function showReview() {
    showScreen('review');
    reviewCategoryTitle.textContent = quizData[currentCategory].title + ' - 復習';
    
    reviewContent.innerHTML = '';
    quizData[currentCategory].questions.forEach((question, index) => {
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
    showScreen('category');
    loadStats();
}

// Save Quiz Result to localStorage
function saveQuizResult(category, correct, total) {
    const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
    
    if (!results[category]) {
        results[category] = {
            attempts: 0,
            totalCorrect: 0,
            totalQuestions: 0
        };
    }
    
    results[category].attempts++;
    results[category].totalCorrect += correct;
    results[category].totalQuestions += total;
    
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
    
    Object.keys(quizData).forEach(categoryKey => {
        const categoryData = quizData[categoryKey];
        const result = results[categoryKey];
        
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        
        if (result) {
            const avgPercentage = Math.round((result.totalCorrect / result.totalQuestions) * 100);
            statItem.innerHTML = `
                <span class="category-name">${categoryData.title}</span>
                <span class="score">平均正解率: ${avgPercentage}% (${result.attempts}回挑戦)</span>
            `;
        } else {
            statItem.innerHTML = `
                <span class="category-name">${categoryData.title}</span>
                <span class="score">未挑戦</span>
            `;
        }
        
        statsDisplay.appendChild(statItem);
    });
}

// Show Screen
function showScreen(screen) {
    categoryScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    reviewScreen.classList.remove('active');
    
    switch (screen) {
        case 'category':
            categoryScreen.classList.add('active');
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
