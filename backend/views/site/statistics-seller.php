<?php
use yii\helpers\Url;
use yii\helpers\Html;
//echo $model;
$order_id = 46;
echo Url::to(Yii::$app->params['url_stockaccs'].'/view-accounts/'.$order_id);


