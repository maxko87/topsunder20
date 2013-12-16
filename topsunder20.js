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
      var fs = Npm.require('fs');
      var sys = Npm.require('sys');
      var exec = Npm.require('child_process').exec;
      fs.readFile(process.env.PWD + '/public/tops.json', Meteor.bindEnvironment(
        function(err, data){
          if (err) throw err;
          tops = JSON.parse(data);
          items = tops.items;
          for (var i=0; i<items.length; i++){
            Tops.insert({link: items[i].link, img: items[i].img, name: items[i].name, orig_price: items[i].orig_price, new_price: items[i].new_price});
          }
        },
        function(e){
          console.log('bind failure');
        }
      ));
    }
  });
}
