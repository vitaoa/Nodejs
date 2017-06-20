# 创建客户端与服务器端（HTTP）

+ 创建 Web 服务器
>
    **以下是演示一个最基本的 HTTP 服务器架构(使用8081端口)，创建 server.js 文件，代码如下所示：**
    
    var http = require('http');
    var fs = require('fs');
    var url = require('url');    
    
    // 创建服务器
    http.createServer( function (request, response) {  
       // 解析请求，包括文件名
       var pathname = url.parse(request.url).pathname;
       
       // 输出请求的文件名
       console.log("Request for " + pathname + " received.");
       
       // 从文件系统中读取请求的文件内容
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
    }).listen(8081);
    
    // 控制台会输出以下信息
    console.log('Server running at http://127.0.0.1:8081/');
    
    **接下来我们在该目录下创建一个 index.htm 文件，代码如下：**
    <html>
        <head>
            <title>Sample Page</title>
        </head>
        <body>
            Hello World!
        </body>
    </html>
    
    **执行 server.js 文件：**
    接着我们在浏览器中打开地址：http://127.0.0.1:8081/index.html即可:

+ 创建 Web 客户端
>
    **创建 client.js 文件，代码如下所示：**
    
    var http = require('http');    
    
    // 用于请求的选项
    var options = {
       host: 'localhost',
       port: '8081',
       path: '/index.html'  
    };
    
    // 处理响应的回调函数
    var callback = function(response){
       // 不断更新数据
       var body = '';
       response.on('data', function(data) {
          body += data;
       });
       
       response.on('end', function() {
          // 数据接收完成
          console.log(body);
       });
    }
    // 向服务端发送请求
    var req = http.request(options, callback);
    req.end();
    
    **新开一个终端，执行 client.js 文件，输出结果如下：**
    <html>
        <head>
            <title>Sample Page</title>
        </head>
        <body>
            Hello World!
        </body>
    </html>
    **同时，执行 server.js 的控制台输出信息如下：**
    Server running at http://127.0.0.1:8081/
    Request for /index.html received.   # 客户端请求信息