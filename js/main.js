// ==============================================
// JBPH FINANCIAL SERVICES - MAIN SCRIPT
// ==============================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const mobileToggle = document.createElement('div');
  mobileToggle.className = 'mobile-toggle';
  mobileToggle.innerHTML = '&#9776;'; // Hamburger icon
  
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelector('.nav-links');
  
  if (navContainer && navLinks) {
    // Insert toggle after logo area
    navContainer.appendChild(mobileToggle);
    
    mobileToggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.backgroundColor = 'var(--bg-white)';
      navLinks.style.padding = '20px 0';
      navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
    });

    // Reset styles on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.padding = '0';
        navLinks.style.boxShadow = 'none';
      } else {
        navLinks.style.display = 'none';
      }
    });
  }

  // 2. Sticky Header Effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.padding = '5px 0';
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.padding = '0';
        header.style.boxShadow = 'var(--shadow-sm)';
      }
    });
  }

  // 3. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 4. Animated Counters
  const counterElements = document.querySelectorAll('.counter-num');
  let hasCounted = false;
  
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasCounted) {
      hasCounted = true;
      
      counterElements.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            // Check if it's a currency with a plus
            const isCurrency = counter.innerText.includes('₹');
            const hasPlus = counter.innerText.includes('+');
            
            counter.innerText = Math.ceil(current);
            setTimeout(updateCounter, 16);
          } else {
            counter.innerText = target;
          }
        };
        updateCounter();
      });
    }
  }, { threshold: 0.5 });
  
  const counterSection = document.querySelector('.counters');
  if (counterSection && counterElements.length > 0) {
    counterObserver.observe(counterSection);
  }

});
