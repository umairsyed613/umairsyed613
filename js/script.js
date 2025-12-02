/**
 * Modern Portfolio - JavaScript
 */

// Design is applied inline in HTML head for immediate loading

(function($) {
  'use strict';

  $(document).ready(function() {
    
    // Design switcher function
    function setDesign(design) {
      document.documentElement.setAttribute('data-design', design);
      localStorage.setItem('portfolioDesign', design);
      
      // Update active state in dropdown
      $('.design-option').removeClass('active');
      $(`.design-option[data-design="${design}"]`).addClass('active');
    }
    
    // Set initial active state
    const currentDesign = document.documentElement.getAttribute('data-design') || 'modern-dark';
    $(`.design-option[data-design="${currentDesign}"]`).addClass('active');
    
    // Design switcher click handler - using event delegation
    $(document).on('click', '.design-option', function(e) {
      e.preventDefault();
      const design = $(this).attr('data-design');
      
      if (design) {
        setDesign(design);
        
        // Add smooth transition effect
        $('body').addClass('design-transitioning');
        setTimeout(() => {
          $('body').removeClass('design-transitioning');
        }, 300);
        
        // Close the dropdown - trigger click on parent to close
        $(this).closest('.dropdown').find('.dropdown-toggle').dropdown('toggle');
      }
    });

  // ========================================
  // Navigation
  // ========================================
  
  // Smooth scrolling for navigation links (exclude design options)
  $('.nav-link').on('click', function(e) {
    var href = $(this).attr('href');
    if (href && href.startsWith('#') && href.length > 1) {
      var target = $(href);
      if(target.length) {
        e.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 70
        }, 800, 'swing');
        
        // Close mobile menu after click
        $('.navbar-collapse').collapse('hide');
      }
    }
  });

  // Navbar scroll effect
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $('#mainNav').addClass('scrolled');
    } else {
      $('#mainNav').removeClass('scrolled');
    }
  });

  // Active nav link on scroll
  $(window).on('scroll', function() {
    var scrollPos = $(document).scrollTop() + 100;
    
    $('.nav-link').each(function() {
      var currLink = $(this);
      var refElement = $(currLink.attr('href'));
      
      if (refElement.length && refElement.position().top <= scrollPos && 
          refElement.position().top + refElement.height() > scrollPos) {
        $('.nav-link').removeClass('active');
        currLink.addClass('active');
      } else {
        currLink.removeClass('active');
      }
    });
  });

  // ========================================
  // Statistics Counter Animation
  // ========================================
  
  function animateCounter($element, target) {
    var current = 0;
    var increment = target / 50;
    var suffix = $element.text().includes('+') ? '+' : '%';
    
    var timer = setInterval(function() {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      $element.text(Math.floor(current) + suffix);
    }, 30);
  }

  // Trigger counter animation when section is visible
  var counterAnimated = false;
  $(window).on('scroll', function() {
    if (!counterAnimated && $('.stats-section').length) {
      var statsTop = $('.stats-section').offset().top;
      var statsBottom = statsTop + $('.stats-section').outerHeight();
      var scrollPos = $(window).scrollTop() + $(window).height();
      
      if (scrollPos > statsTop && $(window).scrollTop() < statsBottom) {
        counterAnimated = true;
        $('.stat-number').each(function() {
          var $this = $(this);
          var count = parseInt($this.data('count'));
          animateCounter($this, count);
        });
      }
    }
  });

  // ========================================
  // FAQ Accordion
  // ========================================
  
  $('.faq-question').on('click', function() {
    var $item = $(this).closest('.faq-item');
    var isActive = $item.hasClass('active');
    
    // Close all FAQs
    $('.faq-item').removeClass('active');
    $('.faq-answer').slideUp(300);
    
    // Open clicked FAQ if it wasn't active
    if (!isActive) {
      $item.addClass('active');
      $item.find('.faq-answer').slideDown(300);
    }
  });

  // ========================================
  // Testimonials Carousel
  // ========================================
  
  if ($('.testimonial-carousel').length) {
    $('.testimonial-carousel').owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      nav: true,
      dots: true,
      navText: ['<span>‹</span>', '<span>›</span>'],
      smartSpeed: 800,
      responsive: {
        0: {
          nav: false
        },
        768: {
          nav: true
        }
      }
    });
  }

  // ========================================
  // Skills Progress Bars Animation
  // ========================================
  
  var skillsAnimated = false;
  $(window).on('scroll', function() {
    if (!skillsAnimated && $('.about-section').length) {
      var aboutTop = $('.about-section').offset().top;
      var scrollPos = $(window).scrollTop() + $(window).height();
      
      if (scrollPos > aboutTop + 200) {
        skillsAnimated = true;
        $('.progress-bar').each(function() {
          var $bar = $(this);
          var width = $bar.css('width');
          $bar.css('width', '0');
          setTimeout(function() {
            $bar.css('width', width);
          }, 100);
        });
      }
    }
  });

  // ========================================
  // Contact Form
  // ========================================
  
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    var $form = $(this);
    var $message = $('#formMessage');
    var formData = {
      name: $form.find('[name="name"]').val(),
      email: $form.find('[name="email"]').val(),
      message: $form.find('[name="message"]').val()
    };

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      $message.removeClass('success').addClass('error')
        .text('Please fill in all required fields.')
        .show();
      return;
    }

    // Email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      $message.removeClass('success').addClass('error')
        .text('Please enter a valid email address.')
        .show();
      return;
    }

    // Show loading state
    var $submitBtn = $form.find('[type="submit"]');
    var originalText = $submitBtn.text();
    $submitBtn.prop('disabled', true).text('Sending...');

    // Simulate form submission (replace with actual AJAX call to mail.php)
    $.ajax({
      url: 'mail.php',
      method: 'POST',
      data: formData,
      success: function(response) {
        $message.removeClass('error').addClass('success')
          .text('Thank you! Your message has been sent successfully.')
          .show();
        $form[0].reset();
      },
      error: function() {
        $message.removeClass('success').addClass('error')
          .text('Sorry, something went wrong. Please try again.')
          .show();
      },
      complete: function() {
        $submitBtn.prop('disabled', false).text(originalText);
        setTimeout(function() {
          $message.fadeOut();
        }, 5000);
      }
    });
  });

  // ========================================
  // Scroll Animations
  // ========================================
  
  function checkScroll() {
    $('.animate-on-scroll').each(function() {
      var $element = $(this);
      var elementTop = $element.offset().top;
      var elementBottom = elementTop + $element.outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      
      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $element.addClass('animated');
      }
    });
  }

  $(window).on('scroll', checkScroll);
  checkScroll(); // Check on load

  // ========================================
  // Add animation classes to elements
  $('.service-card, .project-card, .pricing-card, .work-item').addClass('animate-on-scroll');
  
  // Trigger initial animations
  setTimeout(checkScroll, 100);
  
  // Preload images
  $('img').on('load', function() {
    $(this).addClass('loaded');
  });

  // ========================================
  // Page Load Animation
  // ========================================
  
  $(window).on('load', function() {
    $('body').addClass('loaded');
  });

  // ========================================
  // Custom Cursor with Global Mouse Tracking
  // ========================================
  
  const cursor = document.getElementById('cursor');
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Global mouse position - shared with particle system
  window.globalMouse = { x: 0, y: 0, active: false };
  
  // Show cursor on mouse move
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
    
    // Update global mouse position for particle system
    window.globalMouse.x = e.clientX;
    window.globalMouse.y = e.clientY;
    window.globalMouse.active = true;
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    window.globalMouse.active = false;
  });
  
  // Smooth cursor follow
  function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    cursor.style.transform = `translate3d(${cursorX - 10}px, ${cursorY - 10}px, 0)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, [role="button"]');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });

  // ========================================
  // Hero Particles Background Animation
  // ========================================
  
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 200 };
    
    // Set canvas size
    function setCanvasSize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Get primary color from CSS variable
    function getPrimaryColor() {
      const root = document.documentElement;
      const color = getComputedStyle(root).getPropertyValue('--primary-color').trim();
      return color || '#9333EA';
    }
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.baseSize = this.size;
      }
      
      update() {
        // Continuous drift
        this.x += this.vx;
        this.y += this.vy;
        
        // Add slight random movement for organic feel
        this.vx += (Math.random() - 0.5) * 0.01;
        this.vy += (Math.random() - 0.5) * 0.01;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        // Global cursor interaction - works anywhere on page
        if (window.globalMouse && window.globalMouse.active) {
          const rect = canvas.getBoundingClientRect();
          const canvasMouseX = window.globalMouse.x - rect.left;
          const canvasMouseY = window.globalMouse.y - rect.top;
          
          const dx = canvasMouseX - this.x;
          const dy = canvasMouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.vx -= Math.cos(angle) * force * 0.3;
            this.vy -= Math.sin(angle) * force * 0.3;
            this.size = this.baseSize + force * 4;
          } else {
            this.size += (this.baseSize - this.size) * 0.1;
          }
        } else {
          this.size += (this.baseSize - this.size) * 0.1;
        }
        
        // Limit velocity
        const maxSpeed = 2;
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        } else if (speed < 0.1) {
          // Keep minimum speed to prevent particles from stopping
          this.vx += (Math.random() - 0.5) * 0.1;
          this.vy += (Math.random() - 0.5) * 0.1;
        }
        
        // Add damping to slow down over time
        this.vx *= 0.995;
        this.vy *= 0.995;
      }
      
      draw() {
        const primaryColor = getPrimaryColor();
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    
    // Create particles
    function initParticles() {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    initParticles();
    window.addEventListener('resize', initParticles);
    
    // Connect particles with lines
    function connectParticles() {
      const maxDistance = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            const primaryColor = getPrimaryColor();
            ctx.strokeStyle = primaryColor;
            ctx.globalAlpha = opacity * 0.3;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      requestAnimationFrame(animate);
    }
    animate();
  }

  }); // End document.ready

})(jQuery);
