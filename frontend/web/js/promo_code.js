$(document).ready(function () {



    $(document).on('click', '.promo', function () {
        $("input[id='enter_promo']").change(function (e) {
            e.preventDefault();

            var page = $('input[name="page_name"]').val();


            if (page == 'index') {
                var promo = $("input[id='enter_promo']").val();
                $(document).find('.class_enter_user_promo_code').val(promo);
                var current_currency = $('.change_default_currency.active').text()
                var price = parseInt($('#price_name').text());
                var discount_for_the_period = $('#id_discount_percent').text();
            }
            if (page == 'ipv_6') {
                var promo = $("input[id='enter_promo']").val();
                var price_ipv_6 = parseInt($('#id_strong_modal_form_summ_tab_2').text());
                var price_for_one_ipv_6 = parseFloat($('#id_one_ip_price_after_discount_tab').text());

            }
            if (page == 'ipv_4') {
                var promo = $("input[id='enter_promo']").val();
                var price_for_one_ipv_4 = parseInt($('#id_one_ip_price_after_discount').text());
                var price_ipv_4 = parseFloat($('#sum').text());

            }
            if (page == 'control_panel') {
                var promo = $("#enter_promo").val();
                var price_control_panel = parseInt($('.price_before_discount').text());
                var discount_for_the_period_control_panel = parseInt($('.percent_discount').text());
            }


            $.ajax({
                url: '/index/get-promo',
                type: 'post',

                data: {'promo': promo, _csrf: yii.getCsrfToken()},
                success: function (data) {
                    // console.log(data);

                    if (page == 'index') {
                        // Конечная Цена для клиента
                        var new_price = price - (price / 100) * (parseInt(data) + parseInt(discount_for_the_period));
                        $('#sum').text(Math.round(new_price).toFixed(0) + current_currency);

                        // Скидка суммируется
                        var general_discount = parseInt(discount_for_the_period) + parseInt(data);
                        $('#id_discount_percent').text(general_discount);

                        var discount_amount = (price / 100) * general_discount;
                        $('#id_discount_sum').text(discount_amount + current_currency);

                        // Цена за 1 шт.
                        var quantity = parseInt($('#quantity_name').text());
                        var price_for_one = (new_price / quantity);
                        $('#id_one_ip_price_after_discount').text(Math.round(price_for_one).toFixed(2) + current_currency + '/шт.');
                    }
                    if (page == 'ipv_6') {

                        var new_price_for_one = (price_for_one_ipv_6 - (price_for_one_ipv_6 / 100) * data);
                        var new_price = (price_ipv_6 - (price_ipv_6 / 100) * data);

                        $('#id_one_ip_price_after_discount_tab').text(new_price_for_one);
                        $('#id_strong_modal_form_summ_tab_2').text(new_price);

                    }
                    if (page == 'ipv_4') {

                        var new_price_for_one = (price_for_one_ipv_4 - (price_for_one_ipv_4 / 100) * data);
                        var new_price = (price_ipv_4 - (price_ipv_4 / 100) * data);

                        $('#id_one_ip_price_after_discount').text(new_price_for_one);
                        $('#sum').text(new_price);

                        $('.class_enter_user_promo_code').val(promo);
                    }
                    if (page == 'control_panel') {

                        // новая цена
                        var new_price = price_control_panel - (price_control_panel / 100) * (parseInt(data) + parseInt(discount_for_the_period_control_panel));
                        $('.price_after_discount').text(new_price);
                        // новый процент
                        var new_percent = parseInt(data) + parseInt(discount_for_the_period_control_panel);
                        $('.percent_discount').text(new_percent);


                    }


                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // Handle errors here

                    console.log('ERRORS: ' + textStatus);
                }
            });

        });
    });

//Продлить прокси в экшине control-panel сука там блядь два одинаковых ID было
    $(document).on('click', '.promo', function () {
        $('input[id="enter_promo_extend"]').change(function (e) {
            e.preventDefault();

            var promo = $("#enter_promo_extend").val();
            $('#id_promo_extend').val(promo);

            var discount = parseInt($('#extend_proxy_wrap__discount').text());
            var price = parseInt($('#extend_proxy_wrap__price').text());


            $.ajax({
                url: '/index/get-promo',
                type: 'post',

                data: {'promo': promo, _csrf: yii.getCsrfToken()},
                success: function (data) {
                    console.log(data);



                    // новая цена
                    var new_price = price - (price / 100) * (parseInt(data) + parseInt(discount));
                    $('#id_sum_for_discount').text(new_price);
                    // новый процент
                    var new_percent = parseInt(data) + discount;
                    $('#extend_proxy_wrap__discount').text(new_percent);





                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // Handle errors here

                    console.log('ERRORS: ' + textStatus);
                }
            });

        });
    });
});