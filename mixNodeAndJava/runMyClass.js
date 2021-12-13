const java = require("java");
java.classpath.push("./src");
java.classpath.push('java.io.File');
java.classpath.push('java.util.ArrayList');
java.classpath.push('java.util.List');
java.classpath.push('../lib/fastjson-1.2.49.jar');
java.classpath.push('../lib/jpcap.jar');
//let MyClass = java.import("com.cn.test.PathToTree");
//console.log(MyClass);
//let result = MyClass.DDDSync("C:\\Windows\\debug");
//console.log(result);

//MyClass.showJP();

let MyClass = java.import("com.PathToTree");
//console.log(MyClass);
let res = MyClass.showJPSync();
//setInterval(() => {
//	console.log(res);
//}, 3000)
//console.log(res[0].addresses[0].address);
//console.log(MyClass.getInfoArrSync());
module.exports = MyClass;
