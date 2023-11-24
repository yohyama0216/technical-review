<?php

namespace App\Models\Xml;

use Illuminate\Support\Facades\Storage;

class WpXml
{
    const FILE_PATH = 'public/';
    const FILENAME_FORMAT = 'wp-%s-%s.xml';
    
    private $filename = 'import_file.xml';
    private $putFilePath = '';
    private $mimeType = '';
    private $rendered = '';
    private $blogInfo = null;
    private $posts = [];

    public function __construct()
    {
        $this->putFilePath = self::FILE_PATH.$this->filename;
    }

    public function getBlogInfo()
    {
        return $this->blogInfo;
    }

    public function getPosts()
    {
        return $this->posts;
    }

    public function getFilename()
    {
        return $this->filename;
    }

    public function getPutFilePath()
    {
        return $this->putFilePath;
    }

    public function getMimeType()
    {
        return $this->mimeType;
    }

    public function createContent()
    {
        $blogs = new CareerBlog();
        $this->rendered = view('wp.wp_import_file.xml.template',['blog' => $blogs])->render();
    }

    public function save()
    {
        Storage::put($this->putFilePath, $this->rendered, 'public');
    }
}