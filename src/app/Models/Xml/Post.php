<?php

namespace App\Models\Xml;

class Post
{
    private $title = '';
    private $postDate = '';
    private $description = '';
    private $content = '';
    private $categoryJa = '';
    private $categoryEn = '';
    private $thumbnailId = '';

    public function __construct($title,$description,$content,$categoryJa,$categoryEn)
    {
        $this->title = $title;
        $this->postDate = (new \DateTime())->format('Y-m-d H:i:s');
        $this->description = $description;
        $this->content = $content;
        $this->categoryJa = $categoryJa;
        $this->categoryEn = $categoryEn;
        $this->thumbnailId = '';
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
        return $this->content;
    }

    public function getCategoryJa()
    {
        return $this->categoryJa;
    }

    public function getCategoryEn()
    {
        return $this->categoryEn;
    }

    public function getThumbnailId()
    {
        return random_int(321,369);
    }
}