/**
 * Created by Ivany on 25.01.2018.
 */


$(document).ready(function () {

    // Делаю не активными селекты выбора цели и конкретной услуги
    setTimeout(function () {
        $('.select_goal').css({'pointer-events': ' none', 'background': 'rgba(235, 249, 241, 0.47)'});
        $('.sub_target').css({'pointer-events': ' none', 'background': 'rgba(235, 249, 241, 0.47)'});
    }, 300);

    // Делаю активной селект выбора цели
    $(document).on("click", ".select_country", function () {
        $('.select_goal').css({'pointer-events': ' all', 'background': 'no-repeat'});
    });

    // Делаю активной селект выбора конкретной услуги
    $(document).on("click", ".goal_before_add", function () {
        $('.sub_target').css({'pointer-events': ' all', 'background': 'no-repeat'});
    });

    // Показываем скрытый инпут для того чтобы пользователь ввел свою программу или сайт
    $(document).on('click', '.remove_services', function () {
        if ($(this).attr('data-id_services') == 12) { // 12 - номер услуги Другая программа/сайт  в базе данных
            $(document).find('.extend_proxy_hidden').addClass('active');
            //$(document).find('.div_tab_my_other_program').attr('style','');
            //$(document).find('.div_tab_my_other_program').show();
        } else {
            $(document).find('.extend_proxy_hidden').removeClass('active');
            //$(document).find('.div_tab_my_other_program').hide();
        }

        var id_sub_service = $(this).attr('data-id_services');
        var text_sub_service = $(this).text();

        $(document).find('.class_sub_target_code1C').val(id_sub_service);
        $(document).find('.class_sub_target').val(text_sub_service);

    });

    $(document).on('click', '.select_country, .goal_before_add', function () {
        $(document).find('.div_tab_my_other_program').hide();
    });

// определяем по сколько записей выводить на странице
    $(document).on('click', '.cp', function () {
        var url = '';
        var pc = parseInt($(this).text());
        if ($_GET('pc')) {
            var url = location.href.replace('pc=' + $_GET('pc'), 'pc=' + pc);
            //var url = location.href+'&pc='+pc;
        } else {
            var url = location.href + '?pc=' + pc;
        }
        window.location.href = url;

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
        var id_country = $(this).attr("data-country-id");
        var text_country = $(this).text();
        var country_price = $(this).attr("data-id_country");
        $(document).find('.class_country_id').val(text_country);
        $(document).find('.class_1C_country_id').val(id_country);
        $(document).find('.class_country_price').val(country_price);
        create_target_list(id_country);

        var month_discount = $(document).find('.data-ipv4-term').attr('data-ipv4-term');
        var count = $(document).find('.click_quantity').val();
        var price_country = $(document).find('.class_country_price').val();
        var month = parseInt($(document).find('.data-ipv4-term').text());

        var currency_default = $(document).find('.one_ip_price_after_discount_currency_rus').text();
        var service = convertCurrencyKeeper(currency_default);

        month_discount = parseInt(month_discount);
        count = parseInt(count);
        price_country = parseInt(price_country);

        if (!isNaN(month_discount) && !isNaN(count) && !isNaN(price_country)) {
            calculatePriceAndSumService(month_discount, count, price_country, month, service);
        }


    });

    // Формируем список ДОЧЕРНИХ КЛАССОВ в зависимости от выбраной главной цели
    $('.click_goal').on('click', 'li', function () {

        // берем id прокси из скрытого поля
        var parent_id = $(this).attr('data-ipv4-target');
        // берем id страны
        var id_country = $(document).find('.class_1C_country_id').val();

        // Узнаем ид сервиса, цели, и записываем в скрытое поле
        var target_text = $(this).text();
        $('.data-ipv4-sub-target').text('');

        $(document).find('.class_target_code1C').val(parent_id);
        $(document).find('.class_target').val(target_text);

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
                $('.sub_target').text('Выберите конкретную услугу');
                for (var key in htmlData) {
                    $('.services_add').append(tamplate_services(htmlData[key].id, htmlData[key].name));
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('ERRORS: ' + textStatus);
            }
        });
    });

