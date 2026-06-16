/* ========================================================================
   EDI Solutions — script.js
   Dataset simulado de operaciones EDI + interacciones de la página
   ======================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  try { initCharts(); } catch (err) { console.error('No se pudieron inicializar los gráficos:', err); }
  try { initNavHighlight(); } catch (err) { console.error('No se pudo inicializar el nav:', err); }
  try { initRevealOnScroll(); } catch (err) { console.error('No se pudo inicializar el scroll reveal:', err); }
});

/* ---------- 1. Dataset simulado y gráficos (Chart.js) ---------- */
function initCharts() {
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js no está disponible; se omiten los gráficos.');
    return;
  }

  const palette = {
    ink: '#0B2545',
    signal: '#1FB6A6',
    coral: '#FF6B4A',
    slate: '#5C6B7A',
    line: '#E2E6EA'
  };

  // Dataset ficticio: volumen de transacciones procesadas en el último trimestre,
  // agrupado por tipo de documento EDI.
  const transactionsByType = {
    labels: [
      'EDI 850 — Órdenes de Compra',
      'EDI 810 — Facturas',
      'EDI 856 — Avisos de Envío',
      'EDI 820 — Órdenes de Pago'
    ],
    values: [3420, 2150, 1860, 980]
  };

  // Dataset ficticio: evolución mensual de la tasa de error (%) en el procesamiento EDI.
  const errorRateEvolution = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    values: [4.1, 3.7, 3.4, 3.0, 2.7, 2.5]
  };

  const transactionsCanvas = document.getElementById('chart-transactions');
  if (transactionsCanvas) {
    new Chart(transactionsCanvas, {
      type: 'bar',
      data: {
        labels: transactionsByType.labels,
        datasets: [{
          label: 'Transacciones (trimestre)',
          data: transactionsByType.values,
          backgroundColor: [palette.ink, palette.signal, palette.coral, palette.slate],
          borderRadius: 6,
          maxBarThickness: 38
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: palette.line }, ticks: { font: { family: "'IBM Plex Sans'" } } },
          y: { grid: { display: false }, ticks: { font: { family: "'IBM Plex Sans'", size: 11 } } }
        }
      }
    });
  }

  const errorCanvas = document.getElementById('chart-errors');
  if (errorCanvas) {
    new Chart(errorCanvas, {
      type: 'line',
      data: {
        labels: errorRateEvolution.labels,
        datasets: [{
          label: 'Tasa de error (%)',
          data: errorRateEvolution.values,
          borderColor: palette.signal,
          backgroundColor: 'rgba(31, 182, 166, 0.12)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: palette.ink,
          pointRadius: 4,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            grid: { color: palette.line },
            ticks: { callback: (v) => v + '%', font: { family: "'IBM Plex Sans'" } }
          },
          x: { grid: { display: false }, ticks: { font: { family: "'IBM Plex Sans'" } } }
        }
      }
    });
  }
}

/* ---------- 2. Resaltar el link activo del nav según la sección visible ---------- */
function initNavHighlight() {
  const links = Array.from(document.querySelectorAll('nav a'));
  if (!links.length) return;

  const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.remove('active'));
      const activeLink = links.find(link => link.getAttribute('href') === '#' + entry.target.id);
      if (activeLink) activeLink.classList.add('active');
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(section => observer.observe(section));
}

/* ---------- 3. Animación sutil de aparición al hacer scroll ---------- */
function initRevealOnScroll() {
  const targets = document.querySelectorAll(
    '.tech-card, .chart-box, .hack-card, .exec-card, .insights, .strategic-conclusion'
  );

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}
