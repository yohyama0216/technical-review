<?php

namespace App\Models\Xml;

use Illuminate\Support\Facades\Storage;


class WpXmlGenerator
{
    const FILE_PATH = 'public/';
    const FILENAME_FORMAT = 'wp-%s-%s.xml';
    const PUT_FILE_PATH = '';
    const FILENAME = 'import_file.xml';
    const MIME_TYPE = '';
    const TEMPLATE_PATH = 'wp.wp_import_file.xml.template';

    private $blog = null;

    public function __construct(BaseBlog $blog)
    {
        $this->blog = $blog;
    }

    public function getPosts()
    {
        return $this->blog->getPosts();
    }

    public function getFilename()
    {
        return self::FILENAME;
    }

    public function getPutFilePath()
    {
        return self::PUT_FILE_PATH;
    }

    public function getMimeType()
    {
        return self::MIME_TYPE;
    }

    public function execute()
    {
        $rendered = view(self::TEMPLATE_PATH,['blog' => $this->blog])->render();
        Storage::put(self::FILENAME, $rendered, 'public');
    }
}