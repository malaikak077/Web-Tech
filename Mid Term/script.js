$(document).ready(()=>{

    $("img").mouseover(function(){
        let imgname = $(this).attr("src")
        $("#logo-name").html(imgname);
     });


});