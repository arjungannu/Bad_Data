$(document).ready(


    //input CSV to JSON
    function() {
      $("#search1").prop("disabled", true);
$("#search").prop("disabled", true);
  $("#ref").prop("disabled", true);
  $("#attr").prop("disabled", true);
  $("#attrv").prop("disabled", true);

      var dataArray = new Array();
      var dataArray2 = new Array();
         var dataArray3 = new Array();
        var csv = $("#fileUpload").val();
        var aa = '';
        var output = '';
        var input_button=0;
        var ppage=100;
        var pages=0;
      var k=0;
var j=0;
var z=ppage;
var q=0;
var t=0;
var mp = [],
 ref = [],
 attr = [],
 attrv=[];
 var temp=new Array();
var temp1=new Array();
 var temp4=new Array();

var obj = {};
        $("#upload").bind("click", function() {
            if(input_button==0){
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
            if (regex.test($("#fileUpload").val().toLowerCase())) {
                if (typeof(FileReader) != "undefined") {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var rows = e.target.result.split("\r\n");

                        if (rows.length > 0) {
                            var firstRowCells = GetCSVCells(rows[0], ",");

                            
                            for (var i = 1; i < rows.length - 1; i++) {
                                var cells = GetCSVCells(rows[i], ",");
                                var obj = {};
                                for (var j = 0; j < cells.length; j++) {
                                    
                              if(firstRowCells[j]!='image'){
                                    obj[firstRowCells[j]] = cells[j].toUpperCase();
                                  }
                                  else{
                                    obj[firstRowCells[j]] = cells[j];
                                  }




                                }
                                dataArray.push(obj);
                            }

                            aa = JSON.stringify(dataArray);
                            drawTable(dataArray);
                            input_button++;
                        }


count(dataArray);
                        $(dataArray).each(function (k, v) {
    mp[k] = (v.mp);
    ref[k]=(v.ref_id);
    attr[k]=(v.attribute);
    attrv[k]=(v.value);
        // obj[k] = {
    //     name: v.name,
    //     email: v.email,
    //     sms: v.sms
    // };

});
                        console.log($.unique(mp));
                        $($.unique(mp)).each(function (i, v) {
    $('#mp').append('<option value="' + v + '">' + v + '</option>');
});
                        //alert($("#mp").val());
 $($.unique(ref)).each(function (i, v) {
    $('#ref').append('<option value="' + v + '">' + v + '</option>');
});
                          $($.unique(attr)).each(function (i, v) {
    $('#attr').append('<option value="' + v + '">' + v + '</option>');
});
                          $($.unique(attrv)).each(function (i, v) {
    $('#attrv').append('<option value="' + v + '">' + v + '</option>');
});






                    }

                    
                              reader.readAsText($("#fileUpload")[0].files[0]);
                              setTimeout(function(){
                                
                     var length=(dataArray.length);
                     pages=Math.ceil(length/ppage);
                     //alert(pages);

                              },300); 
                    



                } else {
                    alert("This browser does not support HTML5.");
                }
            } else {
                alert("Please upload a valid CSV file.");
            }
          }
        });
      


        //JSON to CSV
        function jc(objArray) {
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';



            for (var i = 0; i < 1; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','

                    line += index;
                }

                str += line + '\r\n';
            }


            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','

                    line += array[i][index];
                }

                str += line + '\r\n';
            }

            return str;
        }


        ///to get  cells
        function GetCSVCells(row, separator) {
            return row.split(separator);
        }

