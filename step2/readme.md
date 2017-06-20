#模块接口module.exports浅析

###在写node.js代码时，我们经常需要自己写模块(module)。同时还需要在模块最后写好模块接口，声明这个模块对外暴露什么内容。实际上，node.js的模块接口有多种不同写法：

#### 1、 返回一个JSON Object 
>
    // MATH.js
    var MATH = {
        "pi": 3.14,
        "e": 2.72,
    };
    module.exports = MATH;

这种方式可以用于返回一些全局共享的常量或者变量，调用方式为：
>
    var MATH = require("./MATH")
    console.log(MATH.pi);

这种方式还可以用于返回几个require的其他模块，可以实现一次require多个模块
>
    // module_collection.js
    var module_collection = {
        "module1": require("./module1"),
        "module2": require("./module2"),
    };
    module.exports = module_collection;
调用方式为： 
>
    var module_collection = require("./module_collection");
    var module1 = module_collection.module1;
    var module2 = module_collection.module2;
    // Do something with module1 and module2   
其实这种方式还有个变种，如下，通常可以返回几个函数： 
>
    // functions.js
    var func1 = function() {
        console.log("func1");
    };
    var func2 = function() {
        console.log("func2");
    };
    exports.function1 = func1;
    exports.function2 = func2;
调用方式为：
>
    var functions = require("./functions");
    functions.function1();
    functions.function2();    

#### 2、 返回一个构造函数，也就是一个类     
示例：
>
    // CLASS.js
    var CLASS = function(args) {
        this.args = args;
    }
    CLASS.prototype.func = function() {
        console.log("CLASS.func");
        console.log(this.args);
    };
    module.exports = CLASS; 
调用方法为：
>
    var CLASS = require("./CLASS")
    var c = new CLASS("arguments");

#### 3、 返回一个普通函数   
示例：
>
    // func.js
    var func = function() {
        console.log("this is a testing function");
    };
    module.exports = func; 
调用方法为：
>
    var func = require("./func");
    func();

#### 4、 返回一个对象object   
示例：
>
    // CLASS.js
    var CLASS = function() {
        this.say_hello = "hello";
    };
    CLASS.prototype.func = function() {
        console.log("I say " + this.say_hello);
    };
    module.exports = new CLASS();
调用方法为：
>
    var obj = require("./CLASS");
    obj.func();




