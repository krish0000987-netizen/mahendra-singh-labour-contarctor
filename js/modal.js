/**
 * MAHENDRA SINGH ENTERPRISE — Universal Get a Quote Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('quoteModal');
  const openButtons = document.querySelectorAll('[data-open-quote]');
  const closeButtons = document.querySelectorAll('[data-close-quote]');
  const quoteForm = document.getElementById('quoteRequirementForm');
  const quoteFeedback = document.getElementById('quoteFormFeedback');

  if (!modalOverlay) return;

  function openModal(prefillService = '') {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (prefillService && quoteForm) {
      const serviceSelect = quoteForm.querySelector('#quoteService');
      if (serviceSelect) {
        serviceSelect.value = prefillService;
      }
    }
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service') || '';
      openModal(serviceName);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle Form Submission
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Processing Requirement...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        quoteForm.reset();

        if (quoteFeedback) {
          quoteFeedback.style.display = 'block';
          quoteFeedback.innerHTML = `
            <strong>✓ Requirement Received Successfully!</strong><br>
            Thank you for contacting Mahendra Singh Enterprise. Our industrial workforce coordinator will review your requirement and get in touch with you shortly.
          `;
          setTimeout(() => {
            quoteFeedback.style.display = 'none';
            closeModal();
          }, 4000);
        }
      }, 1000);
    });
  }

  window.openQuoteModal = openModal;
  window.closeQuoteModal = closeModal;
});
