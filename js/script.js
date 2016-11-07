
// global var for storing choosen language
$lang = "de";

$(document).ready(function(){


  // Toggle language selection icon
  $("#ge_flag").toggle();
  $("#ge_flag").click(function() {
     $("#en_flag").toggle();
     $("#ge_flag").toggle();
     $lang="de";
     $dc.loadHome();
  });

  $("#en_flag").click(function() {
     $("#ge_flag").toggle();
     $("#en_flag").toggle();
     $lang ="en";
     $dc.loadHome();
  });

  /*
  To collapse menue when user clicks menue item or clicks somewhere else
  */
  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#myNavbar").collapse('hide');
    }
  });
  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });

});

$(function () {
  console.log("from index-script: ready!")
});

/*  main content noch aus einzelenen pages in snippets/views heraustrennen */
(function (global) {

  var dc = {};

  var homeHtml = "snippets/home-snippet.html";
  var bikesHtml = "snippets/bikes-snippet.html";
  var tourHtml = "snippets/tour-snippet.html";
  var downloadHtml = "snippets/download-snippet.html";
  var galleryHtml = "snippets/gallery-snippet.html"; 
  var stravaVizHtml = "snippets/stravaViz-snippet.html"; 
  var extrasHtml = "snippets/extras-snippet.html";
  var t2Html = "snippets/t2-snippet.html";

  // Convenience function to define language specific page-url
  var adrLang = function (adr) {
    if ($lang=="en") {
      adr= adr.replace(".html","-en.html");
    }
    return adr;

  };

  // Convenience function for inserting innerHTML for 'select'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {

    // On first load, show home view
    console.log("DOMContentLoaded - now loading home view");
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      adrLang(homeHtml),
      function (responseText) {
        document.querySelector("#main-content")
          .innerHTML = responseText;
      },
      false
    );
  });

  // Load home view
  dc.loadHome = function () {
    console.log("loadHome: loading home view");
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      adrLang(homeHtml),
      function (responseText) {
        document.querySelector("#main-content")
          .innerHTML = responseText;
      },
      false
    );
  };

  // Load the bikes view
  dc.loadBikes = function () {
    console.log("loadBikes: loading bikes view");
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      adrLang(bikesHtml),
      function (responseText) {
        document.querySelector("#main-content")
          .innerHTML = responseText;
      },
      false
    );
  };

  // Load the tour view
  dc.loadTour = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      adrLang(tourHtml),
      function (responseText) {
        document.querySelector("#main-content")
          .innerHTML = responseText;
      },
      false
    );
  };

  // Load download view
  dc.loadDownloads = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      downloadHtml,
      function (responseText) {
        document.querySelector("#main-content")
          .innerHTML = responseText;
      },
      false
    );
  };

  // Load stravaViz view
  dc.loadStravaViz = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      stravaVizHtml,
      function (responseText) {
        document.querySelector("#main-content")
          .innerHTML = responseText;
      },
      false
    );
  };

  // Load the gallery view
  dc.loadGallery = function (pId) {
    if (pId === undefined) {
      pId = "rar";
    };
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      galleryHtml,
      function (responseText) {
        document.querySelector("#main-content")
          .innerHTML = responseText;
        dc.lbEventHandler();
        dc.setActivePanel(pId);
      },
      false
    );
  };

  // function to open specific paneltab in gallery  panelgroup
  dc.setActivePanel = function(pId) {
    if (pId === undefined) {
      pId = "rar";
    };
    var $target = $('#accordion').find
    $('.panel-collapse.in').collapse('hide');
    //$('panel-collapse:not(".in")').collapse('show');
    $("#"+pId).collapse('show');

  };

  // helper function for setting the active tab attribute aof panel-tab
  changeInStatus = function(inId) {
    $('.panel-collapse.in').collapse('hide');
    $('#pId').collapse('show');

  }


  
  // provide global function to set event-handler for lightbox
  dc.lbEventHandler = function () {
    
    var $lightbox = $('#lightbox');

    console.log("greetings from within create event handlers on lightbox " + $lightbox.get(0).outerHTML);
    
    $('[data-target="#lightbox"]').on('click', function(event) {
        var $img = $(this).find('img'), 
            src = $img.attr('src'),
            src1 ="",
            alt = $img.attr('alt'),
            css = {
                'maxWidth': $(window).width() - 100,
                'maxHeight': $(window).height() - 100
            };


      console.log("lb on click img: "+ $img.get(0).outerHTML);
      console.log('lb on click src: '+ src);
      console.log("lb on click alt: " + alt);
      console.log("lb on click css: " + JSON.stringify(css));

      src1 = src.replace("-xs.jpg",".jpg");
      console.log('lb on click src1: '+ src1);

        $lightbox.find('.close').addClass('hidden');
        $lightbox.find('img').attr('src', src1);
        $lightbox.find('img').attr('alt', alt);
        $lightbox.find('img').css(css);
      
      console.log("lb on click lb at end: " + $lightbox.get(0).outerHTML);
      
    });
    
    $lightbox.on('shown.bs.modal', function (e) {
        var $img = $lightbox.find('img');
      
      console.log("lb on show-modal img: " + $img.get(0).outerHTML);
            
        $lightbox.find('.modal-dialog').css({'width': $img.width()});
        $lightbox.find('.close').removeClass('hidden');
    });
    
   
    
  };
  
  // Load the test view
  dc.loadExtras = function () {
    console.log("loadExtras: loading test view");
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      extrasHtml,
      function (responseText) {
        document.querySelector("#main-content")
          .innerHTML = responseText;
        console.log("greeting from within loadExtras callback");
        dc.lbEventHandler();
      },
      false
    );
  };


  // only neede for test with dc.loadT2, can be deleted
  // provide global function to set event-handler for lightbox
  dc.lbT2 = function () {
    
    // Fill modal with content from link href
    $("#lightbox").on("show.bs.modal", function(e) {
        var link = $(e.relatedTarget);
        console.log("from within modal load link html: " + link.get(0).outerHTML );
        console.log("from within modal load link html href: " + link.attr("href") );
        console.log("from within modal load: " + $(this).find(".modal-body").load(link.attr("href")).get(0).outerHTML );
        $(this).find(".modal-body").load(link.attr("href"));
        console.log("from within modal load: " + $(this).find(".modal-body").load(link.attr("href")).get(0).outerHTML );
    });
    
  };

  // only neede for test, can be deleted
  // Load the t2 view
  // test: image is rendered as text code ???
  dc.loadT2 = function () {
    console.log("loadT2: loading test view t2");
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      t2Html,
      function (responseText) {
        document.querySelector("#main-content")
          .innerHTML = responseText;
        console.log("greeting from within loadT2 callback" + responseText);
        dc.lbT2(); 
        // dc.lbEventHandler();
      },
      false
    );
  };
  
  global.$dc = dc;

})(window);

