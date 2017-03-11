var http = require('http'),
    fs = require('fs');
	
	var path = require('path');


/*fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8080);
});*/




http.createServer(function (request, response) {
	//console.log("server started");
	
	var filePath =request.url;
    
    
    
	if (filePath == "/"){
			filePath = "./index.html";
		
	}else{
		
		
		filePath="."+filePath;
	}
	
	
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
	case '.js':
		contentType = 'text/javascript';
		break;
	case '.css':
		contentType = 'text/css';
		break;
	case '.json':
		contentType = 'application/json';
		break;
	}
	
	console.log(filePath);
	fs.exists(filePath, function (exists) {
		
		console.log(exists);
		if (exists) {
			fs.readFile(filePath, function (error, content) {
				if (error) {
					response.writeHead(505);
					response.end();
				} else {
					
					response.writeHead(200, {
							'Content-Type' : contentType
						});
						response.end(content, 'utf-8');
					
					
				}

			})			
			
		} else {
			console.log("server response");
			response.writeHead(404);
			response.end();
		}
	});
}).listen(7000);