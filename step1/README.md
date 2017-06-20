#搭建本地http服务器

#### 1、创建服务器
>
    var http = require('http');
    http.createServer(function (request, response) {        
      
    })
    
#### 2、解析请求，包括文件名
>
    var http = require('http');
    var url = require('url');
    http.createServer(function (request, response) {  
    
        var pathname = url.parse(request.url).pathname;
    })
    
#### 3、输出请求的文件名
>
    var http = require('http');
    var url = require('url');
    var server = http.createServer(function (request, response) {  
        var pathname = url.parse(request.url).pathname;
        
        console.log("Request for " + pathname + " received.");
    })
    
#### 4、从文件系统中读取请求的文件内容
>
    var http = require('http');
    var url = require('url');
    var server = http.createServer(function (request, response) {  
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                // HTTP 状态码: 404 : NOT FOUND
                // Content Type: text/plain
                response.writeHead(404, {'Content-Type': 'text/html'});
            }else{	         
                // HTTP 状态码: 200 : OK
                // Content Type: text/plain
                response.writeHead(200, {'Content-Type': 'text/html'});	
            
                // 响应文件内容
                response.write(data.toString());		
            }
            //  发送响应数据
            response.end();
        });   
    });
   
#### 5、监听
>    
    server.listen(8080);
       