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
const form = document.getElementById('contact-form');
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const button = form.querySelector('button');
  const status = document.getElementById('form-status');
  button.disabled = true;
  status.textContent = 'Enviando tu consulta…';
  try {
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form), signal: AbortSignal.timeout(20000) });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.error || 'No pudimos enviar tu consulta. Probá por WhatsApp.');
    status.textContent = '¡Consulta enviada! Gracias por dar el primer paso. Te responderé a tu email.';
    form.reset();
  } catch (error) {
    status.textContent = error.name === 'TimeoutError' ? 'El envío tardó demasiado. Intentá nuevamente o escribime por WhatsApp.' : (error.message === 'Failed to fetch' ? 'No hay conexión. Revisá tu conexión o escribime por WhatsApp.' : error.message);
  } finally { button.disabled = false; }
});
