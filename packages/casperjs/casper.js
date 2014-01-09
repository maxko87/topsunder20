var casperjs = Npm.require('casperjs'), path = Npm.require('path');
process.env.PATH += ':' + path.dirname(casperjs.path);