$("#mp").on("change",function(){
  $("#ref").html("");
  $("#ref").append('<option value="ref">ref_id</option>')
  var mp=$(this).val();
  ref=[];
  var p=0;
  
  if(q==0){
for(var i=0;i<dataArray.length;i++)
{
if(mp==dataArray[i].mp){
  ref[p]=(dataArray[i].ref_id);
  temp[p]=dataArray[i];
p++;
q++;
}
t=q;
}
temp1=dataArray;
dataArray=temp;
}
else if(q!=1)
{
  dataArray=temp1;
temp=[];
  for(var i=0;i<dataArray.length;i++)
{
if(mp==dataArray[i].mp){
  ref[p]=(dataArray[i].ref_id);
  temp[p]=dataArray[i];
p++;
}
}
temp1=dataArray;
dataArray=temp;

}


//console.log(dataArray);
//console.log(temp1);

$("#bad_data").html("");

console.log(ref);
uref=$.unique(ref);
console.log(uref);
                         for(var i=0;i<uref.length;i++){
    $('#ref').append('<option value="' + uref[i]+ '">' + uref[i] + '</option>');
}
count(dataArray);
$("#ref").prop("disabled", false);
    $("#search1").prop("disabled", false);
$("#search").prop("disabled", false);
$("#attr").html("");
$("#attr").append('<option value="attr">attribute_</option>')
$("#attrv").html("");
$("#attrv").append('<option value="attrv">attribute_value</option>')
drawTable(dataArray);

});




///ref_id

$("#ref").on("change",function(){
  $("#attr").html("");
  $("#attr").append('<option value="attr">attribute</option>')
  var ref=$(this).val();
  attr=[];
  var p=0;
  
  if(q==0){
for(var i=0;i<dataArray.length;i++)
{
if(ref==dataArray[i].ref_id){
  attr[p]=(dataArray[i].attribute);
  temp[p]=dataArray[i];
p++;
q++;
}
t=q;
}
temp1=dataArray;
dataArray=temp;
}
else if(q!=1)
{
  dataArray=temp1;
temp=[];
  for(var i=0;i<dataArray.length;i++)
{
if(ref==dataArray[i].ref_id){
  attr[p]=(dataArray[i].attribute);
  temp[p]=dataArray[i];
p++;
}
}
temp1=dataArray;
dataArray=temp;

}


//console.log(dataArray);
//console.log(temp1);

$("#bad_data").html("");

console.log(attr);
uattr=$.unique(attr);
console.log(uattr);
                         for(var i=0;i<uattr.length;i++){
    $('#attr').append('<option value="' + uattr[i]+ '">' + uattr[i] + '</option>');
}
count(dataArray);
$("#attr").prop("disabled", false);
$("#attrv").html("");
    $("#attrv").append('<option value="attrv">attribute_value</option>')
drawTable(dataArray);

});


//attr


$("#attr").on("change",function(){
  $("#attrv").html("");
  $("#attrv").append('<option value="attrv">attribute_value</option>')
  var attr=$(this).val();
  var mp=$("#mp").val();
  attrv=[];
  var p=0;
  
  if(q==0){
for(var i=0;i<dataArray.length;i++)
{
if(attr==dataArray[i].attribute && mp==dataArray[i].mp ){
  attrv[p]=(dataArray[i].value);
  temp[p]=dataArray[i];
p++;
q++;
}
t=q;
}
temp1=dataArray;
dataArray=temp;
}
else if(q!=1)
{
  dataArray=temp1;
temp=[];
  for(var i=0;i<dataArray.length;i++)
{
if(attr==dataArray[i].attribute && mp==dataArray[i].mp){
  attrv[p]=(dataArray[i].value);
  temp[p]=dataArray[i];
p++;
}
}
temp1=dataArray;
dataArray=temp;

}


//console.log(dataArray);
//console.log(temp1);

$("#bad_data").html("");

console.log(attrv);
uattrv=$.unique(attrv);
console.log(uattrv);
                         for(var i=0;i<uattrv.length;i++){
    $('#attrv').append('<option value="' + uattrv[i]+ '">' + uattrv[i] + '</option>');
}
count(dataArray);
$("#attrv").prop("disabled", false);
drawTable(dataArray);

});


//attribute_value

