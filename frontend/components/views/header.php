<?php

use yii\helpers\Url;
use frontend\widgets\WLang;
use frontend\widgets\ModalFormWidget;
use kartik\form\ActiveForm;
use yii\helpers\Html;
use himiklab\yii2\recaptcha\ReCaptcha;

$lang = substr(Yii::$app->language, 0, 2);
?>

<style>
    .langruage{
        position: absolute;
        right: -60px;
    }
    .menu{
        position: relative;
    }
</style>
<header class="header">

    <div class="container">
        <div class="header_wrap">
            <?php if ($lang == 'ru'){
                $current_lang = '/';
            }else{
                $current_lang = '/' . $lang . '/';
            }?>
            <div class="logo"><a href="<?= Url::to($current_lang); ?>"><img src="/img/logo.png"></a></div>
            <div class="menu_contacts_wrap">
                <div class="menu">
                    <ul class="menu_list">

                        <?php if ($lang == 'ru') { ?>
                            <li><a href="<?= Url::to('/'); ?>">Главная</a></li>
                            <li><a href="<?= Url::to('/conditions'); ?>">Условия продажи</a></li>
                            <li><a href="<?= Url::to('/feedbacks'); ?>">Отзывы</a></li>
                            <li class="services"><a href="<?= Url::to( '/'); ?>">Сервисы</a><i
                                        class="fa fa-angle-down"></i></li>
                            <li style="padding-right: 40px;"><a href="<?= Url::to('/createcontacts'); ?>">Контакты</a></li>
<!--                            <li style="padding-right: 20px;"><a href="--><?//= Url::to('/'); ?><!--">Поддержка</a></li>-->

                        <?php } else { ?>

                            <li><a href="<?= Url::to('/' . $lang . '/'); ?>">Main</a></li>
                            <li><a href="<?= Url::to('/' . $lang . '/conditions'); ?>">Conditions</a></li>
                            <li><a href="<?= Url::to('/' . $lang . '/feedbacks'); ?>">Reviews</a></li>
                            <li class="services"><a href="<?= Url::to('/' . $lang . '/'); ?>">Services</a><i
                                        class="fa fa-angle-down"></i></li>
                            <li style="padding-right: 40px;"><a href="<?= Url::to('/' . $lang . '/createcontacts'); ?>">Contacts</a></li>
<!--                            <li style="padding-right: 20px;"><a href="--><?//= Url::to('/' . $lang . '/'); ?><!--">Support</a></li>-->

                        <?php } ?>


                        <li class="langruage">
                            <?=WLang::widget();?>
                        </li>
                    </ul>
                </div>
                <div class="contacts">
                    <ul class="contacts_list">
                        <li><?=Yii::$app->params['contacts_icq']?></li>
                        <li><?=Yii::$app->params['contacts_email']?></li>
                        <li><?=Yii::$app->params['contacts_telegram']?></li>
                        <li><?=Yii::$app->params['contacts_skype']?></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</header>



