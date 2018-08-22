/**
 * Created by Ivany on 02.02.2018.
 */
$(document).ready(function () {

    $(document).on('click', '.renewal', function () {
        setTimeout(function(){
            main();
        },200);
    });

    $(document).on('click','.period_before_add', function(){
        var month = $(this).text();
        if (month == '1 неделя') {
            month = parseInt(4);
        } else if (month == '2 недели') {
            month = parseInt(5);
        } else {
            month = parseInt(month);
        }
        $('.data-ipv4-term-renewal').attr('data-ipv4-term', month);
        console.log('== ' + month)
        main();
    });

    $(document).on('click','.item_service', function(){
        var service = $(this).attr('data-service');
        var payment_name = $(this).text();
        $(document).find('#id_service').val(service);
        $(document).find('#id_payment_name').val(payment_name);
    });

    $(document).on('click', '#renewal_order', function(){
        console.log("renewal_order");
        renewalOrder();
    })

});

function main(){
    var ipv4 = 0;
    var ipv6 = 0;
    var priveipv4 = 0;
    var priveipv6 = 0;

    var id_list = '';

    $(document).find('.proxy_list_items').find('.proxy_list_item').each(function(i,elem) {
        id_list += $(this).attr('data-id')+',';
        if($(this).attr('data-order_type') == 'ipv4'){
            ipv4++;
            priveipv4  += parseInt($(this).attr('data-order_price'));
        }else{
            ipv6++;
            priveipv6  += parseInt($(this).attr('data-order_price'));
        }
    });
    $('#id_list').val(id_list);

    // var month = $(document).find(".data-ipv4-term-renewal").text();
    var month = $(document).find(".data-ipv4-term-renewal").text();
    console.log(month + ' ==');
    if (month == '1 неделя') {
        month = parseInt(4);
    } else if (month == '2 недели') {
        month = parseInt(5);
    } else {
        month = parseInt(month);
    }

    if(month > 0){
        if(ipv4 > 0){
            var result_for_ipv4 = calculatePriceAndSum(ipv4,priveipv4,month);
        }

        if(ipv6 > 0 ){
            var result_for_ipv6 = calculatePriceAndSumIpv6(ipv6,month);
        }
    }else{
        month = 4;
        if(ipv4 > 0){
            var result_for_ipv4 = calculatePriceAndSum(ipv4,priveipv4,month);
        }

        if(ipv6 > 0 ){
            var result_for_ipv6 = calculatePriceAndSumIpv6(ipv6,month);
        }

    }
    $('#id_term_renewal_month').val(month);

    // console.log("S U M  priveipv4 ==== "+priveipv4);
    // console.log("S U M  priveipv6 ==== "+priveipv6);

    var sum_original = 0;
    if ( month == 4){
        sum_original = (priveipv4 + priveipv6) * parseFloat(0.5);
    }else if(month == 5){
        sum_original = (priveipv4 + priveipv6) * parseFloat(0.75);
    }else {
        sum_original = (priveipv4 + priveipv6) * month;
    }
    $('#extend_proxy_wrap__price').text(sum_original);

    console.log("S U M  sum_original ==== "+sum_original);

    var sum_discount = 0;

    if(result_for_ipv4 || result_for_ipv6 ){
console.log(result_for_ipv4);

        if(result_for_ipv6 != 'undefined') {
            if (result_for_ipv6[1] > 0) {
                sum_discount = (Number(sum_discount) + Number(result_for_ipv6[1]));
            }
        }
        if(result_for_ipv4[1] > 0){
            sum_discount = (Number(sum_discount)  +  Number(result_for_ipv4[1]));
        }

        sum_discount = parseInt(sum_discount);

        console.log('sum_discount '  + sum_discount)


        $('#id_sum_for_discount').text(sum_discount);
        $('#extend_proxy_wrap__discount').text(result_for_ipv4[2]);
    }


    $('#id_term_renewal_month').val(month);


}

