<?php

use kartik\date\DatePicker;
use kartik\file\FileInput;
use yii\helpers\Html;
use yii\widgets\ActiveForm;


?>

<div class="admin_form_me_custom">

    <?php $form = ActiveForm::begin([
        'action' => ['/update-form', 'id' => $model->id],
        'method' => 'post'
    ]); ?>


    <?= $form->field($model, 'user_id')->textInput(['maxlength' => true])->label('ID'); ?>

    <?= $form->field($model, 'first_name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'last_name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'year')->widget(DatePicker::className(), [
        'name' => 'date',
        'value' => date('d.m.Y'),
        'options' => ['placeholder' => date('d.m.Y')],
        'pluginOptions' => [
            'format' => 'yyyy-mm-dd',
            'todayHighlight' => true
        ],
        'language' => $lang,
    ])->label(); ?>

    <?= $form->field($model, 'photo')->widget(FileInput::classname(), ['pluginOptions' => [
        'previewFileType' => 'image',
        'value' => 'AAA',
        'initialPreview' => [
            Html::img("/img/test/" . $model->photo)
        ],
        'overwriteInitial' => true
    ]])->label('Фото'); ?>


    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? 'Create' : 'Update', ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>


</div>
