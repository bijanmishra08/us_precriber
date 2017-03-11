var url="api/predict";


function dropzone(){

	 $('#my-awesome-dropzone').dropzone({ 
            maxFilesize: 5,
            addRemoveLinks: true,
            dictResponseError: 'Server not Configured',
            acceptedFiles: ".csv",
    init: function() {
      
      this.on('success', function(file, json) {
		  
		  
         
			 
			resetFilter(); 
			hideForm();
		    $("#tbody tr").remove();

			CSVtoServer(file);
		 
		  
		  $("#uploadimg").click(function(){
				
			setTimeout(function(){$("#my-awesome-dropzone").trigger("click");},100)
			
	     })
			 
			 
	  
	  });
      
      this.on('addedfile', function(file) {
         // alert("addedfile");
	 
      });
      
      this.on('drop', function(file) {
         // alert('file');
		//showForm();
		$('#my-awesome-dropzone').hide();
		
      });
	  
	   this.on('error', function(file, response) {
            //$(file.previewElement).find('.dz-error-message').text(response);
			alert("error");
		});
	  
    }
  });
  



}

var GlobalData;

function CSVtoServer(file,url){
  
  $.ajax({
    url: url,
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    data:file ,
    processData: false,
    success: function( data ){
		activeBox();
		var noofRowTofilter=$("#rowToFilter").val();
		
		
		var tempData=data.data;
		
		tempData.forEach(function(d,i){
				 
				  d.splice(0, 0, i);
	     });
		 
		 var col = data.columns;
		 
		 col= col.splice(0, 0, null);
			 
		
		
		GlobalData=tempData.splice(0, 0, col);
		
		StartFilter(GlobalData);
	 
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
    },
    error: function( jqXhr, textStatus, errorThrown ){
        console.log( errorThrown );
    }
});
	 
	 

	 
	 

}



