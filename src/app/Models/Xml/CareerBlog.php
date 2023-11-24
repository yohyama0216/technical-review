<?php

namespace App\Models\Xml;

use Illuminate\Support\Facades\Storage;

class CareerBlog
{
    private $blogTitle = '簿記で転職';
    private $domain = 'todo.com';
    private $description = '$description';
    private $pubDate = 'Wed, 02 Aug 2023 05:22:18 +0000';
    private $language = 'ja';
    private $wxrVersion = 1.2;
    private $baseSiteUrl = '';
    private $baseBlogUrl = '';
    private $posts = [];
    private $class = '';
    private $width = '';
    private $height = '';
    private $rawPostTextFilePath = '';

    public function __construct()
    {
        // ファイルリーダークラスに任せる？
        $this->rawPostTextFilePath = Storage::path('public/furo/ai.xml');
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
        $data = [
            [
                'title' => '簿記は何級まで取ればいい？',
                'description' => '簿記は何級まで取ればいい？疑問に答えます',
                'heads' => [
                        '未経験者は資格を取るべし',
                        '簿記は3級はより、2級を取ろう',
                        //'まずは簿記の派遣でチャンスをつかむことが大事'
                        // '簿記の1級はコスパ悪い'
                ],
            ]
        ];

        foreach($data as $item) {
            $title = $item['title'];
            $description = '';
            $contentText = '';
            foreach($item['heads'] as $head) {
                $contentText .= $this->getHead($head);
                $contentText .= $this->getContentFromHead($head);
            }
            $categoryJa = '簿記';
            $categoryEn = 'boki';
            $posts[] = new Post($title,$description,$contentText,$categoryJa,$categoryEn);
        }       
        return $posts;
    }

    private function getHead($head)
    {
        return 
            '<!-- wp:heading -->'.PHP_EOL.
            '<h2 class="wp-block-heading {"level":2}">'.PHP_EOL.
            $head.PHP_EOL.
            '</h2>'.PHP_EOL.
            '<!-- /wp:heading -->'.PHP_EOL;
    }

    private function getContentFromHead($head)
    {
        $content = $this->sendApi($head);
        Storage::disk('public')->put('example.txt', $content);        
        return 
            '<!-- wp:paragraph -->'.PHP_EOL.
            '<p>'.PHP_EOL.
            $content.PHP_EOL.
            '</p>'.PHP_EOL.
            $this->getImagefilepath().PHP_EOL.
            '<!-- /wp:paragraph -->'.PHP_EOL;
    }

    private function sendApi($head)
    {
        $ch = curl_init();
        $url = 'https://api.openai.com/v1/chat/completions';
        $api_key = env('CHATGPT_API_KEY');
        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $api_key
        ];
        $data = [
            'model' => 'gpt-3.5-turbo',
            'messages' => [
              [
              "role" => "system",
              "content" => "日本語で応答してください"
              ],
              [
              "role" => "user",
              "content" => '「'.$head.'」というタイトルでブログ用の記事を書いて。1000字程度で日本語で解説して。適度に文章の意味の区切りで改行タグ<br/>を入れて。',
              ]
            ],
        ];
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            echo 'Curl error: ' . curl_error($ch);
        }

        curl_close($ch);

        $json_response = json_decode($response, true);
        $generated_text = $json_response['choices'][0]['message']['content'];
        return str_replace(PHP_EOL.PHP_EOL,PHP_EOL.'</p><!-- /wp:paragraph -->'.PHP_EOL.'<!-- wp:paragraph --><p>'.PHP_EOL,$generated_text);
    }

    private function getImagefilepath()
    {
        return sprintf(
            '<img class="%s" src="%s" alt="" width="%s" height="%s" />',
            $this->class,
            $this->baseBlogUrl.'/wp-content/uploads/2023/11/'.random_int(1,100).'.jpg',
            $this->width,
            $this->height
        );
    }
}