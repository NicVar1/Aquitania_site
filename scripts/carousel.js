(function(){
  // Carousel setup
  const slides = document.getElementById('slides');
  const slideCount = slides.children.length;
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const dotsContainer = document.getElementById('dots');
  let index = 0;
  let autoplayInterval = null;
  let isHover = false;

  // Create dots
  for (let i = 0; i < slideCount; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.dataset.index = i;
    d.addEventListener('click', e => showSlide(Number(e.target.dataset.index)));
    dotsContainer.appendChild(d);
  }
  const dots = dotsContainer.querySelectorAll('.dot');

  function updateDots(){
    dots.forEach(d => d.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  function showSlide(i){
    // Esto asegura que siempre estemos en rango [0, slideCount-1]
    if (i >= slideCount) {
      index = 0; // volver al inicio
    } else if (i < 0) {
      index = slideCount - 1; // ir al final si vamos atrás desde la primera
    } else {
      index = i;
    }
    slides.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  prev.addEventListener('click', () => showSlide(index - 1));
  next.addEventListener('click', () => showSlide(index + 1));

  // Autoplay (5s)
  function startAutoplay(){
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      if (!isHover) {
        // igual que antes, pero respetando el límite
        showSlide(index + 1);
      }
    }, 5000);
  }
  function stopAutoplay(){
    if (autoplayInterval) clearInterval(autoplayInterval);
  }

  // Pause on hover
  const carouselEl = document.getElementById('carousel');
  carouselEl.addEventListener('mouseenter', () => isHover = true);
  carouselEl.addEventListener('mouseleave', () => isHover = false);

  // Touch / swipe support (simple)
  let startX = 0;
  slides.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  slides.addEventListener('touchend', (e) => {
    const dx = (e.changedTouches[0].clientX - startX);
    if (dx > 40) showSlide(index - 1);
    else if (dx < -40) showSlide(index + 1);
  });

  // Start
  showSlide(0);
  startAutoplay();

  // Accessibility: close with ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();


