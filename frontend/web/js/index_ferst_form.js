$(document).on('click', '.what_ipv', function () {
    var ipv = $(this).text();
    $('#what_country_selected_xtz').text('Выберите страну');
    $('#quantyti_xtz').val('');
    $('.period_xtz').text('Выберите срок аренды:');
    // console.log(ipv);
    if(ipv == "IPv6"){
        $('#orders-ipv6').val(1);
        $('#orders-ipv4').val(0);
        $('.country_ipv6').css({'display':'block'});
        $('.country_ipv4').css({'display':'none'});
        $('.week').each(function () {
            $(this).css({'display':'none'});
        });
    }else{
        $('#orders-ipv4').val(1);
        $('#orders-ipv6').val(0);
        $('.country_ipv4').css({'display':'block'});
        $('.country_ipv6').css({'display':'none'});
        $('.week').each(function () {
            $(this).css({'display':'block'});
        });
    }


    $('input[name="ipv"]').val(ipv);

    $.ajax({
        url: '/ipv6/get-countries',
        type: 'POST',
        data: {ipv: ipv},
        dataType: 'json',

        success: function (data) {

            // console.log(data);

            $('.drop_countries_xtz').html('');
            for (var i = 0; i < data['count']; i++) {
                $('.drop_countries_xtz').append('<li class="countries_xtz" data-country_id="' + data['countries'][i]['id'] + '">' + '<i style="background:url(/frontend/web/img/country_list/' + data['countries'][i]['img'] + ') no-repeat; width: 20px; height: 16px;"></i><b style="display: none" class="country_name">'+ data['countries'][i]['name']+'</b>' + data['countries'][i]['name'] + '</li>')
            }
            setTimeout(function () {
                mCustomScrollbarModal();
            }, 300);

        },

        error: function (jqXHR, textStatus, errorThrown) {

            console.log('ERRORS: ' + textStatus);
        }
    });

});

$(document).on('click', '.countries_xtz', function () {


    $('.payment_method_xtz').text('');
    var country_id = $(this).data('country_id');
console.log(country_id);

    $('.countries_xtz').each(function () {
        $('.countries_xtz').css('display', 'block');
    });
    $(this).css('display', 'none');

        $('#orders-country_code1c').val(country_id);
    var ipv = $('input[name="ipv"]').val();
    var period = $('.period_xtz').text();
    $('input[name="country_id"]').val(country_id);
    $('input[name="period"]').val(period);

    var quantyti = $('#quantyti_xtz').val();

    if(quantyti == ''){
        var country = $('#id_default_currency_rus_name_for_index_page').val();
        $('.total_price_xtz').html(0 + ' '+country+'.');
        $('.price_for_one_xtz').html(0 +' ' +country+'. шт.');
        $('.how_much_need_next').html('');
    }else{
        if (ipv == 'IPv6' && quantyti < 5){
            alert('Минимальное кол-во для покупки 5 шт.');
            return false;
        }
    }


    GetPriceXtz(ipv, country_id, period, quantyti);
});

$(document).on('click', '.period_xtz_li', function () {
    var period = $(this).text();


    if (period == '1 неделя'){
        $('#id_ipv6_fast_order_term').val(4);
        $('.button_create_order_enter_user').attr('data-month', 4);
    }else if(period == '2 недели'){
        $('#id_ipv6_fast_order_term').val(5);
        $('.button_create_order_enter_user').attr('data-month', 5);
    }else{
        period = period;
        $('#id_ipv6_fast_order_term').val(parseInt(period));
    }
    $('input[name="period"]').val(period);
    $('.button_create_order_enter_user').attr('data-month',parseInt(period));
    console.log(period)

    $('.period_xtz_li').each(function () {
        $('.period_xtz_li').css('display', 'block');
    });
    $(this).css('display', 'none');




    var country_id = $('input[name="country_id"]').val();
    var ipv = $('input[name="ipv"]').val();
    var quantyti = $('#quantyti_xtz').val();;

    if(quantyti == ''){
        var country = $('#id_default_currency_rus_name_for_index_page').val();
        $('.total_price_xtz').html(0 + ' ' + country +'.');
        $('.price_for_one_xtz').html(0 + ' ' + country+'. шт.');
        $('.how_much_need_next').html('');

    }else{
        if (ipv == 'IPv6' && quantyti < 5){
            alert('Минимальное кол-во для покупки 5 шт.');
            return false;
        }
    }


    GetPriceXtz(ipv, country_id, period, quantyti);
});

