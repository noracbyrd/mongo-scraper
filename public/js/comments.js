$(document).ready(function () {
    $(".commentHere").on("click", function () {
        // this variable below grabs the title of the article associated with the comment button clicked
        var theTitle = ($(this).parent()[0].firstElementChild.innerText)
        var commentMe = {
            title: theTitle
        }
        $(".modal").modal();
        // this is where I'm attempting to send that article title to the backend so that I can reference it later, but it isn't successful. Not really sure if I'd need a get or post route here.
        $.get("/comments", commentMe, function () {
        })
    })
    // this is where the user actually submits a comment.
    $(".saveComment").on("click", function () {
        console.log("i'm clicked");
        event.preventDefault();
        var comment = $("#icon_prefix2").val().trim();
        var newComment = {
            text: comment,
        }
        // don't think this is the right route either. at one point I was able to save comments, but now nothing seems to be saving....
        $.post("/api/comments", newComment, function () {
        });
    });
})
