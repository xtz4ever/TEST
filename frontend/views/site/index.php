<?php

use kartik\date\DatePicker;
use kartik\file\FileInput;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\ActiveForm;


?>
<!-- Секция countries_and_prices -->
<style>
    section {
        background-color: rgba(56, 63, 117, 0) !important;
    }

    p, h2 {
        color: white;
    }

    #countries_and_prices_right {
        background-color: rgba(56, 63, 117, 0.5) !important;
    }

    .students_info {
        width: 400px;
        color: white;
    }

    .students_info > img {
        width: 100px !important;
    }

    td {
        padding: 4px;
    }

    td > b {

        color: greenyellow;
    }

    td > a > span {
        padding-right: 25px;
        color: #ffffff;
    }

    tr {
        border-bottom: 1px solid #eef2f2;
    }
</style>
<section class="countries_and_prices">
    <div class="container">
        <div class="row">


            <div class="admin_form_me_custom">

                <?php $form = ActiveForm::begin([
                    'action' => 'create',
                    'method' => 'post'
                ]); ?>

                <?= $form->field($model, 'first_name')->textInput(['maxlength' => true]) ?>

                <?= $form->field($model, 'last_name')->textInput(['maxlength' => true]) ?>



                <?= $form->field($model, 'year')->widget(DatePicker::className(), [
                    'name' => 'date',


                    'options' => ['placeholder' => date('d.m.Y')],
                    'pluginOptions' => [
                        'format' => 'yyyy-mm-dd',
                        'todayHighlight' => true
                    ],
                    'language' => $lang,
                ])->label(); ?>

                <?= $form->field($model, 'photo')->widget(FileInput::classname())->label('Фото'); ?>
                <div class="form-group">
                    <?= Html::submitButton($model->isNewRecord ? 'Create' : 'Update', ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
                </div>

                <?php ActiveForm::end(); ?>

            </div>

        </div>
    </div>
</section>
<section class="countries_and_prices">
    <div class="container">
        <div class="row">

            <div class="countries_and_prices_left col-md-5">
                <table class="admin_form_me_custom_medium" style="width: 100%;border: none;" id="siteform" border="">
                    <tbody>
                    <?php

                    if (isset($students)) {
                        foreach ($students as $val) {
                            ?>

                            <tr>
                                <td></td>
                                <td></td>
                                <td style="width: 40px"><b>Изменить запись</b><a
                                            href="<?= Url::to(['update-form', 'id' => $val['id']]) ?>"><span
                                                class="glyphicon glyphicon-pencil"></span></a></td>
                                <td style="width: 40px"><b>Удалить запись</b><a
                                            href="<?= Url::to(['delete-form', 'id' => $val['id']]) ?>"><span
                                                class="glyphicon glyphicon-trash"></span></a></td>
                            </tr>
                            <tr>

                                <td><b>ID</b></td>
                                <td class="students_info"><?= $val['user_id']; ?></td>
                                <td style="width: 40px"><a
                                            href="<?= Url::to(['update', 'id' => $val['id'], 'field_name' => 'user_id', 'field_type' => 'text']) ?>"><span
                                                class="glyphicon glyphicon-pencil"></span></a>
                                </td>
                                <td style="width: 40px"><a
                                            href="<?= Url::to(['delete', 'id' => $val['id'], 'field_name' => 'user_id']) ?>"><span
                                                class="glyphicon glyphicon-trash"></span></a></td>

                            </tr>
                            <tr>
                                <td><b>Имя </b></td>
                                <td class="students_info"><?= $val['first_name']; ?></td>
                                <td style="width: 40px"><a
                                            href="<?= Url::to(['update', 'id' => $val['id'], 'field_name' => 'first_name', 'field_type' => 'text']) ?>"><span
                                                class="glyphicon glyphicon-pencil"></span></a>
                                </td>
                                <td style="width: 40px"><a
                                            href="<?= Url::to(['delete', 'id' => $val['id'], 'field_name' => 'first_name']) ?>"><span
                                                class="glyphicon glyphicon-trash"></span></a></td>

                            </tr>
                            <tr>
                                <td><b>Фамилия</b></td>
                                <td class="students_info"><?= $val['last_name']; ?></td>
                                <td style="width: 40px"><a
                                            href="<?= Url::to(['update', 'id' => $val['id'], 'field_name' => 'last_name', 'field_type' => 'text']) ?>"><span
                                                class="glyphicon glyphicon-pencil"></span></a>
                                </td>
                                <td style="width: 40px"><a
                                            href="<?= Url::to(['delete', 'id' => $val['id'], 'field_name' => 'last_name']) ?>"><span
                                                class="glyphicon glyphicon-trash"></span></a></td>

                            </tr>
                            <tr>
                                <td><b>Год </b></td>
                                <td class="students_info"><?= $val['year']; ?></td>
                                <td style="width: 40px"><a
                                            href="<?= Url::to(['update', 'id' => $val['id'], 'field_name' => 'year', 'field_type' => 'year']) ?>"><span
                                                class="glyphicon glyphicon-pencil"></span></a>
                                </td>
                                <td style="width: 40px"><a
                                            href="<?= Url::to(['delete', 'id' => $val['id'], 'field_name' => 'year']) ?>"><span
                                                class="glyphicon glyphicon-trash"></span></a></td>

                            </tr>
                            <tr>
                                <td><b>Фото</b></td>
                                <td class="students_info"><?= Html::img(Url::to('/frontend/web/img/test/' . $val['photo'])); ?></td>
                                <td style="width: 40px"><a
                                            href="<?= Url::to(['update', 'id' => $val['id'], 'field_name' => 'photo', 'field_type' => 'photo']) ?>"><span
                                                class="glyphicon glyphicon-pencil"></span></a>
                                </td>
                                <td style="width: 40px"><a
                                            href="<?= Url::to(['delete', 'id' => $val['id'], 'field_name' => 'photo']) ?>"><span
                                                class="glyphicon glyphicon-trash"></span></a></td>

                            </tr>

                            <tr>

                                <td>&nbsp;</td>
                            </tr>
                            <?
                        }
                    } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