$(document).on('keyup', '.user_count_proxy', function () {

    var country_id = $('input[name="country_id"]').val();
    var ipv = $('input[name="ipv"]').val();
    var period = $('input[name="period"]').val();
    var quantyti = $(this).val();
    // console.log(country_id);
    // console.log(ipv);
    // console.log(period);
    if(quantyti == ''){
        var country = $('#id_default_currency_rus_name_for_index_page').val();
        $('.total_price_xtz').html(0 + ' ' + country+'.');
        $('.price_for_one_xtz').html(0 +' ' + country+ '. шт.');
        $('.how_much_need_next').html('');
    }
    if (ipv == 'IPv6' && parseInt(quantyti) < 5){

        alert('Минимальное кол-во для покупки 5 шт.');
        return false;
    }
    if (country_id == '' || ipv == '' || period == ''){
        alert( 'Необходимо выбрать  страну и срок аренды' );
        return false;
    }




    GetPriceXtz(ipv, country_id, period, quantyti);
});

$(document).on('click', '#delete_promo', function () {

    var period = $('input[name="period"]').val();
    var country_id = $('input[name="country_id"]').val();
    var ipv = $('input[name="ipv"]').val();
    var quantyti = $('#quantyti_xtz').val();

    $('input[name="enter_promo"]').val('');

    if(quantyti == ''){
        var country = $('#id_default_currency_rus_name_for_index_page').val();
        $('.total_price_xtz').html(0 + ' ' + country+'.');
        $('.price_for_one_xtz').html(0 +' ' + country+ '. шт.');

        $('.how_much_need_next').html('');

    }else{
        if (ipv == 'IPv6' && quantyti < 5){
            alert('Минимальное кол-во для покупки 5 шт.');
            return false;
        }
    }
    GetPriceXtz(ipv, country_id, period, quantyti);
});

$(document).on('click', '.item_service', function () {
        var currency = $(this).attr('data-service');
        $('#id_default_keeper_name_for_index_page').val(currency)
    var period = $('input[name="period"]').val();
    var country_id = $('input[name="country_id"]').val();
    var ipv = $('input[name="ipv"]').val();
    var quantyti = $('#quantyti_xtz').val();
    console.log(quantyti + '        asd');
    GetPriceXtz(ipv, country_id, period, quantyti);
});

