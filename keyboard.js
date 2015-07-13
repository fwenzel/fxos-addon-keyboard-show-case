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
    // Let the tweaks commence.
    var cont = document.querySelector('#keyboard .keyboard-type-container');
    cont.classList.remove('uppercase-only');

    // Let all keys be visible even in lowercase mode.
    var SHEET_ID = 'keyboard-tweaks';
    var SHEET_SELECTOR = 'style#' + SHEET_ID;

    var existing = document.head.querySelector(SHEET_SELECTOR);
    if (existing) { existing.parentNode.removeChild(existing); }

    var sheet = document.createElement('style');
    sheet.setAttribute('id', SHEET_ID);
    sheet.setAttribute('type', 'text/css');

    var styleText = document.createTextNode([
      '#keyboard .key-element { visibility: visible; }'
    ].join('\n'))
    sheet.appendChild(styleText);

    document.head.appendChild(sheet);

    // Transform keys to lowercase when Shift is off.
    var ucsm = window.app.upperCaseStateManager;
    var defaultStateChange = ucsm.onstatechange;
    var detectCase = function(evt) {
      defaultStateChange(evt);  // Trigger default behavior.

      // Adjust case.
      if (!ucsm.isUpperCase) {
        cont.style = 'text-transform: lowercase';
      } else {
        cont.style = '';
      }
    }
    ucsm.onstatechange = detectCase;


    // Only initialize once.
    document.documentElement.dataset.keyboardTweaksInitialized = true;
  }
}());
