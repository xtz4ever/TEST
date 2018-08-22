<?php

namespace common\models;

use Yii;
use yii\base\NotSupportedException;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
use common\models\Newprovider;

/**
 * User model
 *
 * @property integer $id
 * @property string $username
 * @property string $password_hash
 * @property string $password_reset_token
 * @property string $email
 * @property string $auth_key
 * @property string $skype_icq
 * @property integer $status
 * @property integer $reliable_person
 * @property integer $role
 * @property integer $created_at
 * @property integer $updated_at
 * @property string $password write-only password
 */
class User extends ActiveRecord implements IdentityInterface
{

    const STATUS_DELETED = 0;
    const STATUS_ACTIVE = 10;

    /* USER ROLE */
    const ADMINISTRATOR = 20;
    const PARTNER = 10;
    const SELLER = 15;

//    public $skype_icq;
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%user}}';
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            TimestampBehavior::className(),
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['status', 'default', 'value' => self::STATUS_ACTIVE],
            ['status', 'in', 'range' => [self::STATUS_ACTIVE, self::STATUS_DELETED]],
            ['role', 'in', 'range' => [self::ADMINISTRATOR, self::PARTNER, self::SELLER]],
//            ['skype_icq', 'string'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'id' => \Yii::t('app', 'ID'),
            'username' => \Yii::t('app', 'Имя'),
            'email' => 'Email',
            'role' => 'Статус на сайте',
            'created_at' => 'Дата регистрации',
            'status' => 'Активность',
            'skype_icq' => \Yii::t('app', 'skype'),
            'reliable_person' => \Yii::t('app', 'Надежность поставщика'), // надежность продавца

        ];
    }

    /*
     * reliable_person
     * 0 : Мало и не часто продает
     * 1 : Не надежный
     * 2 : Надежный
     * */


    /**
     * @inheritdoc
     */
    public static function findIdentity($id)
    {
        return static::findOne(['id' => $id, 'status' => self::STATUS_ACTIVE]);
    }

    /**
     * @inheritdoc
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        throw new NotSupportedException('"findIdentityByAccessToken" is not implemented.');
    }

    /**
     * Finds user by username
     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        return static::findOne(['username' => $username, 'status' => self::STATUS_ACTIVE]);
    }

    public static function findByAdministrator($username)
    {
        return static::findOne(['username' => $username, 'role' => self::ADMINISTRATOR, 'status' => self::STATUS_ACTIVE]);
    }

    public static function findByProvider($username)
    {

        return static::findOne(['username' => $username, 'role' => self::SELLER, 'status' => self::STATUS_ACTIVE]);

    }


    public static function findByPartner($username)
    {
        return static::findOne(['username' => $username, 'role' => self::PARTNER, 'status' => self::STATUS_ACTIVE]);
    }

    /**
     * Finds user by password reset token
     *
     * @param string $token password reset token
     * @return static|null
     */
    public static function findByPasswordResetToken($token)
    {

        if (!static::isPasswordResetTokenValid($token)) {
            return null;
        }
        return static::findOne([
            'password_reset_token' => $token,
            'status' => self::STATUS_ACTIVE,
        ]);
    }

    /**
     * Finds out if password reset token is valid
     *
     * @param string $token password reset token
     * @return bool
     */
    public static function isPasswordResetTokenValid($token)
    {
        if (empty($token)) {
            return false;
        }

        $timestamp = (int)substr($token, strrpos($token, '_') + 1);
        $expire = Yii::$app->params['user.passwordResetTokenExpire'];
        return $timestamp + $expire >= time();
    }

    /**
     * @inheritdoc
     */
    public function getId()
    {
        return $this->getPrimaryKey();
    }

    /**
     * @inheritdoc
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    /**
     * @inheritdoc
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    /**
     * Generates password hash from password and sets it to the model
     *
     * @param string $password
     */
    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }

    /**
     * Generates "remember me" authentication key
     */
    public function generateAuthKey()
    {

        $this->auth_key = Yii::$app->security->generateRandomString();

    }

    /**
     * Generates new password reset token
     */
    public function generatePasswordResetToken()
    {
        $this->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
    }

    /**
     * Removes password reset token
     */
    public function removePasswordResetToken()
    {
        $this->password_reset_token = null;
    }

    public function newSeller($name, $email, $skype)
    {


        var_dump($name);
        $model = new User();
        $password = uniqid();
        $model->status = self::STATUS_ACTIVE;
        $model->role = self::SELLER;
        $model->username = $name;
        $model->auth_key = Yii::$app->security->generateRandomString();
        $model->password_hash = Yii::$app->security->generatePasswordHash($password);
        $model->email = $email;
        $model->skype_icq = $skype;


        if ($model->validate() && $model->save()) {

            return $password;
        }else{
            file_put_contents(__DIR__.'/asd.txt' , serialize($model->getErrors()));
        }

    }

    public function getUser($email)
    {
        $user = User::find()->where(['email' => $email])->one();
        if ($user){
            return $user;
        }else{
            return null;
        }
    }

    public function getUserById($id)
    {
        return User::findOne($id);
    }


    public function getPercentage()
    {
        return $this->hasOne(PartnerPercentForPaiment::className(), ['user_id' => 'id']);
    }

    public function getAllProvider()
    {
        return User::find()->where(['role' => 15])->all();
    }




}
