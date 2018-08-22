// $(document).on("keyup", 'input[name="name"]', function(){
//     $('#dedicatedserverorders-user_name').val($(this).val());
// });
// $(document).on("keyup", 'input[name="email"]', function(){
//     $('#dedicatedserverorders-user_email').val($(this).val());
// });
// $(document).on("keyup", 'input[name="telephone"]', function(){
//     $('#dedicatedserverorders-user_telephone').val($(this).val());
// });

$(document).on("click", ".term_xtz", function(){
    var data = $(this).data('term');
    $('input[name="term_for_dedicated_servers_item_int"]').val(data);
    var parent_price_for_month =  $('input[name="price_for_dedicated_servers_item_int"]').val();

    var option_for_dedicated_servers_item_int =  $('input[name="option_for_dedicated_servers_item_int"]').val();
        if(option_for_dedicated_servers_item_int == ''){
            option_for_dedicated_servers_item_int = 0;
        }
    var sum = (parseInt(parent_price_for_month) * parseInt(data)) + parseInt(option_for_dedicated_servers_item_int);


  $('#dedicatedserverorders-term_of_purchase').val(data)
    $('.total_xtz_sum').text(sum + ' руб.');
});


$(document).on("click", ".price_option_xtz", function(){
    var data = $(this).data('price_option');
    $('input[name="option_for_dedicated_servers_item_int"]').val(data);
    var parent_price_for_month =  $('input[name="price_for_dedicated_servers_item_int"]').val();

    var term_for_dedicated_servers_item_int =  $('input[name="term_for_dedicated_servers_item_int"]').val();

    var sum = (parseInt(parent_price_for_month) * parseInt(term_for_dedicated_servers_item_int)) + parseInt(data);


    $('#dedicatedserverorders-dedicated_upgrade_id').val($(this).data('option_id'));
    $('.total_xtz_sum').text(sum + ' руб.');


});



$(document).on("click", ".dedicated_xtz", function(){

    if($('input[name="name"]').val() == ''){
        $('input[name="name"]').focus();
        return false;
    }
    if($('input[name="email"]').val() == ''){
        $('input[name="email"]').focus();
        return false;
    }
    if($('input[name="telephone"]').val() == ''){
        $('input[name="telephone"]').focus();
        return false;
    }
    if($('input[name="services"]').val() == ''){
        $('.select.span').focus();
        return false;
    }

    $('#dedicatedserverorders-user_name').val($('input[name="name"]').val());
    $('#dedicatedserverorders-user_email').val($('input[name="email"]').val());
    $('#dedicatedserverorders-user_telephone').val($('input[name="telephone"]').val());
    $('.btn-success').trigger('click');
    return false;
});



$('.create_order_xtz').click(function (e) {
    e.preventDefault();
    var parent_id = $(this).data('parent_id');


    $('#dedicatedserverorders-parent_id').val(parent_id);



    var parent_price = $(this).data('parent_price');
    $('.price_for_dedicated_servers_item').text(parent_price + ' руб.');
    $('.total_xtz_sum').text(parent_price + ' руб.');
    $('input[name="price_for_dedicated_servers_item_int"]').val(parent_price); // Для дальнейшей математики

    $.ajax({
        url: '/dedicatedservers/get-update-options',
        type: 'POST',
        data: {parent_id: parent_id},
        dataType: 'json',

        success: function (data) {
            for (var i = 0; i < data['count']; i++) {
                $('.update_options').append('<li class="price_option_xtz" data-price_option="'+data['query'][i]['price']+'"data-option_id="'+data['query'][i]['id']+'">' + data['query'][i]['name'] + ' + ' + data['query'][i]['price'] + ' рублей / месяц. ' +'</li>')
            }
            mCustomScrollbarModal();
        },

        error: function (jqXHR, textStatus, errorThrown) {

            console.log('ERRORS: ' + textStatus);
        }
    });

});



