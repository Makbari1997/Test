function sendMesage(data) {
    
    const csrfToken = $.cookie("csrftoken");

    // if content was empty simply return
    if (data['content'] == "") {
            return
    }

    form = {
        message: data['content']
    }

    $.ajax({
        url: '/message/',
        type: 'POST',
        data: JSON.stringify(form),
        headers: { "X-CSRFToken": csrfToken },
        type: 'json',
        contentType: 'application/json; UTF-8;',
        success: function (res) {
            writeMessage(data)
            writeMessage(res)
            $("#messageArea").val('')
        },
        error: function (e) {
            // handle error case here
            alert(JSON.stringify(e))
        }
    });
}

// msg is content of message
// isUser shows if message is from us or server it has values of '' for server and 'self' for user's messages
function writeMessage(data) {

    if (!Array.isArray(data)) data = [data]
    
    for (let x of data) {
        var msg = {
            content: x['content'],
            message_style: x['is_user'] ? 'self' : ''
        }
        var template = $("#message-template").html();
        var html = Mustache.render(template, msg);
        $("#message-wrapper").append(html);

    }

    if (data.length > 1) $("#messageBody").prop('scrollTop', $('#messageBody').prop("scrollHeight"));
    else $("#messageBody").animate({ scrollTop: $('#messageBody').prop("scrollHeight") }, 1000);
}

// chat page behaviour when loading
$(document).ready(function () {

});
