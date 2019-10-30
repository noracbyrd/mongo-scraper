$(document).ready(function () {
    $(".commentHere").on("click", function () {
        // this variable below grabs the title of the article associated with the comment button clicked
        var theTitle = ($(this).parent()[0].firstElementChild.innerText)
        var commentMe = {
            title: theTitle
        }
        $(".modal").modal();
        // this is where I'm attempting to send that article title to the backend so that I can reference it later, but it isn't successful. Not really sure if I'd need a get or post route here.
        $.get("/thecomments", function(data,status) {
        })
    })
    // this is where the user actually submits a comment.
    $(".saveComment").on("click", function () {
        event.preventDefault();
        var comment = $("#icon_prefix2").val().trim();
        var newComment = {
            text: comment,
        }
        // comment gets sent to the backend to be saved in the database
        $.post("/api/comments", newComment, function () {
        });
    });
})
