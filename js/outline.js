// press o in browser to reveal outlines
(function() {
  window.onload = function() {
    var body = document.body
    body.onkeypress = function(e) {
      if (e.keyCode == 111 || e.charCode == 111) {
        $("body").toggleClass('outline');
      }
    }
  }
})();