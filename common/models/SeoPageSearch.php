<?php

namespace common\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\SeoPage;

/**
 * SeoPageSearch represents the model behind the search form about `common\models\SeoPage`.
 */
class SeoPageSearch extends SeoPage
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'integer'],
            [['page_name', 'seo_title_ru', 'seo_description_ru', 'seo_keywords_ru', 'seo_image_alt_ru', 'seo_image_title_ru', 'description_ru', 'h1_ru', 'seo_title_en', 'seo_description_en', 'seo_keywords_en', 'seo_image_alt_en', 'seo_image_title_en', 'description_en', 'h1_en'], 'safe'],
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
        $query = SeoPage::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
        ]);

        $query->andFilterWhere(['like', 'page_name', $this->page_name])
            ->andFilterWhere(['like', 'seo_title_ru', $this->seo_title_ru])
            ->andFilterWhere(['like', 'seo_description_ru', $this->seo_description_ru])
            ->andFilterWhere(['like', 'seo_keywords_ru', $this->seo_keywords_ru])
            ->andFilterWhere(['like', 'seo_image_alt_ru', $this->seo_image_alt_ru])
            ->andFilterWhere(['like', 'seo_image_title_ru', $this->seo_image_title_ru])
            ->andFilterWhere(['like', 'description_ru', $this->description_ru])
            ->andFilterWhere(['like', 'h1_ru', $this->h1_ru])
            ->andFilterWhere(['like', 'seo_title_en', $this->seo_title_en])
            ->andFilterWhere(['like', 'seo_description_en', $this->seo_description_en])
            ->andFilterWhere(['like', 'seo_keywords_en', $this->seo_keywords_en])
            ->andFilterWhere(['like', 'seo_image_alt_en', $this->seo_image_alt_en])
            ->andFilterWhere(['like', 'seo_image_title_en', $this->seo_image_title_en])
            ->andFilterWhere(['like', 'description_en', $this->description_en])
            ->andFilterWhere(['like', 'h1_en', $this->h1_en]);

        return $dataProvider;
    }
}
