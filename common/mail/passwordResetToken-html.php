<?php
use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $user common\models\User */

//$resetLink = Yii::$app->urlManager->createAbsoluteUrl(['site/reset-password', 'token' => $user->password_reset_token]);
$domen = $_SERVER['SERVER_NAME'];
$resetLink = "$domen/site/reset-password?token=$user->password_reset_token";
?>
<div class="password-reset">

    <?php  if (Yii::$app->language == 'ru-RU') { ?>
    <p><?php echo ' Здравствуйте! '. '<b>'.Html::encode($user->username). '</b>'."<br/><br/>"
            . ' Вы отправили запрос на восстановление пароля для почтового ящика - ' .'<b>'. $user->email .'</b>' . "<br/><br/>"
            . ' Для того чтобы задать новый пароль, перейдите по ссылке ниже ' ."<br/><br/>"
            . Html::a(Html::encode($resetLink), $resetLink) . "<br/><br/><br/>"
            . ' Пожалуйста, проигнорируйте данное письмо, если оно попало к Вам по ошибке.' . "<br/><br/>"
            . ' С уважением, ' . "<br/><br/>"
            . ' Служба поддержки пользователей <b> Stockaccs.com </b> '?></p>

        <?php }else{?>

    <p><?php echo ' Hello! '. '<b>'.Html::encode($user->username). '</b>'."<br/><br/>"
            . ' You sent a password recovery request to your mailbox - ' .'<b>'. $user->email .'</b>' . "<br/><br/>"
            . ' To set a new password, click on the link below. ' ."<br/><br/>"
            . Html::a(Html::encode($resetLink), $resetLink) . "<br/><br/><br/>"
            . ' Please ignore this letter if it came to you by mistake.' . "<br/><br/>"
            . ' Yours faithfully, ' . "<br/><br/>"
            . ' Customer Support Service <b> Stockaccs.com </b> '?></p>
        <?php } ?>
<!--    <p>--><?//= Html::a(Html::encode($resetLink), $resetLink) ?><!--</p>-->
</div>
