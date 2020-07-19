import '../sass/style.scss'
import { loadImages } from './libs/imgs'

  loadImages()

  var html = document.querySelector('html')
  // var viewport = $(window);

  /* ==========================================================================
     Menu
     ========================================================================== */

  function menu() {
    html.classList.toggle('menu-active');
  };


  const selectors = document.querySelectorAll('#menu, .nav-menu, .nav-close')
  Array.from(selectors).forEach(item => {
    item.addEventListener('click', menu, false)
  })

  /* ==========================================================================
   ghostHunter
   ========================================================================== */

  // if (typeof ghosthunter_key !== 'undefined') {
  //   var searchField = $("#search-field");
  //   $(".nav-search").css({
  //     'display': 'block'
  //   });

  //   $('.nav-search').on({
  //     'click': function() {
  //       html.addClass('search-active');
  //       searchField.focus();
  //       html.removeClass('menu-active');
  //     }
  //   });

  //   $('.search-close').on({
  //     'click': function() {
  //       html.removeClass('search-active');
  //       searchField.val('');
  //       $('#results').empty();
  //     }
  //   });

  //   $(document).keydown(function(e) {
  //     if (e.key === "Escape") { // escape key maps to keycode `27`
  //       if (html.hasClass('search-active')) {
  //         html.removeClass('search-active');
  //         searchField.val('');
  //         $('#results').empty();
  //       }
  //     }
  //   });

  //   searchField.ghostHunter({
  //     results: "#results",
  //     result_template: '<article class="post"><div class="inner"><div class="box post-box"><h2 class="post-title"><a href="{{link}}">{{title}}</a></h2><span class="post-meta">On <span class="post-date">{{pubDate}}</span></span></div></div></article>',
  //     info_template: '',
  //     displaySearchInfo: true,
  //     includebodysearch: true,
  //     onComplete: function(results) {
  //       if ($('#search-field').prop('value')) {
  //           $('#topics').hide();
  //       } else {
  //           $('#topics').show();
  //       }
  //   }
  //   });
  // }

  /* ==========================================================================
     Gallery
     ========================================================================== */

  function gallery() {
    var images = document.querySelectorAll('.kg-gallery-image img');
    images.forEach(function(image) {
      var container = image.closest('.kg-gallery-image');
      var width = image.attributes.width.value;
      var height = image.attributes.height.value;
      var ratio = width / height;
      container.style.flex = ratio + ' 1 0%';
    });
  }
  gallery();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js',{
      scope: '/'
    }).then(done => {
      console.log(done)
    }).catch(err => {
      console.log(err)
    })
  }