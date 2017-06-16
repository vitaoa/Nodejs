var PORT = 3000;

var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('../mine').types;
var path=require('path');

// console.log(url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash'));

// 创建服务器
var server = http.createServer(function (request, response) {

    // 解析请求，包括文件名
    var pathname = url.parse(request.url).pathname;
    var realPath = path.join("assets", pathname);
    realPath = url.parse(realPath).pathname;

    // 输出请求的文件名
    console.log("Request for " + realPath + " received.");

    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';

    fs.exists(realPath, function (exists) {
        if (!exists) {
            // HTTP 状态码: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {
                'Content-Type': 'text/html'
            });
            // response.write("This request URL " + realPath + " was not found on this server.");
            response.end("This request URL " + realPath + " was not found on this server.");
        } else {
            // 获得HTTP请求的method和url:
            console.log(request.method +":"+ request.url);

            //加入默认访问index.html的功能
            if (realPath.charAt(realPath.length - 1) == "/") {
                //如果访问目录
                realPath += "index.html"; //指定为默认网页
            }

            // 从文件系统中读取请求的文件内容
            fs.readFile(realPath,'utf-8', function (err, data) {
                if (err) {
                    console.log("请求错误提示:"+err);
                    response.writeHead(500, {
                        'Content-Type': 'text/html'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/html";
                    response.writeHead(200, {'Content-Type': contentType});

                    // 响应文件内容
                    response.write(data);
                }
                //  发送响应数据，停止输出内容
                response.end();
            });
        }
    })

});
server.listen(PORT);

// 控制台会输出以下信息
console.log("Server runing at port: " + PORT + ".");