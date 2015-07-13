'use strict';

(function () {

  // Only initialize once.
  if (!document.documentElement.dataset.keyboardTweaksInitialized) {
    if (document.documentElement) {
      initialize();
    } else {
      window.addEventListener('DOMContentLoaded', initialize);
    }
  }

  function initialize() {
    var TYPING_EVENTCODE = 1;
    var dataset = document.documentElement.dataset;
    var kbBusy = dataset.kbBusy;
    var busyTimeout = dataset.busyTimeout;

    var shb = document.getElementById('software-home-button');
    shb.addEventListener('touchstart', function(evt) {
      console.log('maah');
      if (kbBusy) return false;
    });

    function keyboardMsg(evt) {
      console.log(evt.origin);
      if (evt.data != TYPING_EVENTCODE) return;

      kbBusy = true;
      if (busyTimeout) {  // Dedupe.
        window.clearTimeout(busyTimeout);
      }
      busyTimeout = window.setTimeout(function() {
        kbBusy = false;
      }, 350);
    }
    window.addEventListener('message', keyboardMsg, false);

    // Only initialize once.
    dataset.keyboardTweaksInitialized = true;
  }

}());
