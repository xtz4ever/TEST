/**
 * Created by Ivany on 22.09.2017.
 */

$(document).ready(function () {

    $('.period_xtz_li').each(function () {
        var term = $(this);
        if (term.text() == '1 неделя'){
            term.css({'display':'none'});
        }
        if (term.text() == '2 недели'){
            term.css({'display':'none'});
        }
    });


    // ставил курс дефолтной валюты относительно рубля
    var currency = $(document).find('#id_currency').val();
    var keeper_default = '';
    var currency_rus = '';
    switch (currency) {
        case 'UAH':
            keeper_default = 'wmu';
            currency_rus = 'UAH';
            break;
        case 'RUB':
            keeper_default = 'wmr';
            currency_rus = 'RUB';
            break;
        case 'USD':
            keeper_default = 'wmz';
            currency_rus = 'USD';
            break;
        case 'mBTC':
            keeper_default = 'wmx';
            currency_rus = 'mBTC';
            break;
        case 'KZT':
            keeper_default = 'kzt';
            currency_rus = 'KZT';
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


    // Показываем скрытый инпут для того чтобы пользователь ввел свою программу или сайт
    $(document).on('click','.remove_services',function(){
        if($(this).attr('data-id_services') == 12 ){ // 12 - номер услуги Другая программа/сайт  в базе данных
            $(document).find('.div_tab_my_other_program').attr('style','');
            $(document).find('.div_tab_my_other_program').show();
        }else{
            $(document).find('.div_tab_my_other_program').hide();
        }
    });

    $(document).on('click','.select_country, .goal_before_add',function(){
        $(document).find('.div_tab_my_other_program').hide();
    });
    // Открывает следующий селект
    $(document).on('click','.goal_before_add',function(){
        setTimeout(function () {
            $(document).find('.select_services').trigger('click');
        }, 500);
    });



    $(document).on('keyup', '#id_strong_modal_form_count', function () {
        var count = $("input[name='count_ipv6']").val();
        var month = parseInt($(document).find('#id_strong_modal_form_term').text());
        count = parseInt(count);
        console.log("count = " + count);
        console.log("month = " + month);

        calculatePriceAndSumIpv6ForModal(count, month)
    });

    $(document).on('click', '.period_before_add', function () {
        var count = $("input[name='count_ipv6']").val();
        var month = parseInt($(this).text());
        count = parseInt(count);
        console.log("count = " + count);
        console.log("month = " + month);

        calculatePriceAndSumIpv6ForModal(count, month)
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
        var currency_rus = '';
        switch (currency) {
            case 'UAH':
                keeper = 'wmu';
                currency_rus = 'UAH';
                break;
            case 'RUB':
                keeper = 'wmr';
                currency_rus = 'RUB';
                break;
            case 'USD':
                keeper = 'wmz';
                currency_rus = 'USD';
                break;
            case 'mBTC':
                keeper = 'wmx';
                currency_rus = 'mBTC';
                break;
            case 'KZT':
                keeper = 'kzt';
                currency_rus = 'KZT';
                break;
        }


        var page = $(this).attr('data-number-page');
        var id = $(this).attr('data-id-container');
        var type = $(this).attr('data-type');
        var button = $(this);


        $.ajax({
            url: '/currency/one_course',
            type: 'POST',
            data: {currency: keeper},
            success: function (course) {
                $.ajax({
                    url: "/ipv6/packagepagination?page=" + page + "&type=" + type,
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

    $(document).on('click', '.select_country', function (e) {
        e.preventDefault();
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

    $(document).on('click', '.remove_services', function () {
        var sub_target = $(this).attr('data-id_services');
        $(document).find('.class_sub_target_code1C').val(sub_target);
    });


    $(document).on('focusout', '.user_count_proxy', function () {
        console.log(parseInt(this.value));
        if(parseInt(this.value) < 5){
            this.value = '';
            // alert("Минимальный заказ 5 шт.");
            return false;
        }
    });
    //  автоматический подсчет цены  произвольного количества которое вводит юзер
    $(document).on('keyup', '.user_count_proxy', function () {

        if (this.value.match(/[^0-9]/g) || this.value == '' ) {
            this.value = this.value.replace(/[^0-9]/g, '');
            return false;
        }

        if(parseInt(this.value) < 5){
            this.value = '';
            $(this).find('.proxy_price').css({'visibility':'hidden'});
            $(this).find('.proxy_price2').css({'visibility':'hidden'});
            alert("Минимальный заказ 5 шт.");
          // $('.proxy_price').css({'visibility':'hidden'});
          // $('.proxy_price2').css({'visibility':'hidden'});
            return false;
        }

        var month = $(this).attr('data-month');
        var span_price_id = '';
        var span_summ_id = '';
        var course = '';
        var currency = '';
        var count_ip = $(this).val();

        if (count_ip === '') {
            count_ip = 1
        }
        switch (month) {
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
        $('#' + span_price_id).parent('.proxy_price').css("visibility", "visible");
        $('#' + span_summ_id).parent('.proxy_price2').css("visibility", "visible");
        var sum = calculatePriceAndSumIpv6(count_ip, month, span_summ_id);

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

        var sum_finished = (sum[0] * course);
        var price_finished = ((sum[0] / count_ip) * course);

        $(document).find('#' + span_summ_id).text(isIntSum(sum_finished, currency));
        $('#' + span_price_id).text(isIntSum(price_finished, currency));

    });

    // перенос данных с елемента в модалку при оформлении заказа пакетов которые добавляются с админки
    $(document).on('click', '.button_create_order', function () {
        var count = $(this).parents('.proxy_ipv6_item_inner').find('.proxy_pieces').attr('data-count');
        count = parseInt(count);
        var price = $(this).parents('.proxy_ipv6_item_inner').find('.proxy_price').attr('data-price');
        var original_sum = $(this).parents('.proxy_ipv6_item_inner').find('.proxy_price').attr('data-price');
        var month = parseInt($(this).attr('data-month'));
        if (month > 1) {
            var default_sum = parseInt($(this).parents('.proxy_ipv6_item_inner').find('.proxy_price_for_convert_course_type_two').text());
            var default_currency = $(this).parents('.proxy_ipv6_item_inner').find('.proxy_price_for_convert_course_type_two').text();
        } else {
            var default_sum = parseInt($(this).parents('.proxy_ipv6_item_inner').find('.proxy_price_for_convert_course_type_one').text());
            var default_currency = $(this).parents('.proxy_ipv6_item_inner').find('.proxy_price_for_convert_course_type_one').text();
        }
        default_currency = default_currency.replace(/\s+([^0-9])/g, '$1');
        default_currency = tgtrimm(default_currency);
        var default_price = (default_sum / count).toFixed(2);
        //var summ = calculatePriceAndSumIpv6(count, month, 'id_strong_modal_form_summ');
        var country = $(this).parents('.container').find('.user_select_country').find('.country_name').text();


        switch (month) {
            case(1):
                $(document).find('.data-ipv6-term').text('1 месяц');
                $(document).find('.data-ipv6-term').attr('data-ipv6-term', 0);
                break;
            case(2):
                $(document).find('.data-ipv6-term').text('2 месяца');
                $(document).find('.data-ipv6-term').attr('data-ipv6-term', 3);
                break;
            case(3):
                $(document).find('.data-ipv6-term').text('3 месяца');
                $(document).find('.data-ipv6-term').attr('data-ipv6-term', 5);
                break;
            case(6):
                $(document).find('.data-ipv6-term').text('6 месяцев');
                $(document).find('.data-ipv6-term').attr('data-ipv6-term', 7);
                break;
            case(9):
                $(document).find('.data-ipv6-term').text('9 месяцев');
                $(document).find('.data-ipv6-term').attr('data-ipv6-term', 9);
                break;
            case(12):
                $(document).find('.data-ipv6-term').text('12 месяцев');
                $(document).find('.data-ipv6-term').attr('data-ipv6-term', 12);
                break;
        }


        $(document).find('.inner_form').find('a.country').text(country); // передаем выбранную страну пользователем в форму и отображаем как выбранную
        $(document).find('.id_form_hidden_input_country').val(country);
        $(document).find('#id_default_sum').val(default_sum);
        $(document).find('#id_default_price').val(default_price);
        $(document).find('#id_default_currency').val(default_currency);


        console.log("IPV6 default_currency ----- "+default_currency);

        $(document).find('#id_original_sum').val(original_sum);
        //var summ = parseFloat(summ).toFixed(2);
        var summ = default_sum;

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

        $(document).find('#id_strong_modal_form_term').val(month);
        $(document).find('#id_strong_modal_form_count').val(count + ' шт.');
        $(document).find('#id_strong_modal_form_price').text(price);
        $(document).find('#id_strong_modal_form_summ').text(summ);


        $(document).find('.id_form_hidden_input_term').val(month);
        $(document).find('.id_form_hidden_input_price').val(price);
        $(document).find('.id_form_hidden_input_summ').val(summ);
        $(document).find('.id_form_hidden_input_count').val(count);
    });

    // перенос данных с елемента в модалку при оформлении заказа данных которые вводит пользователь
    $(document).on('click', '.button_create_order_enter_user', function () {

        var count = $(this).parents('.proxy_ipv6_item_inner').find('.user_count_proxy').val();
        var month = $(this).attr('data-month');
        var month_text = '';
        var course = '';
        var currency = '';
        var keeper = '';
        var original_sum = '';
        var default_sum = '';
        var default_currency = '';


        var span_price_id = '';
        var span_summ_id = '';

        switch (month) {
            case('1'):
                month_text = 'месяц';
                span_price_id = 'id_span_one_month_price';
                span_summ_id = 'id_span_one_month_summ';
                course = $(document).find('#id_span_one_month_price').attr('data-course');
                currency = $(document).find('#id_span_one_month_price').attr('data-currency');
                keeper = $(document).find('#id_span_one_month_price').attr('data-keeper');
                default_currency = $(this).parents('.proxy_ipv6_item_inner').find('#id_span_one_month_price_sum_text').text();
                break;
            case('2'):
                month_text = 'месяца';
                span_price_id = 'id_span_two_month_price';
                span_summ_id = 'id_span_two_month_summ';
                course = $(document).find('#id_span_two_month_price').attr('data-course');
                currency = $(document).find('#id_span_two_month_price').attr('data-currency');
                keeper = $(document).find('#id_span_two_month_price').attr('data-keeper');
                default_currency = $(this).parents('.proxy_ipv6_item_inner').find('#id_span_two_month_price_sum_text').text();
                break;
            case('3'):
                month_text = 'месяца';
                span_price_id = 'id_span_three_month_price';
                span_summ_id = 'id_span_three_month_summ';
                course = $(document).find('#id_span_three_month_price').attr('data-course');
                currency = $(document).find('#id_span_three_month_price').attr('data-currency');
                keeper = $(document).find('#id_span_three_month_price').attr('data-keeper');
                default_currency = $(this).parents('.proxy_ipv6_item_inner').find('#id_span_three_month_price_sum_text').text();
                break;
            case('6'):
                month_text = 'месяцев';
                span_price_id = 'id_span_six_month_price';
                span_summ_id = 'id_span_six_month_summ';
                course = $(document).find('#id_span_six_month_price').attr('data-course');
                currency = $(document).find('#id_span_six_month_price').attr('data-currency');
                keeper = $(document).find('#id_span_six_month_price').attr('data-keeper');
                default_currency = $(this).parents('.proxy_ipv6_item_inner').find('#id_span_six_month_price_sum_text').text();
                break;
            case('9'):
                month_text = 'месяцев';
                span_price_id = 'id_span_nine_month_price';
                span_summ_id = 'id_span_nine_month_summ';
                course = $(document).find('#id_span_nine_month_price').attr('data-course');
                currency = $(document).find('#id_span_nine_month_price').attr('data-currency');
                keeper = $(document).find('#id_span_nine_month_price').attr('data-keeper');
                default_currency = $(this).parents('.proxy_ipv6_item_inner').find('#id_span_nine_month_price_sum_text').text();
                break;
            case('12'):
                month_text = 'месяцев';
                span_price_id = 'id_span_twelve_month_price';
                span_summ_id = 'id_span_twelve_month_summ';
                course = $(document).find('#id_span_twelve_month_price').attr('data-course');
                currency = $(document).find('#id_span_twelve_month_price').attr('data-currency');
                keeper = $(document).find('#id_span_twelve_month_price').attr('data-keeper');
                default_currency = $(this).parents('.proxy_ipv6_item_inner').find('#id_span_twelve_month_price_sum_text').text();
                break;
        }

        default_sum = $(this).parents('.proxy_ipv6_item_inner').find('#' + span_summ_id).text();
        original_sum = $(this).parents('.proxy_ipv6_item_inner').find('#' + span_summ_id).attr('data-original-price');
        var default_price = (default_sum / count).toFixed(2);

        console.log(" original_sum == " + original_sum);
        console.log(" default_sum == " + default_sum);
        console.log(" default_currency == " + default_currency);
        console.log(" default_price == " + default_price);

        $(document).find('#id_default_sum').val(default_sum);
        $(document).find('#id_default_price').val(default_price);
        $(document).find('#id_default_currency').val(default_currency);
        $(document).find('#id_original_sum').val(original_sum);

        var price = $(this).parents('.proxy_ipv6_item_inner').find('#' + span_price_id).text();
        var summ = $(this).parents('.proxy_ipv6_item_inner').find('#' + span_summ_id).text();

        var country = $(this).parents('.container').find('.user_select_country').find('.country_name').text();

        $(document).find('.inner_form').find('a.country').text(country); // передаем выбранную страну пользователем в форму и отображаем как выбранную
        $(document).find('.id_form_hidden_input_country').val(country);

        summ = parseFloat(summ).toFixed(2);
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

        $(document).find('#id_strong_modal_form_term').text(' '+month +' '+month_text);
        $(document).find('#id_strong_modal_form_count').val(count + ' шт.');
        $(document).find('#id_strong_modal_form_price').text(price);
        $(document).find('#id_strong_modal_form_summ').text(summ);

        $(document).find('.id_form_hidden_input_term').val(month);
        $(document).find('.id_form_hidden_input_price').val(price);
        $(document).find('.id_form_hidden_input_summ').val(summ);
        $(document).find('.id_form_hidden_input_count').val(count);
        $(document).find('.id_form_hidden_input_currency').val(currency);
        $(document).find('.id_form_hidden_input_course').val(course);
        $(document).find('.id_form_hidden_input_keeper').val(keeper);

        console.log("IPV6 count == "+count);


    });

// передаем выбранную страну и платежную систему в скрытое поле
    $(document).on('click', '.finished_order', function () {
        var country = $(this).parents('.inner_form').find('a.country').text();
        $(document).find('.id_form_hidden_input_country').val(country);
        $(document).find('#id_ipv6_fast_order_label').val('Покупка IPv6');
        var service = $(this).parents('.inner_form').find('a.select_service').attr('data-service');
        $(document).find('.id_form_hidden_input_service').val(service);
    });


    $(document).on('click', '.change_default_currency_one', function () {


        //var currency = $(document).find('#id_currency').val();
        var currency =  $(this).text();
        // Прячем валюту из списка если она выбрана
        $('.change_default_currency_one').each(function() {
            $('.change_default_currency_one').css('display','block');
        });
        $(this).css('display','none');

        var keeper = '';
        var currency_rus = '';
        switch (currency) {
            case 'UAH':
                keeper = 'wmu';
                currency_rus = 'UAH';
                break;
            case 'RUB':
                keeper = 'wmr';
                currency_rus = 'RUB';
                break;
            case 'USD':
                keeper = 'wmz';
                currency_rus = 'USD';
                break;
            case 'mBTC':
                keeper = 'wmx';
                currency_rus = 'mBTC';
                break;
            case 'KZT':
                keeper = 'kzt';
                currency_rus = 'KZT';
                break;
        }


        $(document).find('#id_span_one_month_price_currency_text').text(currency_rus);
        $(document).find('#id_span_one_month_price_sum_text').text(currency_rus);

        courseCurrencyForOnePackage(keeper, currency_rus);
        setTimeout(function () {
            convertPriceAndSumProxyEnterUserOne();
        }, 300);

    });


    $(document).on('click', '.change_default_currency_two', function () {
        var currency = $(this).text();

        // Прячем валюту из списка если она выбрана
        $('.change_default_currency_two').each(function() {
            $('.change_default_currency_two').css('display','block');
        });
        $(this).css('display','none');

        var width=$(window).width();

if(width > 768 ){
    var active_data_tab = $(this).parents('.row').find('.active').attr('data-tab2');
}else{
    // для Моб телефона находим выбраный срок берем количество месяцев и показываем определённый таб
    var term =  parseInt($(this).parents('.row').find('.active_link_term').text());
    switch (term){
        case(2): active_data_tab =1; break;
        case(3): active_data_tab =2; break;
        case(6): active_data_tab =3; break;
        case(9): active_data_tab =4; break;
        case(12): active_data_tab =5; break;
        default: active_data_tab =1; break;
    }
}
        var keeper = '';
        var currency_rus = '';
        switch (currency) {
            case 'UAH':
                keeper = 'wmu';
                currency_rus = 'UAH';
                break;
            case 'RUB':
                keeper = 'wmr';
                currency_rus = 'RUB';
                break;
            case 'USD':
                keeper = 'wmz';
                currency_rus = 'USD';
                break;
            case 'mBTC':
                keeper = 'wmx';
                currency_rus = 'mBTC';
                break;
            case 'KZT':
                keeper = 'kzt';
                currency_rus = 'KZT';
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

        courseCurrencyForTwoPackage(keeper, currency_rus,active_data_tab);

        setTimeout(function () {
            convertPriceAndSumProxyEnterUserTwo();
        }, 300);

    });

});

function calculatePriceAndSumIpv6(count, month, id) {
    var count_ip = count;
    var price_one_ip = priceOneIpv6(count_ip);
    var month_discount = discountMonthIpv6(parseInt(month));

    console.log("month_discount == " + month_discount);
    console.log("count_ip == " + count_ip);
    console.log("price_one_ip == " + price_one_ip);
    console.log("month == " + month);
    var sum = sumDiscountIpv6(month_discount, count_ip, price_one_ip, month);

    var one_ip_discount = (price_one_ip * month_discount) / 100;
    var one_ip_price_after_discount = (price_one_ip - one_ip_discount);

    one_ip_price_after_discount = one_ip_price_after_discount.toFixed(2);

    return sum;
}

function sumDiscountIpv6(month_dis, count, price, month) {
    var count_ip = parseInt(count);
    var discount = parseInt(month_dis);
    var price_ip = parseInt(price);

    var sum = 0;
    var discount_summ = 0;
    discount_summ = ((count_ip * price_ip * month) * discount) / 100;
    sum = ((count_ip * price_ip * month) - discount_summ);

    var result = [];
    result[0] = parseFloat(sum).toFixed(2);
    result[1] = parseFloat(discount_summ).toFixed(2);
    return result;

}

function priceOneIpv6(count) { // возвращает цену за 1 Ип
    var count_ip = parseInt(count);

    if (count_ip < 50) {
        return 10;
    } else if (count_ip >= 50 && count_ip < 500) {
        return 7;
    } else if (count_ip >= 500 && count_ip < 2000) {
        return 5;
    } else if (count_ip >= 2000 && count_ip < 5000) {
        return 4;
    } else if (count_ip >= 5000) {
        return 3;
    }
}


function discountMonthIpv6(month) {
    switch (month) {
        case (1):
            return 0;
            break;
        case (2):
            return 3;
            break;
        case (3):
            return 5;
            break;
        case (6):
            return 7;
            break;
        case (9):
            return 9;
            break;
        case (12):
            return 12;
            break;
    }
}

function courseCurrency(type_currency, sum,overwrite,id_overwrite) {

    var sum_return = 1;

    $.ajax({
        url: '/currency/index',
        type: 'POST',
        data: {currency: type_currency, sum: sum},
        success: function (data) {
            var sum = parseFloat(data).toFixed(2);
            sum_return  =  sum;
            $(document).find('.id_form_hidden_input_summ').val(sum);

            console.log("success = " + sum);
            if(overwrite == true){
                $(document).find('#'+id_overwrite).text(isIntSum(sum,type_currency));
            }
        },
        error: function (e) {
            console.log("error = " + e);
        }
    });

    return sum_return;
}

//смена валюты во первом блоке
function courseCurrencyForOnePackage(keeper, currency_rus) {

    $.ajax({
        url: '/currency/one_course',
        type: 'POST',
        data: {currency: keeper},
        success: function (data) {
            $(document).find('#id_span_one_month_price').attr('data-course', data);
            $(".proxy_price_for_convert_course_type_one").each(function (index) {
                var original_price = $(this).attr('data-price');
                var course = data;
                var newSum = original_price * course;
                var currency = $(document).find('#id_span_one_month_price_sum_text').text();
                // если целое число то НЕ  ставим два знака после комы
                $(this).text(isIntSum(newSum, currency_rus) + ' ' + currency_rus + '');
            });

            $(".proxy_price_one_count_for_convert_course_type_one").each(function (index) {
                var original_price = $(this).attr('data-price');
                var count = $(this).attr('data-count');
                var course = data;
                var currency = $(document).find('#id_span_one_month_price_sum_text').text();
                var newSum = original_price * course;
                // если целое число то НЕ  ставим два знака после комы

                if (isInt(newSum / count)) {
                    $(this).text((newSum / count) + ' ' + currency_rus + '/ 1IPv6');
                } else {
                    if (currency == 'mBTC') {
                        $(this).text((newSum / count).toFixed(2) + ' ' + currency_rus + '/ 1IPv6');
                    } else {
                        $(this).text((newSum / count).toFixed(2) + ' ' + currency_rus + '/ 1IPv6');
                    }
                }

                //$(this).text(isIntSum(newSum / count, currency_rus) + ' ' + currency_rus + '/ 1IPv6');
            });

            console.log("success = " + data);
        },
        error: function (e) {
            console.log("error = " + e);
        }
    });
}

//смена валюты во втором блоке
function courseCurrencyForTwoPackage(keeper, currency_rus,active_data_tab) {

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
                    $(this).text((newSum / count) + ' ' + currency_rus + '/ 1IPv6');
                } else {
                    if (currency == 'mBTC') {
                        $(this).text((newSum / count).toFixed(2) + ' ' + currency_rus + '/ 1IPv6');
                    } else {
                        $(this).text((newSum / count).toFixed(2) + ' ' + currency_rus + '/ 1IPv6');
                    }
                }
            });

            var status = $(document).find('.list_month_items').find('[data-tab2 ='+active_data_tab+']').addClass('active');
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


    for (var key in jsonItem2) {
        console.log("Ключ: " + key + " значение: " + jsonItem2[key].id);
        content += '  <div class="margin_b col-lg-2 col-md-4 col-sm-4 col-xs-6">' +
            ' <div class="proxy_ipv6_item_inner">' +
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
            ' <div class="proxy_price_txt_block">' +

            '<p data-price="' + jsonItem2[key].price + '' + (type == 0 ? '"class="proxy_price proxy_price_for_convert_course_type_one">' : '" class="proxy_price proxy_price_for_convert_course_type_two">') + isIntSum(jsonItem2[key].price * course, currency_rus) + ' ' + currency_rus + '</p>' +
            '<p  data-count="' + jsonItem2[key].count + '" data-price="' + jsonItem2[key].price + ' ' + (type == 0 ? '"class="proxy_price proxy_price_one_count_for_convert_course_type_one">' : '" class="proxy_price proxy_price_one_count_for_convert_course_type_two">') + ((jsonItem2[key].price * course) / jsonItem2[key].count).toFixed(2) + ' ' + currency_rus + '/1 IPv6</p>' +

            '</div>' +
            '<div>' +
            '<button  data-modal="modal-order"  data-month="' + jsonItem2[key].term + '"  class="button_create_order main_btn modal" data-buy-id="' + jsonItem2[key].id + '">КУПИТЬ</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

    }
    content += '</div>';
    if (jsonArr != '') {
        $('#' + id).append(content);
    }


}

// пересчитывает сумму и цену количества которое вводит пользователь при смене валюты
function convertPriceAndSumProxyEnterUserOne() {
    var one_price = $(document).find('#id_span_one_month_price').attr('data-original-price');
    var sum = $(document).find('#id_span_one_month_summ').attr('data-original-price');

    one_price = (one_price * $(document).find('#id_span_one_month_price').attr('data-course'));
    sum = (sum * $(document).find('#id_span_one_month_price').attr('data-course'));
    var currency = $(document).find('#id_span_one_month_price_sum_text').text();


    // если целое число то НЕ  ставим два знака после комы
    $(document).find('#id_span_one_month_price').text(isIntSum(one_price, currency));
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

}

// пересчитывает сумму и цену количества которое вводит пользователь при смене валюты
function convertPriceAndSumProxyEnterUserTwo() {
    // ----------------------------- 2 ----------------------------------------------------------
    var one_price_two = $(document).find('#id_span_two_month_price').attr('data-original-price');
    var sum_two = $(document).find('#id_span_two_month_summ').attr('data-original-price');

    one_price_two = (one_price_two * $(document).find('#id_span_two_month_price').attr('data-course'));
    sum_two = (sum_two * $(document).find('#id_span_two_month_price').attr('data-course'));

    // если целое число то НЕ  ставим два знака после комы
    //var currency = $(document).find('#id_span_two_month_price_sum_text').text();
    //$(document).find('#id_span_two_month_price').text(isIntSum(one_price_two, currency));
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
    //var currency = $(document).find('#id_span_three_month_price_sum_text').text();
    //$(document).find('#id_span_three_month_price').text(isIntSum(one_price_three, currency));

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
    var currency = $(document).find('#id_span_six_month_price_sum_text').text();
    $(document).find('#id_span_six_month_price').text(isIntSum(one_price_six, currency));

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

function calculatePriceAndSumIpv6ForModal(count, month) {
    var count_ip = count;
    var price_one_ip = priceOneIpv6(count_ip);
    var month_discount = discountMonthIpv6(month);
    var sum = sumDiscountIpv6(month_discount, count_ip, price_one_ip, month);

    var one_ip_discount = (price_one_ip * month_discount) / 100;
    var one_ip_price_after_discount = (price_one_ip - one_ip_discount);

    one_ip_price_after_discount = one_ip_price_after_discount.toFixed(2);

    // Узнаем в какую валюту нужно конвертировать !!!
    var autorization_id = $(document).find('.authorization_method_btn ').find('.active').attr('data-tab');

    var payment_code = '';
    if (autorization_id == 1) {
        payment_code =  $(document).find('.select_service').attr("data-service");
    }
    if (autorization_id == 2) {
        payment_code =  $(document).find('.select_payment_tab_2').attr("data-service");
    }
    if(!payment_code) {
        payment_code =  localStorage.getItem('currency_name');
    }

    var write_sum = courseCurrency(payment_code,sum[0],true,'id_strong_modal_form_summ_tab_2') ;
    var write_price_name = (count_ip * price_one_ip * month);
    var write_discount = one_ip_discount;
    var write_discount_sum = sum[1];
    var write_one_ip_price_after_discount = courseCurrency(payment_code,one_ip_price_after_discount,true,'id_one_ip_price_after_discount_tab');



    //console.log("payment_code == " + payment_code);
    //console.log("write_sum == " + write_sum);
    //console.log("write_price_name == " + write_price_name);
    //console.log("write_discount == " + write_discount);
    //console.log("write_discount_sum == " + write_discount_sum);
    //console.log("write_one_ip_price_after_discount == " + write_one_ip_price_after_discount);


    $(document).find('#id_original_sum').val(sum[0]);// Сумма в рублях
}

// Делаю не активными селекты выбора цели и конкретной услуги
$(document).ready(function(){
    setTimeout(function () {
        $('#select_goal_xtz').css({'pointer-events':' none', 'background':'rgba(235, 249, 241, 0.47)'});
        $('.select_services').css({'pointer-events':' none', 'background':'rgba(235, 249, 241, 0.47)'});
    }, 300);
});
// Делаю активной селект выбора цели

$(document).on("click", ".select_country", function () {
    $('#select_goal_xtz').css({'pointer-events': ' all', 'background': 'no-repeat'});
    $('.select_country').each(function () {
        $('.select_country').css('display', 'block');
    });
    $(this).css('display', 'none');

});

// Делаю активной селект выбора конкретной услуги

$(document).on("click", ".goal_before_add", function () {
    $('.select_services').css({'pointer-events': ' all', 'background': 'no-repeat'});
});


// if($('.click_goal').find('*').length == 0){
//     $('#id_country_name').text('Выберите страну из списка');
// }

$(document).on('click', '.countries_xtz', function () {


    var country_id = $(this).attr('data-country-id');


    $('.countries_xtz').each(function () {
        $('.countries_xtz').css('display', 'block');
    });
    $(this).css('display', 'none');

    $('#orders-country_code1c').val(country_id);
    var ipv = 'IPv6';
    var period = $('.select_period').text();
    $('input[name="country_id"]').val(country_id);
    $('input[name="period"]').val(period);

    var quantyti = $('#id_strong_modal_form_count').val();

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

$(document).on('keyup', '#id_strong_modal_form_count', function () {

    var country_id = $('input[name="country_id"]').val();
    var ipv = 'IPv6';
    var period = $('input[name="period"]').val();
    var quantyti = $(this).val();
    console.log(country_id);
    console.log(ipv);
    console.log(period);
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





    GetPriceXtz(ipv, country_id, period, quantyti);
});


function GetPriceXtz(ipv, country_id, period, quantyti){
    var currency = $('#id_default_keeper_name_for_index_page').val();
    var country = $('#id_default_currency_rus_name_for_index_page').val();
    console.log(currency + ' currency ')
    console.log(country + ' country ')

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
                $('.total_price_xtz').html(data['price'] + ' '+ country + '.');
                $('.price_for_one_xtz').html(data['price_for_one'] + ' '+ country + '. шт.');

                $('#id_one_ip_price_after_discount_tab').text(data['price_for_one']);
                $('#id_strong_modal_form_summ_tab_2').text(data['price']);

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