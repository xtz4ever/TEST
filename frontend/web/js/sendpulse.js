$(document).ready(function(){

    $(document).on('click','.btn_delete_book',function(){
        var id = this.id;
        var bookId = id.split('-')[1];
        removeBook(bookId);
    });

    $(document).on('click','.btn_info_book',function(){
        var id = this.id;
        var bookId = id.split('-')[1];
        infoBook(bookId);
    });

    $(document).on('click','.btn_view_emails_book',function(){
        var id = this.id;
        var bookId = id.split('-')[1];
        emailsFromBook(bookId);
    });

    $(document).on('click','.btn_add_email_book', function(){
        var id = this.id;
        var bookId = id.split('-')[1];

        $("#hiddenIdBook").attr('value',bookId);
    });

    $(document).on('click','.btn_info_email', function(){
        var data_info_email = $(this).attr('data-info-email');
        var info_email = data_info_email.split('-')[1];
        var bookId = $(this).attr('data-book-id');

        infoEmail(bookId,info_email);
    });

    $('#addNewBookButon').click(function(){
        var bookName = $('#namenewbook').val();
        addBook(bookName);
    });

    $(document).on('click','.addNewEmailButton', function(){
        var email = $('#addNewEmail').val();
        var nickname = $('#addNewNickname').val();
        var bookId = $('#hiddenIdBook').val();

        var data = [];
                    data.push({
                            email : email,
                            variables: {
                                Ник : nickname
                            }
                   });
        addEmailToBook(bookId,data);
    });

    $(document).on('click','.btn_delete_email', function(){
        var bookId = $(this).attr('data-book-id');
        var email = $(this).attr('data-info-email').split('-')[1];
        var emails = [];
            emails.push(email);
        console.log('book Id = '+bookId);
        console.log('email = '+email);

        deleteEmail(bookId,emails);
    });

    $(document).on('click','.btn_rename_book', function(){
        var bookId = this.id.split("-")[1];
        $("#nameRenameBookId").attr('value',bookId);
    });

    $('#addRenameBookButon').click(function(){
        var bookId = $('#nameRenameBookId').attr('value');
        var newName = $('#nameRenameBook').attr('value');

        console.log('Book id = '+ bookId);
        console.log('Book new name = '+ newName);

        renameBook(bookId,newName);
    });

});


function removeBook(bookId){
    $.ajax({
        url: '/sendpulse/removeBook',
        type: "POST",
        data: {id:bookId},
        success: function(){
            alert("Книга Удалена");
            window.location.reload();
        },
        error: function(e){
            console.log(e);
        }
    })
}

function infoBook(bookId){
    $.ajax({
        url: '/sendpulse/infoBook',
        type: "POST",
        data: {id:bookId},
        success: function(data){
            alert(data);
        },
        error: function(e){
            console.log(e);
        }
    })
}

function emailsFromBook(bookId){
    $.ajax({
        url: '/sendpulse/EmailsFromBook',
        type: "POST",
        data: {id:bookId},
        success: function(data){
           createListEmails(data,bookId);
        },
        error: function(e){
            console.log(e);
        }
    })
}

function addBook(bookName){
    $.ajax({
        url: '/sendpulse/addBook',
        type: "POST",
        data: {name:bookName},
        success: function(){
            alert("Книга добавлена");
            window.location.reload();
        },
        error: function(e){
            console.log(e);
        }
    })
}

function addEmailToBook(bookId,data){
    $.ajax({
        url: '/sendpulse/addEmailToBook',
        type: "POST",
        data: {bookId:bookId, data:data},
        success: function(data){
            console.log(data);
            //window.location.reload();
        },
        error: function(e){
            console.log(e);
        }
    })
}

function createListEmails(data,bookId){
    var emailsList = JSON.parse(data);
    var i;
    var content =  '';

    for (i = 0; i < emailsList.length; i++) {
        var variables = '';
        var variablesList =  emailsList[i].variables;
            if(emailsList[i].variables){
                variables += "name: "+ emailsList[i].variables.Ник +"<br>";
            }else{
                variables += 'No variables!';
            }
        content +='<button class="btn_info_email" data-book-id="'+bookId+'" data-info-email="btn_info_email-'+emailsList[i].email+'">Info</button>' +
                ' <button class="btn_delete_email" data-book-id="'+bookId+'" data-info-email="btn_delete_email-'+emailsList[i].email+'">Delete</button>'+
                '<br>'+
                ' email: '+emailsList[i].email + '<br>'+
                ' phone: '+ (emailsList[i].phone.length = 0 ? emailsList[i].phone.length  :"Нет") + '<br>'+
                ' status: ' + emailsList[i].status + '<br>'+
                ' status_explain: ' + emailsList[i].status_explain + '<br>'+
                ' variables: ' + variables + '<br>'+
                ' ------------------------------------------------------------ <br>';
   }

    $('#list_emails-'+bookId).empty();
    $('#list_emails-'+bookId).append(content);
}

function infoEmail (bookId, email){
    $.ajax({
        url: '/sendpulse/infoEmail',
        type: "POST",
        data: {bookId:bookId,email:email},
        success: function(data){
            alert(data);
        },
        error: function(e){
            console.log(e);
        }
    })
}

function deleteEmail(bookId, email){

    $.ajax({
       url: '/sendpulse/deleteEmail',
       type: 'POST',
       data: {bookId:bookId, email:email},
        success: function(data){
            alert('email delete');
            window.location.reload();
        },
        error: function(e){
            console.log(e);
        }
    });

}

function renameBook(bookId, newName){
    $.ajax({
        url: '/sendpulse/renameBook',
        type: 'POST',
        data: {bookId:bookId, newName:newName},
        success: function(data){
            window.location.reload();
        },
        error: function(e){
            console.log(e);
        }
    });
}