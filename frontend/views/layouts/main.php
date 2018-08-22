<?php

/**
 * @var string $content
 * @var \yii\web\View $this
 */

use yii\helpers\Html;
use backend\assets\AppAsset;
use yii\widgets\Breadcrumbs;
use common\models\Newprovider;
AppAsset::register($this);
$bundle = yiister\gentelella\assets\Asset::register($this);

?>
<?php $this->beginPage(); ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta charset="<?= Yii::$app->charset ?>" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <!--    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>-->
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>


    <![endif]-->
    <style>
        .xtz_new_provider{
            font-size: 15px;
            background-color: red;
        }
        .panel-primary{
            max-width: 1800px!important;
            min-width: 1366px!important;
        }
        .kv-panel-before >  .pull-right{
            float: left!important;
        }
        /*tbody > tr > td {*/
        /*text-align: center;*/
        /*width: 50px!important;*/
        /*}*/
    </style>
</head>
<body class="nav-md">



<?php $this->beginBody(); ?>

<?php
//if (Yii::$app->user->id === NULL){?>
<!--    <script type="text/javascript">-->
<!--        window.location = "efimenkostockaccs/site/login"-->
<!--    </script>-->
<!---->
<?php //}else{ ?>


<div class="container body">

    <div class="main_container">



        <!-- page content -->
        <div class="right_col" role="main" style="background-color: rgba(8, 251, 251, 0)">
            <?php if (isset($this->params['h1'])): ?>
                <div class="page-title">
                    <div class="title_left">
                        <h1><?= $this->params['h1'] ?></h1>
                    </div>
                    <div class="title_right">
                        <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search for...">
                                <span class="input-group-btn">
                                <button class="btn btn-default" type="button">Go!</button>
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
            <div class="clearfix"></div>

            <?= Breadcrumbs::widget([
                'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
            ]) ?>

            <?= $content ?>
        </div>
        <!-- /page content -->
        <!-- footer content -->
        <!--        <footer>-->
        <!--            <div class="pull-right">-->
        <!--                Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com" rel="nofollow" target="_blank">Colorlib</a><br />-->
        <!--                Extension for Yii framework 2 by <a href="http://yiister.ru" rel="nofollow" target="_blank">Yiister</a>-->
        <!--            </div>-->
        <!--            <div class="clearfix"></div>-->
        <!--        </footer>-->
        <!-- /footer content -->
    </div>

</div>

<?php //} ?>

<div id="custom_notifications" class="custom-notifications dsp_none">
    <ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group">
    </ul>
    <div class="clearfix"></div>
    <div id="notif-group" class="tabbed_notifications"></div>
</div>
<!-- /footer content -->
<?php $this->endBody(); ?>


</body>
</html>
<?php $this->endPage(); ?>