// ПОДСЧЕТ ЦЕНЫ И СУММЫ
function calculatePriceAndSum(count, price_county, month) {
   if (month == 4){
       month = parseFloat(0.5);
     var  x = price_county * month;
   }else if(month == 5){
       month = parseFloat(0.75);
      var x = price_county * month;
   }else{
       month = month;
       var x = price_county;
   }



    var count_ip = count;
    var discount_count = priceDiscountOneIp(count_ip);
    var discount = (discount_count + discountMonth(month));

    console.log("CALCULATE price_county === "+price_county);
    console.log("CALCULATE count_ip === "+count_ip);
    console.log("CALCULATE month === "+month);

    // Здесь не берем count потому что price_country считает сумму всех ип которые в блоке
    var one_ip_discount = (price_county  * month* discount) / 100;
    var one_ip_price_after_discount = ((price_county  * month) - one_ip_discount);
    one_ip_price_after_discount = one_ip_price_after_discount.toFixed(0);

    console.log("one_ip_discount IPV4== "+one_ip_discount);
    console.log("one_ip_price_after_discount IPV4 == "+one_ip_price_after_discount);

    $('#id_sum_for_discount').text(one_ip_price_after_discount);
    $('#extend_proxy_wrap__discount').text(discount);

    var result = [];
    result[0] = one_ip_discount;
    result[1] = one_ip_price_after_discount;
    result[2] = discount;
    return result;

}

function calculatePriceAndSumIpv6(count, month) {
    var count_ip = count;
    var price_one_ip = priceOneIpv6(count_ip);
    var month_discount = discountMonth(month);

    var one_ip_discount = (price_one_ip * count_ip * month* month_discount) / 100;
    var one_ip_price_after_discount = ((price_one_ip* count_ip*month) - one_ip_discount);

    one_ip_price_after_discount = one_ip_price_after_discount.toFixed(0);

    console.log("one_ip_discount IPV6 == "+one_ip_discount);
    console.log("one_ip_price_after_discount IPV6 == "+one_ip_price_after_discount);
    $('#id_sum_for_discount').text(one_ip_price_after_discount);
    $('#extend_proxy_wrap__discount').text(one_ip_discount);
    var result = [];
    result[0] = one_ip_discount;
    result[1] = one_ip_price_after_discount;
    return result;
}

function discountMonth(month) {
    switch (month) {
        case (1):
            return 0;
            break;
        case (4):
            return 0;
            break;
        case (5):
            return 0;
            break;
        case (0.5):
            return 0;
            break;
        case (0.75):
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

function priceDiscountOneIp(count) { // возвращает % скидки !
    var count_ip = parseInt(count);

    if (count_ip < 10) {
        return 0;
    } else if (count_ip >= 10 && count_ip < 25) {
        return 3;
    } else if (count_ip >= 25 && count_ip < 50) {
        return 5;
    }else if (count_ip >= 50 && count_ip < 100) {
        return 10;
    }else if (count_ip >= 100 && count_ip < 250) {
        return 15;
    }else if (count_ip >= 250 && count_ip < 500) {
        return 20;
    }else if (count_ip >= 500 && count_ip < 1000) {
        return 35;
    }else if (count_ip >= 1000) {
        return 40;
    }

}

function priceOneIpv6(count) { // возвращает цену за 1 Ип
    var count_ip = parseInt(count);

    if (count_ip < 50) {
        return 10;
    } else if (count_ip >= 50 && count_ip < 500) {
        return 7;
    } else if (count_ip >= 500 && count_ip < 2000) {
        return 5;
    }else if (count_ip >= 2000 && count_ip < 5000) {
        return 4;
    }else if (count_ip >= 5000  ) {
        return 3;
    }
}

function renewalOrder() {

    var month = parseInt($(document).find(".data-ipv4-term-renewal").text());
    var service = $(document).find('.payment_name ').attr('data-service');
    var payment_name = $(document).find('.payment_name ').text();
    var sum = $(document).find('#id_sum_for_discount').text();
    //  добавление красной раки вокруг пустого инпута

    if ( month < 1 || month == '' || isNaN(month) || !service ||  service == '' || payment_name == 'Способ оплаты:Способ оплаты:' ||  sum == 0 || isNaN(sum) ) {

        if (month < 1 || month == '' || isNaN(month)) {
            $(document).find(".data-ipv4-term-renewal").css({'border' : '1px solid #ff0000'});
        } else  {
            $(document).find(".data-ipv4-term-renewal").css({'border' : '1px solid #569b44'});
        }

        if ( !service ||  service == '' || payment_name == 'Способ оплаты:Способ оплаты:') {
            $(document).find(".payment_name").css({'border' : '1px solid #ff0000'});
        } else  {
            $(document).find(".payment_name").css({'border' : '1px solid #569b44'});
        }

        if ( !sum ||  sum == 0 || isNaN(sum)) {
        alert('Не удалось посчитать суму, заполните пожалуйста все поля');
        }
        console.log("createOrder false");
        return false;
    }

    var promo = $(document).find('.class_enter_promo').val();


    $('#id_promo').val(promo);
    $('#original_price').val(sum);
    console.log("createOrder setTimeout");
    setTimeout($('#id_form_renewal').submit(), 1000);
}

