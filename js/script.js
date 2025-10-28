/**
 * Modern Portfolio - JavaScript
 */

(function($) {
  'use strict';

  // ========================================
  // Navigation
  // ========================================
  
  // Smooth scrolling for navigation links
  $('.nav-link, a[href^="#"]').on('click', function(e) {
    var target = $(this.getAttribute('href'));
    if(target.length) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 70
      }, 1000);
      
      // Close mobile menu after click
      $('.navbar-collapse').collapse('hide');
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
  // Initialize on Document Ready
  // ========================================
  
  $(document).ready(function() {
    // Add animation classes to elements
    $('.service-card, .project-card, .pricing-card, .work-item').addClass('animate-on-scroll');
    
    // Trigger initial animations
    setTimeout(checkScroll, 100);
    
    // Preload images
    $('img').on('load', function() {
      $(this).addClass('loaded');
    });
  });

  // ========================================
  // Page Load Animation
  // ========================================
  
  $(window).on('load', function() {
    $('body').addClass('loaded');
  });

  // ========================================
  // Custom Cursor
  // ========================================
  
  const cursor = document.getElementById('cursor');
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Show cursor on mouse move
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
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

})(jQuery);
