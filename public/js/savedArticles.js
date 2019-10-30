// clicking on the 'save article' button does manage to send the article data to the backend effectively
$( document ).ready(function() {
    $(".saveThis").on("click", function(){
        var title = $(this).parent()[0].children[0].textContent;
        var content = $(this).parent()[0].children[1].textContent;
        var link = $(this).parent()[0].children[2].href;
        var saveMe = {
            title: title,
                content: content,
                link: link
        }
        $.post("/api/saved",saveMe,function(err,status){
            if (err) throw err;
        })
    })
    })
       
