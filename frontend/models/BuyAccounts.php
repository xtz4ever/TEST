<?php

namespace frontend\models;

use common\models\AccProduct;
use yii\base\Model;
use yii\db\ActiveRecord;
use yii;

/**
 *
 * @property integer $quantity
 * @property integer $productId
 * @property integer $productQuantity
 * @property string $productName
 * @property string $pay_method
 * @property string $email
 * @property string $promo_code
 * @property string $partner_id

 */
class BuyAccounts extends Model
{
    public $quantity;
    public $productId;
    public $productQuantity;
    public $productName;
    public $productExchangeRates;


    public $pay_method;
    public $email;
    public $accept_1;
    public $accept_2;
    public $promo_code;
    public $partner_id;


    const SCENARIO_FORM_INDEX = 'form_index';
    const SCENARIO_FORM_BUYAKKAYTS = 'form_buyakkaynts';


    public function scenarios()
    {
        $scenarios = parent::scenarios();
        $scenarios[self::SCENARIO_FORM_INDEX] = ['quantity', 'productId', 'productQuantity','productName','productExchangeRates','promo_code'];
        $scenarios[self::SCENARIO_FORM_BUYAKKAYTS] = ['pay_method', 'email', 'accept_1', 'accept_2', 'promo_code','quantity', 'productId', 'partner_id',];

        return $scenarios;
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        if (Yii::$app->language == 'ru-RU') {
            $err_1 = 'Поле обязательно для заполнения';
        }else{
            $err_1 = 'Required field';
        }

        return [
            ['quantity', 'required','message' => ''],

            [['pay_method', 'email', 'quantity', 'productId'], 'required'],
            [[ 'accept_1','accept_2'], 'required',  'requiredValue' => 1, 'message' => $err_1],

            ['quantity', 'number', 'min' => 1 , 'max' => 50000],
            ['email', 'email'],


            [['productId','accept_1', 'accept_2' , 'partner_id'], 'integer'],
            ['productQuantity', 'integer'],
            [['productName','promo_code'], 'string'],
            ['promo_code', 'validatePromo'],
        ];
    }

    public function attributeLabels()
    {
        if (Yii::$app->language == 'ru-RU') {
            return [
                'quantity' => \Yii::t('app', 'количество'),
                'pay_method' => \Yii::t('app', 'способ оплаты'),
                'email' => \Yii::t('app', 'email'),
                'accept_1' => \Yii::t('app', 'условия'),
                'accept_2' => \Yii::t('app', 'претензии'),
                'promo_code' => \Yii::t('app', 'промо код'),
                'productId' => \Yii::t('app', 'productId'),
                'productQuantity' => \Yii::t('app', 'productQuantity'),
                'productName' => \Yii::t('app', 'productName'),
                'productExchangeRates' => \Yii::t('app', 'productExchangeRates'),

            ];
        } else {
            return [
                'quantity' => \Yii::t('app', 'quantity'),
                'pay_method' => \Yii::t('app', 'payment method'),
                'email' => \Yii::t('app', 'email'),
                'accept_1' => \Yii::t('app', 'purchase terms'),
                'accept_2' => \Yii::t('app', 'claims'),
                'promo_code' => \Yii::t('app', 'promo code'),
                'productId' => \Yii::t('app', 'productId'),
                'productQuantity' => \Yii::t('app', 'productQuantity'),
                'productName' => \Yii::t('app', 'productName'),
                'productExchangeRates' => \Yii::t('app', 'productExchangeRates'),

            ];
        }
    }


    public function getProductWithPrices()
    {
        $request = AccProduct::find()->where(['id' => $this->productId , 'status' => 1])->with('prices')->asArray()->one();
        if ($request){
            return $request;
        }else{
            return Null;
        }
    }


    public function getTermination($quantity)
    {

        $number = substr($quantity, -2);
        if ($number > 10 and $number < 15) {
            $term = "ов";
        } else {
            $number = substr($number, -1);
            if ($number == 0) {
                $term = "ов";
            }
            if ($number == 1) {
                $term = "";
            }
            if ($number > 1) {
                $term = "а";
            }
            if ($number > 4) {
                $term = "ов";
            }
        }
        return ' аккаунт' . $term . ' ';

    }

    public function validatePromo()
    {
        file_put_contents(__DIR__.'/asd.txt', $this->promo_code);
        if ($this->promo_code != 2){
            $this->addError('promo_code', 'Incorrect username or password.');
        }
    }

}
