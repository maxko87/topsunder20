Tops = new Meteor.Collection("tops")

if (Meteor.isClient) {

  // setup Google Analytics
  // To log an event, e.g.:
  // window._gaq.push(['_trackEvent','FAQ','Click',Session.get('server_id')]);
  GAQ_ACCOUNT = 'UA-46866521-1'
  Template.products.created = function() {
    if (!window._gaq) {
      window._gaq = [];
      var pluginUrl = 
       '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
      _gaq.push(['_require', 'inpage_linkid', pluginUrl]);
      _gaq.push(['_setAccount', GAQ_ACCOUNT]);  
      if (!Session.get('pageview_tracked')) {
        _gaq.push(['_trackPageview']);      
      }
      Session.set('pageview_tracked',true); // prevent hot code push from tracking another pageview

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    }
  };

  WebFontConfig = {
    google: { families: [ 'Playfair+Display:400,400italic', 'Montserrat' ] }
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

  Meteor.startup(function(){
    var loadScript = function() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      // script.src = 'http://zinc.io/zinc_checkout/checkout.js';
      script.src = 'https://dl.dropboxusercontent.com/spa/qjopb1dsqoaxdqh/zinc_checkout/checkout.js'
      script.id = "zinc-checkout"
      document.body.appendChild(script);
    };
    window.onload = loadScript();
  });
}

var reloadTops1 = function(){
  console.log("reloading 1");
  var sys = Npm.require('sys');
  sys.exec('casperjs test indexer.js; casperjs test indexer2.js');
};


var reloadTops2 = function(){
  console.log("reloading 2");
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

  var MyCron = new Cron(1000*60*60*6); // 6 hours
  MyCron.addJob(1, function() {
    reloadTops1();
  });
  MyCron.addJob(1, function() {
    reloadTops2();
  });
}
