<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;

class ArticleController extends Controller
{
    // 記事一覧
    public function index()
    {
        $articles = Article::orderBy('created_at', 'desc')->get();
        return view('front.article.index', compact('articles'));
    }

    // 記事詳細
    public function show($id)
    {
        $article = Article::findOrFail($id);
        return view('front.article.show', compact('article'));
    }

    // カテゴリ一覧
    public function category($category)
    {
        $articles = Article::where('category', $category)->orderBy('created_at', 'desc')->get();
        return view('front.article.category', compact('articles', 'category'));
    }

    // 投稿フォーム
    public function create()
    {
        return view('front.article.create');
    }

    // 投稿保存
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
            'category' => 'required|max:50',
        ]);
        Article::create($validated);
        return redirect()->route('article.index')->with('success', '記事を投稿しました');
    }

    // 編集フォーム
    public function edit($id)
    {
        $article = Article::findOrFail($id);
        return view('front.article.edit', compact('article'));
    }

    // 編集保存
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
            'category' => 'required|max:50',
        ]);
        $article = Article::findOrFail($id);
        $article->update($validated);
        return redirect()->route('article.show', $id)->with('success', '記事を更新しました');
    }

    // プロフィール
    public function profile()
    {
        return view('front.article.profile');
    }

    // お問い合わせ
    public function contact()
    {
        return view('front.article.contact');
    }
} 