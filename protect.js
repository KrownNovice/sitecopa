(function () {
  'use strict';

  function block(e) {
    e.preventDefault();
    return false;
  }

  // Proteção leve — não bloqueia o acesso ao site
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
})();
