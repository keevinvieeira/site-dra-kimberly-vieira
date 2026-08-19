/**
 * Main JavaScript - Dra. Kimberly Vieira
 * Harmonização Orofacial & Odontologia Estética
 * WhatsApp Oficial: +55 (41) 9654-1288
 */

const CLINIC_CONFIG = {
  phone: '554196541288',
  displayPhone: '(41) 9654-1288',
  cro: 'CRO/PR 34185',
  address: 'Av. do Batel, 1230 - Sala 405, Batel, Curitiba - PR, 80420-090'
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initLightbox();
  initAccordions();
  initContactForm();
  initPhoneMask();
  highlightActiveNav();
});

/* -------------------------------------------------------------
 * 1. Mobile Menu Drawer
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const menuButtons = document.querySelectorAll('[data-toggle-menu]');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuBackdrop = document.getElementById('mobile-menu-backdrop');
  const closeButtons = document.querySelectorAll('[data-close-menu]');

  if (!mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    if (menuBackdrop) {
      menuBackdrop.classList.remove('opacity-0', 'pointer-events-none');
      menuBackdrop.classList.add('opacity-100', 'pointer-events-auto');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    if (menuBackdrop) {
      menuBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
      menuBackdrop.classList.add('opacity-0', 'pointer-events-none');
    }
    document.body.style.overflow = '';
  }

  menuButtons.forEach(btn => btn.addEventListener('click', openMenu));
  closeButtons.forEach(btn => btn.addEventListener('click', closeMenu));
  if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });
}

/* -------------------------------------------------------------
 * 2. Scroll Reveal Animations (IntersectionObserver)
 * ------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    reveals.forEach(el => el.classList.add('active'));
  }
}

/* -------------------------------------------------------------
 * 3. Lightbox Gallery
 * ------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const triggers = document.querySelectorAll('[data-lightbox]');

  if (!lightbox || !lightboxImg) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const img = trigger.querySelector('img') || trigger;
      const src = trigger.getAttribute('data-lightbox-src') || img.src;
      const alt = trigger.getAttribute('data-lightbox-alt') || img.alt || 'Caso Clínico - Dra. Kimberly Vieira';
      openLightbox(src, alt);
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('[data-close-lightbox]')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* -------------------------------------------------------------
 * 4. Accordion Toggle
 * ------------------------------------------------------------- */
function initAccordions() {
  const accordions = document.querySelectorAll('[data-accordion]');

  accordions.forEach(accordion => {
    const header = accordion.querySelector('[data-accordion-header]');
    const content = accordion.querySelector('[data-accordion-content]');
    const icon = accordion.querySelector('[data-accordion-icon]');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isOpen = !content.classList.contains('hidden');

      // Optionally close other accordions in the same container
      const group = accordion.closest('[data-accordion-group]');
      if (group) {
        group.querySelectorAll('[data-accordion-content]').forEach(c => c.classList.add('hidden'));
        group.querySelectorAll('[data-accordion-icon]').forEach(i => i.classList.remove('rotate-180'));
      }

      if (isOpen) {
        content.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
      } else {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 5. Contact & Booking Form -> WhatsApp Integration
 * ------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('form-agendamento');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = form.querySelector('#nome')?.value?.trim() || '';
    const telefone = form.querySelector('#telefone')?.value?.trim() || '';
    const interesse = form.querySelector('#interesse')?.value?.trim() || 'Avaliação Geral';
    const dataPref = form.querySelector('#data_preferencia')?.value?.trim() || '';
    const mensagem = form.querySelector('#mensagem')?.value?.trim() || '';

    if (!nome || !telefone) {
      alert('Por favor, preencha pelo menos o seu nome e telefone para contato.');
      return;
    }

    let text = `✨ *Solicitação de Agendamento - Site Dra. Kimberly Vieira*\n\n`;
    text += `👤 *Nome:* ${nome}\n`;
    text += `📱 *Telefone:* ${telefone}\n`;
    text += `💉 *Procedimento de Interesse:* ${interesse}\n`;
    if (dataPref) {
      text += `📅 *Data/Horário Preferencial:* ${dataPref}\n`;
    }
    if (mensagem) {
      text += `💬 *Mensagem/Dúvida:* ${mensagem}\n`;
    }
    text += `\n_Enviado através do site oficial da Dra. Kimberly Vieira._`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${CLINIC_CONFIG.phone}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  });
}

/* -------------------------------------------------------------
 * 6. Phone Mask Helper
 * ------------------------------------------------------------- */
function initPhoneMask() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 11) val = val.substring(0, 11);

      if (val.length > 10) {
        // (41) 99999-9999
        val = val.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (val.length > 6) {
        // (41) 9999-9999
        val = val.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
      } else if (val.length > 2) {
        val = val.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
      } else if (val.length > 0) {
        val = val.replace(/^(\d*)$/, '($1');
      }
      e.target.value = val;
    });
  });
}

/* -------------------------------------------------------------
 * 7. Active Navigation Link
 * ------------------------------------------------------------- */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a[href], #mobile-menu a[href]');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-primary', 'font-semibold');
    }
  });
}
