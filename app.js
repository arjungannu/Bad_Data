
$(document).ready(


//input CSV to JSON
function () {
    var csv = $("#fileUpload").val();
var aa='';
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
    var s1=jc(aa);
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
    var row = $("<tr />")
    $("#bad_data").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.name + "</td>"));
    row.append($("<td>" + rowData.city + "</td>"));
    row.append($("<td>" + rowData.phone + "</td>"));
}


});





