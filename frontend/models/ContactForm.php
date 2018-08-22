<?php

namespace frontend\models;

use Yii;
use yii\base\Model;
use himiklab\yii2\recaptcha\ReCaptchaValidator;
/**
 * ContactForm is the model behind the contact form.
 */
class ContactForm extends Model
{
    public $name;
    public $email;
    public $subject;
    public $body;
    public $date;
    public $lang;
    public $verifyCode;


    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            // name, email, subject and body are required
            [['name', 'email', 'subject'], 'required'],
            // email has to be a valid email address
            ['email', 'email'],
            // verifyCode needs to be entered correctly
                        [['verifyCode'], ReCaptchaValidator::className(), 'secret' => '6Le0nz0UAAAAAJb6_OycZK01VIHEEZd6IvH88M3a']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        if (Yii::$app->language == 'ru-RU') {
            return [
                'id' => 'ID',
                'name' => 'Имя',
                'email' => 'Эл. адрес:',
                'date' => 'Date',
                'subject' => 'Сообщение',
                'status' => 'Status',
                'lang' => 'lang',
                'verifyCode' => ''
            ];
        } else {
            return [
                'id' => 'ID',
                'name' => 'Name',
                'email' => 'Email',
                'date' => 'Date',
                'subject' => 'Message',
                'status' => 'Status',
                'lang' => 'lang',
                'verifyCode' => ''
            ];
        }
    }

    /**
     * Sends an email to the specified email address using the information collected by this model.
     *
     * @param string $email the target email address
     * @return bool whether the email was sent
     */
    public function sendEmail($email)
    {
        return Yii::$app->mailer->compose()
            ->setTo($email)
            ->setFrom([$this->email => $this->name])
            ->setSubject($this->subject)
            ->setTextBody($this->body)
            ->send();
    }

    static function sendEmailMy($case, $name = NULL , $email = NULL, $quantity = NULL , $form_name = NULL , $subject_message = NULL)
    {

        switch ($case) {

            /*Отправляем Сообщение в поддержку*/
            case 'AccountsNotAvailableIndex':

                $message = '<h1>' . 'Запрос на покупку аккаунтов с сайта stockaccs.com' . '</h1> <p>
                <h3 style="text-align: left;" >Требуемые аккаунты : ' . $name . '</h3></p>' . "\n" . "\n" .
                    '<p><h3 style="text-align: left;">Требуемое кол-во аккаунтов  : ' . $quantity . '</h3></p>' .
                    '<p><h3 style="text-align: left;">Эл. адрес : ' . $email . '</h3></p>' .
                    '<p><h3 style="text-align: left;">форма : ' . $form_name . '</h3></p>';


                $subject = 'Запрос на покупку аккаунтов с сайта stockaccs.com';

                break;

            case 'Feedbacs':

                $message = '<h1>' . 'Новый отзыв на сайте stockaccs.com' . '</h1> <p>
                    <h3 style="text-align: left;" >От : ' . $name . '</h3></p>' . "\n" . "\n" .
                    '<p><h3 style="text-align: left;">Эл. адрес : ' . $email . '</h3></p>';

                $subject = 'Новый отзыв на сайте stockaccs.com';

                break;

            case 'Createcontacts':

                $message = '<h1>' . 'Новый вопрос на сайте stockaccs.com' . '</h1> <p>
                    <h3 style="text-align: left;" >От : ' . $name . '</h3></p>' . "\n" . "\n" .
                    '<p><h3 style="text-align: left;">Эл. адрес : ' . $email . '</h3></p>'. "\n" . "\n" .
                    '<p><h3 style="text-align: left;">Сообщение : ' . $subject_message. '</h3></p>'. "\n" . "\n" .
                    '<p><h3 style="text-align: left;">Дата : ' . date('d-m-Y') . '</h3></p>'. "\n" . "\n" ;

                $subject = 'Новый вопрос на сайте stockaccs.com';

                break;


        }


        Yii::$app->mailer->compose()
            ->setFrom([Yii::$app->params['stockEmail'] => 'stockaccs'])
            ->setTo(Yii::$app->params['supportEmail'])
//            ->setTo('xtz4ever@yandex.ua')
            ->setSubject($subject)
            ->setTextBody($message)
            ->setHtmlBody($message)
            ->send();

    }
}
