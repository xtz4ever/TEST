<?php

namespace backend\controllers;

use common\models\ProviderPersonalOrder;
use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use common\models\LoginForm;
use common\models\ExchangeRates;
/**
 * Site controller
 */
class SiteController extends BackAppController
{
    /**
     * @inheritdoc
     */


    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

//
//    public function behaviors()
//    {
//        return [
//            'access' => [
//                'class' => \yii\filters\AccessControl::className(),
//                'only' => ['test'],
//                'rules' => [
//                    // deny all POST requests
//                    [
//                        'allow' => false,
//                        'verbs' => ['POST']
//                    ],
//                    // allow authenticated users
//                    [
//                        'allow' => true,
//                        'roles' => ['?'],
//                    ],
//                    // everything else is denied
//                ],
//            ],
//        ];
//    }
    public function actionError()
    {

        if (\Yii::$app->user->isGuest) {
            $this->layout = "@app/views/layouts/error";

            $model = new LoginForm();


            $error = "Страница не найдена " . '<br/>' . 'для авторизации перейдите по ' . '<a href="/pinchuk/site/login">Cсылке</a>';
            return $this->render('index', [
                'error' => $error,
                'model' => $model
            ]);

        } else {
            return [
                'error' => [
                    'class' => 'yii\web\ErrorAction',
                ],
            ];
        }

    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function beforeAction($action)
    {
        if (in_array($action->id, [])) {
            $this->enableCsrfValidation = false;
        }
        return parent::beforeAction($action);
    }



    public function actionIndex()
    {

        return $this->render('index',[]);
    }

    /**
     * Login action.
     *
     * @return string
     */

    public function actionLogin()
    {


        $this->layout = "@app/views/layouts/main-login";
//        if (!Yii::$app->user->isGuest) {
//            return $this->goHome();
//        }
        $model = new LoginForm();



        if ($model->load(Yii::$app->request->post()) ) {

            if ($model->login()) {
//                return $this->goBack();
                return $this->redirect('/pinchuk');
            } else {
                return $this->render('login', [
                    'model' => $model,
                ]);
            }
        } else {

            return $this->render('login', [
                'model' => $model,
            ]);
        }
    }

    public function actionStatisticsSeller()
{
    $model = new ProviderPersonalOrder();

    if ($model->load(Yii::$app->request->post())) {


        return $this->render('statistics-seller', [
            'model' => $model,
        ]);
    }

    return $this->render('statistics-seller', [
        'model' => $model,
    ]);

}
    /**
     * Logout action.
     *
     * @return string
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }
}
