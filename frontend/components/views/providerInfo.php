<?php
echo $user."<br/><br/><br/>";
echo $text ." : <br/><br/>";
foreach ($user_wallets as $value){
    if (Yii::$app->language == 'ru-RU') {
        echo $value->wallet_name_ru.' :  '.$value->wallet_number.'<br/><br/>';
    }else{
        echo $value->wallet_name_en.' :  '.$value->wallet_number.'<br/><br/>';
    }

}