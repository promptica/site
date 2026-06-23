// Иконки Lucide
if (window.lucide) lucide.createIcons();

// Вращающийся заголовок — эффект «печатает/стирает»
(function () {
  var el = document.getElementById("rotate");
  if (!el) return;

  var phrases = [
    "обрабатывает заявки",
    "ведёт клиента в CRM",
    "разбирает почту",
    "готовит КП",
    "работает по вашим правилам",
  ];

  // Уважаем prefers-reduced-motion: показываем одну фразу статично
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    el.textContent = phrases[0];
    return;
  }

  var TYPE = 65;     // мс на символ при печати
  var ERASE = 35;    // мс на символ при стирании
  var HOLD = 1700;   // пауза на готовой фразе
  var GAP = 350;     // пауза перед печатью следующей

  var i = 0;        // индекс фразы
  var pos = 0;      // длина видимого текста
  var erasing = false;

  function tick() {
    var full = phrases[i];
    if (!erasing) {
      pos++;
      el.textContent = full.slice(0, pos);
      if (pos === full.length) {
        erasing = true;
        return setTimeout(tick, HOLD);
      }
      return setTimeout(tick, TYPE);
    } else {
      pos--;
      el.textContent = full.slice(0, pos);
      if (pos === 0) {
        erasing = false;
        i = (i + 1) % phrases.length;
        return setTimeout(tick, GAP);
      }
      return setTimeout(tick, ERASE);
    }
  }

  // Старт: фраза уже отрисована в разметке — стираем её и поехали
  pos = phrases[0].length;
  erasing = true;
  setTimeout(tick, HOLD);
})();
