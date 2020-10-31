"use strict";

var moment = require('moment');

module.exports = {
  select: function select(selected, options) {
    return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$&selected="selected"');
  },
  generateDate: function generateDate(date, format) {
    return moment(date).format(format);
  },
  paginate: function paginate(options) {
    var output = '';

    if (options.hash.current === 1) {
      output += "<li class=\"page-item disabled\"><a class=\"page-link\">First</a></li>";
    } else {
      output += "<li class=\"page-item\"><a href=\"?page=1\" class=\"page-link\">First</a></li>";
    } //if current page i greater than 5 then show dot


    var i = Number(options.hash.current) > 5 ? Number(options.hash.current) - 4 : 1;

    if (i !== 1) {
      output += "<li class=\"page-item disabled\"><a class=\"page-link\">...</a></li>";
    }

    for (; i <= Number(options.hash.current) + 4 && i <= options.hash.pages; i++) {
      if (i === options.hash.current) {
        output += "<li class=\"page-item active\"><a class=\"page-link\">".concat(i, "</a></li>");
      } else {
        output += "<li class=\"page-item\"><a href=\"?page=".concat(i, "\" class=\"page-link\">").concat(i, "</a></li>");
      } //add dot before last page


      if (i === Number(options.hash.current) + 4 && i < options.hash.pages) {
        output += "<li class=\"page-item disbaled\"><a class=\"page-link\">...</a></li>";
      }
    } //if page at the end


    if (options.hash.current === options.hash.pages) {
      output += "<li class=\"page-item disabled\"><a class=\"page-link\">Last</a></li>";
    } else {
      output += "<li class=\"page-item\"><a href=\"?page=".concat(options.hash.pages, "\" class=\"page-link\">Last</a></li>");
    }

    return output; //console.log(options);
  }
};