// передаем выбранную страну и платежную систему в скрытое поле
    $(document).on('click', '.finished_order', function () {
        var country = $(this).parents('.inner_form').find('a.country').text();
        $(document).find('.id_form_hidden_input_country').val(country);

        var service = $(this).parents('.inner_form').find('a.select_service').attr('data-service');
        $(document).find('.id_form_hidden_input_service').val(service);
    });

    // подсчет стоимости от вводимого пользователем количества
    $(document).on('keyup', '.click_quantity', function () {

        var month_discount = $(document).find('.data-ipv4-term').attr('data-ipv4-term');
        var count = $(this).val();
        var price_country = $(document).find('.class_country_price').val();
        var month = $(document).find('.data-ipv4-term').text();
        if (month == '1 неделя') {
            month = parseInt(4);
        } else if (month == '2 недели') {
            month = parseInt(5);
        } else {
            month = parseInt(month);
        }

        var currency_default = $(document).find('.one_ip_price_after_discount_currency_rus').text();
        var service = convertCurrencyKeeper(currency_default);

        month_discount = parseInt(month_discount);
        count = parseInt(count);
        price_country = parseInt(price_country);

        if (!isNaN(month_discount) && !isNaN(count) && !isNaN(price_country)) {
            calculatePriceAndSumService(month_discount, count, price_country, month, service);
        }
    });

    $(document).on('click', '.period_before_add', function () {

        var month_discount = $(document).find('.data-ipv4-term').attr('data-ipv4-term');
        var count = $(document).find('.click_quantity').val();
        var price_country = $(document).find('.class_country_price').val();
        var month = $(this).text();

        if (month == '1 неделя') {
            month = parseInt(4);
        } else if (month == '2 недели') {
            month = parseInt(5);
        } else {
            month = parseInt(month);
        }

        if (month == '1 неделя'){
            $('#id_term_renewal_month').val(4);
        }else if(month == '2 недели'){
            $('#id_term_renewal_month').val(5);
        }


        var currency_default = $(document).find('.one_ip_price_after_discount_currency_rus').text();
        var service = convertCurrencyKeeper(currency_default);

        month_discount = parseInt(month_discount);
        count = parseInt(count);
        price_country = parseInt(price_country);

        if (!isNaN(month_discount) && !isNaN(count) && !isNaN(price_country)) {
            calculatePriceAndSumService(month_discount, count, price_country, month, service);
        }
    });

    // Выбор платежки
    $(document).on('click', '.item_service', function () {
        var service = $(this).attr('data-service');

        var count = $("input[name='count_ipv4']").val();
        var month_discount = $(document).find('.data-ipv4-term').attr('data-ipv4-term');
        var price_country = $(document).find('.class_country_price').val();
        var month = $(document).find('.data-ipv4-term').text();

        if (month == '1 неделя') {
            month = parseInt(4);
        } else if (month == '2 недели') {
            month = parseInt(5);
        } else {
            month = parseInt(month);
        }

        // Записываем валюту выбраной платежки
        switch (service) {
            case 'WMK':
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
            case 'Privat24':
                var currency_rus = 'UAH';
                break;
            case 'QIWI':
                var currency_rus = 'RUB';
                break;
            case 'WME':
                var currency_rus = 'EUR';
                break;
            case "YM-CART":
                var currency_rus = 'RUB';
                break;
            case "WMR-SB":
                var currency_rus = 'RUB';
                break;
            case "WMR-AB":
                var currency_rus = 'RUB';
                break;
            case "WMR-RS":
                var currency_rus = 'RUB';
                break;
            case 'MWK':
                var currency_rus = 'KZT';
                break;
            case 'INTER-VISA':
                var currency_rus = 'UAH';
                break;
            case 'INTER-MASTER':
                var currency_rus = 'UAH';
                break;
            case 'WMR-MTC':
                var currency_rus = 'RUB';
                break;
            case 'PAYPAL':
                var currency_rus = 'RUB';
                break;
            case 'WMR-BEELINE':
                var currency_rus = 'RUB';
                break;
            case 'PERFECT-USD':
                var currency_rus = 'USD';
                break;
            case 'PERFECT-EUR':
                var currency_rus = 'EUR';
                break;
            case 'SKRILL':
                var currency_rus = 'USD';
                break;
            case 'SKRILL-VISA':
                var currency_rus = 'USD';
                break;
            case 'SKRILL-MASTER':
                var currency_rus = 'USD';
                break;
        }

        $(document).find('.one_ip_price_after_discount_currency_rus').text(currency_rus);
        $(document).find('.sum_currency_rus').text(currency_rus);

        month_discount = parseInt(month_discount);
        count = parseInt(count);
        price_country = parseInt(price_country);
        if (!isNaN(month_discount) && !isNaN(count) && !isNaN(price_country)) {
            calculatePriceAndSumService(month_discount, count, price_country, month, service, true);
        }


    });

    $(document).on('click', '#id_create_order', function () {
        createOrder();
    });
});

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
            $('.' + id).text(sum);
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
    //$('.data-ipv4-sub-target').text('');
    //$('.sub_target').text('');

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
                $('.select_goal').text("Выберите цель использования");
            }
        },
        error: function (e) {
            console.log('ERRORS: ' + e);
        }
    });

}

function convertCurrencyKeeper(keeper) {
    var currency_name = '';
    switch (keeper) {
        case "UAH" :
            currency_name = 'WMU';
            break;
        case "RUB" :
            currency_name = 'WMR';
            break;
        case "USD" :
            currency_name = 'WMZ';
            break;
        case "KZT" :
            currency_name = 'KZT';
            break;
        case "mBTC" :
            currency_name = 'WMX';
            break;
        case "EUR" :
            currency_name = 'WME';
            break;
        default:
            currency_name = 'USD';
            break;
    }

    return currency_name;

}

