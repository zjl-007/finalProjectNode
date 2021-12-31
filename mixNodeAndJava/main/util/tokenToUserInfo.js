const Jwt = require('../config/token')

function toUserInfo(token) {
  let jwt = new Jwt();
  let result = jwt.checkToken(token);
  if (result instanceof Error) return result;
  return result;
}


module.exports = {
  toUserInfo,
}