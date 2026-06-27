(function () {
  'use strict';

  // Compatível com Meta Pixel — não altera fbq nem bloqueia scripts do Facebook
  var pixelGuard = window.fbq;

  function block(e) {
    e.preventDefault();
    return false;
  }

  document.addEventListener('contextmenu', block);

  document.addEventListener('keydown', function (e) {
    var key = e.key;
    var code = e.keyCode || e.which;
    var ctrl = e.ctrlKey || e.metaKey;
    var shift = e.shiftKey;

    if (
      key === 'F12' || code === 123 ||
      (ctrl && shift && (key === 'I' || key === 'J' || key === 'C' || code === 73 || code === 74 || code === 67)) ||
      (ctrl && (key === 'U' || code === 85))
    ) {
      block(e);
    }
  });

  // Garante que a proteção não remove o fbq após o Pixel carregar
  if (typeof window.fbq !== 'function' && pixelGuard) {
    window.fbq = pixelGuard;
  }
})();
