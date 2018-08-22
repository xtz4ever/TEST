<?php
namespace app\components;
use Yii;
use yii\base\Widget;
use frontend\models\Lang;
use frontend\models\LangTextForSite;
use common\models\AccountsNotAvailableIndex;

class Header extends Widget
{
    public $id;
    public function init()
    {
        parent::init();

    }

    public function run()
    {


        $lang = Lang::getCurrent()->url;
        $page_text = LangTextForSite::actionTEXT(Yii::$app->controller->action->id);




//        var_dump($this->id);

        return $this->render('header',[
            'lang'=>$lang,
            'page_text'=>$page_text,

        ]);
    }
}