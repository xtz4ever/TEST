<?php
namespace app\components;

use common\models\UserWallets;
use yii\base\Widget;
use frontend\models\Lang;
use Yii;


class ProviderInfo extends Widget
{
    public function init()
    {
        parent::init();

    }

    public function run()
    {
        $text = [];

        if (Yii::$app->language == 'ru-RU'){
            $text['hellow'] = 'Добро пожаловать , ';
            $text['your_wallet'] = 'Ваши кошельки для выплат';
        }else{
            $text['hellow'] = 'Welcome , ';
            $text['your_wallet'] = 'Your wallet for payment';
        }

        $model_2 = new UserWallets();
        $user_wallets = $model_2->getAllProviderWallets(Yii::$app->user->identity->id);
        $user = $text['hellow'] . Yii::$app->user->identity->username;
        return $this->render('providerInfo',[
            'user_wallets'=>$user_wallets,
            'user'=>$user,
            'text'=>$text['your_wallet'],
            ]);
    }
}