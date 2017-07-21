window.$ = window.jQuery = require('jquery');
require("jquery-sticky");
let storage = require('local-storage-fallback');
let Typed = require("typed.js");
let previousColor = storage.getItem("previousColor");
let colors = ['red', 'green', 'blue', 'purple'];
let indexPreviousColor = colors.indexOf(previousColor);
if (indexPreviousColor > -1) {colors.splice(indexPreviousColor, 1);}
let randomColor = colors[Math.floor(Math.random() * colors.length)];
storage.setItem("previousColor", randomColor);

let manConsoleScrolledIntoView = false;

$(document).ready(function(){
  $(".randomColor").addClass(randomColor);
  $(".randomColorBackground").addClass(randomColor);
  $(".randomColorMenu").addClass(randomColor);
  $("#navigation").sticky({topSpacing:0,bottomSpacing:0,zIndex:2});
  $('#navigation').on('sticky-start', function() {
    $("#nav-logo").removeClass('hidden');
  });
  $('#navigation').on('sticky-end', function() {
    $("#nav-logo").addClass('hidden');
  });
  $('#expand-man-console').click(function(){
    $('#man-console .body').css('height', 'auto');
    $(this).parent().addClass('hidden');
    $(this).parent().next().removeClass('hidden');
  });
  $('.revealExcerpt').click(function(){
    $(this).next().removeClass('hidden');
  });
  $('.hideExcerpt').click(function(){
    $(this).parent().addClass('hidden');
  });
  $('#menu-button button').click(function(){
    var display = 'block';
    if($(this).hasClass("is-active")){
      display = 'none';
    }
    $(this).toggleClass('is-active');
    $('.mobile-menu').css('display', display);
  });

});

var typed = new Typed("#typed", {
  stringsElement: '#typed-strings',
  typeSpeed: 100,
  loop: false,
  cursorChar: '',
  onComplete: function(self) {
    setTimeout(function(){
      $('#man-console .body .custom-typed-cursor').addClass('hidden');
      $('.man-result').removeClass('hidden');
    }, 250);
  }
});
typed.stop();


$(window).scroll(function(){
  function elementScrolled(elem)
  {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top + 60;
    return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
  }
  if(!manConsoleScrolledIntoView && elementScrolled('#man-console')) {
    manConsoleScrolledIntoView = true;
    typed.start();
  }
});


$('a[href^="#"]').on('click', function(event) {
  console.log(event);
  var target = $(this.getAttribute('href'));
  if( target.length ) {
    event.preventDefault();
    var navHeight = ($('#navigation').height() + $('.mobile-menu').height());
    $('html, body').stop().animate({
      scrollTop: target.offset().top - (navHeight + 15)
    }, 1000);
  }
});