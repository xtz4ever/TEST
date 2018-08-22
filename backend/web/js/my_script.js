/*СЕО показывать отдельно русский и английский*/

$('#ru').on('click', function () {
    $('#russion').css('display', 'block');
    $('#english').fadeOut('slow');
    $('#seo-page-form-button').css('display', 'none');
});
$('#en').on('click', function () {
    // $('#russion').css('display', 'none');
    $('#english').fadeIn('slow');
    $('#seo-page-form-button').css('display', 'block');
});

$('#acc-category-create').on('click', function () {
    var seoTitleRu = $('#seopage-seo_title_ru').val();
    var seoTitleEn = $('#seopage-seo_title_en').val();

    console.log(seoTitleRu.length)
    if (seoTitleRu.length == 0 || seoTitleEn.length == 0) {
        $('#seo').css({'border': '3px solid red'})
    }

});

/* END СЕО показывать отдельно руский и английский*/

/*Показывать категорию и сео для нее*/
// category_form
// seo_form
$('#seo').on('click', function () {
    $('#seo').css({'border': 'none'})
    $('#category_form').fadeOut(1000);
    $('#seo_form').fadeIn(1000);
    $('#seopage-page_name').val($('#acccategory-cateory_name_en').val().toLowerCase());

    $('.children-active-my-ferst').css({'background-color': '#F5FF01', 'color': 'black'})
});

$('#category').on('click', function () {
    $('#category_form').fadeIn(1000);
    $('#seo_form').fadeOut(1000);
});

$('.children-active-my-ferst').on('click', function () {
    $('.children-active-my-ferst').css({'background-color': '#F5FF01', 'color': 'black'});
    $('.children-active-my-second').css({'background-color': '#26B99A', 'color': 'black'});
});
$('.children-active-my-second').on('click', function () {
    $('.children-active-my-second').css({'background-color': '#F5FF01', 'color': 'black'});
    $('.children-active-my-ferst').css({'background-color': '#337ab7', 'color': 'black'});
});

/*END Показывать категорию и сео для нее*/


/*Показывать поля для цен*/
$('#add-prices-for-product').on('click', function () {


    var count = +$('#accpricesforproduct-count').val() + 1;
    $('#accpricesforproduct-count').val(count);

    $('#prices_' + count).fadeIn('slow');

    if (count > 1) {
        $('#add-prices-for-product').fadeOut('slow');
    }
    console.log(count);

});

/*END acc-product*/

$(document).ready(function () {
    /*Скрывать аллерты в Админке*/
    setTimeout(function () {
        $('#close_allert_success').fadeOut()
    }, 3000);
    /*ALL action*/

    setTimeout(function () {
        $('#provideraccounttype').fadeOut()
    }, 10000);
    /*Action provideraccounttype*/

    /*Скрывать аллерты в Админке*/
    /*Скрываем все аллерты через 3 секунды*/
    setTimeout(function () {
        $('.panel-body.kv-alert-container').fadeOut()
    }, 3000);
    setTimeout(function () {
        $('#w3-success-0').fadeOut()
    }, 3000);
    setTimeout(function () {
        $('#w2-error-0').fadeOut()
    }, 3000);
    setTimeout(function () {
        $('#w2-danger-0').fadeOut()
    }, 3000);
    setTimeout(function () {
        $('#w5-danger-0').fadeOut()
    }, 3000);


    /*Скрываем все аллерты через 3 секунды*/
});


/*Table USER ALL*/

/*show USER WALLETS*/
$('#user_wallets').on('click', function () {
    $('#userWallets').fadeIn(2000);
});
/*Table USER ALL END*/


/*Edit position FOR aLL backend AND Задать % одному партнеру*/

$("#kv-grid-user-pjax input").change(function (e) {
    e.preventDefault();


    var id = $(this).parents("tr").find('td').eq(0).text();
    var position = $(this).val();
    var action = $('#case').val();

    console.log(id);
    console.log(position);
    console.log(action);

    var data = new FormData();
    data.append('id', id);
    data.append('position', position);
    data.append('case', action);


    $.ajax({
        url: '/pinchuk/back-app/updateposition',
        type: 'POST',
        data: data,
        dataType: 'json',
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            console.log(data);
            if (data == 1) {
                $('#success').fadeIn(500);
                setTimeout(function () {
                    $('#success').fadeOut();
                    location.reload();
                }, 1500);
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.log('ERRORS: ' + textStatus);
        }
    });

});

/*Требуются аккаунты на активацию форма подставляет имя в скрытое поле*/
$("#account_name").on('change', function () {
    var optionText = $("#account_name option:selected").text();
    $('#provideraccountsforactivationrequired-provider_account_name').val(optionText);
});

