var pad = $('#nav_f').height();

$(document).ready(function()
{
  $(".button-collapse").sideNav();
  $('.scrollspy').scrollSpy();

  $('ul.tabs').tabs();




});

$(window).scroll(function () {
  var s = $(window).scrollTop(),
        d = $(document).height(),
        c = $(window).height();
        scrollPercent = (s / (d-c)) * 100;
        var position = scrollPercent;
   $("#progress").attr('value', position);
});

$( ".navlink" ).click(function() {
  $('.button-collapse').sideNav('hide');
});
