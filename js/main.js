/**
 * MAHENDRA SINGH ENTERPRISE — Master JavaScript Application
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Shrink Effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('shrunk');
      } else {
        header.classList.remove('shrunk');
      }
    });
  }

  // 2. Mobile Drawer Navigation
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.mobile-drawer-backdrop');
  const drawerCloseBtn = document.querySelector('.drawer-close');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  // 3. Highlight Active Navigation Links
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 4. Projects Portfolio Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // 5. Contact Page Form Handler
  const contactForm = document.getElementById('mainContactForm');
  const contactFeedback = document.getElementById('contactFormFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending Request...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();

        if (contactFeedback) {
          contactFeedback.style.display = 'block';
          contactFeedback.innerHTML = `
            <strong>✓ Message Received!</strong><br>
            Thank you for reaching out to Mahendra Singh Enterprise. Our industrial service desk will contact you via phone/email shortly.
          `;
          setTimeout(() => {
            contactFeedback.style.display = 'none';
          }, 6000);
        }
      }, 1000);
    });
  }

  // 6. Careers Job Application Form Handler
  const careerForm = document.getElementById('careerApplicationForm');
  const careerFeedback = document.getElementById('careerFormFeedback');

  if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = careerForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Submitting Application...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        careerForm.reset();

        if (careerFeedback) {
          careerFeedback.style.display = 'block';
          careerFeedback.innerHTML = `
            <strong>✓ Application Submitted Successfully!</strong><br>
            Your candidate profile has been recorded in our workforce database. Our HR team will connect with you when a matching deployment arises.
          `;
          setTimeout(() => {
            careerFeedback.style.display = 'none';
          }, 6000);
        }
      }, 1000);
    });
  }
});
