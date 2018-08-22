<?php

namespace common\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\User;

/**
 * UserSearch represents the model behind the search form about `common\models\User`.
 */
class UserSearch extends User
{

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'auth_key', 'reliable_person'], 'integer'],
            [['username', 'role', 'email', 'password_reset_token', 'skype_icq'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {


        $query = User::find()->with(['percentage']);

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 111500,
            ]
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        if (isset($_GET["role"]) && !empty($_GET["role"])) {
            if ($_GET["role"] == 'sellers') {
                $role = 15;
            }
            if ($_GET["role"] == 'partners') {
                $role = 10;
            }
        } else {
            $role = $this->role;
        }

        if (!isset($role)){
            $role = 15;
        }



        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'role' => $role,
            'reliable_person' => $this->reliable_person,
            'auth_key' => $this->auth_key,
            'skype_icq' => $this->skype_icq,
        ]);

        $query->andFilterWhere(['like', 'username', $this->username])
            ->andFilterWhere(['like', 'email', $this->email])
            ->andFilterWhere(['like', 'password_reset_token', $this->password_reset_token])
            ->andFilterWhere(['like', 'skype_icq', $this->skype_icq])//            ->andFilterWhere(['like', 'updated_at', $this->updated_at])
        ;

        return $dataProvider;
    }
}
