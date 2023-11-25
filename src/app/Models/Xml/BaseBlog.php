<?php

namespace App\Models\Xml;

use Illuminate\Support\Facades\Storage;

class BaseBlog
{
    private $blogTitle = '';
    private $domain = '';
    private $description = '';
    private $postSource = '';
    private $posts = [];

    const PUB_DATE = 'Wed, 02 Aug 2023 05:22:18 +0000';
    const LANGUAGE = 'ja';
    const WXR_VERSION = 1.2;

    public function __construct($blogTitle,$domain,$description,$postSource)
    {
        $this->blogTitle = $blogTitle;
        $this->domain = $domain;
        $this->description = $description;
        $this->postSource = $postSource;
        $this->posts = $this->createPostsFromApi();
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
        return self::PUB_DATE;
    }

    public function getLanguage()
    {
        return self::LANGUAGE;
    }

    public function getWxrVersion()
    {
        return self::WXR_VERSION;
    }

    public function getBaseSiteUrl()
    {
        return 'https://'.$this->domain;
    }

    public function getBaseBlogUrl()
    {
        return $this->domain;
    }

    public function getPosts()
    {
        return $this->posts;
    }

    private function createPostsFromApi()
    {
        // ファイルの内容を取得
        $contents = Storage::get('public/'.$this->postSource);
        $data = [];
        // 改行で分割して各行に対して処理
        // $lines = explode(PHP_EOL, $contents);
        // foreach ($lines as $line) {
        //     // ここで各行に対する処理を行う
        //     $items = explode(PHP_EOL,$line);
        // }
        //$lines = explode(PHP_EOL, $contents);
        //dd($lines);
        $lines = [
            'フリーランスのための簡単経理ガイド,個人事業主のための基本会計,フリーランスの税務管理のポイント'
        ];
        foreach($lines as $line) {
            $data[] = $this->setData($line); 
        }
        foreach($data as $item) {
            $title = $item['title'];
            $description = '';
            $contentText = $this->getImagefilepath().PHP_EOL;
            foreach($item['heads'] as $key => $head) {
                $contentText .= $this->getHead($key,$head);
                if($key == 2) {
                    $head = $item['heads'][0]."。".$item['heads'][1];
                } 
                $contentText .= $this->getContentFromHead($title,$head);
            }
            $categoryJa = '簿記';
            $categoryEn = 'boki';
            $posts[] = new Post($title,$description,$contentText,$categoryJa,$categoryEn);
        }       
        return $posts;
    }

    private function setData($item)
    {
        $arr = explode(',',$item);
        return [
            'title' => $arr[0],
            'description' => $arr[0].'？疑問に答えます',
            'heads' => [
                    $arr[1],
                    $arr[2],
                    'まとめ',
            ],
        ];
    }

    private function getHead($key,$head)
    {
        if ($key == 2) {
            $head = 'まとめ';
        }
        return 
            '<!-- wp:heading -->'.PHP_EOL.
            '<h2 class="wp-block-heading {"level":2}">'.PHP_EOL.
            $head.PHP_EOL.
            '</h2>'.PHP_EOL.
            '<!-- /wp:heading -->'.PHP_EOL;
    }

    private function getContentFromHead($title,$head)
    {
        $content = $this->sendApi($title,$head);
        //Storage::disk('public')->put('example.txt', $content);        
        return 
            '<!-- wp:paragraph -->'.PHP_EOL.
            '<p>'.PHP_EOL.
            $content.PHP_EOL.
            '</p>'.PHP_EOL.
            $this->getImagefilepath().PHP_EOL.
            '<!-- /wp:paragraph -->'.PHP_EOL;
    }

    private function sendApi($title,$head)
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
                "content" => "簿記、会計に詳しい転職アドバイザーとして、日本語で応答してください"
              ],
              [
                "role" => "user",
                "content" => '「'.$title.'」というブログ記事のを書いています。その記事の中の「'.$head.'」という見出し用の記事を書いて。1000字程度で解説して。',
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
        if (!array_key_exists('choices',$json_response)) {
            dd($json_response);
        }
        $generated_text = $json_response['choices'][0]['message']['content'];
        return str_replace(PHP_EOL.PHP_EOL,PHP_EOL.'</p><!-- /wp:paragraph -->'.PHP_EOL.'<!-- wp:paragraph --><p>'.PHP_EOL,$generated_text);
    }

    private function getImagefilepath($class = '', $width = 'auto', $height = 'auto')
    {
        $imageUrl = $this->getBaseBlogUrl() . '/wp-content/uploads/2023/11/blog-image-' . random_int(10, 45) . '.jpg';
        return <<<HTML
    <img class="{$class}" src="{$imageUrl}" alt="" width="{$width}" height="{$height}" />
    HTML;
    }
}