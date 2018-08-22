<?php

namespace frontend\models;

use Yii;
use yii\base\Model;
use common\models\User;
use himiklab\yii2\recaptcha\ReCaptchaValidator;

/**
 * Password reset request form
 */
class PasswordResetRequestForm extends Model
{
    public $email;
    public $verifyCode;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['email', 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'exist',
                'targetClass' => '\common\models\User',
                'filter' => ['status' => User::STATUS_ACTIVE],
                'message' => 'There is no user with this email address.'
            ],

            //            [['verifyCode'], ReCaptchaValidator::className(), 'secret' => '6Le0nz0UAAAAAJb6_OycZK01VIHEEZd6IvH88M3a', 'when' => function($model){ return !$model->getErrors() && !Yii::$app->request->isAjax /* !Yii::$app->request->post('ajax')*/; },]
        ];
    }

    /**
     * Sends an email with a link, for resetting the password.
     *
     * @return bool whether the email was send
     */
    public function sendEmail()
    {
        /* @var $user User */
        $user = User::findOne([
            'status' => User::STATUS_ACTIVE,
            'email' => $this->email,
        ]);

        if (Yii::$app->language == 'ru-RU') {
            $subject = 'Новое письмо с сайта ';
        } else {
            $subject = 'New email from the site ';
        }

        if (!$user) {
            return false;
        }

        if (!User::isPasswordResetTokenValid($user->password_reset_token)) {
            $user->generatePasswordResetToken();
            if (!$user->save()) {
                return false;
            }
        }

        return \Yii::$app
            ->mailer
            ->compose(
                ['html' => 'passwordResetToken-html', 'text' => 'passwordResetToken-text'],
                ['user' => $user]
            )
            ->setFrom([Yii::$app->params['stockEmail'] => 'stockaccs' . ' robot'])
            ->setTo($this->email)
            ->setSubject($subject . ' Stockaccs.com ')
            ->setTextBody('Password reset for ' . Yii::$app->name)
            ->send();
    }
}
