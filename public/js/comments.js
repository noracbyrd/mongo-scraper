$(document).ready(function () {
    $(".commentHere").on("click", function () {
        var theTitle = ($(this).parent()[0].firstElementChild.innerText)
        var commentMe = {
            title: theTitle
        }
        $(".modal").modal();
        $.post("/comments", commentMe, function () {
            // console.log(data);
        })
    })

    $(".saveComment").on("click", function () {
        console.log("i'm clicked");
        event.preventDefault();
        var comment = $("#icon_prefix2").val().trim();
        var newComment = {
            text: comment,
        }

        $.post("/api/comments", newComment, function () {
        });
    });
})
