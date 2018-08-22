




$(document).on("click", "#add_new_wallet_xtz", function(e){
    e.preventDefault();
    $('#add_wallet_new').css({'opacity': '1'});
    $('#add_wallet_new').fadeIn('slow');
});
function close_allert() {

    setTimeout(function () {
        $(document).on("click", ".close", function(){
            $('#close_allert_success_index').fadeOut('slow');
        });
        $('.close').trigger('click');
    }, 2000);

}



//Открыть модалку в партнерском кабинете на странице выплаты
$('#orderPayment').on('click',function (e) {
    e.preventDefault();
    $('.modal_null_d_n').css('display', 'block');
    $('.modal_payments').css('display', 'block');
});

$('#remove').on('click',function () {
    $('.modal_payments').removeClass('modal_open');
    $('.modal_null_d_n').css({'display':'none'});
});
$('.overlay').on('click',function () {
    $('.modal_payments').removeClass('modal_open');
    $('.modal_null_d_n').css({'display':'none'});
});



/*Форма с реферальной ссылкой не удалять часть ссылки*/
$('#partnerreferallinks-referal_link').on('keyup', function (e) {
    // $(document).on("keyup", ".#partnerreferallinks-referal_link", function(e){
    e.preventDefault();
    var staticVal = 'proxy-seller.ru/?parther=';
    if ($(this).val().indexOf(staticVal) === -1) {
        $(this).val(staticVal);
    }
});
/*Форма с реферальной ссылкой не удалять часть ссылки*/


$(document).ready(function () {
    $('.authorization_method_input_wrap input').prop( "disabled", true );
    $('#partnerreferallinks-referal_link').prop( "disabled", true );
    // $('#button_referal_link').css( {'display':'none'});

    setTimeout(function () {
        $('#close_allert_success_index').fadeOut();
    }, 2000);

    $('td').each(function () {
        $('td').removeClass('tooltip');
    });
});


$('#button_disabled_false').on('click',function (e) {
    e.preventDefault();
    $('#partnerreferallinks-referal_link').prop( "disabled", false );
    $('#button_referal_link').css( {'display':'block'});
    $('#button_disabled_false').css( {'display':'none'});
});


$(document).on("click", ".wallet_id", function(e){
    e.preventDefault();
   var wallet_id = $(this).data('wallet_id');

   $('#partnerpaymentslist-wallet_id').val(wallet_id);
});

$(document).on('click','.glyphicon-eye-open',function(){

    $('#show_pass').trigger('click');
});

// Control panel

// Кол-во строк на странице
$(document).on('keyup','#quantyti_in_list_xtz',function(){
    var quantyti = $('#quantyti_in_list_xtz').val();
    $('#pc_xtz').val(quantyti);

});

// Статус
$(document).on('click', '.status_xtz', function () {
    var status = $(this).data('status');
    $('input[name="status"]').val(status);

});
// Страна
$(document).on('click', '.country_id_xtz', function () {
    var country_id = $(this).data('country_id');
    $('input[name="country_id"]').val(country_id);

});
// период
$(document).on('change', 'input[name="date_end_widjet_xtz_2"]', function () {
    var date = $(this).val();
    $('input[name="date_start"]').val(date);

});
$(document).on('change', 'input[name="date_end_widjet_xtz"]', function () {
    var date = $(this).val();
    $('input[name="date_end"]').val(date);

});


$(document).on('click', '.date_xtz' , function () {
    $('.condition_xtz').css({'pointer-events': ' none', 'background': 'rgba(235, 249, 241, 0.47) none repeat scroll 0% 0%'});


    // $('#select_goal_xtz').css({'pointer-events': ' all', 'background': 'no-repeat'});

});

$(document).on('click','.condition_xtz', function () {
    $('input[name="date_end_widjet_xtz_2"]').css({'pointer-events': ' none', 'background': 'rgba(235, 249, 241, 0.47) none repeat scroll 0% 0%'});
    $('input[name="date_end_widjet_xtz"]').css({'pointer-events': ' none', 'background': 'rgba(235, 249, 241, 0.47) none repeat scroll 0% 0%'});
});


