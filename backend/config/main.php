<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
//    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php')
//    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-backend',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'backend\controllers',

    'bootstrap' => ['log'],
    'modules' => [
        'debug' => [
            'class' => 'yii\debug\Module',
            'allowedIPs' => ['*']
        ],
        'gii' => [
            'class' => \yii\gii\Module::className(),
            'allowedIPs' => ['*'] //      178.150.239.95
        ],
        'dynagrid' => [
            'class' => '\kartik\dynagrid\Module',
            // other settings (refer documentation)
        ],
        'gridview' => [
            'class' => '\kartik\grid\Module',
            // other module settings
            'downloadAction' => 'gridview/export/download',
            'i18n' => []
        ],
    ],
    'components' => [
        'request' => [
            'csrfParam' => '_csrf-backend',
            'baseUrl' => '/pinchuk',
            'cookieValidationKey' => 'sUKHoU8WXE4mouNbUqUe0lH_Xe37UPmN',
//            'class' => 'frontend\components\LangRequest'
        ],

        'view' => [
            'theme' => [
                'pathMap' => [
                    '@app/views' => '@vendor/dmstr/yii2-adminlte-asset/example-views/yiisoft/yii2-app'
                ],
            ],
        ],



        'i18n' => [
            'translations' => [
                'app' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    'basePath' => '@app/messages',
                ],
                'kvgrid' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    'basePath' => '@app/messages',
                ],
            ],
        ],

//        'languages' => ['ru-RU', 'en-US'],
//        //-----------------------------------
//        'language' => 'ru-RU',// delete 'ru-RU'.
//        'i18n' => [
//            'translations' => [
//                '*' => [
//                    'class' => 'yii\i18n\PhpMessageSource',
//                    'basePath' => '@frontend/messages',
//                    'sourceLanguage' => 'ru',
//                    'fileMap' => [
//                        //'main' => 'main.php',
//                    ],
//                ],
//            ],
//        ],

//        'mailer' => [
//            'class' => 'yii\swiftmailer\Mailer',
//            'viewPath' => '@common/mail',
//            'useFileTransport' => false,
//            'transport' => [
//                'class' => 'Swift_SmtpTransport',
//                'host' => 'smtp.yandex.ua',
//                'username' => 'noreply@stockaccs.com', /*noreply@stockaccs.com*/
//                'password' => 'h45eRBGBKdfks', /*h45eRBGBKdfks*/
//                'port' => '465',
//                'encryption' => 'ssl',
//            ],

//            'transport' => [
//                'class' => 'Swift_SmtpTransport',
//                'host' => 'smtp.gmail.com',
//                'username' => 'xtzeve@gmail.com', /*noreply@stockaccs.com*/
//                'password' => '61206120', /*h45eRBGBKdfks*/
//                'port' => '465',
//                'encryption' => 'ssl',
//            ],
//        ],

        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'baseUrl' => '/pinchuk',
//            'class'=>'frontend\components\LangUrlManager',
            'rules' => [
                '' => 'site/index',
                [
                    'pattern' => '<controller>/<action>/<id:\d+>',
                    'route' => '<controller>/<action>',
                    'suffix' => '',
                ],
                [
                    'pattern' => 'user/<role>',
                    'route' => 'user',
                    'suffix' => '',
                ],
                [
                    'pattern' => '<controller>/<action>',
                    'route' => '<controller>/<action>',
                    'suffix' => '',
                ],
                [
                    'pattern' => '<module>/<controller>/<action>/<id:\d+>',
                    'route' => '<module>/<controller>/<action>',
                    'suffix' => '',
                ],
                [
                    'pattern' => '<module>/<controller>/<action>',
                    'route' => '<module>/<controller>/<action>',
                    'suffix' => '',
                ],
            ],


        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
            'identityCookie' => ['name' => '_identity-backend', 'httpOnly' => true],
        ],
        'session' => [
            // this is the name of the session cookie used for login on the backend
            'name' => 'advanced-backend',
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
    'as beforeRequest' => [  //if guest user access site so, redirect to login page.
        'class' => 'yii\filters\AccessControl',
        'rules' => [
            [
                'actions' => ['login', 'error', 'poluchitakk123a13uzxcntyasdsdrugo123ybaz123yda879nn78ykh5bl1eat'],
                'allow' => true,
            ],
            [
                'allow' => true,
                'roles' => ['@'],
            ],
        ],
    ],
    'params' => $params,
];
