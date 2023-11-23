<?php

namespace App\Models\Xml;

// ブログの定義クラス
class SakeBlog
{
    private $title = '';
    private $postDate = '';
    private $description = '';
    private $content = '';
    private $category = 'category1';

    public function __construct($title)
    {
        $this->title = $title.uniqid();
        $this->postDate = (new \DateTime())->format('Y-m-d H:i:s');
        $this->description = '$description';
        $this->content = '';
    }

    public function getTitle($urlEncode=false)
    {
        if ($urlEncode === true) {
            return urlencode($this->title);
        }
        return $this->title;
    }

    public function getPostDate()
    {
        return $this->postDate;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getContent()
    {
        // コンテンツだし分け？
        // 記事
        // 日本酒APIから自作？
        // https://www.amazon.co.jp/gp/search?ie=UTF8&tag=deutshgo-22&linkCode=ur2
        // &linkId=aae00d622ede47718c9d6118c3bc1c2d
        // &camp=247&creative=1211&index=food-beverage&keywords=男山"
        // $sake = new Sake();
        // $sake->createAllPosts();

        return view('wp_import_file.xml.template.content')->render();
    }

    public function getCategory()
    {
        return $this->category;
    }
}