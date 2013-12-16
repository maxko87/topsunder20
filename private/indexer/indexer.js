var casper = require('casper').create();
var fs = require('fs'); 

casper.start('http://www1.macys.com/shop/womens-clothing/womens-clearance?id=24118&edge=hybrid#!fn=DEPARTMENT_TYPE%3DTops%26PRICE%3D0%7C20%26sortBy%3DTOP_RATED%26productsPerPage%3D100&!qvp=iqvp')

casper.on('remote.message', function(msg) {
    this.echo(msg);
});

casper.then(function() {
  var res = this.evaluate(function() {
    items = document.querySelectorAll('.innerWrapper');
    img_prefix = "http://slimages.macys.com/is/image/MCY/products/";
    var results = {'items': []};
    for (var i=0; i<items.length; i++) {
      try {
        link = items[i].children[1].children[0].href;
        console.log(link);

        img_suffix = items[i].children[1].children[0].children[0].innerText;
        console.log(img_suffix);

        name = items[i].children[2].children[0].innerText;
        console.log(name);

        prices = items[i].children[3];
        orig_price_text = prices.children[0].innerText;
        orig_price = (parseFloat(orig_price_text.replace( /\D+/g, ''))/100.0).toFixed(2);
        console.log(orig_price);

        new_price_text = prices.children[prices.children.length-3].innerText;
        new_price = (parseFloat(new_price_text.replace( /\D+/g, ''))/100.0).toFixed(2);
        console.log(new_price);

        console.log('\n');

        results['items'].push({'link': link, 'img': img_prefix+img_suffix, 'name': name, 'orig_price': orig_price, 'new_price': new_price});
      }
      catch (e){}
    }

    return JSON.stringify(results);
  });

  fs.write('../../public/tops.json', res); 


});

casper.run();