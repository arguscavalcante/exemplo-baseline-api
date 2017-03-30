/**
 * Run `node import.js` to import the sample data into the db.
 */

var async = require('async');

// sample data
// var cars = require('./cars.json');
// var users = require('./users.json');
//var inventory = require('./inventory.json');
//var locations = require('./locations.json');

module.exports = function(app, cb) {
  // var User = app.models.user;
//  var Location = app.models.Location;
//  var Customer = app.models.Customer;
  // var Car = app.models.Car;
  var db = app.dataSources.db;
 
  var ids = {
  };

  function importData(Model, data, cb) {
    console.log('Importing data for ' + Model.modelName);
    Model.destroyAll(function(err) {
      if (err) {
        cb(err);
        return;
      }
      async.eachLimit(data, 3, function(d, callback) {
          var data = new Date();        
          var s = data.getMilliseconds();

              d.id = ids[Model.modelName]++;
              Model.create(d, callback);
        
        // d.id = ids[Model.modelName]++;
        // Model.create(d, callback);
      }, cb);
    });
  }

  async.series([
    function(cb) {
      db.autoupdate(cb);
    },

//    importData.bind(null, Location, locations),
  //  importData.bind(null, Car, cars)//,
  //  importData.bind(null, User, users)//,
//    importData.bind(null, Customer, customers)
  ], function(err/*, results*/) {
    cb(err);
  });
};

if (require.main === module) {
  // Run the import
  module.exports(require('../server'), function(err) {
    if (err) {
      console.error('Cannot import sample data - ', err);
    } else {
      console.log('Sample data was imported.');
    }
  });
}
