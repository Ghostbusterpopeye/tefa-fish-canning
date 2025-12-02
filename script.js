// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('active');
      this.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('nav') && !event.target.closest('.menu-toggle') && nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.textContent = '☰';
      }
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          nav.classList.remove('active');
          menuToggle.textContent = '☰';
        }
      });
    });
  }
  
  // Dropdown for mobile
  const dropdowns = document.querySelectorAll('.dropdown');
  
  // Check if mobile
  function isMobile() {
    return window.innerWidth <= 768;
  }
  
  // Handle dropdowns
  function setupDropdowns() {
    if (isMobile()) {
      dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (link && content) {
          // Remove default hover behavior on mobile
          dropdown.onmouseenter = null;
          dropdown.onmouseleave = null;
          
          // Add click event for mobile
          link.addEventListener('click', function(e) {
            if (isMobile()) {
              e.preventDefault();
              e.stopPropagation();
              
              // Close other dropdowns
              dropdowns.forEach(other => {
                if (other !== dropdown) {
                  const otherContent = other.querySelector('.dropdown-content');
                  if (otherContent) otherContent.style.display = 'none';
                }
              });
              
              // Toggle current dropdown
              content.style.display = content.style.display === 'block' ? 'none' : 'block';
            }
          });
        }
      });
      
      // Close dropdowns when clicking outside
      document.addEventListener('click', function() {
        dropdowns.forEach(dropdown => {
          const content = dropdown.querySelector('.dropdown-content');
          if (content) {
            content.style.display = 'none';
          }
        });
      });
    } else {
      // Restore hover behavior for desktop
      dropdowns.forEach(dropdown => {
        const content = dropdown.querySelector('.dropdown-content');
        if (content) {
          content.style.display = '';
        }
        
        dropdown.onmouseenter = function() {
          const content = this.querySelector('.dropdown-content');
          if (content) content.style.display = 'block';
        };
        
        dropdown.onmouseleave = function() {
          const content = this.querySelector('.dropdown-content');
          if (content) content.style.display = 'none';
        };
      });
    }
  }
  
  // Initial setup
  setupDropdowns();
  
  // Update on resize
  window.addEventListener('resize', setupDropdowns);
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});