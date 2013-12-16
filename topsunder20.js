Tops = new Meteor.Collection("tops")

if (Meteor.isClient) {
  
  WebFontConfig = {
    google: { families: [ 'Lato:400,700,900,400italic:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })(); 

  Template.products.products = function() {
    return Tops.find({}, {});
  };


  // Template.hello.greeting = function () {
  //   return "Welcome to topsunder20.";
  // };

  // Template.hello.events({
  //   'click input' : function () {
  //     // template data, if any, is available in 'this'
  //     if (typeof console !== 'undefined')
  //       console.log("You pressed the button");
  //   }
  // });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Tops.find().count() == 0){
      var links = ["http://www1.macys.com/shop/product/karen-scott-three-quarter-sleeve-cable-knit-sweater?ID=970072&CategoryID=24118",
        "http://www1.macys.com/shop/product/style-co-top-long-sleeve-mock-turtleneck?ID=970754&CategoryID=24118",
        "http://www1.macys.com/shop/product/style-co-top-three-quarter-sleeve-floral-print-drop-waist?ID=961707&CategoryID=24118",
        "http://www1.macys.com/shop/product/alfani-top-three-quarter-sleeve-printed-v-neck?ID=1000122&CategoryID=24118",
        "http://www1.macys.com/shop/product/style-co-top-three-quarter-sleeve-printed-bustle-back?ID=1000074&CategoryID=24118",
        "http://www1.macys.com/shop/product/style-co-top-three-quarter-sleeve-embellished-back-cutout?ID=1000068&CategoryID=24118",
        "http://www1.macys.com/shop/product/karen-scott-three-quarter-sleeve-striped-top?ID=1028014&CategoryID=24118",
        "http://www1.macys.com/shop/product/ellen-tracy-three-quarter-sleeve-sheer-studded-blouse?ID=836490&CategoryID=24118",
        "http://www1.macys.com/shop/product/style-co-top-three-quarter-sleeve-embellished-printed-back?ID=1126502&CategoryID=24118"];
      var imgs = ["http://slimages.macys.com/is/image/MCY/products/6/optimized/1694966_fpx.tif",
        "http://slimages.macys.com/is/image/MCY/products/1/optimized/1762971_fpx.tif",
        "http://slimages.macys.com/is/image/MCY/products/7/optimized/1703887_fpx.tif",
        "http://slimages.macys.com/is/image/MCY/products/8/optimized/1795698_fpx.tif",
        "http://slimages.macys.com/is/image/MCY/products/6/optimized/1695946_fpx.tif",
        "http://slimages.macys.com/is/image/MCY/products/7/optimized/1324047_fpx.tif",
        "http://slimages.macys.com/is/image/MCY/products/1/optimized/1776231_fpx.tif",
        "http://slimages.macys.com/is/image/MCY/products/3/optimized/1776223_fpx.tif",
        "http://slimages.macys.com/is/image/MCY/products/5/optimized/1753605_fpx.tif"];
      for (var i=0; i<links.length; i++){
        Tops.insert({link: links[i], img: imgs[i]});
      }
    }
  });
}
