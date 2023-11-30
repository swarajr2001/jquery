$(document).ready(function(){
    disableDate()
    $("#modalDialog").hide();
    $("#modal").hide();

    $("#btn").click(function(){
        $("#myModal").modal('show');
    });



    $('#password').bind('cut copy paste', function (e) {
        e.preventDefault();
        var modal = $('#modal');
        var btn = $("#mbtn");
        var span = $(".close");
        modal.show();
        span.on('click', function() {
            modal.fadeOut();
        });
     });
     $('#Confirm').bind('cut copy paste', function (e) {
        e.preventDefault();
        var modal = $('#modal');
        var btn = $("#mbtn");
        var span = $(".close");
        modal.show();
        span.on('click', function() {
            modal.fadeOut();
        });
     });

    $("#dob").on("change",()=>{
        // console.log();
        dob = $("#dob").val()
        d = new Date(dob);
        var today = new Date();
        console.log(today-d);
        var age = Math.floor((today-d) / (365.25 * 24 * 60 * 60 * 1000));
        console.log(age);
        $('#age').val(age);
        
        if(age<10 || age>18){
            $("#age-err").text("age should be 10 to 18")
        }
        else{
            $("#age-err").text("")
        }
    
      });

      $("#name").on("keyup",()=>{
        var name = $("#name").val()
        var nameregx=(/^[A-Za-z]+$/)
        
        if (!nameregx.test(name) || name.length<3) {
            $("#name-err").text("invalid name")
            
        }else{
            $("#name-err").text("")
        }
    
      });
      

    $("#email").on("keyup",()=>{
        var email=$("#email").val()
        var emailregex=(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        if(!emailregex.test(email)){
            $("#email-err").text("invalid email")
    }
    else{
        $("#email-err").text("")
    }

});

$("#address").on("keyup",()=>{
    var address=$("#address").val()
    if(address.length<10){
        $("#address-err").text("invalid data")
}
else{
$("#address-err").text("")

}
});

$("#password").on("keyup",()=>{
    var password=$("#password").val()
    var passregex=/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
    if(!passregex.test(password)){
        $("#pass-err").text("please follow password syntax")
    }
    else{
        $("#pass-err").text("") 
        $("#conpass-err").text("")
        }

        $("#password").on("keyup",()=>{
            var cpassword=$("#Confirm").val()
            var password=$("#password").val()
            var passregex=/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
            if(!passregex.test(cpassword) || cpassword != password){
        
                $("#conpass-err").text("password not match")
            }
            else{
                $("#conpass-err").text("")
        
            }
        
        
        });
});

$("#Confirm").on("keyup",()=>{
    var cpassword=$("#Confirm").val()
    var password=$("#password").val()
    var passregex=/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
    if(!passregex.test(cpassword) || cpassword != password){

        $("#conpass-err").text("password not match")
    }
    else{
        $("#conpass-err").text("")

    }


});
function disableDate() {
    var d = new Date()
    d.setDate(d.getDate() - 1);
    var month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    console.log(year,month,day);
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    maxdate = year+'-'+month+"-"+day;
    $("#dob").attr("max",maxdate)
}
$("#form").on("submit",(e)=>{
    e.preventDefault();
    var name = $("#name").val()
    var email = $("#email").val()
    var Age=$("#age").val()
    var password = $("#password").val()
    var conpassword = $("#Confirm").val()
    var valid = validate(name,email,password,conpassword,Age);

    if(valid){
        window.location="http://www.cybrosys.com"
    }
    else{
        var modal = $('#modalDialog');
        var btn = $("#mbtn");
        var span = $(".close");
        modal.show();
        span.on('click', function() {
            modal.fadeOut();
        });
        $('body').bind('click', function(e){
            if($(e.target).hasClass("modal")){
                modal.fadeOut();
            }
        });
    }
    
    function validate(name,email,password,conpassword) {

        var x = $("input[type = 'radio']:checked");


        var isValid =true;
        value = $("#address").val()
        var emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        var passwdRegx = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        if(name.length<3 ){
            
            isValid = false;
        }
        if(!x.length>0)
        {
            isValid=false
        }
        
        if(Age<10){
            isValid=false;
        }
        if(Age>18){
            isValid=false;
        }
        
    
        if (!emailRegx.test(email)) {
            
            isValid = false;
        }
        if (!passwdRegx.test(String(password))){
            
            isValid = false;
        }
        if (!passwdRegx.test(String(conpassword)) || conpassword !=password) {
            
            isValid = false;
        }
        if(value.length<10){
           
            isValid = false;
        }
    
        return isValid;
        
      }
    });
    $("#togglePassword").click(()=>{
        var type = $("#password").attr("type") === "password"? "text" : "password"
        // var className = $("#password").attr("type") === "password"? "fa-eye" : "fa-eye-slash"
        $("#password").attr("type",type)
        $("#togglePassword").toggleClass("fa-eye-slash")
    
    
    
      });

      $("#toggleconPassword").click(()=>{
        var type = $("#Confirm").attr("type") === "password"? "text" : "password"
        $("#Confirm").attr("type",type)
        $("#toggleconPassword").toggleClass("fa-eye-slash")
    
    
      });
});


