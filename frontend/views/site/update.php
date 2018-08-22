<?php

use kartik\date\DatePicker;
use kartik\file\FileInput;
use yii\helpers\Html;
use yii\widgets\ActiveForm;

?>

<div class="admin_form_me_custom">

    <?php $form = ActiveForm::begin([

        'action' => [ '/update', 'id' => $model->id],
        'method' => 'post'
    ]); ?>

    <?php if ($field_type == 'photo'){?>
        <?= $form->field($model, $field_name)->widget(FileInput::classname(), ['pluginOptions' => [
            'previewFileType' => 'image',
            'value' => 'AAA',
            'initialPreview' => [
                Html::img("/img/test/" . $model->photo)
            ],
            'overwriteInitial' => true
        ]])->label('Фото'); ?>
    <?php } elseif ($field_type == 'year'){?>
        <?= $form->field($model, $field_name)->widget(DatePicker::className(), [
            'name' => 'date',
            'value' => date('d.m.Y'),
            'options' => ['placeholder' => date('d.m.Y')],
            'pluginOptions' => [
                'format' => 'yyyy-mm-dd',
                'todayHighlight' => true
            ],
            'language' => $lang,
        ])->label(); ?>
    <?php }else{?>
        <?= $form->field($model, $field_name)->textInput(['maxlength' => true]) ?>
    <?php } ?>


    <?= $form->field($model, 'field_name')->hiddenInput(['maxlength' => true, 'value' =>$field_name])->label(''); ?>
    <?= $form->field($model, 'record_id')->hiddenInput(['maxlength' => true, 'value' => $model->id])->label(''); ?>


    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? 'Create' : 'Update', ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>


</div>
