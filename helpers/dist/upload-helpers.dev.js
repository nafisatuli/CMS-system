"use strict";

var path = require('path');

module.exports = {
  uploadDir: path.join(__dirname, '../public/uploads/'),
  isEmpty: function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }

    return true;
  }
};