<?php

namespace App\Models\Xml;

class BlogInfo
{
    private $blogTitle = '';
    private $domain = '';
    private $description = '';
    private $pubDate = '';
    private $language = 'ja';
    private $wxrVersion = 1.2;
    private $baseSiteUrl = '';
    private $baseBlogUrl = '';

    public function __construct($blogTitle,$domain,$description)
    {
        $this->blogTitle = $blogTitle;
        $this->domain = $domain;
        $this->description = $description;
        $this->pubDate = 'Wed, 02 Aug 2023 05:22:18 +0000';
        $this->baseSiteUrl = 'https://'.$domain;
        $this->baseBlogUrl = $this->baseSiteUrl;
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
}