/**
 * exports模块接口的使用，并在main.js中通过require('./file')加载这个模块 *
 **/

var fs = require("fs");

/**
 * 方法一：多个对象分开写 *
 **/
//1、单独写：
exports.createFile = function(file) {
    fs.mkdir(file+"/",function(err){
        if (err) {
            return console.error(err);
        }
        console.log("目录创建成功。");
    });
};
exports.createMsg = function(data) {
    console.log(data);
};
//2、分开写
function createFile(file) {
    fs.mkdir(file+"/",function(err){
        if (err) {
            return console.error(err);
        }
        console.log("目录创建成功。");
    });
}
function createMsg(data) {
    console.log(data);
}
exports.createFile = createFile;
exports.createMsg = createMsg;


/**
 * 方法二：多个对象封装到一个对象 *
 **/
//有时候我们只是想把一个对象封装到模块中，格式如下：
//1、普通函数的写法：
function opFile() {
    this.createMsg = function(data) {
        console.log(data);
    };
    this.createFile = function(file) {
        fs.mkdir(file+"/",function(err){
            if (err) {
                return console.error(err);
            }
            else{
                console.log("目录创建成功。");
            }
        });
    };
}
//2、构造函数的写法：
var opFile = function(args) {
    this.args = args;
};
opFile.prototype.createMsg = function(data) {
    console.log(data);
    console.log(this.args);
};
opFile.prototype.createFile = function(file) {
    fs.mkdir(file+"/",function(err){
        if (err) {
            return console.error(err);
        }
        else{
            console.log("目录创建成功。");
        }
    });
};
module.exports = opFile;