/*Считаем стоимость одного аккаунта*/
$('#CreateProviderAccountsForActivationRequired').on('click', function () {
    var quntity = $('#provideraccountsforactivationrequired-quntity').val();
    var price_for_all = $('#provideraccountsforactivationrequired-price_for_all').val();
    $('#provideraccountsforactivationrequired-price_for_one').val(price_for_all / quntity);
});


/*takeorder-provider Высчитываем стоимость одного акка и подставляем в поле*/

$('#providerpersonalorder-to_pay').on('change', function () {
    var quntity = $('#providerpersonalorder-quntity').val();
    var price_for_all = $('#providerpersonalorder-to_pay').val();
    $('#providerpersonalorder-price_fro_one').val(price_for_all / quntity);
});

/*Скрывать подсказки */
$('.close').on('click', function () {
    $('.alert-warning').fadeOut()
});


$('#format').on('change', function () {
    var format = $("#format").val();

    if (format == 1) {
        $('#quantyti').fadeIn('slow');
        $('#date').fadeOut('slow');
    } else if (format == 0) {
        $('#quantyti').fadeOut('slow');
        $('#date').fadeIn('slow');
    }
    if (format == '') {
        $('#quantyti').fadeOut('slow');
        $('#date').fadeOut('slow');
    }

});

/*Обновить процент ВСЕМ партнерам*/
$("#update_percent_for_all_submit").on('click', function (e) {
    e.preventDefault();

    var percent = $('#update_percent_for_all_input').val();

    console.log(percent);


    var data = new FormData();

    data.append('percent', percent);


    $.ajax({
        url: '/pinchuk/back-app/updatespercentage',
        type: 'POST',
        data: data,
        dataType: 'json',
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            console.log(data);
            if (data == 1) {
                $('#success').fadeIn(500);
                setTimeout(function () {
                    $('#success').fadeOut();
                    location.reload();
                }, 1000);
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.log('ERRORS: ' + textStatus);
        }
    });

});


// $('#provider_info-container > table > thead > tr > th > input').on('click', function () {
//     var data = [];
//     var payment = '';
//     var all = $('[name="selection_all"]:checked').val();
//     var total_to_pay = 0;
//
//
//     if (all == 1) {
//         $('#provider_info-container .kv-table-footer').each(function() {
//             total_to_pay = $(this).find("td").eq(7).html();
//         });
//         $('#provider_info-container [name="selection[]"]').each(function () {
//             data.push($(this).val());
//             payment += ' ' + $(this).val() + ', ';
//         });
//
//         $('#to_pay_wallet').text($('input[name="ProviderPersonalOrderSearch[wallet_id]"]').val());
//         var product =  $('#providerpersonalordersearch-account_id option:selected').text();
//         $('#to_pay_product').text(product);
//
//     }
//
//     $('#Payment').html(payment);
//     $('#to_pay_info').html(total_to_pay);
//     var to_pay_total = total_to_pay*1 ;
//     $('#to_pay_total').html(to_pay_total);
//
//
// });
//
// $('#provider_info-container > table > tbody > tr > td > input').on('click', function () {
//     var data = [];
//     var payment = '';
//     var totatal_to_pay = 0;
//     var total_to_pay_summ = 0;
//     $('#provider_info-container input:checkbox:checked').each(function () {
//         totatal_to_pay = $(this).parent().parent().find("td").eq(7).html();
//         total_to_pay_summ += totatal_to_pay*1;
//         data.push($(this).val());
//         payment += ' ' + $(this).val() + ', ';
//     });
//
//     $('#to_pay_info').html(total_to_pay_summ);
//     $('#to_pay_total').html(total_to_pay_summ);
//
//     $('#Payment').html(payment);
//
//     $('#to_pay_wallet').text($('input[name="ProviderPersonalOrderSearch[wallet_id]"]').val());
//     var product =  $('#providerpersonalordersearch-account_id option:selected').text();
//     $('#to_pay_product').text(product);
//
// });
//
// $('#returns_provider-container > table > thead > tr > th > input').on('click', function () {
//     var data = [];
//     var payment = '';
//     var all = $('[name="selection_all"]:checked').val();
//
//     var total_to_return = 0;
//
//
//
//
//     if (all == 1) {
//         $('#returns_provider-container [name="selection[]"]').each(function () {
//             data.push($(this).val());
//             payment += ' ' + $(this).val() + ', ';
//         });
//         $('#returns_provider-container .kv-table-footer').each(function() {
//             total_to_return = $(this).find("td").eq(7).html();
//
//         });
//         var to_pay_total = $('#to_pay_info').text() ;
//         var total = to_pay_total*1 - total_to_return;
//
//
//
//     }
//     console.log(total_to_return)
//     $('#Deduction').html(payment);
//     $('#to_pay_total').html(total);
//     $('#to_return_info').html(total_to_return);
// });
//
// $('#returns_provider-container > table > tbody > tr > td > input').on('click', function () {
//     var data = [];
//     var payment = '';
//     var total_to_return = 0;
//     var total_quantyti = 0;
//     var total_price_for_one = 0;
//     $('#returns_provider-container input:checkbox:checked').each(function () {
//         data.push($(this).val());
//         payment += ' ' + $(this).val() + ', ';
//         total_quantyti = $(this).parent().parent().find("td").eq(5).html();
//         total_price_for_one = $(this).parent().parent().find("td").eq(6).html();
//         total_to_return += (total_quantyti*1) * (total_price_for_one*1);
//
//     });
//
//     var to_pay_total = $('#to_pay_info').text() ;
//     var total = to_pay_total*1 - total_to_return;
//
//     $('#to_return_info').html(total_to_return.toFixed(2));
//     $('#to_pay_total').html(total.toFixed(2));
//     $('#Deduction').html(payment);
// });