function GetPriceXtz(ipv, country_id, period, quantyti){
    var currency = $('#id_default_keeper_name_for_index_page').val();
    var country = $('#id_default_currency_rus_name_for_index_page').val();
if(currency == "PayPal"){
    currency = 'wmr';
}


    $.ajax({
        url: '/ipv6/get-price-xtz',
        type: 'POST',
        data: {ipv: ipv, country_id: country_id, period: String(period), quantyti: quantyti, currency: currency,},
        dataType: 'json',

        success: function (data) {



            if (data){
               if (data['default_price_for_one_moth'] != 'undefined'){
                   $('#id_original_sum_XTZ').val(data['default_price_for_one_moth'])
               }

                setTimeout(function () {
                    $('.total_price_xtz').html(data['price'] + ' '+ country + '.');
                    $('.price_for_one_xtz').html(data['price_for_one'] + ' '+ country + '. шт.');

                    $('#id_one_ip_price_after_discount_tab').text(data['price_for_one']);
                    $('#id_strong_modal_form_summ_tab_2').text(data['price']);

                    $('input[name="total_price_xtz"]').val(data['price']);
                    $('input[name="price_for_one_xtz"]').val(data['price_for_one']);
                }, 500);


                if (data['how_much_need'] == 0) {
                    $('.how_much_need_next').html('');
                }else{
                    $('.how_much_need_next').html('Возьмите еще ' + data['how_much_need'] + ' IP, и это будет дешевле на ' + '<b>' + data['discount_next'] + " " + country+'.' + ' </b>');
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.log('ERRORS: ' + textStatus);
        }
    });
}

$(document).on('change', 'input[name="enter_promo"]', function () {
    var promo_code = $(this).val();
    var summ = $('.total_price_xtz').text();
    var price_for_one = $('.price_for_one_xtz').text();
    $.ajax({
        url: '/ipv6/get-promo-xtz',
        type: 'POST',
        data: {promo_code: promo_code, summ: summ, price_for_one: price_for_one},
        dataType: 'json',

        success: function (data) {
            var country = $('#id_default_currency_rus_name_for_index_page').val();
            if (data['error'] == 0){
                $('.total_price_xtz').html(data['price'] + ' '+ country +'.');
                $('.price_for_one_xtz').html(data['price_for_one']  + ' '+ country +'. шт.');

                $('#orders-promo').val(promo_code);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + textStatus);
        }
    });

});

$(document).on('click', '.button_create_order_enter_user', function () {

    var country = $('input[name="country_id"]').val();
    console.log(country);
    if (country == ''){
        alert('Выберите страну');
        setTimeout(function () {
            $('.popup').css({'display':'none'});
        }, 10);

        return false;
    } else {
        $('.button_create_order_enter_user.main_btn ').addClass('modal')

    }
    // Не удаляет шт. в инпуте кол-ва
    $(".click_quantity_ipv6").click(function () {
        var arr = $(this).val().split(' '),
            arrMain = $(this).val().split(" " + arr[arr.length - 1]);
        if (arr[0] == "0") {
            $(this).val(" " + arr[1]);

            setCursorPos(this, arrMain[0].length - 1);
        } else {
            setCursorPos(this, arrMain[0].length);
        }
    });
    function setCursorPos(elem, pos) {
        if (elem.setSelectionRange) {
            elem.focus();
            elem.setSelectionRange(pos, pos);
        }
        else if (elem.createTextRange) {
            var range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    var count = $('#quantyti_xtz').val();
    $(document).find('#id_strong_modal_form_count').val(count);

    var what_ipv = $('.what_ipv_selected').text();
    var what_country = $('.what_country_selected > .country_name').text();

    var period = $('a.period_xtz').text();

    var price = parseInt($('.total_price_xtz').text());
    var price_for_one = parseFloat($('.price_for_one_xtz').text());
    $('#id_one_ip_price_after_discount_tab').text(price_for_one);
    $('#id_strong_modal_form_summ_tab_2').text(price + ' ');
    $('#id_original_sum').val(price);

    console.log(period);



    $(document).find('.inner_form').find('a.country').text(what_country); // передаем выбранную страну пользователем в форму и отображаем как выбранную
    $(document).find('.id_form_hidden_input_country').val(what_country);

    $(document).find('#id_strong_modal_form_term').text(period); // передаем выбранную страну пользователем в форму и отображаем как выбранную
    // $(document).find('.id_form_hidden_input_country').val(what_country);


    var id_country = $(this).attr("data-country-id");
    console.log('click .select_country');
    // удаляем прошлые услуги
    $('.select_goal').text("");
    $('.click_goal').text("");


    $.ajax({
        url: '/index/create-target',
        type: 'POST',
        data: {id_country: id_country},
        //processData: false,
        //contentType: false,
        cache: false,
        success: function (data) {
            var htmlData = JSON.parse(data);
            $('.remove_services').remove();
            $('.services_before_add').css('display', 'none');
            for (var key in htmlData) {
                $('.click_goal').append(tamplate_main_services(htmlData[key].id, htmlData[key].name));
            }
        },
        error: function (e) {
            console.log('ERRORS: ' + e);
        }
    });


});

$('.click_goal').on('click', 'li', function () {
    // Узнаем ид сервиса, цели, и записываем в скрытое поле
    var target_code1C = $(this).attr('data-ipv4-target');
    var target_text = $(this).text();

    $(document).find('.class_target_code1C').val(target_code1C);
    $(document).find('.id_ipv6_fast_order_target').val(target_text);

    // берем id прокси из скрытого поля
    var parent_id = $(this).attr('data-ipv4-target');
    // берем id страны
    var id_country = $(document).find('.class_country_code1C').val();

    var data = new FormData();
    data.append('parent_id', parent_id);
    data.append('id_country', id_country);

    $.ajax({
        url: '/index/update-goal',
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var htmlData = JSON.parse(data);
            // $('.remove_services').remove();
            $('.services_before_add').css('display', 'none');
            for (var key in htmlData) {
                $('.services_add').append(tamplate_services(htmlData[key].id, htmlData[key].name));
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + textStatus);
        }
    });
});

$(document).on('click', '.remove_services', function () {
    var period = $('.period_xtz').text();
    $(document).find('#id_strong_modal_form_term').text(period);
});

$(document).on('submit','#create_order',function(){

    var ipv = $('input[name="ipv"]').val();
   if(ipv == "IPv6"){
       ga('send', 'event', 'knopka', 'ipv6');
       yaCounter27024561.reachGoal('by_ipv6');
   }else{
       yaCounter27024561.reachGoal('by_proxy');
       ga('send', 'event','knopka','ipv4');
   }


    return true;
});







$('.click_goal').on('click', 'li', function () {
    // Узнаем ид сервиса, цели, и записываем в скрытое поле
    var target_code1C = $(this).attr('data-ipv4-target');
    var target_text = $(this).text();

    $(document).find('.class_target_code1C').val(target_code1C);
    $(document).find('.id_ipv6_fast_order_target').val(target_text);

    // берем id прокси из скрытого поля
    var parent_id = $(this).attr('data-ipv4-target');
    // берем id страны
    var id_country = $(document).find('.class_country_code1C').val();

    var data = new FormData();
    data.append('parent_id', parent_id);
    data.append('id_country', id_country);

    $.ajax({
        url: '/index/update-goal',
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            var htmlData = JSON.parse(data);
            $('.remove_services').remove();
            $('.services_before_add').css('display', 'none');
            for (var key in htmlData) {
                $('.services_add').append(tamplate_services(htmlData[key].id, htmlData[key].name));
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + textStatus);
        }
    });
});
//выбрали страну и выводим КОНКРЕТНЫЕ цели
function tamplate_services(id_services, name) {
    return '<li class="remove_services" data-id_services="' + id_services + '">' + name + ' </li>';
}

// ФОРМА БЫСТРОГО ЗАКАЗА НА ГЛАВНОЙ

// делаем при клике чтобы курсор становился в конец певрого слова или вводимого
$('input[name="count_ipv4"]').click(function () {
    var arr = $(this).val().split(' '),
        arrMain = $(this).val().split(" " + arr[arr.length - 1]);
    if (arr[0] == "0") {
        $(this).val(" " + arr[1]);
        setCursorPos(this, arrMain[0].length - 1);
    } else if (arr[0] == "" && arr[1] == "шт.") {
        $(this).val('');
    } else {
        $(this).val(arr[0].replace(/\D/g, '') + ' ' + 'шт.');
        setCursorPos(this, arrMain[0].length);
    }
});
$('input[name="count_ipv4"]').on('keyup', function (e) {
    var arr = $(this).val().split(' '),
        arrMain = $(this).val().split(" " + arr[arr.length - 1]);
    if (arr[0] == "" && arr[1] == "шт.") {
        $(this).val('');
    } else if (e.keyCode == 46) {
        $(this).val(arr[0]);
    } else if (arr[0] == "") {
        $(this).val(arr[0] + ' ' + 'шт.');
        setCursorPos(this, arrMain[0].length);
    } else if (!arr[1]) {
        $(this).val(arr[0] + ' ' + 'шт.');
        setCursorPos(this, arrMain[0].length);
    }
});
$('input[name="count_ipv4"]').on('blur', function () {
    var arr = $(this).val().split(' ');
    if (arr[0] == "" && arr[1] == "шт.") {
        $(this).val('');
    } else if (!arr[1] && arr[0] == "") {
        $(this).val('');
    } else if ($(this).val() === '') {
        $(this).val('');
    } else {
        $(this).val(arr[0].replace(/\D/g, '') + ' ' + 'шт.');
    }
});
// вводим только цифры
$('input[name="count_ipv4"]').keydown(function (event) {
    // Разрешаем нажатие клавиш backspace, Del, Tab и Esc
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
        // Разрешаем выделение: Ctrl+A
        event.keyCode == 65 && event.ctrlKey === true ||
        // Разрешаем клавиши навигации: Home, End, Left, Right
        event.keyCode >= 35 && event.keyCode <= 39) {
        return;
    } else {
        // Запрещаем всё, кроме клавиш цифр на основной клавиатуре, а также Num-клавиатуре
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    }
});


$('input[name="email_tab_1"]').on('keyup',function () {
   $('input[name="Orders[email]"]').val($(this).val());
});
$('input[name="email_tab_2"]').on('keyup',function () {
    $('input[name="Orders[email]"]').val($(this).val());
});

$(document).on('click','.remove_services',function () {
    $('input[name="Orders[sub_target]"]').val($(this).text());
});



$(document).on('keyup', '#id_strong_modal_form_count', function () {
    var count = $(this).val();
    $('#quantyti_xtz').val(count);
});
