var prelim_tops = require('../../private/prelim_tops.json');
var fs = require('fs'); 

var casper = require('casper').create({
  clientScripts: ["../../client/lib/jquery.js"]
});
casper.on('remote.message', function(msg) {
  if (msg.indexOf("zinc") > -1){
    this.echo(msg);
  }
});

final_tops = {'items': []};

casper.start().each(prelim_tops['items'], function(casper, item){
  casper.thenOpen(item.prelim_link);
  casper.then(function(){
    item['link'] = casper.evaluate(function() {
      new_link = document.querySelector('body').textContent;
      return new_link;
      console.log("zinc: " + new_link);
    });
    final_tops['items'].push(item);
  });
});

// for (var i=0; i<prelim_tops['items'].length; i++){
//   item = prelim_tops['items'][i];
//   casper.thenOpen(item.prelim_link);
//   casper.then(function(){
//     item['link'] = casper.evaluate(function() {
//       new_link = document.querySelector('body').textContent;
//       return new_link;
//       console.log("zinc: " + new_link);
//     });
//     final_tops['items'].push(item);
//   });
// }
 
casper.then(function(){
  fs.write('../../private/tops.json', JSON.stringify(final_tops));
});

casper.run();