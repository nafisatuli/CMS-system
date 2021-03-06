"use strict";

$(function () {
  $.getJSON('api', updateFeedback);

  function updateFeedback(data) {
    var output = '';
    $.each(data, function (key, item) {
      output += '     <div class="feedback-item item-list media-list">';
      output += '       <div class="feedback-item media">';
      output += '       <div class="media-left"><button class ="feedback-delete btn btn-xs btn-danger"><span id ="' + key + '"class="glyphicon glyphicon-remove"></span></button></div>';
      output += '         <div class="feedback-info media-body">';
      output += '           <div class="feedback-head">';
      output += '             <div class="feedback-title">' + item.title + '<small class="feedback-name label label-info"></small></div>';
      output += '           </div>';
      output += '           <div class="feedback-message">' + item.message + '</div>';
      output += '         </div>';
      output += '       </div>';
      output += '     </div>';
    });
    $('.feedback-message').html(output);
  }
});