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

        <div class="col-md-3 left_col">
            <div class="left_col scroll-view">

                <div class="navbar nav_title" style="border: 0;">
                    <a href="/" class="site_title"><i class="fa fa-rocket" aria-hidden="true"></i> <span>Stockaccs.com</span></a>
                </div>
                <div class="clearfix"></div>

                <!-- menu prile quick info -->
                <div class="profile">
<!--                    <div class="profile_pic">-->
<!--                        <img src="http://placehold.it/128x128" alt="..." class="img-circle profile_img">-->
<!--                    </div>-->
                    <div class="profile_info">

                        <h2>С возвращением, <?=Yii::$app->user->identity->username;?></h2>
                    </div>
                </div>
                <!-- /menu prile quick info -->

                <br />
                <!-- Подсказки для АДМИНКИ-->
                <?php


                ?>

                <!-- sidebar menu -->
                <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">

                    <div class="menu_section" style="margin-top: 40px">
<!--                        <h3>General</h3>-->

<!--                        --><?php // $news = $this->params['new_provider'];
//                            if ($news){
//                                $new_seller = ["label" => "Заявка на поставщика", "url" => ["/newprovider"],"badge" => "new","badgeOptions" => ["class" => "label-success"]];
//                            }else{
//                                $new_seller = ["label" => "Заявка на поставщика", "url" => ["/newprovider"]];
//                            }
//
//                        ?>

                        <?=
                        \yiister\gentelella\widgets\Menu::widget(
                            [
                                "items" => [

                                    ["label" => "На главную", "url" => "/pinchuk", "icon" => "home"],



                                    [
                                        "label" => "Категории услуг и услуги",
                                        "url" => "#",
                                        "icon" => "anchor",
                                        "badge" => "!",
                                        "badgeOptions" => ["class" => "label-success"],
                                        "items" => [
                                            ["label" => "Категории услут", "url" => ["/category"], "icon" => "files-o"],
                                            ["label" => "Услуги ", "url" => ["/services"], "icon" => "signing"],

                                        ],
                                    ],



                                    ["label" => "СЕО", "url" => ["/seopage"], "icon" => "close"],
                                    ["label" => "Наши работы", "url" => ["/our-works"], "icon" => "clone"],
                                    ["label" => "FAQ", "url" => ["/faq"], "icon" => "book"],
                                    ["label" => "Отзывы", "url" => ["/feedbacs"], "icon" => "comment"],
                                    ["label" => "Контакты", "url" => ["/contacts"], "icon" => "address-book"],

                                    [
                                        "label" => "Для разработчика",
                                        "url" => "#",
                                        "icon" => "heartbeat",
                                        "badge" => "!",
                                        "badgeOptions" => ["class" => "label-danger"],
                                        "items" => [
                                            ["label" => "GII", "url" => ["/gii"], "icon" => "files-o"],
                                            ["label" => "Создание регулярок для проверки аккаунтов", "url" => ["/account-verification"], "icon" => "microchip"],

                                        ],
                                    ],
//
                                ],
                            ]
                        )
                        ?>
                    </div>

                </div>
                <!-- /sidebar menu -->

                <!-- /menu footer buttons -->
                <div class="sidebar-footer hidden-small">



                        <?= Html::a("", ['/site/logout'], [
                            'data' => ['method' => 'post'],
                            'class' => 'glyphicon glyphicon-off',
                            'data-toggle' => 'tooltip',
                            'data-placement' => 'top',
                            'title'=>'Выход'
                        ]);?>

                </div>
                <!-- /menu footer buttons -->
            </div>
        </div>

        <!-- top navigation -->
        <div class="top_nav">

            <div class="nav_menu">
                <nav class="" role="navigation">
                    <div class="nav toggle">
                        <a id="menu_toggle"><i class="glyphicon glyphicon-chevron-down"></i></a>
                    </div>

                    <ul class="nav navbar-nav navbar-right">
                        <b>Вопросительные знаки возле каждого пункат меню, это подсказки</b>
                        <li class="">
                            <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <?=Yii::$app->user->identity->username;?>
                                <span class=" fa fa-angle-down"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-usermenu pull-right">
                                <li><a href="javascript:;">  Profile</a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <span class="badge bg-red pull-right">50%</span>
                                        <span>Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">Help</a>
                                </li>
                                <li><?= Html::a("", ['/site/logout'], [
                                        'data' => ['method' => 'post'],
                                        'class' => 'glyphicon glyphicon-off',
                                        'data-toggle' => 'tooltip',
                                        'data-placement' => 'top',
                                        'title'=>'Выход'
                                    ]);?>
                                </li>
                            </ul>
                        </li>

                        <li role="presentation" class="dropdown">
                            <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-envelope-o"></i>
                                <span class="badge bg-green">6</span>
                            </a>
                            <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
                                <li>
                                    <a>
                      <span class="image">
                                        <img src="http://placehold.it/128x128" alt="Profile Image" />
                                    </span>
                      <span>
                                        <span>John Smith</span>
                      <span class="time">3 mins ago</span>
                      </span>
                      <span class="message">
                                        Film festivals used to be do-or-die moments for movie makers. They were where...
                                    </span>
                                    </a>
                                </li>
                                <li>
                                    <a>
                      <span class="image">
                                        <img src="http://placehold.it/128x128" alt="Profile Image" />
                                    </span>
                      <span>
                                        <span>John Smith</span>
                      <span class="time">3 mins ago</span>
                      </span>
                      <span class="message">
                                        Film festivals used to be do-or-die moments for movie makers. They were where...
                                    </span>
                                    </a>
                                </li>
                                <li>
                                    <a>
                      <span class="image">
                                        <img src="http://placehold.it/128x128" alt="Profile Image" />
                                    </span>
                      <span>
                                        <span>John Smith</span>
                      <span class="time">3 mins ago</span>
                      </span>
                      <span class="message">
                                        Film festivals used to be do-or-die moments for movie makers. They were where...
                                    </span>
                                    </a>
                                </li>
                                <li>
                                    <a>
                      <span class="image">
                                        <img src="http://placehold.it/128x128" alt="Profile Image" />
                                    </span>
                      <span>
                                        <span>John Smith</span>
                      <span class="time">3 mins ago</span>
                      </span>
                      <span class="message">
                                        Film festivals used to be do-or-die moments for movie makers. They were where...
                                    </span>
                                    </a>
                                </li>
                                <li>
                                    <div class="text-center">
                                        <a href="/">
                                            <strong>See All Alerts</strong>
                                            <i class="fa fa-angle-right"></i>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </nav>
            </div>

        </div>
        <!-- /top navigation -->

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
