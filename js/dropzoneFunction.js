var url="api/predict";


var GlobalData;

function dropzone(){

     $('#my-awesome-dropzone').dropzone({ 
            maxFilesize: 5,
            addRemoveLinks: true,
            dictResponseError: 'Server not Configured',
            acceptedFiles: ".csv",
    init: function() {
		
		
		
      
      this.on('success', function(file, response) {
            resetFilter(); 
            hideForm();
            $("#tbody tr").remove();

           //# CSVtoServer(file);
           handleResponse(response);
          
          $("#uploadimg").click(function(){
                
            setTimeout(function(){$("#my-awesome-dropzone").trigger("click");},100)
            
         })
             
             
      
      });
      
      this.on('addedfile', function(file) {
         // alert("addedfile");
		 
		 $("#mask").show();
		
     
      });
      
      this.on('drop', function(file) {
         // alert('file');
        //showForm();
        $('#my-awesome-dropzone').hide();
		
		$("#mask").show();
        
      });
      
       this.on('error', function(file, response) {
		   
		   $("#mask").hide();
            //$(file.previewElement).find('.dz-error-message').text(response);
            alert("error");
        });
      
    }
  });
  



}

function setRowData(data){
	
	 $("#rowToFilter").val('500');
	 
	 $("#totalDataLen").html(data.length-1);
	
	
}

function handleResponse(response){
  console.log(response);
    activeBox();
   /* var noofRowTofilter=$("#rowToFilter").val();
    var tempData = response.data;
    var col = response.columns;
    tempData.forEach(function(d,i){ d.splice(0, 0, i); });
    console.log("tempData");
    console.log(tempData);
    col.unshift(null);
    console.log("col");
    console.log(col);
    tempData.splice(0, 0, col);
    GlobalData = tempData;
    console.log("GlobalData 1:");
    console.log(GlobalData);*/
	
	
	
	
	
	GlobalData=jsonData;
	
	setRowData(GlobalData);
	
    StartFilter(GlobalData);


    console.log("GlobalData 2:");
    console.log(GlobalData);
    $("#rowToFilter").keyup(function(){
             setTimeout(function(){
                StartFilter(GlobalData);

             },200)

        });



         $("#confidVal1").keyup(function(){

                 setTimeout(function(){
            StartFilter(GlobalData);

         },200)
         });

          $("#confidVal2").keyup(function(){

                 setTimeout(function(){
                    StartFilter(GlobalData);

                },200)
            });


}
