<?php

namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use common\models\SeoPage;
use yii\web\Response;
use yii\widgets\ActiveForm;
use frontend\models\LangTextForSite;

/**
 * App controller
 */
class AppController extends Controller
{

    public function NEWbehaviors()
    {
        return [
            [
                'class' => 'yii\filters\PageCache',
                'only' => ['index'],
                'duration' => 60,
                'variations' => [
                    \Yii::$app->language,
                ],
//                'dependency' => [
//                    'class' => 'yii\caching\DbDependency',
//                    'sql' => 'SELECT COUNT(*) FROM post',
//                ],
            ],
        ];
    }

    public function beforeAction($action)
    {


        $page = new SeoPage();
        $page_info = $page->getSeo(Yii::$app->controller->action->id);
        $this->getView()->title = $page_info['seo_title'];

        return parent::beforeAction($action, ['page_info' => $page_info]);
    }

    public function PageInfo()
    {
        $page = new SeoPage();
        $page_info = $page->getSeo(Yii::$app->controller->action->id);
        if ($page_info) {
            $this->getView()->title = $page_info['seo_title'];
            return $page_info;
        }else{
            $this->getView()->title = Yii::$app->controller->action->id;
        }
    }

       public function varD($var)
    {
        echo '<pre style=" z-index: 9999999;margin-left: 10%;margin-top: 10%;overflow-x: auto;">';
        var_dump($var);
        echo '</pre>';
    }


    protected function performAjaxValidation($model)
    {
        if (Yii::$app->request->isAjax && $model->load(Yii::$app->request->post())) {
            Yii::$app->response->format = 'json'; /*Response::FORMAT_JSON*/
            return ActiveForm::validate($model);
        }
    }

    public function getCountry()
    {
        $geo = file_get_contents('http://api.sypexgeo.net/json/' . $_SERVER['REMOTE_ADDR']);
        $geo = json_decode($geo);
        return $geo->country->name_en;
    }

 public function createUniqueFileName()
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $name = '';
        for ($i = 0; $i <= 24; $i++) {
            $name .= $characters[mt_rand(0, strlen($characters) - 1)];
        }
        return $name.'.txt';
    }


    public function getText()
    {

        $model = new LangTextForSite();
        $text = $model->actionTEXT(Yii::$app->controller->action->id);

        return $text;
    }

    public function actionYmtest()
    {
        file_put_contents(__DIR__.'/yandex-money-response.txt', serialize($_POST));
    }


}