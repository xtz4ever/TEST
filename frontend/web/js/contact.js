/**
 * Created by Ivany on 02.02.2018.
 */
$(document).ready(function () {
console.log('read');
    $(document).on('click', '#id_send_request', function () {
      var theme = $(document).find('.theme_request').text();
        $(document).find('#id_theme').val(theme);
    });


});