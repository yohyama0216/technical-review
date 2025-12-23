# Quiz Data Completion Guide

## Current Status

- **Total Questions:** 171
- **Categories Complete:** 6 out of 30 (20%)
- **Questions Needed:** 430 across 24 remaining categories

## Completed Categories ✅

1. 英単語 > 990+ > ビジネス・経済: 20 questions
2. バックエンド技術 > DBパフォーマンス > 接続管理: 21 questions  
3. バックエンド技術 > API設計 > RESTful設計: 20 questions
4. バックエンド技術 > API設計 > エラーハンドリング: 20 questions
5. バックエンド技術 > API設計 > バージョニング: 20 questions
6. バックエンド技術 > データベース > インデックス設計: 20 questions

## Remaining Categories (Need Questions)

### High Priority - Almost Complete
- クエリ最適化 (DBパフォーマンス): 10/20 → need 10
- インデックス最適化 (DBパフォーマンス): 5/20 → need 15

### Medium Priority - Partially Complete  
- クエリ最適化 (データベース): 4/20 → need 16
- トランザクション (データベース): 2/20 → need 18
- バンドル最適化 (アプリパフォーマンス): 2/20 → need 18
- 認証・認可 (セキュリティ): 2/20 → need 18
- 脆弱性対策 (セキュリティ): 2/20 → need 18
- コンテナ技術 (クラウドインフラ): 2/20 → need 18
- CI/CD (クラウドインフラ): 2/20 → need 18
- スケーラビリティ (システム設計): 2/20 → need 18
- マイクロサービス (システム設計): 2/20 → need 18
- 状態管理 (フロントエンド設計): 2/20 → need 18
- コンポーネント設計 (フロントエンド設計): 2/20 → need 18

### Lower Priority - Need Many Questions
- フロントエンド最適化 (アプリパフォーマンス): 1/20 → need 19
- レンダリング最適化 (アプリパフォーマンス): 1/20 → need 19
- HTTPキャッシング (キャッシュ): 1/20 → need 19
- アプリケーションキャッシュ (キャッシュ): 1/20 → need 19
- CDN (キャッシュ): 1/20 → need 19
- データベースキャッシュ (キャッシュ): 1/20 → need 19
- キャッシュ戦略 (キャッシュ): 1/20 → need 19
- 暗号化 (セキュリティ): 1/20 → need 19
- モニタリング (クラウドインフラ): 1/20 → need 19
- 可用性設計 (システム設計): 1/20 → need 19
- パフォーマンス (フロントエンド設計): 1/20 → need 19

## Question Template

Each question should follow this structure:

```javascript
{
    majorCategory: 'カテゴリ大',
    middleCategory: 'カテゴリ中',
    minorCategory: 'カテゴリ小',
    question: '問題文を記述',
    answers: [
        '選択肢1',
        '選択肢2', 
        '選択肢3',
        '選択肢4',
    ],
    correct: 0, // 正解のインデックス (0-3)
    explanation: '詳しい解説を記述',
},
```

## Tips for Creating Questions

1. **Make questions specific and practical** - Focus on real-world scenarios
2. **Provide clear explanations** - Help users learn from both correct and incorrect answers
3. **Ensure one clearly correct answer** - Avoid ambiguous questions
4. **Cover diverse topics within each category** - Don't repeat similar questions
5. **Match difficulty to TOEIC 990+ level for English vocabulary** - Use advanced vocabulary
6. **Match difficulty to technical interview level** - Target mid to senior engineer knowledge

## Next Steps

1. Complete the high-priority categories first (closest to 20 questions)
2. Then tackle medium-priority categories  
3. Finally complete the categories with only 1 question
4. Run `npm run lint` after each batch of changes
5. Test the application after major changes

## Validation

After adding questions, run:
```bash
npm run lint
node /tmp/test_questions.js  # If test script exists
```

Open `index.html` in a browser and verify:
- New categories appear in the UI
- Questions display correctly
- Answers and explanations show properly
