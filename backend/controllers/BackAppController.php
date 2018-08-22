<?php

namespace backend\controllers;

use common\models\AccCategory;
use common\models\AccProduct;
use common\models\AccRightSideBarForCategory;
use common\models\Category;
use common\models\Faq;
use common\models\OurWorks;
use common\models\PartnerPercentForPaiment;
use common\models\PartnerPromotionalBanner;
use common\models\PartnerPromotionalBannerSize;
use common\models\PartnerPromotionalCategory;
use Yii;
use yii\web\Controller;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use common\models\ProviderAccountsForActivationRequired;
use common\models\ProviderAccountType;
use common\models\StockAllOrders;
use common\models\ListOfPurchasedAccounts;

/**
 * App controller
 */
class BackAppController extends Controller
{

//    public function behaviors()
//    {
//        return [
//            'access' => [
//                'class' => AccessControl::className(),
//                'rules' => [
//                    [
//                        'actions' => ['login', 'error'],
//                        'allow' => true,
//                    ],
//                    [
//                        'actions' => ['logout', 'index'],
//                        'allow' => true,
//                        'roles' => ['@'],
//                    ],
//                ],
//            ],
//            'verbs' => [
//                'class' => VerbFilter::className(),
//                'actions' => [
//                    'logout' => ['post'],
//                ],
//            ],
//        ];
//    }

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


//    public function beforeAction($action)
//    {

//    }

    public function varD($var)
    {
        echo '<pre>';
        var_dump($var);
        echo '</pre>';
    }

    public function actionUpdateposition()
    {
        $id = Yii::$app->request->post()['id'];

        switch (Yii::$app->request->post()['case']) {

            case 'faq':
                $query = Faq::find()->where(['id' => $id])->one();
                $query->position = Yii::$app->request->post()['position'];
                $query->save();
                break;
            case 'our-works':
                $query = OurWorks::find()->where(['id' => $id])->one();
                $query->position = Yii::$app->request->post()['position'];
                $query->save();
                break;

            case 'category':
                $query = Category::find()->where(['id' => $id])->one();
                $query->position = Yii::$app->request->post()['position'];
                $query->save();
                break;


        }


        $query->position = Yii::$app->request->post()['position'];
        if ($query->save()) {
            $success = 1;
        } else {
            $success = 0;
        }


        return json_encode($success);


    }


}