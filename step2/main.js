var fs = require("fs");
var data = '目录存在，可以在此目录下进行操作。';
var _filename = 'unzip';
var file = require('./file');
file = new file();

// console.log(file);
fs.stat(_filename, function (err, stats) {
    if(!stats){
        //目录不存在，创建目录
        return file.createFile(_filename);
    }
    if(err){
        return console.error(err);
    }
    file.createMsg(data);

    //检测文件类型
    // console.log("是否为文件(isFile) ? " + stats.isFile());
    // console.log("是否为目录(isDirectory) ? " + stats.isDirectory());
});
