const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('pointermove', event => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });
}
document.getElementById('year').textContent = new Date().getFullYear();
const shortsTrack = document.getElementById('shorts-track');
fetch('assets/shorts/shorts.json')
  .then(response => {
    if (!response.ok) throw new Error('No se pudo cargar la lista de Shorts.');
    return response.json();
  })
  .then(shorts => {
    for (const { id, title } of shorts) {
      if (!/^[A-Za-z0-9_-]{11}$/.test(id)) continue;
      const card = document.createElement('article');
      card.className = 'short-card';
      const button = document.createElement('button');
      button.className = 'short-play';
      button.type = 'button';
      button.setAttribute('aria-label', `Reproducir Short: ${title}`);
      const image = document.createElement('img');
      image.src = `assets/shorts/${id}.webp`;
      image.alt = '';
      image.loading = 'lazy';
      const icon = document.createElement('span');
      icon.className = 'short-icon';
      icon.textContent = '▶';
      button.append(image, icon);
      const label = document.createElement('p');
      label.textContent = title;
      const link = document.createElement('a');
      link.href = `https://www.youtube.com/shorts/${id}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'VER EN YOUTUBE ↗';
      button.addEventListener('click', () => {
        shortsTrack.querySelectorAll('iframe').forEach(frame => {
          const previous = frame.closest('.short-card');
          previous.querySelector('button').hidden = false;
          frame.remove();
        });
        const frame = document.createElement('iframe');
        frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
        frame.title = title;
        frame.allow = 'autoplay; encrypted-media; picture-in-picture';
        frame.allowFullscreen = true;
        frame.loading = 'lazy';
        button.hidden = true;
        card.prepend(frame);
      });
      card.append(button, label, link);
      shortsTrack.append(card);
    }
  })
  .catch(() => { shortsTrack.textContent = 'No pudimos cargar los Shorts. Podés verlos en el canal de YouTube.'; });
for (const [id, direction] of [['shorts-prev', -1], ['shorts-next', 1]]) {
  document.getElementById(id).addEventListener('click', () => shortsTrack.scrollBy({ left: direction * (shortsTrack.clientWidth * 0.8), behavior: reducedMotion ? 'auto' : 'smooth' }));
}
const form = document.getElementById('contact-form');
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const button = form.querySelector('button');
  const status = document.getElementById('form-status');
  button.disabled = true;
  status.textContent = 'Enviando tu consulta…';
  try {
    const data = new FormData(form);
    const payload = new URLSearchParams({
      name: data.get('nombre'),
      email: data.get('email'),
      service: data.get('servicio'),
      message: data.get('mensaje'),
      _subject: 'Nuevo contacto desde Marco Bartoli Fit',
      _template: 'table',
      _honey: data.get('website'),
    });
    const response = await fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: payload,
      signal: AbortSignal.timeout(20000),
    });
    const result = await response.json();
    if (!response.ok || (result.success !== true && result.success !== 'true')) {
      const error = /activation/i.test(result.message || '')
        ? 'El formulario todavía necesita activación. Escribime por WhatsApp mientras tanto.'
        : 'No pudimos enviar tu consulta. Probá más tarde o escribime por WhatsApp.';
      throw new Error(error);
    }
    status.textContent = '¡Consulta enviada! Gracias por dar el primer paso. Te responderé a tu email.';
    form.reset();
  } catch (error) {
    status.textContent = error.name === 'TimeoutError' ? 'El envío tardó demasiado. Intentá nuevamente o escribime por WhatsApp.' : (error.message === 'Failed to fetch' ? 'No hay conexión. Revisá tu conexión o escribime por WhatsApp.' : error.message);
  } finally { button.disabled = false; }
});
