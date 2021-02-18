$(function() {

  var body = $('body');


  /* Cookie manager - MDN
  -------------------------------------------------------------------------- */
  var docCookies={getItem:function(a){return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(a).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null},setItem:function(a,b,c,d,e,f){if(!a||/^(?:expires|max\-age|path|domain|secure)$/i.test(a))return!1;var g="";if(c)switch(c.constructor){case Number:g=1/0===c?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+c;break;case String:g="; expires="+c;break;case Date:g="; expires="+c.toUTCString()}return document.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+g+(e?"; domain="+e:"")+(d?"; path="+d:"")+(f?"; secure":""),!0},removeItem:function(a,b,c){return a&&this.hasItem(a)?(document.cookie=encodeURIComponent(a)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(c?"; domain="+c:"")+(b?"; path="+b:""),!0):!1},hasItem:function(a){return new RegExp("(?:^|;\\s*)"+encodeURIComponent(a).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var a=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),b=0;b<a.length;b++)a[b]=decodeURIComponent(a[b]);return a}};


  /* Cookies notification
  -------------------------------------------------------------------------- */
  if(!docCookies.hasItem('myday-cookie-policy')) {
    $('.top-cookies').removeClass('hide');
  }

  $('.top-cookies').on('click', '.top-cookies-close', function(){
    docCookies.setItem('myday-cookie-policy', 'hide', Infinity);
    $('.top-cookies').addClass('hide');
  });



  /* Simple nav & user case testing
  -------------------------------------------------------------------------- */
  //$('header').on('click', 'a', function(e){
  $('a').on('click', function(e){
    var loc = e.target.hash.substr(1);
    if(loc) {
      if(loc == 'contact-us') return;
      // e.preventDefault();
      // window.location.href = e.target.hash;

      body.removeClass('home why-myday engagement download facilitating features beta-sign-up');
      body.addClass(loc);

      $('section').hide();
      $('section[class*="'+loc+'-"]').show();
    }
  });

  var loc = location.hash.substr(1) || 'home';
  $('header').find('[href*="'+loc+'"]').trigger('click');

  $('.debug')
    .on('click', 'a', function(e){
      loc = $(this).attr("class");
      body.removeClass('logged-out logged-in logged-in-tenant logged-in-global');
      body.addClass(loc);
    })
    .on('click', 'span', function(){
      docCookies.removeItem('myday-cookie-policy');
    });


  /* Form fixes
  -------------------------------------------------------------------------- */
  function colorizeSelect() {
    if(!$(this).val()) $(this).addClass('empty');
    else $(this).removeClass('empty')
  }

  $('#beta-sign-up-type')
    .on('change keyup', colorizeSelect)
    .change();


  /* Other stuff
  -------------------------------------------------------------------------- */
  $('a[data-toggle="tooltip"]').tooltip();

});
