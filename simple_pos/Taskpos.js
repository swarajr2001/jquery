$(document).ready(function(){
    var itemList=[];
    var nameList=[];
    var cartitem=[];
    
    
   
    $("#add").click(function(){
        
        var name = $("#item").val();
        var price=$("#price").val();
        if(!name=="" && !price=="")
        {
            var itemdetail={};
            itemdetail.Name = name;
            itemdetail.Price=price;
            itemList.push(itemdetail);
            $("#itembody").append(`
                <tr>
                <td>${itemdetail.Name}</td>
               <td>$ ${itemdetail.Price}</td> <td><button class="delete-button">Delete</button></td>
                </tr>
            `);

            setItemSelect(name);


            $("#item").val("");
            $("#price").val("");
           
        }
        else{
            Swal.fire(
                'Hey....',
                'Enter both item name and price',
                'question'
              )
        }
    });

    $(document).on('click',".delete-button",function(){
        
        // Get the product from the div.
        // const productDiv = $(this).closest("tr");
       
    
       
        // var key= productDiv.find("td:eq(0)").html();
        
        //   console.log(itemList);
        const productRow = $(this).closest("tr");
        var itemName = productRow.find("td:eq(0)").text();
        var itemPrice = productRow.find("td:eq(1)").text().replace('$', '').trim();
    
        // Find the item object in the itemList array.
        var index = itemList.findIndex(item => item.Name === itemName && item.Price === itemPrice);
    
        if (index !== -1) {
            // Remove the item from the itemList array.
            itemList.splice(index, 1);
    
            // Remove the table row.
            productRow.remove();
        }
       // console.log(itemList);
        resetItemSelect();
        //console.log(itemList)
        Swal.fire(
            'Deleted!',
            'The item has been deleted.',
            'success'
          )
         
      });




    $("#add-customer").click(function(){
       
       var username=$("#cname").val();
       if(!username==""){
        nameList.push(username);
        $("#cname").val("");
        $("#name-cust").append(`
        <tr>
        <td>${username}</td>
        <td><button class="delete-name">Delete</button></td>
        </tr>
        `);
      
        selectUser(username);
       }
       else{
        Swal.fire(
            'Hey....',
            'please enter customer name',
            'question'
          )
       }
    });

    
   

    $(document).on('click',".delete-name",function(){
        const productDiv = $(this).closest("tr");
        var name= productDiv.find("td:eq(0)").html();
        $(this).parents("tr").remove();

        var new_array = $.grep(nameList, function(value) {
            return value != name;
          });
          nameList=new_array;
          
         
          setselectUser();
        Swal.fire(
            'Removed!',
            'This customer is removed.',
            'success'
          )
      });


      
   

      
      function getDictionary() {
        let crt = []
        // var dictionary = {};
        var rows = $("#tablebody").find("tr");
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          var data = {};
          data["item"] = $(row).find(".apitem-select option:selected").text();

          data["price"] = $(row).find(".apprices").val();
          data["quantity"] = $(row).find(".apquantity").val();
          data["total"] = $(row).find(".apthisSum").val();
          crt.push(data)
        //   dictionary[i] = data;

        }
        // crt.push(dictionary)
        // console.log(dictionary)
        return crt;
      }
      
      $("#print").click(function() {
        cartitem=[];
        
       
        var dictionary = getDictionary();
        console.log(dictionary);
        var sum=$("#total").text()
        
        printInvoice(dictionary,sum);

        
      });

      function printInvoice(cartitem,sum) {
        var thissum=sum
        if(!thissum==""){
            var selectedUser = $("#select-user option:selected").text(); 

             var selectedUserLabel = `<h3>Selected User: ${selectedUser}</h3>`; 

        var html = `
        <table class="table">
        <thead>
        <tr>
        <th>Item Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
        </tr>
        </thead>
        <tbody>
        `;
        
        for (var i = 0; i < cartitem.length; i++) {
        
        var item = cartitem[i];
        
        html += `
        <tr>
        <td>${item.item}</td>
        <td>$ ${item.price}</td>
        <td>${item.quantity}</td>
        <td>$ ${item.total}</td>
        </tr>
        `;
        }
        
        html += `
        </tbody>
        </table>
        <h3>Total: <span id="total">${thissum}</span></h3>
        <button id="pay" class="btn btn-success">Pay</button>
        `;
        
        Swal.fire({
        
        title: 'Invoice',
        html:  selectedUserLabel+html,
        confirmButtonText: 'Exit',
        });
        $(document).on('click', '#pay', function() {
            

            Swal.fire({
            
            title: 'Payment Successful',
            text: 'Your payment has been successfully processed.',
            icon: 'success',
            });
        
        });
        
            
        }
    }
      
    $("#select-user").on('change',function(){
        selectedUser="";
        
        
        selectedUser=$( "#select-user option:selected" ).text();
        Swal.fire(
            'Added!',
            'The customer has been choosed.',
            'success'
        );
       
        
      });
      
    

      

      $("#add-button").click(function(){
     
       if(!selectedUser==""){
        var html = `
        <tr class="orders">
            <td>
                <select class="apitem-select">
                    <option value="">select item</option>
    `;

    // Add options for other item names from itemList
    for (var i = 0; i < itemList.length; i++) {
        html += `<option value="${itemList[i].Price}">${itemList[i].Name}</option>`;
    }

    html += `
                </select>
            </td>
            <td class="prc"><input type="text" class="apprices" style="width: 100px;" id="apprices" readonly>  </td>
            <td class="qty" ><input type="number" class="apquantity" id="apquantity"  min="1" placeholder="quantity" style="width: 100px;"></td>
            <td class="ttl"><input class="apthisSum" type="text" placeholder="sum" readonly  style="width: 100px;"></td>
            <td><input type="button" id="itemDel" class="btn btn-danger" value="delete"></td>
        </tr>
    `;
    
    $("#tablebody").append(html);

   

    // Swal.fire(
    //     'Added!',
    //     'The product has been added.',
    //     'success'
    // );


       }
     

       
   
  
      });


      $("#clear-cart").click(function(){
        
        $("#tablebody").remove();
        $("#total").text(0);
         cartitem=[]
         console.log(cartitem)

      });



      $(document).on('click',"#itemDel",function(){
        const productRow = $(this).closest("tr")
        apthisSum = productRow.find(".apthisSum").val();
        var itemName = productRow.find("td:eq(0)").text();
        var itemPrice = productRow.find("td:eq(1)").text().replace('$', '').trim();

        // Find the item object in the cartitem array.
        var index = cartitem.findIndex(item => item.item === itemName && item.price === itemPrice);

        if (index !== -1) {
            // Remove the item from the cartitem array.
            cartitem.splice(index, 1);
        }
        
        var v=$("#total").text()
        var k=v-apthisSum;
        $("#total").text(k);

        
        
        productRow.remove();
        console.log(cartitem);
      });





      $(document).on('change',".apitem-select",function(){
         var selectItem=$(this).val();

        
         
         $(this).parent().siblings(".prc").find(".apprices").val(selectItem);
         $("").val(selectItem);
         
        
         
         
     });

     $(document).on('input',".apquantity",function(){
        //  let qnt=$(this).val();

        //  let price = $(this).parent().siblings(".prc").find(".apprices").val();
        //  console.log("======");
        //  let total = Number(qnt)*Number(price)
        //  $(this).parent().siblings(".ttl").find(".apthisSum").val(total);
        //  $(".apthisSum").val(total);
        findTotals();
       
     });

     function findTotals() {


        var totalPrice = 0;

        $('.orders').each(function() {
        var selectedPrice = $(this).find('.apitem-select').val();
        var quantity = $(this).find('.apquantity').val();

        if (selectedPrice !== '' && quantity !== '') {
            var itemPrice = parseFloat(selectedPrice);
            var itemQuantity = parseInt(quantity);
            var itemTotal = itemPrice * itemQuantity;
            $(this).find('.apthisSum').val(itemTotal);

            totalPrice += itemTotal;
        }
        });
        $("#total").text(totalPrice)
        

        
     }


      



      
     function setItemSelect(name){
       var optionval=name
       $("#select-item").append(`<option value="${optionval}" class="opI">
       ${optionval}
 </option>`);
      }




      function resetItemSelect(){
        $(".opI").remove();
        var j = 0;
        var itemNames= [];
        for (var i = 0; i < itemList.length; i++){
        var nameOfkey = itemList[i];
        if(nameOfkey.hasOwnProperty('Name')){
            itemNames[j] = nameOfkey['Name'];
            
            j++;
        }
        }
        for(var i=0;i<itemNames.length;i++){
            var optionva=itemNames[i];
            $("#select-item").append(`<option value="${optionva}" class="opI">
            ${optionva}
      </option>`);
        }
       
      }
      function selectUser(username){
            var optionValue=username
            $('#select-user').append(`<option value="${optionValue}" class="op">
                                       ${optionValue}
                                 </option>`);
      }
      function setselectUser(){
        $(".op").remove();
        $.each(nameList, function(index, value) {

            var pername=value;
            $('#select-user').append(`<option value="${pername}" class="op">
                                       ${pername}
                                 </option>`);
          });
      }
});

        
        
       