const Jwt = require('../config/token')

function toUserInfo(token) {
  let jwt = new Jwt();
  let result = jwt.checkToken(token);
  if (result instanceof Error) return result;
  return result;
}

const deepClone = (data) =>  {
  var type = getObjType(data);
  var obj;
  if (type === 'array') {
      obj = [];
  } else if (type === 'object') {
      obj = {};
  } else {
      //不再具有下一层次
      return data;
  }
  if (type === 'array') {
      for (var i = 0, len = data.length; i < len; i++) {
          obj.push(deepClone(data[i]));
      }
  } else if (type === 'object') {
      for (var key in data) {
          obj[key] = deepClone(data[key]);
      }
  }
  return obj;
};
const getObjType = obj => {
  var toString = Object.prototype.toString;
  var map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
  };
  return map[toString.call(obj)];
};
function sortCountCaptureIp(list = []) {
  let obj = {};
  list.forEach(item => {
    if(obj[`${item.TargetIp}`]) {
      obj[`${item.TargetIp}`].value++;
    } else {
      obj[`${item.TargetIp}`] = {};
      obj[`${item.TargetIp}`].value = 1;
      obj[`${item.TargetIp}`].name = `${item.TargetIp}`;
    }
  })
  let result = [];
  Object.keys(obj).forEach(item => {
    result.push(obj[item]);
  })
  // if(result.length > 10) {
  //   result = result.slice(0, 10); 
  // }
  return result.sort(function(a, b) {
    return b.value - a.value;
  })
}
module.exports = {
  toUserInfo,
  deepClone,
  sortCountCaptureIp
}