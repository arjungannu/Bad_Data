
$(document).ready(


//input CSV to JSON
function () {
    var csv = $("#fileUpload").val();
var aa='';
var output='';
    $("#upload").bind("click", function () {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($("#fileUpload").val().toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var rows = e.target.result.split("\r\n");

                    if(rows.length>0){
                        var firstRowCells = GetCSVCells(rows[0], ",");

                        var dataArray = new Array();
                        for(var i=1;i<rows.length-1;i++)
                        {
                            var cells = GetCSVCells(rows[i], ",");
                            var obj = {};
                            for(var j=0;j<cells.length;j++)
                            {
                                obj[firstRowCells[j]] = cells[j];
                            }
                            dataArray.push(obj);
                        }

 aa=JSON.stringify(dataArray)

                        $("#dd").html('');
                        $("#dd").append(aa);
                        console.log(aa);
                        console.log(dataArray[0]);
                        drawTable(dataArray);
                    }
                }
                reader.readAsText($("#fileUpload")[0].files[0]);
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid CSV file.");
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
function GetCSVCells(row, separator){
    return row.split(separator);
}





//csv download

$("#dn").click(function()
{ 
  output=JSON.stringify(dataArray2);
    var s1=jc(output);
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




function drawTable(data) {

    
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}

function drawRow(rowData) {
    var row = $("<tr  />")
    $("#bad_data").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.name + "</td>"));
    row.append($("<td><img width='150px' height='150px'  class='image' src='" + rowData.city + "' /></td>"));
    row.append($("<td>" + rowData.phone + "</td>"));
    row.append($("<td><input type='checkbox' class='correct' value='"+rowData.color+"'>"+rowData.color+"</td>"));
    row.append($("<td><input type='text' class='incorrect'></td>"));
}


var dataArray2 = new Array();
var dataArray3=new Array();
$('#bad_data').on('click', 'input[type="checkbox"]', function() 
{
    if($( this ).parents("tr").find(".correct").is(':checked')){
     //alert($( this ).parents("tr").find(".correct").val());
     //alert($( this ).parents("tr").find(".incorrect").val());
     
var obj2={};

     var currow = $(this).closest('tr');
     obj2['name']=currow.find('td:eq(0)').text();
     obj2['img']=$( this ).parents("tr").find(".image").attr("src");
     obj2['phone']=currow.find('td:eq(2)').text();
     obj2['value']=currow.find('td:eq(3)').text();
     
         var remove = '';                             
                            $( this ).parents("tr").find(".incorrect").prop ('value', remove);
                           $( this ).parents("tr").find(".incorrect").attr("disabled", true);
                           obj2['text']=$( this ).parents("tr").find(".incorrect").val();
var ask=true;
 for(i = 0; i< dataArray2.length; i++){   
                                if(dataArray2[i].name==obj2.name)
                                {
                                  dataArray2.splice(i,1); 
                                    // delete dataArray2[i];
                                    // dataArray2.length=dataArray2.length-1;
                                    
                                    dataArray2.push(obj2);
                                    console.log(dataArray2);
                                    ask=!ask;
                                }
                                
                          }  
                          if(ask){
                            dataArray2.push(obj2);
                            console.log(dataArray2);
                          }

                        
 
                            
                       }

                        else if(!$( this ).parents("tr").find(".correct").is(':checked')){
                                        //alert($( this ).parents("tr").find(".correct").val());
                                        $( this ).parents("tr").find(".incorrect").attr("disabled", false); 
                                 var currow = $(this).closest('tr');
                                     name=currow.find('td:eq(0)').text();
                                 //     delete dataArray2[0][name];
                                 for(i = 0; i< dataArray2.length; i++){   
                                if(dataArray2[i].name==name)
                                {
                                  dataArray2.splice(i,1); 
                                    //delete dataArray2[i];
                                    //dataArray2.length=dataaArray2.length-1;
                                    console.log(dataArray2);
                                }
                                }                
                       }

   



});



$('#bad_data').on('change', 'input[type="text"]', function() 
{
  //alert("test");
  var obj2={};

     var currow = $(this).closest('tr');
     obj2['name']=currow.find('td:eq(0)').text();
     obj2['img']=$( this ).parents("tr").find(".image").attr("src");
     obj2['phone']=currow.find('td:eq(2)').text();
     obj2['value']='';
     obj2['text']=$( this ).parents("tr").find(".incorrect").val();
     
      for(i = 0; i< dataArray2.length; i++){   
                                if(dataArray2[i].name==obj2.name)
                                {

                                  dataArray2.splice(i,1); 
                                    //delete dataArray2[i];
                                    //dataArray2.length=dataArray2.length-1;
                                    //console.log(dataArray2);
                                }
                                }
                                if( obj2['text']!=''){
     dataArray2.push(obj2);
   }
     console.log(dataArray2);
  });

  





     



});





