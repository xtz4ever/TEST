<?php

namespace frontend\models;

use yii\helpers\Url;
use Yii;
use yii\base\Model;

/**
 * This is the model class for table "newprovider".
 *
 * @property integer $id
 * @property string $username
 * @property string $email
 * @property string $password
 * @property string $password_repeat
 */
class Partner extends Model
{



    public $email;
    public $username;
    public $password;
    public $password_repeat;
    public $wallets;
    public $add_wallet;
    public $isset_partners_wallets;
    public $user_id;
    /**
     * @inheritdoc
     */


    /**
     * @inheritdoc
     */
    public function rules()
    {

        if (Yii::$app->language == 'en-En') {
            $error_password = "Passwords don't match";
        }else{
            $error_password = "пароль не совпадает с паролем 2 ";
        }
        return [

            [['username', 'email'], 'string', 'max' => 50],
            ['email', 'email'],
            ['password', 'string', 'min' => 6],
            ['password_repeat', 'compare', 'compareAttribute'=>'password', 'message'=>$error_password ],
            [['wallets', 'user_id' ], 'integer'],
            [['add_wallet', 'isset_partners_wallets'], 'string'],

        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {

        if (Yii::$app->language == 'en-EN') {
            return [
                'id' => \Yii::t('app', 'ID'),
                'email' => \Yii::t('app', 'Email'),
                'username' => \Yii::t('app', 'Login'),
                'password' => \Yii::t('app', 'Password'),
                'password_repeat' => \Yii::t('app', 'Password repeat'),


            ];

        } else {
            return [
                'id' => \Yii::t('app', 'ID'),
                'email' => \Yii::t('app', 'Эл. Адрес.'),
                'username' => \Yii::t('app', 'Логин'),
                'password' => \Yii::t('app', 'Пароль'),
                'password_repeat' => \Yii::t('app', 'Повторить пароль'),
            ];
        }
    }





}