$("#attrv").on("change",function(){
   // $("#attrv").html("");
   // $("#attrv").append('<option value="all">attribute_value</option>')
  var attrv=$(this).val();
  var mp=$("#mp").val();
   var attr=$("#attr").val();
  // attrv=[];
  var p=0;
  
  if(q==0){
for(var i=0;i<dataArray.length;i++)
{
if(attrv==dataArray[i].value && mp==dataArray[i].mp && attr==dataArray[i].attribute ){
  // attrv[p]=(dataArray[i].attribute_value);
  temp[p]=dataArray[i];
p++;
q++;
}
t=q;
}
temp1=dataArray;
dataArray=temp;
}
else if(q!=1)
{
  dataArray=temp1;
temp=[];
  for(var i=0;i<dataArray.length;i++)
{
if(attrv==dataArray[i].value && mp==dataArray[i].mp && attr==dataArray[i].attribute ){
  // attrv[p]=(dataArray[i].attribute_value);
  temp[p]=dataArray[i];
p++;
}
}
temp1=dataArray;
dataArray=temp;

}


//console.log(dataArray);
//console.log(temp1);
 $("#bad_data").html("");

// console.log(attrv);
// uattrv=$.unique(attrv);
// console.log(uattrv);
//                          for(var i=0;i<uattrv.length;i++){
//     $('#attrv').append('<option value="' + uattrv[i]+ '">' + uattrv[i] + '</option>');
// }
count(dataArray);
// $("#attrv").prop("disabled", false);
drawTable(dataArray);

});

//search

$("#search1").on("click",function(){
   // $("#attrv").html("");
   // $("#attrv").append('<option value="all">attribute_value</option>')
  var search2=$("#search").val().toUpperCase();
  var mp=$("#mp").val();
  var ref=$("#ref").val();
  var attr=$("#attr").val();
  var attrv=$("#attrv").val();

 var p=0;
  
//   if(t==q){
//   dataArray=temp1;
//  temp=[];

//   for(var i=0;i<dataArray.length;i++)
// {
// if(dataArray[i].title.search(search2)>0 ||  dataArray[i].pd.search(search2)>0 || dataArray[i].bp.search(search2)>0 && dataArray[i].mp==mp )
// {
//   // attrv[p]=(dataArray[i].attribute_value);
//   temp[p]=dataArray[i];
// p++;
// }
// }
// temp1=dataArray;
// dataArray=temp;

// }
if(q!=1)
{
 
 
  dataArray=temp1;
 temp=[];

 if(mp!="mp" &&  ref!="ref" && attr!="attr" && attrv!="attrv"){
  for(var i=0;i<dataArray.length;i++)
{
if((dataArray[i].title.search(search2)>0 ||  dataArray[i].pd.search(search2)>0 || dataArray[i].bp.search(search2)>0  && dataArray[i].mp==mp) && dataArray[i].ref_id==ref && dataArray[i].attribute==attr  && dataArray[i].value==attrv)
{
  temp[p]=dataArray[i];
p++;
}

}
 }

  else if(mp!="mp" &&  ref!="ref" && attr!="attr" ){
  for(var i=0;i<dataArray.length;i++)
{
if((dataArray[i].title.search(search2)>0 ||  dataArray[i].pd.search(search2)>0 || dataArray[i].bp.search(search2)>0  && dataArray[i].mp==mp) && dataArray[i].ref_id==ref && dataArray[i].attribute==attr )
{
  temp[p]=dataArray[i];
p++;
}
}
 }

  else if(mp!="mp" &&  ref!="ref"  ){
  for(var i=0;i<dataArray.length;i++)
{
if((dataArray[i].title.search(search2)>0 ||  dataArray[i].pd.search(search2)>0 || dataArray[i].bp.search(search2)>0  && dataArray[i].mp==mp) && dataArray[i].ref_id==ref  )
{
  temp[p]=dataArray[i];
p++;
}

}
 }
   else if(mp!="mp"   ){
  for(var i=0;i<dataArray.length;i++)
{
if((dataArray[i].title.search(search2)>0 ||  dataArray[i].pd.search(search2)>0 || dataArray[i].bp.search(search2)>0 ) && dataArray[i].mp==mp  )
{
  temp[p]=dataArray[i];
p++;
}

}
 }



temp1=dataArray;
dataArray=temp;

}


//console.log(dataArray);
//console.log(temp1);
 $("#bad_data").html("");

// console.log(attrv);
// uattrv=$.unique(attrv);
// console.log(uattrv);
//                          for(var i=0;i<uattrv.length;i++){
//     $('#attrv').append('<option value="' + uattrv[i]+ '">' + uattrv[i] + '</option>');
// }
count(dataArray);
// $("#attrv").prop("disabled", false);
drawTable(dataArray);

});





























        //csv download

        $("#dn").click(function() {
            output = JSON.stringify(dataArray3);
            var s1 = jc(output);
            var blob = new Blob([s1], {
                type: 'text/csv;charset=utf-8'
            });
            var csvUrl = URL.createObjectURL(blob);

            $(this)
                .attr({

                    'download': 'data.csv',
                    'href': csvUrl
                });
        });



