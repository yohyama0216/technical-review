<?php

namespace App\Models\Xml;

use Illuminate\Support\Facades\Storage;

class TestBlog
{
    private $blogTitle = '入浴剤のまとめ';
    private $domain = 'furoyasan.com';
    private $description = '$description';
    private $pubDate = 'Wed, 02 Aug 2023 05:22:18 +0000';
    private $language = 'ja';
    private $wxrVersion = 1.2;
    private $baseSiteUrl = '';
    private $baseBlogUrl = '';
    private $posts = [];
    private $rawPostTextFilePath = '';

    public function __construct()
    {
        // ファイルリーダークラスに任せる？
        $this->rawPostTextFilePath = Storage::path('public/furo/*.txt');
        $this->posts = $this->createPosts();
        $this->baseSiteUrl = 'https://'.$this->domain;
        $this->baseBlogUrl = 'https://'.$this->domain;
    }

    public function getBlogTitle()
    {
        return $this->blogTitle;
    }

    public function getDomain()
    {
        return $this->domain;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getPubDate()
    {
        return $this->pubDate;
    }

    public function getLanguage()
    {
        return $this->language;
    }

    public function getWxrVersion()
    {
        return $this->wxrVersion;
    }

    public function getBaseSiteUrl()
    {
        return $this->baseSiteUrl;
    }

    public function getBaseBlogUrl()
    {
        return $this->baseBlogUrl;
    }

    public function getPosts()
    {
        return $this->posts;
    }

    private function createPosts()
    {
        $files = glob($this->rawPostTextFilePath);
        $posts = [];
        foreach($files as $file) {
            $rawContent = file_get_contents($file);
            $title = $this->createTitle($rawContent);
            $description = $this->createDescription($rawContent);
            $content = $this->createContent($rawContent);
            $categoryJa = '入浴剤の雑学';
            $categoryEn = 'trivia';
            $posts[] = new Post($title,$description,$content,$categoryJa,$categoryEn);
        }   
        $this->moveFiles();     
        return $posts;
    }

    public function createTitle($rawContent)
    {
        $pattern = '/【タイトル】'.PHP_EOL.'([\s\S]*)'.PHP_EOL.PHP_EOL.'【まえおき】/';
        preg_match($pattern,$rawContent,$match);
        return $match[1];
    }

    public function createDescription($rawContent)
    {
        $pattern = '/【まえおき】'.PHP_EOL.'([\s\S]*)'.PHP_EOL.PHP_EOL.'【本題】/';
        preg_match($pattern,$rawContent,$match);
        return $match[1];
    }

    public function createContent($rawContent)
    {
        $pattern = '/【本題】'.PHP_EOL.'([\s\S]*)/';
        preg_match($pattern,$rawContent,$match);
        $content = $this->createDescription($rawContent).PHP_EOL.PHP_EOL.$this->replaceHeaderTags($match[1]);
        return $content;
    }

    private function replaceHeaderTags($content)
    {
        return str_replace(
            [
                '<h1>','</h1>',
                '<h2>','</h2>',
                '<h3>','</h3>',
            ],
            [
                '<h1 class="wp-block-heading {"level":1}">','</h1><!-- /wp:heading -->',
                '<h2 class="wp-block-heading {"level":2}">','</h2><!-- /wp:heading -->',
                '<h3 class="wp-block-heading {"level":3}">','</h3><!-- /wp:heading -->',
            ],
            $content,
        );
    }

    private function moveFiles()
    {
        //ファイルを移動する。このクラスに書くべきではない気がする。
    }

    // guid を空にする。
    // creator, link, pubDate
}