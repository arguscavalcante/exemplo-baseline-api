/*
 * This short script is only for generating data in a JSON file.
 *
 * Usage:
 *    node app.js # in the app dir
 *    node generate-inventory.js # in this dir
 */

var fs = require('fs');
var path = require('path');
var inventory = [];
var request = require('request');

request('http://exemplo-baseline-api.mybluemix.net/api/cars', {json: true},
  function(err, res, cars) {
    if (err) {
      console.error('Cannot get Cars', err);
      return;
    }
  });

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
