$(document).on('click','.modal_xtz',function(e){
    e.preventDefault();

    var id = $(this).data('modal');
    var txt = $(this).data('info');
    // var title =  $(this).data('title'); // для изменения title в модалке
    $(".popup[data-modal=" + id + "]").toggle("fade", 200).find("form").css('display', 'block');
    $(".popup[data-modal=" + id + "] input[name=form_name]").val(txt);
    // $(".popup[data-modal="+id+"] h2").html(title); // прописать в ссылку data-title="нужный title"
    mCustomScrollbarModal();
});