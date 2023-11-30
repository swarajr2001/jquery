$(document).ready(function(){
    var iframe = $("#iframe_a");
    
    $(document).on('click',"#play",function(){
        var currentRow=$(this).closest("tr");
        var link=currentRow.find("td:eq(2)").html();
       
        iframe.attr("src", "https://www.youtube.com/embed/" + link+ "?autoplay=1");
      });

      $(document).on('click',"#delete",function(){
      
        $(this).parents("tr").remove();
      });




    $(".add-row").click(function(){
        var name = $("#name").val();
        var link = $("#link").val();
        if(!name=="" && !link==""){

        var markup = `<tr><td><input type='checkbox' name='record'></td><td>${name}</td><td>${link}</td><td><button id="play" class="add-row ">play video</button></td><td><button class="delete-row" id="delete">Delete Video</button></td></tr>`
        $("table tbody").append(markup);
        }
        // else if(name==""){
        //     $("#name-err").text("enter valid name")
        // }
        // else if(link==""){
        //     $("#link-err").text("enter valid link")
        // }
    });
    
    // Find and remove selected table rows
    $(".delete-row").click(function(){
        $("table tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
            }
            // else{
            //     $("#check").text("please select any ")
            // }
        });
    });
});    