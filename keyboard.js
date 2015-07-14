'use strict';

(function () {

  // Only initialize once.
  if (document.documentElement) {
    initialize();
  } else {
    window.addEventListener('DOMContentLoaded', initialize);
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
      '#keyboard .key-element { visibility: visible; }',
      '#keyboard .keyboard-type-container.lowercase { text-transform: lowercase; }'
    ].join('\n'))
    sheet.appendChild(styleText);

    document.head.appendChild(sheet);
  }
}());
