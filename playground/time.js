var moment = require('moment');

// 1st jan 1970 00:00:00 am
// stored in UTC (time zone independent)

// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());

// var date = moment();
// date.add(100, 'years').subtract(9, 'months');
// console.log(date.format('Do MMM, YYYY'));
// console.log(date.format('h:mm a'));

//new Date().getTime();
var someTimestamp = moment().valueOf();

var createdAt = 123;
var date = new moment(createdAt);
console.log(date.format('h:mm a'));