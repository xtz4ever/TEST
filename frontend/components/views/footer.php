<?php
use yii\helpers\Url;
?>



<footer class="footer">

    <div class="container">
        <div class="logo_footer"><a href=""><img src="/img/logo-footer.png"></a></div>
        <div class="footer_links">
            <ul class="links_list">

                <?php if ($lang == 'en'){ ?>
                    <li><a href="<?=Url::to('/'.$lang.'/');?>">Main</a></li>
                    <li><a href="<?=Url::to('/'.$lang.'/conditions');?>">Conditions</a></li>
                    <li><a href="<?=Url::to('/'.$lang.'/createcontacts');?>">Contacts</a></li>
                    <li><a href="<?=Url::to('/'.$lang.'/feedbacks');?>">Reviews</a></li>
<!--                    <li><a href="--><?//=Url::to('/'.$lang.'/');?><!--">Support</a></li>-->
                    <li><a href="<?=Url::to('/'.$lang.'/affiliate-program-main');?>">Affiliate program</a></li>
                    <li><a href="<?=Url::to('/'.$lang.'/login-provider');?>">Suppliers</a></li>



                <?php }else{ ?>

                    <li><a href="<?=Url::to('/');?>">Главная</a></li>
                    <li><a href="<?=Url::to('/conditions');?>">Условия продажи</a></li>
                    <li><a href="<?=Url::to('/createcontacts');?>">Контакты</a></li>
                    <li><a href="<?=Url::to('/feedbacks');?>">Отзывы</a></li>
<!--                    <li><a href="--><?//=Url::to('/');?><!--">Поддержка</a></li>-->
                    <li><a href="<?=Url::to('/affiliate-program-main');?>">Партнерская программа</a></li>
                    <li><a href="<?=Url::to('/login-provider');?>">Поставщикам</a></li>

                <?php } ?>




            </ul>
        </div>
        <div class="footer_contacts">
            <ul class="contacts_list">
                <li><?=Yii::$app->params['contacts_icq']?></li>
                <li><?=Yii::$app->params['contacts_email']?></li>
                <li><?=Yii::$app->params['contacts_skype']?></li>
            </ul>
        </div>
        <div class="footer_creator" style="display: none;"><a href="#">
                <?php $lang == 'ru' ?  $text = 'Создание сайта:' : $text = 'Website creation:' ; ?>
                <h5><?=$text;?></h5><img src="/img/el_std3.png"></a></div>
    </div>


</footer>

