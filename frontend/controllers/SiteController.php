<?php

namespace frontend\controllers;


use common\models\Students;
use common\models\Test;
use Yii;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\web\UploadedFile;

class SiteController extends AppController
{
    function SiteController()
    {
        parent::AppController();
    }

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout', 'signup'],
                'rules' => [
                    [
                        'actions' => ['signup'],
                        'allow' => true,
                        'roles' => ['?'],
                    ],
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],

            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
            'httpCache' => [
                'class' => 'yii\filters\HttpCache',
                'sessionCacheLimiter' => 'public',
                'cacheControlHeader' => 'public, max-age=604800',
            ],
        ];
    }

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


    public function actionIndex()
    {

        $students = Students::getStudents();
        $model = new Students();

        return $this->render('index',
            [
                'students' => $students,
                'model' => $model
            ]);
    }


    public function actionCreate()
    {
        $model = new Students();
        if ($model->load(Yii::$app->request->post())) {

            $image = UploadedFile::getInstance($model, 'photo');

            if ($image !== null) {
                $model->photo = $image->name;
                $image->saveAs(Yii::getAlias('@frontend/web') . '/img/test/' . $model->photo);
            } else {
                $model->photo = 'error.jpg';
            }
            if ($model->year == ''){
                $model->year = date('Y-m-d');
            }

            $model->save();
            $model->user_id = $model->id;
            $model->save();
            return $this->redirect('/');
        }
    }


    public function actionUpdate($id)
    {

        $model = Students::findModel($id);

        $old_img = $model["photo"];

        if ($model->load(Yii::$app->request->post())) {

            $img = UploadedFile::getInstance($model, 'photo');

            if ($img === null) {
                $model->photo = $old_img;
            } else {
                $model->photo = $img->name;
                $img->saveAs(Yii::getAlias('@frontend/web') . '/img/test/' . $model->photo);
            }

            $model->save();

            return $this->redirect('/');
        }

        return $this->render('update', [
            'model' => $model,
            'field_name' => $_GET['field_name'],
            'field_type' => $_GET['field_type'],
        ]);
    }

    public function actionDelete()
    {
        $model = Students::findModel($_GET['id']);

        $model->$_GET['field_name'] = '';
        $model->save();

        return $this->redirect('/');
    }

    public function actionDeleteForm($id)
    {

        $model = Students::findModel($id);
        $model->delete();
        return $this->redirect(['index']);
    }

    public function actionUpdateForm($id)
    {
        $model = Students::findModel($id);

        $old_img = $model["photo"];
        if ($model->load(Yii::$app->request->post())) {

            $img = UploadedFile::getInstance($model, 'photo');
            if ($img === null) {
                $model->photo = $old_img;
            } else {
                $model->photo = $img->name;
                $img->saveAs(Yii::getAlias('@frontend/web') . '/img/test/' . $model->photo);
            }
            $model->save();
            return $this->redirect('/');
        } else {
            return $this->render('update-form', [
                'model' => $model,
            ]);
        }
    }

}