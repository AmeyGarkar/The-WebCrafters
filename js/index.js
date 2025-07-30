document.addEventListener('DOMContentLoaded', () => {
  let currentSlide = 0;
  const slides = document.querySelector('.slides');
  const dots = document.querySelectorAll('.dot');

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  function updateSlider() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.remove('bg-black', 'bg-gray-400');
      dot.classList.add(idx === currentSlide ? 'bg-black' : 'bg-gray-400');
    });
  }

  function startAutoSlide() {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % dots.length;
      updateSlider();
    }, 5000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      goToSlide(index);
    });
  });

  updateSlider();
  startAutoSlide();
});
