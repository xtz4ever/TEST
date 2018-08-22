<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
//    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php')
//    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-frontend',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'controllerNamespace' => 'frontend\controllers',

    'modules' => [
        'debug' => [
            'class' => 'yii\debug\Module',
            'allowedIPs' => ['*']
        ],

    ],

    'components' => [

        'request' => [
            'csrfParam' => '_csrf-frontend',
            'baseUrl' => '',
            'enableCookieValidation' => true,
            'enableCsrfValidation' => true,
            'cookieValidationKey' => 'sUKHoU8WXE4mouNbUqUe0lH_Xe37UPmN',
            'class' => 'frontend\components\LangRequest'
        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
            'identityCookie' => ['name' => '_identity-frontend', 'httpOnly' => true],
        ],
        'assetManager' => [
            'class' => 'yii\web\AssetManager',
            'appendTimestamp' => false, // Включить кэширование
        ],

        // Кэширование
//        'cache' => [
//            'class' => 'yii\caching\MemCache',
//            'servers' => [
//                [
//                    'host' => 'localhost',
//                    'port' => 11211,
//                ],
//            ],
//            'useMemcached' => true,
//        ],

        'fileCache' => [
            'class' => 'yii\caching\FileCache',
        ],

//        'mailer' => [
//            'class' => 'yii\swiftmailer\Mailer',
//            'viewPath' => '@common/mail',
//            'useFileTransport' => false,
////            'transport' => [
////                'class' => 'Swift_SmtpTransport',
////                'host' => 'smtp.yandex.ua',
////                'username' => 'noreply@stockaccs.com', /*noreply@stockaccs.com*/
////                'password' => 'h45eRBGBKdfks', /*h45eRBGBKdfks*/
////                'port' => '465',
////                'encryption' => 'ssl',
////            ],
//
//            'transport' => [
//                'class' => 'Swift_SmtpTransport',
//                'host' => 'smtp.gmail.com',
//                'username' => 'xtzeve@gmail.com', /*noreply@stockaccs.com*/
//                'password' => '61206120', /*h45eRBGBKdfks*/
//                'port' => '465',
//                'encryption' => 'ssl',
//            ],
//        ],
        'languages' => ['ru-RU', 'en-US'],
        //-----------------------------------
        'language' => 'ru-RU',// delete 'ru-RU'.
        'i18n' => [
            'translations' => [
                '*' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    'basePath' => '@frontend/messages',
                    'sourceLanguage' => 'ru',
                    'fileMap' => [
                        //'main' => 'main.php',
                    ],
                ],
            ],
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'enableStrictParsing' => false,
            'class' => 'frontend\components\LangUrlManager',
            'rules' => [

                '' => 'site/index',

                [
                    'pattern' => 'index',
                    'route' => 'seller/index',
                    'suffix' => '',
                ],

                [
                    'pattern' => '/feedbacks',
                    'route' => 'site/feedbacks',
                    'suffix' => '',
                ],
                [
                    'pattern' => '/faq',
                    'route' => 'site/faq',
                    'suffix' => '',
                ],
 [
                    'pattern' => '/our-works',
                    'route' => 'site/our-works',
                    'suffix' => '',
                ],
                [
                    'pattern' => '/service-<url>/',
                    'route' => 'site/service',
                    'suffix' => '',
                ],

                [
                    'pattern' => '/sitemap.xml',
                    'route' => 'sitemap/index',
                    'suffix' => '',
                ],
                '<action>' => 'site/<action>',


            ],
        ],

        'session' => [
            // this is the name of the session cookie used for login on the frontend
            'name' => 'advanced-frontend',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        /*
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
            ],
        ],
        */
    ],

    'params' => $params,
];
