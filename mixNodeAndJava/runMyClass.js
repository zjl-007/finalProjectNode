const java = require("java");
java.classpath.push("./src");
java.classpath.push('java.io.File');
java.classpath.push('java.util.ArrayList');
java.classpath.push('java.util.List');
java.classpath.push('../lib/fastjson-1.2.49.jar');
java.classpath.push('../lib/jpcap.jar');
//let MyClass = java.import("com.cn.test.PathToTree");

let MyClass = java.import("com.PathToTree");
//let res = MyClass.showJPSync();
module.exports = MyClass;
