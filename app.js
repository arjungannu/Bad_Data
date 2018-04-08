$(document).ready(


    //input CSV to JSON
    function() {
      var dataArray = new Array();
      var dataArray2 = new Array();
         var dataArray3 = new Array();
        var csv = $("#fileUpload").val();
        var aa = '';
        var output = '';
        var input_button=0;
        var ppage=10;
        var pages=0;
      var k=0;
var j=0;
var z=ppage;
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
                                    obj[firstRowCells[j]] = cells[j];
                                }
                                dataArray.push(obj);
                            }

                            aa = JSON.stringify(dataArray);
                            drawTable(dataArray);
                            input_button++;
                        }
                    }

                    
                              reader.readAsText($("#fileUpload")[0].files[0]);
                              setTimeout(function(){
                                
                     var length=(dataArray.length);
                     pages=Math.ceil(length/ppage);
                     alert(pages);

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
            var row = $("<tr class='new' />")
            $("#bad_data").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
            row.append($("<td>" + rowData.name + "</td>"));
            row.append($("<td ><img width='150px' height='150px'  src='" + rowData.city + "' /></td>"));
            row.append($("<td >" + rowData.phone + "</td>"));
            row.append($("<td><input type='checkbox' class='correct' value='" + rowData.color + "'>" + rowData.color + "</td>"));
            row.append($("<td><input type='text' class='incorrect'></td>"));
        }


        
        $('#bad_data').on('click', 'input[type="checkbox"]', function() {
            if ($(this).parents("tr").find(".correct").is(':checked')) {
                $(this).parents("tr").find(".incorrect").removeClass("part");
                //alert($( this ).parents("tr").find(".correct").val());
                //alert($( this ).parents("tr").find(".incorrect").val());
$("#bulk").attr("disabled",true); 
                var obj2 = {};

                var currow = $(this).closest('tr');
                obj2['name'] = currow.find('td:eq(0)').text();
                obj2['img'] = $(this).parents("tr").find("img").attr("src");
                obj2['phone'] = currow.find('td:eq(2)').text();
                obj2['value'] = currow.find('td:eq(3)').text();

                var remove = '';
                $(this).parents("tr").find(".incorrect").prop('value', remove);
                $(this).parents("tr").find(".incorrect").attr("disabled", true);
                obj2['text'] = $(this).parents("tr").find(".incorrect").val();
                var length=dataArray2.length;
             //var ask = true;
                for (i = 0; i < dataArray2.length; i++) {
                    if (dataArray2[i].name == obj2.name) {
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
                name = currow.find('td:eq(0)').text();

                for (i = 0; i < dataArray2.length; i++) {
                    if (dataArray2[i].name == name) {
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
            obj2['name'] = currow.find('td:eq(0)').text();
            obj2['img'] = $(this).parents("tr").find("img").attr("src");
            obj2['phone'] = currow.find('td:eq(2)').text();
            obj2['value'] =$(this).parents("tr").find(".incorrect").val();

            for (i = 0; i < dataArray2.length; i++) {
                if (dataArray2[i].name == obj2.name) {

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
if(dataArray2[j].name==dataArray[i].name)
{
 dataArray.splice(i, 1);
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
                obj2['name'] = currow.find('td:eq(0)').text();
                obj2['img'] = currow.find("img").attr("src");
                obj2['phone'] = currow.find('td:eq(2)').text();
                obj2['value'] = currow.find('td:eq(3)').text();
             // alert($(this).find("name").val());
             
var length=dataArray2.length;
             //var ask = true;
                for (i = 0; i < dataArray2.length; i++) {
                    if (dataArray2[i].name == obj2.name) {
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
                obj2['name'] = currow.find('td:eq(0)').text();
             //var ask = true;
                for (i = 0; i < dataArray2.length; i++) {
                    if (dataArray2[i].name == obj2.name) {
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
                obj2['name'] = currow.find('td:eq(0)').text();
                obj2['img'] = currow.find("img").attr("src");
                obj2['phone'] = currow.find('td:eq(2)').text();
                obj2['value'] =currow.find('input[type=text]').val();
             // alert($(this).find("name").val());
             

             var ask = true;
             var length=dataArray2.length;
                for (i = 0; i < dataArray2.length; i++) {
                    if (dataArray2[i].name == obj2.name) {
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
                obj2['name'] = currow.find('td:eq(0)').text();
             
                for (i = 0; i < dataArray2.length; i++) {
                    if (dataArray2[i].name == obj2.name) {
                        dataArray2.splice(i, 1);
                    
                        console.log(dataArray2);
                       
                    }

                }
              
             });


}
   });

///data table







});
    