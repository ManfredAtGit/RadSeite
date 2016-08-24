/*
$(function () { // Same as document.addEventListener("DOMContentLoaded"...

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
  //$("#navbarToggle").click(function (event) {
  //  $(event.target).focus();
  //});
});

*/

/*  main content noch aus einzelenen pages in snippets/views heraustrennen */
(function (global) {

  var dc = {};

  var homeHtml = "snippets/home-snippet.html";
  var bikesHtml = "snippets/bikes-snippet.html";
  var tourHtml = "snippets/tour-snippet.html";
  var downloadHtml = "snippets/download-snippet.html";
  var galleryHtml = "snippets/gallery-snippet.html";  
  var extrasHtml = "snippets/test-snippet.html";

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
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (responseText) {
        document.querySelector("#main-content")
          .innerHTML = responseText;
      },
      false
    );
  });

  // Load the bikes view
  dc.loadBikes = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      bikesHtml,
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
      tourHtml,
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

  // Load the gallery view
  dc.loadGallery = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      galleryHtml,
      function (responseText) {
        document.querySelector("#main-content")
          .innerHTML = responseText;
      },
      false
    );
  };

  // Load the test view
  dc.loadExtras = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      extrasHtml,
      function (responseText) {
        document.querySelector("#main-content")
          .innerHTML = responseText;
      },
      false
    );
  };
  
  global.$dc = dc;

})(window);

