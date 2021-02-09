const path = require('path');

var Barc = require('barcode-generator')
,barc = new Barc()
,fs = require('fs');

//create a 300x200 px image with the barcode 1234
var buf = barc.code128('1234', 300, 200);
fs.writeFile(__dirname + '/example.png', buf, function(){
console.log('wrote it');
});