$("#next").click(function(){
k=k+ppage;
z=z+ppage;
$("#bad_data tr").remove();
//j=k;
 drawTable(dataArray);
});

$("#prev").click(function(){
k=k-ppage;
z=z-ppage;
$("#bad_data tr").remove();
//j=k;
 drawTable(dataArray);
});


        function drawTable(data) {
            for (j=k ; j < z; j++) {
                drawRow(data[j]);
            }
        }

        function drawRow(rowData) {
            var row = $("<tr class='new row word-wrap ' style='font-size:11px; overflow:hidden;    ' height='250px'  />")
            $("#bad_data").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
            // row.append($("<td class='col-1'>" + rowData.mp + "</td>"));
            row.append($("<td  class='col-2'><img width='150px' height='150px'  src='" + rowData.image + "' /></td>"));
            row.append($("<td  class='col-1'>" + rowData.asin + "</td>"));
            // row.append($("<td  class='col-1'>" + rowData.ref_id + "</td>"));
            // row.append($("<td  class='col-1'>" + rowData.attribute + "</td>"));
             row.append($("<td   data-toggle='tooltip' data-placement='bottom'  class='col-1 '  title='"+rowData.title+"'>" + rowData.title + "</td>"));
              // row.append($("<td  class='col-2 tooltip'>"+ rowData.title +" <span class='tooltiptext'>"+  rowData.title+"</span></td>"));
              row.append($("<td   data-toggle='tooltip' data-placement='bottom'  class='col-3 '  title='"+rowData.pd+"'>" + rowData.pd + "</td>"));
               row.append($("<td   data-toggle='tooltip' data-placement='bottom'  class='col-2 '  title='"+rowData.bp+"'>" + rowData.bp  + "</td>"));
                // row.append($("<td  class='col-1'>" + rowData.value + "</td>"));
            row.append($("<td class='col-1'><input type='checkbox' class='correct' value='" + rowData.value + "'>" + rowData.value + "</td>"));
            row.append($("<td class='col-2'><input type='text' class='incorrect'></td>"));
        }


        
        $('#bad_data').on('click', 'input[type="checkbox"]', function() {
            if ($(this).parents("tr").find(".correct").is(':checked')) {
                $(this).parents("tr").find(".incorrect").removeClass("part");
                //alert($( this ).parents("tr").find(".correct").val());
                //alert($( this ).parents("tr").find(".incorrect").val());
$("#bulk").attr("disabled",true); 
                var obj2 = {};

                var currow = $(this).closest('tr');
                obj2['asin'] = currow.find('td:eq(1)').text();
                obj2['image'] = $(this).parents("tr").find("img").attr("src");
                obj2['title'] = currow.find('td:eq(2)').text();
                obj2['bp'] = currow.find('td:eq(3)').text();
                obj2['pd'] = currow.find('td:eq(4)').text();

                var remove = '';
                $(this).parents("tr").find(".incorrect").prop('value', remove);
                $(this).parents("tr").find(".incorrect").attr("disabled", true);
                obj2['text'] = $(this).parents("tr").find(".incorrect").val();
                var length=dataArray2.length;
             //var ask = true;
                for (i = 0; i < dataArray2.length; i++) {
                    if (dataArray2[i].asin == obj2.asin) {
                        dataArray2.splice(i, 1);
                        length=dataArray2.length;
                        dataArray2.push(obj2);
                        console.log(dataArray2);
                        
                        //ask = !ask;
                    }

                }
                if (length==dataArray2.length) {
                    dataArray2.push(obj2);
                    console.log(dataArray2);
                }




            } else if (!$(this).parents("tr").find(".correct").is(':checked')) {
                $(this).parents("tr").find(".incorrect").removeClass("part");
                $("#bulk").attr("disabled",false); 
                //alert($( this ).parents("tr").find(".correct").val());
                $(this).parents("tr").find(".incorrect").attr("disabled", false);
                var currow = $(this).closest('tr');
                asin = currow.find('td:eq(1)').text();

                for (i = 0; i < dataArray2.length; i++) {
                    if (dataArray2[i].asin == asin) {
                        dataArray2.splice(i, 1);
                        //delete dataArray2[i];
                        //dataArray2.length=dataaArray2.length-1;
                        console.log(dataArray2);
                    }
                }
            }




        });



        $('#bad_data').on('change', 'input[type="text"]', function() {
            //alert("test");
            var obj2 = {};

            var currow = $(this).closest('tr');
         obj2['asin'] = currow.find('td:eq(1)').text();
                obj2['image'] = $(this).parents("tr").find("img").attr("src");
                obj2['title'] = currow.find('td:eq(2)').text();
                obj2['bp'] = currow.find('td:eq(3)').text();
                obj2['pd'] = currow.find('td:eq(4)').text();

            obj2['value'] =$(this).parents("tr").find(".incorrect").val();

            for (i = 0; i < dataArray2.length; i++) {
                if (dataArray2[i].asin == obj2.asin) {

                    dataArray2.splice(i, 1);
                    //delete dataArray2[i];
                    //dataArray2.length=dataArray2.length-1;
                    //console.log(dataArray2);
                }
            }
            if (obj2['value'] != '') {
                $(this).parents("tr").find(".incorrect").addClass("part");
                dataArray2.push(obj2);
            } else {
                $(this).parents("tr").find(".incorrect").removeClass("part");
            }

            console.log(dataArray2);
        });



