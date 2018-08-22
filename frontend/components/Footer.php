<?php
namespace app\components;

use yii\base\Widget;
use frontend\models\Lang;



class Footer extends Widget
{
    public function init()
    {
        parent::init();

    }

    public function run()
    {


        $lang = Lang::getCurrent()->url;

        return $this->render('footer',['lang'=>$lang]);
    }
}