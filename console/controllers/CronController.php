<?php
namespace console\controllers;

use common\models\CustomerEmails;
use common\models\ProviderAccountType;
use Yii;
use yii\helpers\Url;
use yii\helpers\Console;
use common\models\PromoCode;
use yii\helpers\Html;
use yii\widgets\LinkPager;
use yii\helpers\ArrayHelper;
use common\models\StatisticPromoProxyseller;
use common\models\ExchangeRates;




class CronController extends \yii\console\Controller {

        public function actionPromo() {

            $date_start = new \DateTime();
            $date_finish = new \DateTime('+3 days');
            $date_when_delete = new \DateTime('-1 days');

            $delete = $date_when_delete->format('d'.'.'.'m'.'.'.'Y') ;
            $finish = $date_finish->format('d'.'.'.'m'.'.'.'Y') ;
            $start = $date_start->format('d'.'.'.'m'.'.'.'Y');

            $find_all = PromoCode::find()->Where(['finish_time' => $delete])->andWhere(['quantyti_use_before_off' => 0])->andFilterWhere(['like', 'promo_name', 'proxysale'])->asArray()->all();

            foreach ($find_all as $value){

                $statistic = new StatisticPromoProxyseller();
                $statistic->quantyti = $statistic->quantyti + $value['quantyti_use_statistic'];

                $statistic->save();
                var_dump($statistic->getErrors());

                $c = PromoCode::findOne($value['id']);
                $c->delete();
            }
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $name = '';
            for ($i = 0; $i <= 10; $i++) {
                $name .= $characters[mt_rand(0, strlen($characters) - 1)];
            }
            $new = new PromoCode();

            $new->promo_name = 'proxysale-'.$name;

            $new->procent = 20 ;
            $new->start_time = $start ;
            $new->finish_time = $finish ;
            $new->quantyti_use_before_off = 0 ;
            $new->status = 1 ;
            $new->quantyti_use_statistic = 0 ;
            $new->save();


            Yii::$app->mailer->compose()
                ->setFrom([Yii::$app->params['adminEmail'] => 'stockaccs'])
                ->setTo('support@proxy-sale.com')/*'administrator@stockaccs.com'*/    /*support@stockaccs.com*/ /*support@proxy-sale.com*/
                ->setSubject('Новый ежедневный промо код')
                ->setTextBody($new->promo_name)
                ->setHtmlBody($new->promo_name)
                ->send();

    }

    public function actionGetkyrs() {
        //        Беру правильный курс Валют с Банка через API
        $model = new ExchangeRates();
        $model->UpdateUsdEurBitcoin();
    }


    public function actionNewproductsendmail(){
        // рассылка на все эл. адреса покупателей с инфой о создании нового продукта


        $products =  ProviderAccountType::getAllNewAccounts();

        if ($products !== NULL) {

            // записываем в строку все названия новых продуктов
            $products_name_ru = '';
            $products_name_en = '';
            for ($i = 0; $i < count($products); $i++) {
                $products[$i]['new_or_not'] = 1;
                ProviderAccountType::updateProviderAccountType($products[$i]['id']);

                $products_name_ru .= "<br/>" . $products[$i]['account_name'];
                $products_name_en .= "<br/>" . $products[$i]['account_name_en'];;
            }
            file_put_contents(__DIR__.'/'.date('Y-M-d h:m:s').'.txt', $products_name_ru);
            // рассылка писем
            $customer_email_send = new CustomerEmails();
            $customer_email_send->SendEmailAllCustomers($products_name_ru,$products_name_en);
        }
    }
}

