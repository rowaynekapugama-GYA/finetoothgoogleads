(function () {
  var cfg = window.TFTC || {};
  var hours = cfg.hours || {};
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // --- Melbourne time ---
  function melNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Melbourne', weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
      var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
      return { day: o.weekday, mins: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
    } catch (e) { var d = new Date(); return { day: days[d.getDay()], mins: d.getHours() * 60 + d.getMinutes() }; }
  }
  function toMins(t) { var m = /^(\d{1,2}):(\d{2})$/.exec(t); return m ? (+m[1]) * 60 + (+m[2]) : null; }
  function fmt(t) { var m = toMins(t); var h = Math.floor(m / 60), mi = m % 60; var ap = h >= 12 ? 'pm' : 'am'; h = h % 12 || 12; return h + (mi ? ':' + String(mi).padStart(2, '0') : '') + ap; }

  var now = melNow();
  var today = hours[now.day];
  var status = 'Open Mon to Sat', open = false;
  if (today && today.length === 2) {
    var o1 = toMins(today[0]), c1 = toMins(today[1]);
    if (now.mins >= o1 && now.mins < c1) { open = true; status = 'Open now until ' + fmt(today[1]); }
    else if (now.mins < o1) { status = 'Opens today at ' + fmt(today[0]); }
  }
  if (!open && !(today && now.mins < toMins(today[0]))) {
    var i = days.indexOf(now.day);
    for (var k = 1; k <= 7; k++) { var nd = days[(i + k) % 7]; if (hours[nd]) { status = 'Closed now. Opens ' + (k === 1 ? 'tomorrow' : nd) + ' ' + fmt(hours[nd][0]); break; } }
  }
  document.querySelectorAll('[data-open-status]').forEach(function (el) { el.textContent = status; });
  document.querySelectorAll('[data-open-dot]').forEach(function (el) { if (open) el.classList.add('open'); });
  document.querySelectorAll('[data-day]').forEach(function (tr) { if (tr.getAttribute('data-day') === now.day) tr.classList.add('today'); });

  // --- reviews ---
  document.querySelectorAll('[data-reviews-link]').forEach(function (a) { if (cfg.reviewsUrl) a.href = cfg.reviewsUrl; });
  if (cfg.rating) {
    document.querySelectorAll('[data-reviews-title]').forEach(function (el) { el.textContent = cfg.rating + ' on Google'; });
    document.querySelectorAll('[data-reviews-short]').forEach(function (el) { el.textContent = cfg.rating + ' on Google'; });
  }
  if (cfg.reviewCount) {
    document.querySelectorAll('[data-reviews-sub]').forEach(function (el) { el.textContent = 'From ' + cfg.reviewCount + ' Google reviews'; });
  }

  // --- click tracking for GTM ---
  window.dataLayer = window.dataLayer || [];
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var page = document.body.getAttribute('data-page');
    var loc = a.getAttribute('data-loc') || '';
    if (a.classList.contains('js-call')) window.dataLayer.push({ event: 'tftc_call_click', lp_page: page, click_location: loc });
    if (a.classList.contains('js-book')) window.dataLayer.push({ event: 'tftc_book_click', lp_page: page, click_location: loc });
  });

  // --- reveal on scroll ---
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ents) { ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }
})();