//assign button
        $("#assign").click(function() {
          if(dataArray2.length>0){
            $('input:checkbox:checked').parents("tr").remove();
            // $('#bad_data').find('input:text').parents("tr").remove();
            $(".part").parents("tr").remove();


$("#bulk").attr("disabled",false); 
$(dataArray2).each(
  function(){
    dataArray3.push(this);
  });
for(var j=0;j<dataArray2.length;j++){
for(var i=0;i<dataArray.length;i++)
{
if(dataArray2[j].asin==dataArray[i].asin)
{
 dataArray.splice(i, 1);
 break;
}
}
for(var i=0;i<temp1.length;i++)
{
if(dataArray2[j].asin==temp1[i].asin)
{
 temp1.splice(i, 1);
 break;
}
}
};
if($("#bad_data tr").length==0){
drawTable(dataArray);
}
//dataArray3.push(dataArray2);
console.log(dataArray3);
dataArray2=[];
console.log(dataArray2);
console.log(dataArray);
         
            //alert($(".incorrect").find('input:text').parents("tr").closest("td").val());
            // if($(".incorrect").find('input:text').val()!='')
            // {
            //   $(this).remove();
            // }

            // $('#bad_data .correct input[type="checkbox"]').is(":checked")
            // {
            //   alert($(this).closest("tr").find('td:eq(0)'));
            // }


            // $('#selectall').on('change', 'input[type="checkbox"]', function() 
            // {
            // if($( this ).is(':checked')){
            //   $('input[type="checkbox"]').attr("checked", true);

            // }
          }
        });

   $("#selectall").click(function(e) {
    
                // $('input:checkbox').not(this).prop('checked', this.checked);
 var table= $('#bad_data').closest('table');
    $('td input:checkbox',table).prop('checked',this.checked); 
    $("#bulk").val(""); 
    $("#bulk").attr("disabled",true); 
if(this.checked){
  $( ".incorrect",table ).each(function() {
    
          $(this).prop('value', "");
               $(this).prop("disabled", true);
              $( this ).addClass( "part" );
             // alert($(this).parents('tr').find("correct").value());
  });
   $(".new",table).each(function()
             {
var obj2 = {};
                    var currow = $(this).closest('tr');
               obj2['asin'] = currow.find('td:eq(1)').text();
                obj2['image'] = currow.find("img").attr("src");
                obj2['title'] = currow.find('td:eq(2)').text();
                obj2['bp'] = currow.find('td:eq(3)').text();
                obj2['pd'] = currow.find('td:eq(4)').text();
                obj2['value'] = currow.find('td:eq(5)').text();
             // alert($(this).find("name").val());
             
var length=dataArray2.length;
             //var ask = true;
                for (i = 0; i < dataArray2.length; i++) {
                    if (dataArray2[i].asin == obj2.asin) {
                        dataArray2.splice(i, 1);
                        length=dataArray2.length;
                        dataArray2.push(obj2);
                        console.log(dataArray2);
                        
                        //ask = !ask;
                    }

                }
                if (length==dataArray2.length) {
                    dataArray2.push(obj2);
                    console.log(dataArray2);
                }



             });
}
else if(!this.checked)
{
  $("#bulk").attr("disabled",false); 
    $( ".incorrect",table ).each(function() {
  $(this).prop('value', "");
               $(this).prop("disabled", false);
              $( this ).removeClass( "part" );
            });

$(".new",table).each(function()
             {
var obj2 = {};
                    var currow = $(this).closest('tr');
                obj2['asin'] = currow.find('td:eq(1)').text();
             //var ask = true;
                for (i = 0; i < dataArray2.length; i++) {
                    if (dataArray2[i].asin == obj2.asin) {
                        dataArray2.splice(i, 1);
                        
                        console.log(dataArray2);
                       
                    }

                }
                // if (ask) {
                //     dataArray2.push(obj2);
                //     console.log(dataArray2);
                // }
             });


                      }


            });



   $("#bulk").change(function()
   {
var table= $('#bad_data').closest('table');
    $('td input:text',table).val(this.value); 

    if(this.value!="")
    {
 $( ".incorrect",table ).each(function() {             
              $( this ).addClass( "part" );        
  });

 $(".new",table).each(function()
             {
var obj2 = {};
                    var currow = $(this).closest('tr');
                obj2['asin'] = currow.find('td:eq(1)').text();
                obj2['image'] = $(this).parents("tr").find("img").attr("src");
                obj2['title'] = currow.find('td:eq(2)').text();
                obj2['bp'] = currow.find('td:eq(3)').text();
                obj2['pd'] = currow.find('td:eq(4)').text();

                obj2['value'] =currow.find('input[type=text]').val();
             // alert($(this).find("name").val());
             

             var ask = true;
             var length=dataArray2.length;
                for (i = 0; i < dataArray2.length; i++) {
                    if (dataArray2[i].asin == obj2.asin) {
                        dataArray2.splice(i, 1);
                        length=dataArray2.length;
                        dataArray2.push(obj2);
                        console.log(dataArray2);
                        ask = !ask;
                    }

                }
                if (length==dataArray2.length) {
                    dataArray2.push(obj2);
                    console.log(dataArray2);
                }



             });
    } 

    else if(this.value=="")
    {
      $( ".incorrect",table ).each(function() {             
              $( this ).removeClass( "part" );        
  });

      $(".new",table).each(function()
             {
                    var obj2 = {};
                    var currow = $(this).closest('tr');
                obj2['asin'] = currow.find('td:eq(1)').text();
             
                for (i = 0; i < dataArray2.length; i++) {
                    if (dataArray2[i].asin == obj2.asin) {
                        dataArray2.splice(i, 1);
                    
                        console.log(dataArray2);
                       
                    }

                }
              
             });


}
   });

///data table



function count(data){
  $("#count").html("");
  $("#count").append(data.length);
}



});
    