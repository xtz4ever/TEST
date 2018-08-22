/**
 * Created by Ivany on 13.02.2018.
 */
$(document).ready(function(){
    $(document).on('keyup', '#articles__search-input', function(){
        var search = $(this).val();
       console.log(search);

        $.ajax({
            method: 'POST',
            url: '/category/blog_live_search',
            data: {search:search},
            success: function(data){

                var content = '';
                var json = JSON.parse(data);
                for (var key in json) {
                    content +=  '<div class="articles__search-dropdown-item">' +
                            '<a href="/blog/'+json[key].url+'"> '+json[key].name+' </a>'+
                        '</div>'
                    //console.log(key, json[key])
                }

                if(json == ''){
                    content +=  '<div class="articles__search-dropdown-item">' +
                        '<a href="#" onclick="return false;"> Ничего не найдено!</a>'+
                        '</div>'
                }

                $(document).find('.articles__search-dropdown').html(content);

            },
            error: function(e){

                console.log('error '+e);

            }
        });

    });
});

$(document).on('click', '.articles_item_comment', function () {
    var article_id = $(this).attr('data-article_id');
    var count = $(this).children().text();



    $.ajax({
        url: '/category/like',
        type: 'post',

        data: {'article_id': article_id, _csrf: yii.getCsrfToken()},
        success: function (data) {

            var new_like = $('[data-article_id~='+article_id+']');
            new_like.find('span').text(data);


        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Handle errors here

            console.log('ERRORS: ' + textStatus);
        }
    });

});


$(document).on('click', '.configure_Safari_and_MAC_OS__date-comment-like-item.like', function () {
  var article_id = $(this).attr('data-article_id');
    $.ajax({
        url: '/category/like',
        type: 'post',

        data: {'article_id': article_id, _csrf: yii.getCsrfToken()},
        success: function (data) {


            var new_like = $('[data-article_id~='+article_id+']');
            new_like.find('p').text('Нравится: ' + data);
            // $('.configure_Safari_and_MAC_OS__date-comment-like-item.like').each(function () {
            //     $('.configure_Safari_and_MAC_OS__date-comment-like-item.like').css({'pointer-events':'none'})
            // });


        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Handle errors here

            console.log('ERRORS: ' + textStatus);
        }
    });

});

$(document).on('click','#save_comment',function (e) {
e.preventDefault();

    var name = $('#name').val();
    var email = $('#email').val();
    var comment = $('textarea[name="comment"]').val();
    var article_id = $('input[name="article_id"]').val();

    $.ajax({
        url: '/category/blog-comment',
        type: 'post',

        data: {'article_id': article_id,'name': name,'email': email,'comment': comment, _csrf: yii.getCsrfToken()},
        success: function (data) {
             console.log(data);

             if (data == 1){
                 $('#save_comment_form')[0].reset();
                 $('.pop-modal-comment').css('display','block');
             }



        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Handle errors here

            console.log('ERRORS: ' + textStatus);
        }
    });

})

