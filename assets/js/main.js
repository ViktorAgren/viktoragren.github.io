document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', toggleMobileMenu);

  function toggleMobileMenu() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
  }

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', closeMobileMenu));

  function closeMobileMenu() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
  }

  // Typing Effect
  const typed = new Typed('.typed', {
      strings: ['Software Developer', 'Quantitative Analyst', 'Financial Mathematics Graduate'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      autoInsertCss: true,
  });

  // Project Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Add active class to clicked button
          button.classList.add('active');

          const filterValue = button.getAttribute('data-filter');

          projectItems.forEach(item => {
              if (filterValue === 'all' || item.classList.contains(filterValue)) {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          });
      });
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Back to Top Button
  const backToTopButton = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
          backToTopButton.classList.add('active');
      } else {
          backToTopButton.classList.remove('active');
      }
  });

  backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (pageYOffset >= sectionTop - sectionHeight / 3) {
              current = section.getAttribute('id');
          }
      });

      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').slice(1) === current) {
              link.classList.add('active');
          }
      });
  });

  // Form Submission
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Add your form submission logic here
      console.log('Form submitted');
      // You can use fetch API or AJAX to send the form data to a server
  });

  // Initialize AOS (Animate on Scroll)
  AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
  });

  // Prism.js initialization (for code highlighting)
  Prism.highlightAll();
});