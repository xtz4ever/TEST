<?php

namespace frontend\assets;

use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/site.css',
        'css/common.css',

    ];
    public $js = [
        'js/my_script.js',
        'js/jquery-1.12.4.min.js',
        'js/jquery-ui.min.js',

        'https://www.google.com/recaptcha/api/js/recaptcha_ajax.js',



    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
        'yiister\gentelella\assets\Asset',
    ];
}
