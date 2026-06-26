(function () {
  'use strict';

  var _d = function (s) {
    try { return atob(s); } catch (e) { return ''; }
  };

  var _L = {
    26: _d('aHR0cHM6Ly9wYXkuY2FrdG8uY29tLmJyL3Z1ZmlyZm1fOTQzMTcx'),
    22: _d('aHR0cHM6Ly9wYXkuY2FrdG8uY29tLmJyL289azdkaHpfOTQzMDk3'),
    18: _d('aHR0cHM6Ly9wYXkuY2FrdG8uY29tLmJyL3dibm40a2pfOTQzMDI5'),
    14: _d('aHR0cHM6Ly9wYXkuY2FrdG8uY29tLmJyLzNmdW1na25fOTQzMDk5'),
    c: _d('aHR0cHM6Ly9wYXkuY2FrdG8uY29tLmJyL240Znlka3pfOTQzMTA5'),
    h: _d('aHR0cHM6Ly93YS5tZS81NTExOTU4OTMzNzkzP3RleHQ9T2wlQzMlQTElMkMlMjBwcmVjaXNvJTIwZGUlMjBhanVkYSUyMGNvbSUyMG8lMjBraXQlMjBkZSUyMGZpZ3VyaW5oYXMlMjBkYSUyMENvcGEu'),
    f: _d('aHR0cHM6Ly93YS5tZS81NTExOTU4OTMzNzkzP3RleHQ9T2wlQzMlQTElMkMlMjB0ZW5obyUyMGludGVyZXNzZSUyMG5hcyUyMEZpZ3VyaW5oYXMlMjBkYSUyMENvcGElMjBlbSUyMFBERiUyMG1hcyUyMHRlbmhvJTIwdW1hJTIwZCVDMyVCQXZpZGEuJTIwUG9kZSUyMG1lJTIwYWp1ZGFyJTNG')
  };

  function initCountdown() {
    var el = document.getElementById('countdown');
    if (!el) return;
    var key = 'sb_oferta_fim';
    var duration = 30 * 60 * 1000;

    function getEnd() {
      var stored = localStorage.getItem(key);
      var now = Date.now();
      if (stored) {
        var end = parseInt(stored, 10);
        if (!isNaN(end) && end > now) return end;
      }
      var fresh = now + duration;
      localStorage.setItem(key, String(fresh));
      return fresh;
    }

    var endTime = getEnd();
    function tick() {
      var left = Math.max(0, endTime - Date.now());
      var sec = Math.floor(left / 1000);
      el.textContent =
        String(Math.floor(sec / 60)).padStart(2, '0') + ':' +
        String(sec % 60).padStart(2, '0');
      if (left <= 0) {
        endTime = Date.now() + duration;
        localStorage.setItem(key, String(endTime));
      }
    }
    tick();
    setInterval(tick, 1000);
  }

  function initHeroPeel() {
    document.querySelectorAll('.corner-peel').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var box = btn.closest('[class*="aspect-"]');
        if (!box) return;
        var bg = box.querySelector('.absolute.inset-1 img');
        var top = btn.querySelector('img');
        if (!bg || !top) return;
        btn.style.opacity = '0';
        setTimeout(function () {
          var s = bg.src, a = bg.alt;
          bg.src = top.src; bg.alt = top.alt;
          top.src = s; top.alt = a;
          btn.style.opacity = '1';
        }, 300);
      });
    });
  }

  function resolvePay(btn) {
    var txt = btn.textContent || '';
    if (/GARANTIR TODOS/i.test(txt)) return _L.c;
    if (/COMPRAR KIT/i.test(txt)) {
      var card = btn.closest('[class*="rounded-3xl"]') || btn.closest('section');
      var title = card && card.querySelector('h3') ? card.querySelector('h3').textContent : '';
      if (/2022/i.test(title)) return _L[22];
      if (/2018/i.test(title)) return _L[18];
      if (/2014/i.test(title)) return _L[14];
    }
    return _L[26];
  }

  function initPurchaseLinks() {
    document.querySelectorAll('button').forEach(function (btn) {
      var txt = btn.textContent || '';
      if (/BAIXAR MEU KIT|COMPRAR KIT|GARANTIR TODOS/i.test(txt)) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          window.location.href = resolvePay(btn);
        });
      }
    });
  }

  function initContactLinks() {
    document.querySelectorAll('a').forEach(function (a) {
      var txt = a.textContent || '';
      if (/Preciso de ajuda/i.test(txt)) a.href = _L.h;
      if (/Falar no WhatsApp/i.test(txt)) a.href = _L.f;
    });
  }

  function initNoSelect() {
    document.querySelectorAll('img,.no-select').forEach(function (el) {
      el.addEventListener('dragstart', function (e) { e.preventDefault(); });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCountdown();
    initHeroPeel();
    initPurchaseLinks();
    initContactLinks();
    initNoSelect();
  });
})();
