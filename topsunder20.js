Tops = new Meteor.Collection("tops")

if (Meteor.isClient) {

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-46866521-1', 'topsundertwenty.com');
  ga('send', 'pageview');

  WebFontConfig = {
    google: { families: [ 'Lato:400,700,900,400italic:latin', 'IM+Fell+Great+Primer:400,400italic:latin' ] }
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

  Template.product.notouch = function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(navigator.userAgent) ) {
      return "no-touch";
    }
    return "";
  }

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

var reloadTops1 = function(){
  console.log("reloading 1");
  var sys = Npm.require('sys');
  sys.exec('casperjs test indexer.js; casperjs test indexer2.js');
};


var reloadTops2 = function(){
  Tops.remove({});
  var tops = JSON.parse(Assets.getText('tops.json'));
  items = tops.items;
  for (var i=0; i<items.length; i++){
    Tops.insert({link: items[i].link, img: items[i].img, name: items[i].name, orig_price: items[i].orig_price, new_price: items[i].new_price});
  }
};

if (Meteor.isServer) {
  console.log('starting server');
  Meteor.startup(function () {
    if (Tops.find().count() == 0){
      reloadTops2();
    }
  });

  var MyCron = new Cron(1000*60*60*1); //one hour
  MyCron.addJob(1, function() {
    reloadTops1();
  });
  MyCron.addJob(1, function() {
    reloadTops2();
  });
}