$('input[name="ProviderPersonalOrderSearch[wallet_id]"]').on('change',function(){
    $('#to_pay_wallet').text($('input[name="ProviderPersonalOrderSearch[wallet_id]"]').val());
});

$('#providerpersonalordersearch-account_id').on('change',function(){
  var product =  $('#providerpersonalordersearch-account_id option:selected').text();
    $('#to_pay_product').text(product);
});

$('#paid-return').on('click',function (e) {
    e.preventDefault();

    var paiment = $('#Payment').text();
    var deduction = $('#Deduction').text();
    var provider_id = $('#provider_id').text();
    var wallet_to_pay = $('input[name="ProviderPersonalOrderSearch[wallet_id]"]').val();
    var product_id = $('#providerpersonalordersearch-account_id option:selected').val();

    $('#to_pay_wallet').text($('input[name="ProviderPersonalOrderSearch[wallet_id]"]').val());


    if(product_id == ''){
        $('#text_error_block').css({'display':'block'});
        $('#text_error_block').text('Выберите продукт из таблицы " Информация по ордерам поставщика "');
        setTimeout(function () {
            $('#text_error_block').fadeOut()
        }, 2000);
        return false;
    }
    if(paiment == ''){
        $('#text_error_block').css({'display':'block'});
        $('#text_error_block').text('Выберите ордера для оплаты из таблицы " Информация по ордерам поставщика "');
        setTimeout(function () {
            $('#text_error_block').fadeOut()
        }, 2000);
        return false;
    }


    if(wallet_to_pay == ''){
        $('#text_error_block').css({'display':'block'});
        $('#text_error_block').text('Выберите кошелек для выплаты из таблицы " Информация по ордерам поставщика "');
        setTimeout(function () {
            $('#text_error_block').fadeOut()
        }, 2000);
        return false;
    }



    $.ajax({
        url: '/pinchuk/provider-personal-order/paiment-deduction',
        type: 'POST',
        data: {'paiment': paiment, 'deduction': deduction, 'provider_id': provider_id, 'product_id': product_id, 'wallet_to_pay': wallet_to_pay,  _csrf: yii.getCsrfToken()},

        success: function (data) {
            console.log(data);
            if (data){
                location.reload();
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.log('ERRORS: ' + textStatus);
        }
    });

});

$('#hint').on('click',function () {

    if($(this).siblings('#hint_block').is(":visible")){
        $(this).siblings('#hint_block').hide();
    }
    else $(this).siblings('#hint_block').show();
});






var order_id = $('#order-id').val();



// по штучная выборка аккаунтов на возврат
var data = [];

$('input:checkbox').on('change',function(){

    if ( $(this).prop('checked') === true ){
        data[$(this).val()] = $(this).data('sellerOrderId');

//                data[$(this).val()] = $(this).val();
//                data['order_id_'+$(this).val()] = $(this).data('sellerOrderId');
    }else{
        delete data[$(this).val()];
    }


});


/*ВОЗВРАТ АККАУНТОВ pinchuk/stock-all-orders/view/id*/
// все сразу  аккаунты на возврат
var data = {};

$('#All').on('change',function() {

    $('input:checkbox').prop('checked', this.checked);
    $('#siteform input:checkbox:checked').each(function(){
//                data[$(this).val()] = $(this).val();
        data[$(this).val()] = $(this).data('sellerOrderId');
    });

//            console.log(data);


});


$('#return-bad-acc').on('click',function () {

    var ticket = $('input[name="ticket"]').val();




    $.ajax({
        url: '/pinchuk/stock-all-orders/returnaccounts',
        type: 'POST',
        data: {'order_id': order_id, 'ticket': ticket, 'account_id': data, _csrf: yii.getCsrfToken()},

        success: function (data) {
            console.log(data);
            if (data){
                location.reload();
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.log('ERRORS: ' + textStatus);
        }
    });


});



$(document).on('click', '#file_download_success', function () {


    $(this).css({'display':'none'});
    $('.close').trigger('click');
    $('.go_back').css({'display':'block'});
});

