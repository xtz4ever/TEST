<?php

if (isset($error)){
    echo '<div class="alert alert-danger admin_error"> <strong>' .$error. '<strong></div>';
    return $this->render('index' , [

        'model' => $model
    ]);
}