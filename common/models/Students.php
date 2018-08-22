<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "students".
 *
 * @property integer $id
 * @property string $first_name
 * @property string $last_name
 * @property string $year
 * @property string $photo
 * @property integer $user_id
 */
class Students extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */

    public $field_name;
    public $record_id;


    public static function tableName()
    {
        return 'students';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'user_id'], 'integer'],
            [['year'], 'safe'],
            [['first_name', 'last_name'], 'string', 'max' => 50],
            [['photo'], 'string', 'max' => 100],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'first_name' => 'First Name',
            'last_name' => 'Last Name',
            'year' => 'Year',
            'photo' => 'Photo',
            'user_id' => 'User ID',
        ];
    }

    static function getStudents()
    {
        return Students::find()->asArray()->all();
    }

    static function findModel($id){
        if (($model = Students::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}
