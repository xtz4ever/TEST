$(document).ready(function () {
    $(document).on('click', '.change_location_for_inspection_ipv6', function () {
        window.open("http://ipv6-test.com/validate.php", '_blank');
    });
    var currency_name = $(document).find('#id_default_currency_rus_name_for_index_page').val();
    var keeper = $(document).find('#id_default_keeper_name_for_index_page').val();
    RewritePriceAndCurrencyName(currency_name, keeper);
    $(document).on('click', '.change_default_currency', function () {
        var currency_name = $(this).text();
        RewritePriceAndCurrencyName(currency_name, convertNameCurrency(currency_name));
        setTimeout(function () {
            RewriteSumAfterChangeDefaultCurrency();
        }, 200);
    })
});
function oneCourseCurrency(type_currency) {
    var course = 0;
    if (type_currency == '') {
        localStorage.setItem('currency_name', 'WMZ');
    } else {
        localStorage.setItem('currency_name', type_currency);
    }
    $.ajax({
        url: '/currency/one_course', type: 'POST', data: {currency: type_currency}, success: function (data) {
            localStorage.setItem('one_course_currency_default', data);
        }, error: function (e) {
            console.log("error = " + e);
        }
    });
}
function convertNameCurrency(currency_rus) {
    var keeper = '';
    switch (currency_rus) {
        case"UAH":
            keeper = 'WMU';
            break;
        case"RUB":
            keeper = 'WMR';
            break;
        case"USD":
            keeper = 'WMZ';
            break;
        case"KZT":
            keeper = 'KZT';
            break;
        case"mBTC":
            keeper = 'WMX';
            break;
        default:
            keeper = 'WMX';
            break;
    }
    return keeper;
}
function RewritePriceAndCurrencyName(currency_name, keeper) {
    console.log("RewritePriceAndCurrencyName");
    $.each($(".currency_rus"), function () {
        $(this).text(" " + currency_name);
    });
    console.log('oneCourseCurrency(keeper) == ' + keeper);
    var one_course = oneCourseCurrency(keeper);
    setTimeout(function () {
        $.each($(".default_price"), function () {
            var sum = parseInt($(this).attr('data-original-price'));
            var new_sum = (sum * localStorage.getItem('one_course_currency_default'));
            if (new_sum)$(this).text(new_sum.toFixed(0) + ' ' + currency_name + '/ мес.');
        });
    }, 200);
}
function RewriteSumAfterChangeDefaultCurrency() {
    if (localStorage.getItem('id_proxy') && localStorage.getItem('id_proxy') == 2) {
        console.log("localStorage.getItem('id_proxy') == 2");
        var month_discount = $(document).find('.data-ipv6-term').attr('data-ipv4-term');
        var count = $("input[name='count_ipv6']").val();
        var month = parseInt($(document).find('.data-ipv6-term').text());
        month_discount = parseInt(month_discount);
        count = parseInt(count);
        calculatePriceAndSumIpv6(month_discount, count, month)
    } else {
        console.log("localStorage.getItem('id_proxy') ==  1");
        var month_discount = $(document).find('.data-ipv4-term').attr('data-ipv4-term');
        var count = $("input[name='count_ipv4']").val();
        var price_country = $(document).find('.data-ipv4-id-country').find('span[style*="display: inline"]').attr('data-id_country');
        var month = parseInt($(document).find('.data-ipv4-term').text());
        month_discount = parseInt(month_discount);
        count = parseInt(count);
        price_country = parseInt(price_country);
        calculatePriceAndSum(month_discount, count, price_country, month);
    }
}