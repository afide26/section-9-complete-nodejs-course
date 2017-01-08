
var moment                  = require('moment');
var messageGenerator        = (from, text)=>{
  return{
    from: from,
    text:text,
    createdAt: moment().valueOf()
  }
};

var generateLocationMessage = (from, latitude, longitude)=>{
  return{
    from: from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  }
};
module.exports = {messageGenerator, generateLocationMessage};