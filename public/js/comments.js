$(document).ready(function(){
    $(".commentHere").on("click",function(){
    $(".modal").modal();
    })

    $(".saveComment").on("click",function(){
        console.log("i'm clicked");
        event.preventDefault();
        // Getting jQuery references for the petition fields
        var comment = $("#icon_prefix2").val().trim();
        var newComment = {
            text: comment
        }


   
     $.post("/api/comments", newComment, function () {
        });
  });
})