var moment = require('moment');
var createdAt = 1234;
var date = moment(createdAt);
var someTimestamp = moment().valueOf();
console.log(someTimestamp);

console.log(date.format('DD MMM YYYY'));
console.log(date.format('h:mm a'));