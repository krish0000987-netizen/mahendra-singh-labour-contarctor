/**
 * MAHENDRA SINGH ENTERPRISE — Hero Cinematic Slideshow
 * Features:
 * - 3-second automatic slide interval
 * - Smooth fade + Ken Burns zoom
 * - Dot indicators & Next/Prev navigation
 * - Pause on hover
 * - Mobile touch swipe support
 * - Dynamic progress bar
 */

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const progressBar = document.querySelector('.slide-progress');
  const sliderContainer = document.querySelector('.hero-slider-section');

  if (!slides.length) return;

  let currentSlide = 0;
  const slideCount = slides.length;
  const slideDuration = 3000; // 3 seconds per specification
  let slideTimer = null;
  let progressInterval = null;
  let isPaused = false;
  let progress = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (dots[i]) dots[i].classList.remove('active');
    });

    currentSlide = (index + slideCount) % slideCount;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');

    resetProgress();
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startProgress() {
    if (progressInterval) clearInterval(progressInterval);
    progress = 0;
    if (progressBar) progressBar.style.width = '0%';

    const stepMs = 50;
    const stepIncrement = (stepMs / slideDuration) * 100;

    progressInterval = setInterval(() => {
      if (!isPaused) {
        progress += stepIncrement;
        if (progressBar) progressBar.style.width = Math.min(progress, 100) + '%';
        if (progress >= 100) {
          nextSlide();
        }
      }
    }, stepMs);
  }

  function resetProgress() {
    progress = 0;
    if (progressBar) progressBar.style.width = '0%';
  }

  // Event Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });

  // Pause on hover
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
      isPaused = true;
    });
    sliderContainer.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    // Touch Swipe Support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
      }
    }
  }

  // Initialize
  showSlide(0);
  startProgress();
});
