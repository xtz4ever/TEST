/**
 * Created by Ivany on 27.10.2017.
 */
$(document).ready(function () {

    $(document).find('#id_currency').val($('.currency_xtz_1').text());




    // Показываем скрытый инпут для того чтобы пользователь ввел свою программу или сайт
    $(document).on('click', '.remove_services', function () {
        if ($(this).attr('data-id_services') == 12) { // 12 - номер услуги Другая программа/сайт  в базе данных
            $(document).find('.div_tab_my_other_program').attr('style', '');
            $(document).find('.div_tab_my_other_program').show();
        } else {
            $(document).find('.div_tab_my_other_program').hide();
        }
    });

    $(document).on('click', '.select_country, .goal_before_add', function () {
        $(document).find('.div_tab_my_other_program').hide();
    });
    // Открывает следующий селект
    $(document).on('click', '.goal_before_add', function () {
        setTimeout(function () {
            $(document).find('.select_services').trigger('click');
        }, 500);
    });

    // ставил курс дефолтной валюты относительно рубля
    var currency = $(document).find('#id_currency').val();
    var keeper_default = '';
    //var currency_rus = '';
    switch (currency) {
        case 'UAH':
            keeper_default = 'wmu';
            var currency_rus = 'UAH';
            break;
        case 'RUB':
            keeper_default = 'wmr';
            var currency_rus = 'RUB';
            break;
        case 'USD':
            keeper_default = 'wmz';
            var currency_rus = 'USD';
            break;
        case 'mBTC':
            keeper_default = 'wmx';
            var currency_rus = 'mBTC';
            break;
        case 'KZT':
            keeper_default = 'kzt';
            var currency_rus = 'KZT';
            break;
    }

    $.ajax({
        url: '/currency/one_course',
        type: 'POST',
        data: {currency: keeper_default},
        success: function (course) {
            $(document).find('#id_span_one_month_price').attr('data-course', course);
            $(document).find('#id_span_two_month_price').attr('data-course', course);
            $(document).find('#id_span_three_month_price').attr('data-course', course);
            $(document).find('#id_span_six_month_price').attr('data-course', course);
            $(document).find('#id_span_nine_month_price').attr('data-course', course);
            $(document).find('#id_span_twelve_month_price').attr('data-course', course);
        },
        error: function (e) {
            console.log("error = " + e);
        }
    });

// Формируем список целей в зависимости от страны   создает список ЦЕЛЕЙ ПРИ ВЫЬОРЕ СТРАНЫ !!!
    $(document).on('click', '.select_country', function (e) {
        e.preventDefault();

        $('.select_country').each(function () {
            $('.select_country').css('display', 'block');
        });
        $(this).css('display', 'none');

        var id_country = $(this).attr("data-country-id");
        create_target_list(id_country);
    });

    // Формируем список ДОЧЕРНИХ КЛАССОВ в зависимости от выбраной главной цели
    $('.click_goal').on('click', 'li', function () {

        // берем id прокси из скрытого поля
        var parent_id = $(this).attr('data-ipv4-target');
        // берем id страны
        var id_country = $(document).find('.class_country_code1C').val();

        // Узнаем ид сервиса, цели, и записываем в скрытое поле
        var target_text = $(this).text();
        $('.data-ipv4-sub-target').text('');

        $(document).find('.class_target_code1C').val(parent_id);
        $(document).find('.id_ipv6_fast_order_target').val(target_text);

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

    //  автоматический подсчет цены  произвольного количества которое вводит юзер
    $(document).on('keyup', '.user_count_proxy_one', function () {

        if (this.value.match(/[^0-9]/g) || this.value == '') {
            this.value = this.value.replace(/[^0-9]/g, '');
            return false;
        }

        var the = $(this);
        KeyUpUserCountProxy(the, 'id_default_country_price_for_dynamic_page_in_page_one');
    });

    $(document).on('keyup', '.user_count_proxy_two', function () {

        if (this.value.match(/[^0-9]/g) || this.value == '') {
            this.value = this.value.replace(/[^0-9]/g, '');
            return false;
        }

        var the = $(this);

        KeyUpUserCountProxy(the, 'id_default_country_price_for_dynamic_page_in_page_two');
    });

    // перенос данных с елемента в модалку при оформлении заказа данных которые вводит пользователь
    $(document).on('click', '.button_create_order_enter_user_one', function () {

        var quantity = $('.user_count_proxy_one').val();
       if (quantity == ''){


           setTimeout(function () {
               $('#id_one_ip_price_after_discount').text('0');
               $('#sum').text('0 ');
           }, 900);
       }
       var the = $(this);
           CreateOrderEnterUser(the, 'user_count_proxy_one'); // user_count_proxy_one -- родительский класс




    });
    $(document).on('click', '.button_create_order_enter_user_two', function () {
        var quantity = $('.button_create_order_enter_user_two').val();
        if (quantity == ''){

            setTimeout(function () {
                $('#id_one_ip_price_after_discount').text('0');
                $('#sum').text('0 ');
            }, 900);
        }
        var the = $(this);
        CreateOrderEnterUser(the, 'user_count_proxy_two'); // user_count_proxy_two -- родительский класс

    });
// передаем выбранную страну и платежную систему в скрытое поле
    $(document).on('click', '.finished_order', function () {
        var country = $(this).parents('.inner_form').find('a.country').text();
        $(document).find('.id_form_hidden_input_country').val(country);

        var service = $(this).parents('.inner_form').find('a.select_service').attr('data-service');
        $(document).find('.id_form_hidden_input_service').val(service);
    });

    $(document).on('click', '.change_default_currency_one', function () {

        var currency = $(document).find('#id_currency').val();

        console.log(currency);

        // var currency = $(this).text();


        // Прячем валюту из списка если онавыбрана
        $('.change_default_currency_one').each(function () {
            $('.change_default_currency_one').css('display', 'block');
        });
        $(this).css('display', 'none');

        var keeper = '';
        //var currency_rus = '';
        switch (currency) {
            case 'UAH':
                keeper = 'wmu';
                var currency_rus = 'UAH';
                break;
            case 'RUB':
                keeper = 'wmr';
                var currency_rus = 'RUB';
                break;
            case 'USD':
                keeper = 'wmz';
                var currency_rus = 'USD';
                break;
            case 'mBTC':
                keeper = 'wmx';
                var currency_rus = 'mBTC';
                break;
            case 'KZT':
                keeper = 'kzt';
                var currency_rus = 'KZT';
                break;
        }


        $(document).find('#id_span_one_month_price_currency_text').text(currency_rus);
        $(document).find('#id_span_one_month_price_sum_text').text(currency_rus);

        console.log("IPv4 currency_rus = " + currency_rus);
        console.log("IPv4 keeper = " + keeper);


        courseCurrencyForOnePackage(keeper, currency_rus);

        setTimeout(function () {
            convertPriceAndSumProxyEnterUserOne();
        }, 400);

    });


    $(document).on('click', '.change_default_currency_two', function () {
        var currency = $(this).text();

        // Прячем валюту из списка если онавыбрана
        $('.change_default_currency_two').each(function () {
            $('.change_default_currency_two').css('display', 'block');
        });
        $(this).css('display', 'none');

        var width = $(window).width();

        if (width > 768) {
            var active_data_tab = $(this).parents('.row').find('.active').attr('data-tab2');
        } else {
            // для Моб телефона находим выбраный срок берем количество месяцев и показываем определённый таб
            var term = parseInt($(this).parents('.row').find('.active_link_term').text());
            var active_data_tab = 0;
            console.log("term ---- " + term);
            switch (term) {
                case(2):
                    active_data_tab = 1;
                    break;
                case(3):
                    active_data_tab = 2;
                    break;
                case(6):
                    active_data_tab = 3;
                    break;
                case(9):
                    active_data_tab = 4;
                    break;
                case(12):
                    active_data_tab = 5;
                    break;
                default:
                    active_data_tab = 1;
                    break;
            }
        }

        var keeper = '';
        //var currency_rus = '';
        switch (currency) {
            case 'UAH':
                keeper = 'wmu';
                var currency_rus = 'UAH';
                break;
            case 'RUB':
                keeper = 'wmr';
                var currency_rus = 'RUB';
                break;
            case 'USD':
                keeper = 'wmz';
                var currency_rus = 'USD';
                break;
            case 'mBTC':
                keeper = 'wmx';
                var currency_rus = 'mBTC';
                break;
            case 'KZT':
                keeper = 'kzt';
                var currency_rus = 'KZT';
                break;
        }

        $(document).find('#id_span_two_month_price_currency_text').text(currency_rus);
        $(document).find('#id_span_two_month_price_sum_text').text(currency_rus);

        $(document).find('#id_span_three_month_price_currency_text').text(currency_rus);
        $(document).find('#id_span_three_month_price_sum_text').text(currency_rus);

        $(document).find('#id_span_six_month_price_currency_text').text(currency_rus);
        $(document).find('#id_span_six_month_price_sum_text').text(currency_rus);

        $(document).find('#id_span_nine_month_price_currency_text').text(currency_rus);
        $(document).find('#id_span_nine_month_price_sum_text').text(currency_rus);

        $(document).find('#id_span_twelve_month_price_currency_text').text(currency_rus);
        $(document).find('#id_span_twelve_month_price_sum_text').text(currency_rus);

        console.log("keeeper == " + keeper);

        courseCurrencyForTwoPackage(keeper, currency_rus, active_data_tab);

        setTimeout(function () {
            convertPriceAndSumProxyEnterUserTwo();
        }, 200);


    });

});

function KeyUpUserCountProxy(the, id_price) {

    console.log("KeyUpUserCountProxy");
    var month = the.attr('data-month');
    var span_price_id = '';
    var span_summ_id = '';
    var course = '';
    var currency = '';

    var count_ip = the.val();
    var price_county = $(document).find('#' + id_price).val();
    if (count_ip === '') {
        count_ip = 1
    }

    if (count_ip === '') {
        count_ip = 1
    }
    var discount_count_ip = DiscountCountIp(count_ip);

    console.log('month ------- ' + month);

    switch (month) {
        case('4'):
            span_price_id = 'id_span_one_month_price';
            span_summ_id = 'id_span_one_month_summ';
            course = $(document).find('#id_span_one_month_price').attr('data-course');
            currency = $(document).find('#id_span_one_month_price_sum_text').text();
            break;
        case('5'):
            span_price_id = 'id_span_one_month_price';
            span_summ_id = 'id_span_one_month_summ';
            course = $(document).find('#id_span_one_month_price').attr('data-course');
            currency = $(document).find('#id_span_one_month_price_sum_text').text();
            break;
        case('1'):
            span_price_id = 'id_span_one_month_price';
            span_summ_id = 'id_span_one_month_summ';
            course = $(document).find('#id_span_one_month_price').attr('data-course');
            currency = $(document).find('#id_span_one_month_price_sum_text').text();
            break;
        case('2'):
            span_price_id = 'id_span_two_month_price';
            span_summ_id = 'id_span_two_month_summ';
            course = $(document).find('#id_span_two_month_price').attr('data-course');
            currency = $(document).find('#id_span_two_month_price_sum_text').text();
            break;
        case('3'):
            span_price_id = 'id_span_three_month_price';
            span_summ_id = 'id_span_three_month_summ';
            course = $(document).find('#id_span_three_month_price').attr('data-course');
            currency = $(document).find('#id_span_three_month_price_sum_text').text();
            break;
        case('6'):
            span_price_id = 'id_span_six_month_price';
            span_summ_id = 'id_span_six_month_summ';
            course = $(document).find('#id_span_six_month_price').attr('data-course');
            currency = $(document).find('#id_span_six_month_price_sum_text').text();
            break;
        case('9'):
            span_price_id = 'id_span_nine_month_price';
            span_summ_id = 'id_span_nine_month_summ';
            course = $(document).find('#id_span_nine_month_price').attr('data-course');
            currency = $(document).find('#id_span_nine_month_price_sum_text').text();
            break;
        case('12'):
            span_price_id = 'id_span_twelve_month_price';
            span_summ_id = 'id_span_twelve_month_summ';
            course = $(document).find('#id_span_twelve_month_price').attr('data-course');
            currency = $(document).find('#id_span_twelve_month_price_sum_text').text();
            break;
    }

    console.log('span_summ_id ------- ' + span_summ_id);
    console.log(month + 'EWQ');
    var sum = summDiscountIp(month, count_ip, course, price_county, discount_count_ip);



    //записываем оригинальное значение сумы в рублях в дата атрибуты, ето нужно стобы потом конвертировать суму отвносительно выбраной валюты
    // 1 month
    $(document).find('#id_span_one_month_price').attr('data-original-price', (sum[0] / count_ip));
    $(document).find('#id_span_one_month_summ').attr('data-original-price', sum[0]);
    // 2 month
    $(document).find('#id_span_two_month_price').attr('data-original-price', (sum[0] / count_ip));
    $(document).find('#id_span_two_month_summ').attr('data-original-price', sum[0]);
    // 3 month
    $(document).find('#id_span_three_month_price').attr('data-original-price', (sum[0] / count_ip));
    $(document).find('#id_span_three_month_summ').attr('data-original-price', sum[0]);
    // 6 month
    $(document).find('#id_span_six_month_price').attr('data-original-price', (sum[0] / count_ip));
    $(document).find('#id_span_six_month_summ').attr('data-original-price', sum[0]);
    // 9 month
    $(document).find('#id_span_nine_month_price').attr('data-original-price', (sum[0] / count_ip));
    $(document).find('#id_span_nine_month_summ').attr('data-original-price', sum[0]);
    // 12 month
    $(document).find('#id_span_twelve_month_price').attr('data-original-price', (sum[0] / count_ip));
    $(document).find('#id_span_twelve_month_summ').attr('data-original-price', sum[0]);


    $('#' + span_price_id).parent('.proxy_price').css("visibility", "visible");
    $('#' + span_summ_id).parent('.proxy_price2').css("visibility", "visible");


    //$('#' + span_price_id).text((((sum[1] / count_ip)/month)*course).toFixed(2));
    //$('#' + span_summ_id).text((sum[0]*course).toFixed(2)); // sum[1]  -- цена конвертированая по курсу

    var sum_finished = (sum[0] * course);
    var price_finished = (isIntSum(sum_finished, currency) / count_ip);

    $(document).find('#' + span_summ_id).text(isIntSum(sum_finished, currency));

    if (isInt(price_finished)) {
        $('#' + span_price_id).text(price_finished);
    } else {
        if (currency == 'mBTC') {
            $('#' + span_price_id).text(price_finished.toFixed(2));
        } else {
            $('#' + span_price_id).text(price_finished.toFixed(2));
        }

    }

}

function CreateOrderEnterUser(the, parent_class) {
    var count = the.parents('.proxy_ipv6_item_inner').find('.' + parent_class).val();
    var month = the.attr('data-month');
    // из-за 1 недели и 2 недели пришлось так исполнить
    if (month == '1 неделя') {
        month = parseInt(4);
    } else if (month == '2 недели') {
        month = parseInt(5);
    } else {
        month = parseInt(month);
    }
    var course = '';
    var currency = '';
    var keeper = '';
    var original_price = '';

    var span_price_id = '';
    var span_summ_id = '';

    switch (month) {
        case(4):
            span_price_id = 'id_span_one_month_price';
            span_summ_id = 'id_span_one_month_summ';
            course = $(document).find('#id_span_one_month_price').attr('data-course');
            currency = the.parents('.proxy_ipv6_item_inner').find('#id_span_one_month_price_sum_text').text();
            keeper = $(document).find('#id_span_one_month_price').attr('data-keeper');
            original_price = $(document).find('#id_span_one_month_price').attr('data-original-price');
            $(document).find('.data-ipv4-term').text('1 неделя');
            $(document).find('.data-ipv4-term').attr('data-ipv4-term', 0);
            break;
        case(5):
            span_price_id = 'id_span_one_month_price';
            span_summ_id = 'id_span_one_month_summ';
            course = $(document).find('#id_span_one_month_price').attr('data-course');
            currency = the.parents('.proxy_ipv6_item_inner').find('#id_span_one_month_price_sum_text').text();
            keeper = $(document).find('#id_span_one_month_price').attr('data-keeper');
            original_price = $(document).find('#id_span_one_month_price').attr('data-original-price');
            $(document).find('.data-ipv4-term').text('2 недели');
            $(document).find('.data-ipv4-term').attr('data-ipv4-term', 0);
            break;
        case(1):
            span_price_id = 'id_span_one_month_price';
            span_summ_id = 'id_span_one_month_summ';
            course = $(document).find('#id_span_one_month_price').attr('data-course');
            currency = the.parents('.proxy_ipv6_item_inner').find('#id_span_one_month_price_sum_text').text();
            keeper = $(document).find('#id_span_one_month_price').attr('data-keeper');
            original_price = $(document).find('#id_span_one_month_price').attr('data-original-price');
            $(document).find('.data-ipv4-term').text('1 месяц');
            $(document).find('.data-ipv4-term').attr('data-ipv4-term', 0);
            break;
        case(2):
            span_price_id = 'id_span_two_month_price';
            span_summ_id = 'id_span_two_month_summ';
            course = $(document).find('#id_span_two_month_price').attr('data-course');
            currency = the.parents('.proxy_ipv6_item_inner').find('#id_span_two_month_price_sum_text').text();
            keeper = $(document).find('#id_span_two_month_price').attr('data-keeper');
            original_price = $(document).find('#id_span_two_month_price').attr('data-original-price');
            $(document).find('.data-ipv4-term').text('2 месяца');
            $(document).find('.data-ipv4-term').attr('data-ipv4-term', 3);
            break;
        case(3):
            span_price_id = 'id_span_three_month_price';
            span_summ_id = 'id_span_three_month_summ';
            course = $(document).find('#id_span_three_month_price').attr('data-course');
            currency = the.parents('.proxy_ipv6_item_inner').find('#id_span_three_month_price_sum_text').text();
            keeper = $(document).find('#id_span_three_month_price').attr('data-keeper');
            original_price = $(document).find('#id_span_three_month_price').attr('data-original-price');
            $(document).find('.data-ipv4-term').text('3 месяца');
            $(document).find('.data-ipv4-term').attr('data-ipv4-term', 5);
            break;
        case(6):
            span_price_id = 'id_span_six_month_price';
            span_summ_id = 'id_span_six_month_summ';
            course = $(document).find('#id_span_one_month_price').attr('data-course');
            currency = the.parents('.proxy_ipv6_item_inner').find('#id_span_six_month_price_sum_text').text();
            keeper = $(document).find('#id_span_one_month_price').attr('data-keeper');
            original_price = $(document).find('#id_span_one_month_price').attr('data-original-price');
            $(document).find('.data-ipv4-term').text('6 месяцев');
            $(document).find('.data-ipv4-term').attr('data-ipv4-term', 7);
            break;
        case(9):
            span_price_id = 'id_span_nine_month_price';
            span_summ_id = 'id_span_nine_month_summ';
            course = $(document).find('#id_span_nine_month_price').attr('data-course');
            currency = the.parents('.proxy_ipv6_item_inner').find('#id_span_nine_month_price_sum_text').text();
            keeper = $(document).find('#id_span_nine_month_price').attr('data-keeper');
            original_price = $(document).find('#id_span_nine_month_price').attr('data-original-price');
            $(document).find('.data-ipv4-term').text('9 месяцев');
            $(document).find('.data-ipv4-term').attr('data-ipv4-term', 9);
            break;
        case(12):
            span_price_id = 'id_span_twelve_month_price';
            span_summ_id = 'id_span_twelve_month_summ';
            course = $(document).find('#id_span_twelve_month_price').attr('data-course');
            currency = the.parents('.proxy_ipv6_item_inner').find('#id_span_twelve_month_price_sum_text').text();
            keeper = $(document).find('#id_span_twelve_month_price').attr('data-keeper');
            original_price = $(document).find('#id_span_twelve_month_price').attr('data-original-price');
            $(document).find('.data-ipv4-term').text('12 месяцев');
            $(document).find('.data-ipv4-term').attr('data-ipv4-term', 12);
            break;
    }

    console.log('span_summ_id ------- ' + span_summ_id);

    var default_sum = parseInt(the.parents('.proxy_ipv6_item_inner').find('#' + span_summ_id).text());
    var default_currency = the.parents('.proxy_ipv6_item_inner').find('#id_span_one_month_price_sum_text').text();
    default_currency = default_currency.replace(/\s+([^0-9])/g, '$1');
    default_currency = tgtrimm(default_currency);
    var default_price = (default_sum / count);

    console.log('ASD' + default_price);
    // Не удаляет шт. в инпуте кол-ва
    $(".click_quantity_ipv4").click(function () {
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

    $(document).find('#id_default_sum').val(default_sum);
    $(document).find('#id_default_price').val(default_price);
    $(document).find('#id_default_currency').val(default_currency);

    $(document).find('.id_form_hidden_input_term').val(month);
    $(document).find('.click_quantity_ipv4').val(count + ' шт.');

}


function DiscountCountIp(count) {  // возвращает % скидки !
    var count_ip = parseInt(count);

    if (count_ip < 10) {
        return 0;
    } else if (count_ip >= 10 && count_ip < 25) {
        return 3;
    } else if (count_ip >= 25 && count_ip < 50) {
        return 5;
    } else if (count_ip >= 50 && count_ip < 100) {
        return 10;
    } else if (count_ip >= 100 && count_ip < 250) {
        return 15;
    } else if (count_ip >= 250 && count_ip < 500) {
        return 20;
    } else if (count_ip >= 500 && count_ip < 1000) {
        return 35;
    } else if (count_ip >= 1000) {
        return 40;
    }

}

function summDiscountIp(month, count, course, price_county, discount_count_ip) {
    var count_ip = parseInt(count);
    var month_block = parseInt(month);

    if (month_block == 4){
        month_block = 0.50;
    }else if(month_block == 5){
        month_block = 0.75;
    }else{
        month_block = month_block;
    }

    //var price_ip = parseInt(price);

    var discount = 0;
    var summ = 1;
    var discount_summ = 0;

    switch (month_block) {
        case (4):
            discount = 0;
            break;
        case (5):
            discount = 0;
            break;
        case (1):
            discount = 0;
            break;
        case (2):
            discount = 3;
            break;
        case (3):
            discount = 5;
            break;
        case (6):
            discount = 7;
            break;
        case (9):
            discount = 7;
            break;
        case (12):
            discount = 10;
            break;
    }


    discount_summ = ((price_county * count_ip * month_block) * (discount + discount_count_ip)) / 100;

    summ = (price_county * count_ip * month_block) - discount_summ;

    var sum = [];
    sum[0] = summ.toFixed(2);
    sum[1] = summ.toFixed(2);
    return sum;

}

function courseCurrencyIpv4(type_currency, sum, id) {

    var course = 1;

    $.ajax({
        url: '/currency/index',
        type: 'POST',
        data: {currency: type_currency, sum: sum},
        success: function (data) {
            //var currency_rus = '';
            switch (type_currency) {
                case 'kzt':
                    var currency_rus = 'KZT';
                    break;
                case 'WMU':
                    var currency_rus = 'UAH';
                    break;
                case 'WMR':
                    var currency_rus = 'RUB';
                    break;
                case 'WMZ':
                    var currency_rus = 'USD';
                    break;
                case 'WMX':
                    var currency_rus = 'mBTC';
                    break;
                case 'YandexMoney':
                    var currency_rus = 'RUB';
                    break;
                case 'QIWI':
                    var currency_rus = 'RUB';
                    break;
                case 'Privat24':
                    var currency_rus = 'UAH';
                    break;
            }
            var sum = parseFloat(data);
            sum = Math.ceil(sum);
            $(document).find('.id_form_hidden_input_summ').val(sum);
            $('#' + id).text(sum);
            $(document).find('#id_ipv6_fast_order_summ').val(sum);

            $('.one_ip_price_after_discount_currency_rus').text(currency_rus);
            $('.sum_currency_rus').text(currency_rus);
            $('#id_ipv4_fast_order_summ').val(sum); // записываем сумму в скрытое поле которое потом пойдет на платежку
        },
        error: function (e) {
            console.log("error = " + e);
        }
    });
}

function courseCurrencyForOnePackage(keeper, currency_rus) {




    $.ajax({
        url: '/currency/one_course',
        type: 'POST',
        data: {currency: keeper},
        success: function (data) {

            $(document).find('#id_span_one_month_price').attr('data-course', data);

            $(".proxy_price_for_convert_course_type_one").each(function (index) {
                // var original_price = $(this).attr('data-price');
                var original_price = $(this).attr('data-price-rub');
                var course = data;
                var newSum = original_price * course;

                var currency = $(document).find('#id_span_one_month_price_sum_text').text();
                // если целое число то НЕ  ставим два знака после комы
                $(this).text(isIntSum(newSum, currency_rus) + ' ' + currency_rus + '');
            });

            $(".proxy_price_one_count_for_convert_course_type_one").each(function (index) {
                var original_price = $(this).attr('data-price-rub');

                var count = $(this).attr('data-count');
                var course = data;
                var currency = $(document).find('#id_span_one_month_price_sum_text').text();
                var newSum = original_price * course;
                // если целое число то НЕ  ставим два знака после комы
                if (isInt(newSum / count)) {
                    $(this).text((newSum / count) + ' ' + currency_rus + '/ 1IPv4');
                } else {
                    if (currency == 'mBTC') {
                        $(this).text((newSum / count).toFixed(2) + ' ' + currency_rus + '/ 1IPv4');
                    } else {
                        $(this).text((newSum / count).toFixed(2) + ' ' + currency_rus + '/ 1IPv4');
                    }
                }

            });

            console.log("success = " + data);
        },
        error: function (e) {
            console.log("error = " + e);
        }
    });
}

function courseCurrencyForTwoPackage(keeper, currency_rus, active_data_tab) {

    $.ajax({
        url: '/currency/one_course',
        type: 'POST',
        data: {currency: keeper},
        success: function (data) {
            $(document).find('#id_span_two_month_price').attr('data-course', data);
            $(document).find('#id_span_three_month_price').attr('data-course', data);
            $(document).find('#id_span_six_month_price').attr('data-course', data);
            $(document).find('#id_span_nine_month_price').attr('data-course', data);
            $(document).find('#id_span_twelve_month_price').attr('data-course', data);

            $(".proxy_price_for_convert_course_type_two").each(function (index) {
                var original_price = $(this).attr('data-price');
                var course = data;
                var newSum = original_price * course;

                var currency = $(document).find('#id_span_two_month_price_sum_text').text();
                // если целое число то НЕ  ставим два знака после комы
                $(this).text(isIntSum(newSum, currency_rus) + ' ' + currency_rus + '');
            });

            $(".proxy_price_one_count_for_convert_course_type_two").each(function (index) {
                var original_price = $(this).attr('data-price');
                var count = $(this).attr('data-count');
                var course = data;
                var newSum = original_price * course;
                var currency = $(document).find('#id_span_two_month_price_sum_text').text();
                // если целое число то НЕ  ставим два знака после комы
                if (isInt(newSum / count)) {
                    $(this).text((newSum / count) + ' ' + currency_rus + '/ 1IPv4');
                } else {
                    if (currency == 'mBTC') {
                        $(this).text((newSum / count).toFixed(2) + ' ' + currency_rus + '/ 1IPv4');
                    } else {
                        $(this).text((newSum / count).toFixed(2) + ' ' + currency_rus + '/ 1IPv4');
                    }

                }

            });

            var status = $(document).find('.list_month_items').find('[data-tab2 =' + active_data_tab + ']').addClass('active');
            console.log("status = " + status);
        },
        error: function (e) {
            console.log("error = " + e);
        }
    });
}

function createListPackage(json, id, button, currency_rus, course, type) {
    var jsonArr = JSON.parse(json);
    var more = '';
    console.log("more - " + jsonArr.more);
    if (jsonArr.more != "") {
        more = 1;
    } else {
        button.hide();
    }
    delete jsonArr.more;


    var content = ' <div class="proxy_ipv6_items ani clearfix">';
    var jsonItem = JSON.stringify(jsonArr.item);
    var jsonItem2 = JSON.parse(jsonItem);

    var i = 0;

    for (var key in jsonItem2) {
        i++;
        console.log(i);
        // console.log("Ключ: " + key + " значение: " + jsonItem2[key].id);
        content += '  <div class="margin_b col-lg-2 col-md-4 col-sm-4 col-xs-6">' +
            ' <div class="proxy_ipv6_item">' +
            '<div class="proxy_ipv6_item_decor">' +
            '</div>' +
            '<div class="proxy_ipv6_item_inner">' +
            '<p data-count="' + jsonItem2[key].count + '" class="proxy_pieces">' + jsonItem2[key].count + ' шт.</p>' +
            '<ul>' +
            '<li data-term="' + jsonItem2[key].term + '">- ' + jsonItem2[key].term + '</li>' +
            '<li  data-canal= "' + jsonItem2[key].canal + '">- ' + jsonItem2[key].canal + '</li>' +
            '<li data-sub_network="' + jsonItem2[key].sub_network + '">- ' + jsonItem2[key].sub_network + '</li>' +
            '<li data-anonim="' + jsonItem2[key].anonim + '">- ' + (jsonItem2[key].anonim == 1 ? 'Анонимные' : 'Не Анонимные') + '</li>' +
            '<li data-traffic=" ' + jsonItem2[key].traffic + ' ">-<i></i> ' + jsonItem2[key].traffic + ' </li>' +
            '<li data-support="' + jsonItem2[key].support + '">- ' + jsonItem2[key].support + '</li>' +
            '</ul>' +
            /* '<div class="select">' +
             '<div class="slct_arrow">' +
             '<i class="fa fa-angle-down"></i>' +
             '</div>' +
             '<a href="#" class="slct">1 неделя</a>' +
             '<ul class="drop" style="">' +
             '<li data-ipv4-term="0"' +
             'class="period_before_add">' + '1 неделя' + '</li>' +
             ' <li data-ipv4-term="0" ' +
             'class="period_before_add">' + '2 недели' + '</li>' +
             ' <li data-ipv4-term="0"' +
             'class="period_before_add">' + '1 месяц' + '</li>' +
             ' </ul> ' +
             ' <input type="hidden" name="services"> ' + ' </div> '
             +*/
            ' <div class="proxy_price_txt_block">' +
            '<p data-price="' + jsonItem2[key].price + '' + (type == 0 ? '"class="proxy_price proxy_price_for_convert_course_type_one">' : '" class="proxy_price proxy_price_for_convert_course_type_two">') + isIntSum(jsonItem2[key].price * course, currency_rus) + ' ' + currency_rus + '</p>' +
            '<p  data-count="' + jsonItem2[key].count + '" data-price="' + jsonItem2[key].price + '' + (type == 0 ? '"class="proxy_price proxy_price_one_count_for_convert_course_type_one">' : '" class="proxy_price proxy_price_one_count_for_convert_course_type_two">') + ((jsonItem2[key].price * course) / jsonItem2[key].count).toFixed(2) + ' ' + currency_rus + '/1 IPv4</p>' +
            '</div>' +

            '<div>' +
            '<button  data-modal="modal-order"  data-month="' + jsonItem2[key].term + '"  class="button_create_order main_btn modal" data-buy-id="' + jsonItem2[key].id + '">КУПИТЬ</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        if (i == 5) {
            break;
        }
    }
    content += '</div>';

    if (jsonArr != '') {
        $('#' + id).append(content);
    }


}

function convertPriceAndSumProxyEnterUserOne() {
    var one_price = $(document).find('#id_span_one_month_price').attr('data-original-price');
    var sum = $(document).find('#id_span_one_month_summ').attr('data-original-price');
    var currency = $(document).find('#id_span_one_month_price_sum_text').text();

    one_price = (one_price * $(document).find('#id_span_one_month_price').attr('data-course'));
    sum = (sum * $(document).find('#id_span_one_month_price').attr('data-course'));


    // если целое число то НЕ  ставим два знака после комы
    if (isInt(one_price)) {
        $(document).find('#id_span_one_month_price').text(one_price);
    } else {
        if (currency == 'mBTC') {
            $(document).find('#id_span_one_month_price').text(one_price.toFixed(2));
        } else {
            $(document).find('#id_span_one_month_price').text(one_price.toFixed(2));
        }

    }

    // если целое число то НЕ  ставим два знака после комы
    $(document).find('#id_span_one_month_summ').text(isIntSum(sum, currency));
    //$(document).find('#id_span_one_month_price').text(one_price);
    //$(document).find('#id_span_one_month_summ').text(sum);
}

// пересчитывает сумму и цену количества которое вводит пользователь при смене валюты
function convertPriceAndSumProxyEnterUserTwo() {
    // ----------------------------- 2 ----------------------------------------------------------
    var one_price_two = $(document).find('#id_span_two_month_price').attr('data-original-price');
    var sum_two = $(document).find('#id_span_two_month_summ').attr('data-original-price');

    one_price_two = (one_price_two * $(document).find('#id_span_two_month_price').attr('data-course'));
    sum_two = (sum_two * $(document).find('#id_span_two_month_price').attr('data-course'));

    // если целое число то НЕ  ставим два знака после комы
    if (isInt(one_price_two)) {
        $(document).find('#id_span_two_month_price').text(one_price_two);
    } else {
        var currency = $(document).find('#id_span_two_month_price_sum_text').text();
        if (currency == 'mBTC') {
            $(document).find('#id_span_two_month_price').text(one_price_two.toFixed(2));
        } else {
            $(document).find('#id_span_two_month_price').text(one_price_two.toFixed(2));
        }
    }
    //$(document).find('#id_span_two_month_price').text(one_price_two.toFixed(3));

    // если целое число то НЕ  ставим два знака после комы
    var currency = $(document).find('#id_span_two_month_price_sum_text').text();
    $(document).find('#id_span_two_month_summ').text(isIntSum(sum_two, currency));
    //$(document).find('#id_span_two_month_summ').text(sum_two.toFixed(2));
    // -----------------------------------------------------------------------------------------------


// ----------------------------- 3 ----------------------------------------------------------
    var one_price_three = $(document).find('#id_span_three_month_price').attr('data-original-price');
    var sum_three = $(document).find('#id_span_three_month_summ').attr('data-original-price');

    one_price_three = (one_price_three * $(document).find('#id_span_three_month_price').attr('data-course'));
    sum_three = (sum_three * $(document).find('#id_span_three_month_price').attr('data-course'));

    // если целое число то НЕ  ставим два знака после комы

    if (isInt(one_price_three)) {
        $(document).find('#id_span_three_month_price').text(one_price_three);
    } else {
        var currency = $(document).find('#id_span_three_month_price_sum_text').text();
        if (currency == 'mBTC') {
            $(document).find('#id_span_three_month_price').text(one_price_three.toFixed(2));
        } else {
            $(document).find('#id_span_three_month_price').text(one_price_three.toFixed(2));
        }

    }
    //$(document).find('#id_span_three_month_price').text(one_price_three.toFixed(3));

    // если целое число то НЕ  ставим два знака после комы
    var currency = $(document).find('#id_span_three_month_price_sum_text').text();
    $(document).find('#id_span_three_month_summ').text(isIntSum(sum_three, currency));

    //$(document).find('#id_span_three_month_summ').text(sum_three.toFixed(2));
//----------------------------------------------------------------------------------------------------------------

// ----------------------------- 6 ----------------------------------------------------------
    var one_price_six = $(document).find('#id_span_six_month_price').attr('data-original-price');
    var sum_six = $(document).find('#id_span_six_month_summ').attr('data-original-price');

    one_price_six = (one_price_six * $(document).find('#id_span_six_month_price').attr('data-course'));
    sum_six = (sum_six * $(document).find('#id_span_six_month_price').attr('data-course'));

    // если целое число то НЕ  ставим два знака после комы
    if (isInt(one_price_six)) {
        $(document).find('#id_span_six_month_price').text(one_price_six);
    } else {
        var currency = $(document).find('#id_span_six_month_price_sum_text').text();
        if (currency == 'mBTC') {
            $(document).find('#id_span_six_month_price').text(one_price_six.toFixed(2));
        } else {
            $(document).find('#id_span_six_month_price').text(one_price_six.toFixed(2));
        }

    }
    //$(document).find('#id_span_six_month_price').text(one_price_six.toFixed(3));

    // если целое число то НЕ  ставим два знака после комы
    var currency = $(document).find('#id_span_six_month_price_sum_text').text();
    $(document).find('#id_span_six_month_summ').text(isIntSum(sum_six, currency));

    //$(document).find('#id_span_six_month_summ').text(sum_six.toFixed(2));
//----------------------------------------------------------------------------------------------------------------

// ----------------------------- 9  ----------------------------------------------------------
    var one_price_nine = $(document).find('#id_span_nine_month_price').attr('data-original-price');
    var sum_nine = $(document).find('#id_span_nine_month_summ').attr('data-original-price');

    one_price_nine = (one_price_nine * $(document).find('#id_span_nine_month_price').attr('data-course'));
    sum_nine = (sum_nine * $(document).find('#id_span_nine_month_price').attr('data-course'));

    // если целое число то НЕ  ставим два знака после комы
    if (isInt(one_price_nine)) {
        $(document).find('#id_span_nine_month_price').text(one_price_nine);
    } else {
        var currency = $(document).find('#id_span_nine_month_price_sum_text').text();
        if (currency == 'mBTC') {
            $(document).find('#id_span_nine_month_price').text(one_price_nine.toFixed(2));
        } else {
            $(document).find('#id_span_nine_month_price').text(one_price_nine.toFixed(2));
        }
    }
    //$(document).find('#id_span_nine_month_price').text(one_price_nine.toFixed(3));

    // если целое число то НЕ  ставим два знака после комы
    var currency = $(document).find('#id_span_nine_month_price_sum_text').text();
    $(document).find('#id_span_nine_month_summ').text(isIntSum(sum_nine, currency));

    //$(document).find('#id_span_nine_month_summ').text(sum_nine.toFixed(2));
//------------------------------------------------------------------------------------------------------------------

// ----------------------------- 12  ----------------------------------------------------------
    var one_price_twelve = $(document).find('#id_span_twelve_month_price').attr('data-original-price');
    var sum_twelve = $(document).find('#id_span_twelve_month_summ').attr('data-original-price');

    one_price_twelve = (one_price_twelve * $(document).find('#id_span_twelve_month_price').attr('data-course'));
    sum_twelve = (sum_twelve * $(document).find('#id_span_twelve_month_price').attr('data-course'));

    // если целое число то НЕ  ставим два знака после комы
    if (isInt(one_price_twelve)) {
        $(document).find('#id_span_twelve_month_price').text(one_price_twelve);
    } else {
        var currency = $(document).find('#id_span_twelve_month_price_sum_text').text();
        if (currency == 'mBTC') {
            $(document).find('#id_span_twelve_month_price').text(one_price_twelve.toFixed(2));
        } else {
            $(document).find('#id_span_twelve_month_price').text(one_price_twelve.toFixed(2));
        }
    }
    //$(document).find('#id_span_twelve_month_price').text(one_price_twelve.toFixed(3));

    // если целое число то НЕ  ставим два знака после комы
    var currency = $(document).find('#id_span_twelve_month_price_sum_text').text();
    $(document).find('#id_span_twelve_month_summ').text(isIntSum(one_price_twelve, currency));
    //$(document).find('#id_span_twelve_month_summ').text(sum_twelve.toFixed(2));
}

function isInt(n) {
    return n % 1 === 0;
}

function isIntSum(sum, currency_name) {
    // если целое число то НЕ  ставим два знака после комы
    if (isInt(sum)) {
        return sum;
    } else {
        if (currency_name == 'mBTC') {
            return sum.toFixed(2);
        } else {
            return Math.ceil(sum); // округляем в большую сторону
        }
    }
}

$(document).ready(function () {

    $(document).on('click', '.change_location_for_inspection_ipv6', function () {
        window.open("http://ipv6-test.com/validate.php", '_blank');

        //location.replace("http://ipv6-test.com/validate.php");
    });

    $(document).on('click', '.more_package_item', function () {
        var type = $(this).attr('data-type');
        var currency = '';
        if (type == 0) {
            currency = $(document).find('#id_currency').val();
        } else {
            currency = $(document).find('#id_two_change_default_currency').text();
        }

        var keeper = '';
        //var currency_rus = '';
        switch (currency) {
            case 'UAH':
                keeper = 'wmu';
                var currency_rus = 'UAH.';
                break;
            case 'RUB':
                keeper = 'wmr';
                var currency_rus = 'RUB';
                break;
            case 'USD':
                keeper = 'wmz';
                var currency_rus = 'USD';
                break;
            case 'mBTC':
                keeper = 'wmx';
                var currency_rus = 'mBTC';
                break;
        }


        var page = $(this).attr('data-number-page');
        var id = $(this).attr('data-id-container');
        var type = $(this).attr('data-type');
        var button = $(this);
        var id_dinamic_page = $(document).find('#id_country_id_dinamic_page').val();
        console.log("id_dinamic_page == " + id_dinamic_page);
        $.ajax({
            url: '/currency/one_course',
            type: 'POST',
            data: {currency: keeper},
            success: function (course) {
                $.ajax({
                    url: "/ipv6/packagepagination?page=" + page + "&type=" + type + "&dinamic=page&id-page=" + id_dinamic_page,
                    method: 'GET',
                    success: function (data) {
                        createListPackage(data, id, button, currency_rus, course, type);
                        page++;
                        $(document).find("button[data-id-container=" + id + "]").attr('data-number-page', page);
                    }
                });
            },
            error: function (e) {
                console.log("error = " + e);
            }
        });


    });

    $(document).on('click', '.more_package_item_program', function () {
        var type = $(this).attr('data-type');
        var currency = '';
        if (type == 0) {
            currency = $(document).find('#id_currency').val();
        } else {
            currency = $(document).find('#id_two_change_default_currency').text();
        }

        var keeper = '';
        //var currency_rus = '';
        switch (currency) {
            case 'UAH':
                keeper = 'wmu';
                var currency_rus = 'UAH.';
                break;
            case 'RUB':
                keeper = 'wmr';
                var currency_rus = 'RUB';
                break;
            case 'USD':
                keeper = 'wmz';
                var currency_rus = 'USD';
                break;
            case 'mBTC':
                keeper = 'wmx';
                var currency_rus = 'mBTC';
                break;
        }


        var page = $(this).attr('data-number-page');
        var id = $(this).attr('data-id-container');
        var type = $(this).attr('data-type');
        var button = $(this);
        var id_dinamic_page = $(document).find('#id_country_id_dinamic_page').val();
        console.log("id_dinamic_page == " + id_dinamic_page);
        $.ajax({
            url: '/currency/one_course',
            type: 'POST',
            data: {currency: keeper},
            success: function (course) {
                $.ajax({
                    url: "/ipv6/packagepagination?page=" + page + "&type=" + type + "&dinamic=page&id-page=" + id_dinamic_page,
                    method: 'GET',
                    success: function (data) {
                        createListPackage(data, id, button, currency_rus, course, type);
                        page++;
                        $(document).find("button[data-id-container=" + id + "]").attr('data-number-page', page);
                    }
                });
            },
            error: function (e) {
                console.log("error = " + e);
            }
        });


    });


});

function tgtrimm(str) {
    var ars = str.replace(/[^a-zA-Z]/gi, '').replace(/\s+/gi, ', ');
    return ars;
}

//выбрали страну и выводим ГЛАВНЫЕ цели
function tamplate_main_services(id_services, name) {
    return ' <li data-ipv4-target="' + id_services + '" class="goal_before_add">' + name + ' </li>';
}

//выбрали страну и выводим КОНКРЕТНЫЕ цели
function tamplate_services(id_services, name) {
    return '<li class="remove_services" data-id_services="' + id_services + '">' + name + ' </li>';
}

function create_target_list(id_country) {
    // удаляем прошлые услуги
    $('.select_goal').text("");
    $('.click_goal').text("");
    $('.data-ipv4-sub-target').text('');

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

}

// Делаю не активными селекты выбора цели и конкретной услуги
$(document).ready(function () {
    setTimeout(function () {

        $('.data-ipv4-sub-target.select_services').css({
            'pointer-events': ' none',
            'background': 'rgba(235, 249, 241, 0.47)'
        });
    }, 300);
});

// Делаю активной селект выбора конкретной услуги

$(document).on("click", ".goal_before_add", function () {
    $('.data-ipv4-sub-target.select_services').css({'pointer-events': ' all', 'background': 'no-repeat'});
});

$(document).ready(function () {
    var term = $('.button_create_order').attr('data-month');
    $('.user_count_proxy_one').attr('data-month', term);
    $('#id_ipv6_fast_order_term').val(term);
});

$(document).on('click', '.country_proxy_ferst_table_xtz', function () {
    $(this).css({'display': 'none'});

    $('.sorry_for_this_xtz').each(function () {
        $('.sorry_for_this_xtz').css({'display': 'block'});
    });

});

/*для страниц со странами  подставляет в кнопку значение периода*/
$(document).on('click', '.period_before_add', function () {
    var term = $(this).attr('data-ipv4-term');


    $('#id_ipv6_fast_order_term').val(term);

    var text_term = $(this).text();

    $('button').attr('data-month', term);
    $('.user_count_proxy_one').attr('data-month', term);



    var quantyti = $(this).attr('data-quantity');
    var ipv = "IPv4";
    // var country_id = $(this).attr('data-country_id');
    var country_id =  $(document).find('.class_country_code1C').val();

    console.log(country_id);

    // var currency = $('#id_currency').val();
    var currency = $('#id_currency').val();

    // console.log('[][[][][[][]');
    // console.log(ipv);
    // console.log(term);
    // console.log(quantyti);
    // console.log(currency);
    // console.log(country_id);



    reload_prices_xtz_ipv4(ipv,country_id,term,quantyti,currency,text_term);
});

$(document).on('click', '.change_user_default_country_one', function () {
    var country_id = $(this).attr('data-country-id');
    $('.period_before_add').each(function () {
        $('.period_before_add').attr('data-country_id', country_id);
    });

});

$(document).on('click', '.change_price_xtz', function () {
    var country_name = $(this).text();
    console.log(country_name);
        var z =  $('.all_10_select_change_value').html();
        var ipv = 'IPv4';
        var country_id =  $(document).find('.period_before_add').attr('data-country_id');
        var quantyti = 1;
        var currency = $('#id_currency').val();

        $('.view_country_name_and_img').attr('data-id-country',country_id);
        $('.view_country_name_and_img').text(country_name);

        var term = '';
        if(z == '1 неделя'){
            term = 4;
        }else if(z == '2 недели'){
            term = 5;
        }else{
            term = 1;
        }

    reload_prices_xtz_ipv4(ipv,country_id,term,quantyti,currency,z);
});
$(document).on('keyup', '#id_strong_modal_form_count', function () {

    var period =  $('.select_period').text();
    var ipv = 'IPv4';
    var country_id =  $(document).find('#id_country_id').val();
    var quantyti = $(this).val();
    var currency =  $('#id_default_keeper_name_for_index_page').val();

    console.log(parseInt(quantyti) + ' quantyti');

    $('.view_country_name_and_img').attr('data-id-country',country_id);
    // $('.view_country_name_and_img').text(country_name);

    var term = '';
    if(period == '1 неделя'){
        term = 4;
    }else if(period == '2 недели'){
        term = 5;
    }else{
        term = 1;
    }

    GetPriceXtz(ipv,country_id,period,parseInt(quantyti),currency);
});
// modal ipv4 country
$(document).on('click', '.period_before_addd', function () {
    var period =  $(this).text();
    var ipv = 'IPv4';
    var country_id =  $(document).find('#id_country_id').val();

    var quantyti = $('input[name="count_ipv4"]').val();
    var currency =  $('#id_default_keeper_name_for_index_page').val();

    console.log(parseInt(quantyti) + ' quantyti');

    $('.view_country_name_and_img').attr('data-id-country',country_id);
    // $('.view_country_name_and_img').text(country_name);

    var term = '';
    if(period == '1 неделя'){
        term = 4;
    }else if(period == '2 недели'){
        term = 5;
    }else{
        term = 1;
    }

    GetPriceXtz(ipv,country_id,period,parseInt(quantyti),currency);
});
function GetPriceXtz(ipv, country_id, period, quantyti, currency){

    var country = $('#id_default_currency_rus_name_for_index_page').val();
    console.log(country_id)
    console.log(period)
    console.log(quantyti)
    console.log(currency)

    $.ajax({
        url: '/ipv6/get-price-xtz',
        type: 'POST',
        data: {ipv: ipv, country_id: country_id, period: String(period), quantyti: quantyti, currency: currency,},
        dataType: 'json',

        success: function (data) {



            if (data){
                console.log(data);

                if (data['default_price_for_one_moth'] != 'undefined'){
                    $('#id_original_sum_XTZ').val(data['default_price_for_one_moth'])
                }


                $('#id_one_ip_price_after_discount').text(data['price_for_one']);
                $('#sum').text(data['price']);

                $('input[name="total_price_xtz"]').val(data['price']);
                $('input[name="price_for_one_xtz"]').val(data['price_for_one']);
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

function reload_prices_xtz_ipv4(ipv,country_id,term,quantyti,currency,text_term){
    $.ajax({
        url: '/ipv6/get-prices-xtz',
        type: 'POST',
        data: {ipv: ipv, country_id: country_id, period: String(term), quantyti: quantyti, currency: currency,},
        dataType: 'json',
        success: function (data) {
            var i = 0;
            $(".proxy_price_txt_block").each(function (index) {
                i++;
                // Цена общая
                $('.prices_to_select_all_xtz_'+i).text(data['all_info']['price_all'][i] + ' ' + data['all_info']['currency']);
                $('.prices_to_select_all_xtz_'+i).attr('data-price-rub', data['all_info']['default_price'][i]);

                // console.log(data['all_info']['default_price'][i]);

                //цена за 1 шт.
                $('.prices_to_select_one_xtz_'+i).text(data['all_info']['price_for_one'][i] + ' ' + data['all_info']['currency'] + ' ' + '/1 IPv4');
                $('.prices_to_select_one_xtz_'+i).attr('data-price-rub', data['all_info']['default_price_for_one'][i]);


                if( i > 10){
                    return false;
                }

            });
        },
    });
    $('.all_10_select_change_value').each(function () {
        $('.all_10_select_change_value').text(text_term)
    });
};