function calculatePriceAndSumService(month_discount, count, price_county, month, service, change_pay) {
    var count_ip = count;
    var discount_count = priceDiscountOneIp(count_ip);
    var discount = (discount_count + month_discount);

    var sum = sumDiscountIp(month, count_ip, price_county, discount_count);

    $(document).find('#sum').text('');
    $(document).find('#id_discount_sum').text('');
    $(document).find('#id_discount_percent').text('');
    $(document).find('#price_name').text('');

    var one_ip_discount = (price_county * discount) / 100;
    var one_ip_price_after_discount = (price_county - one_ip_discount);
    one_ip_price_after_discount = one_ip_price_after_discount.toFixed(2);

    console.log('discount == ' + discount);
    console.log('sum[0] == ' + sum[0]);
    console.log('sum[1] == ' + sum[1]);
    console.log('service == ' + service);

    $(document).find('.price_before_discount').text(sum[0]);
    $(document).find('.price_after_discount').text(sum[1]);
    $(document).find('.percent_discount').text(discount);

    if (change_pay == true) {
        /* 1 */
        courseCurrencyIpv4(service, sum[0], 'price_before_discount');
        /* 2 */
        courseCurrencyIpv4(service, sum[1], 'price_after_discount');
    }


}

function sumDiscountIp(month, count, price_county, discount_count_ip) {
    var count_ip = parseInt(count);
    var month_block = parseInt(month);
    //var price_ip = parseInt(price);

    if (month_block == 4){
        month_block = 0.50;
    }else if(month_block == 5){
        month_block = 0.75;
    }else{
        month_block = month_block;
    }

    var discount = 0;
    var summ = 1;
    var discount_summ = 0;

    switch (month_block) {
        case (1):
            discount = 0;
            break;
        case (4):
            discount = 0;
            break;
        case (5):
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
            discount = 10;
            break;
        case (12):
            discount = 12;
            break;
    }


    console.log("MODAL  discount == " + discount);
    console.log("MODAL  count_ip == " + count_ip);
    console.log("MODAL  price_county == " + price_county);
    console.log("MODAL  month_block == " + month_block);
    console.log("MODAL  discount_count_ip == " + discount_count_ip);
    console.log("MODAL  month == " + month);

    discount_summ = (((price_county * count_ip * month_block) * (discount + discount_count_ip)) / 100);
    var sum_not_discount = (price_county * count_ip * month_block);
    summ = ((price_county * count_ip * month_block) - discount_summ);

    discount_summ = isIntSum(discount_summ);
    summ = isIntSum(summ);

    var sum = [];
    sum[0] = sum_not_discount;
    sum[1] = summ;
    sum[2] = discount_summ;
    return sum;

}

function priceDiscountOneIp(count) { // возвращает % скидки !
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

function createOrder() {

    var enter_promo = $(document).find('.class_enter_promo').val();
    var term = $(document).find('.data-ipv4-term').text();

    if (term == '1 неделя') {
        term = parseInt(4);
    } else if (term == '2 недели') {
        term = parseInt(5);
    } else {
        term = parseInt(term);
    }


    var count = parseInt($(document).find('.click_quantity').val());
    var payment_name = $(document).find('.payment_name').text();
    var service = $(document).find('#id_payment_service_name').attr('data-service');
    var sum = parseInt($(document).find(".price_after_discount").text());
    var other_sub_target_1C = $(document).find('.click_my_other_program').val();

    console.log("other_sub_target_1C == " + other_sub_target_1C);

    //  добавление красной раки вокруг пустого инпута
    if (payment_name == '' || payment_name == 'Способ оплаты:' || service == '' || term == '' || count == '' || sum < 1) {

        //if (localStorage.getItem('id_proxy') && localStorage.getItem('id_proxy') == 2 && count == '') {
        //    $("input[name='count_ipv6']").addClass('error');
        //} else if (count == '') {
        //    $("input[name='count_ipv4']").addClass('error');
        //}

        return false;
    }

    console.log("service2 == " + service);

    $(document).find('.class_term').val(term);
    $(document).find('.class_count').val(count);
    $(document).find('.class_service').val(service);
    $(document).find('.class_payment_name').val(payment_name);
    $(document).find('.class_sum').val(sum);
    $(document).find('.class_promo').val(enter_promo);
    $(document).find('.class_other_sub_target_1C').val(other_sub_target_1C);

    // Отправка цели google
    //ga('send', 'event','knopka','ipv4');
    //ga('send', 'event','knopka','pokupka_ipv4');
    // Отправка цели яндекс метрики
    //yaCounter27024561.reachGoal('by_proxy');

    setTimeout($('#id_form_create_order').submit(), 1000);
}


function $_GET(key) {
    var s = window.location.search;
    s = s.match(new RegExp(key + '=([^&=]+)'));
    return s ? s[1] : false;
}