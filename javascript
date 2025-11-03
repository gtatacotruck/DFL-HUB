// Navigation functionality
const navButtons = document.querySelectorAll('.nav-btn');
const contentSections = document.querySelectorAll('.content-section');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetSection = button.dataset.section;
    
    // Update active nav button
    navButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Show target section
    contentSections.forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(targetSection).classList.add('active');
  });
});

// CTA Button interactions with external links
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    this.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // Handle specific button actions
    if (this.classList.contains('primary')) {
      // Join mission - opens Discord
      this.innerHTML = '<span>CONNECTING...</span>';
      setTimeout(() => {
        this.innerHTML = '<span>JOIN MISSION</span>';
      }, 2000);
    } else if (this.classList.contains('secondary')) {
      // Watch demo - opens TikTok
      this.innerHTML = '<span>LOADING...</span>';
      setTimeout(() => {
        this.innerHTML = '<span>WATCH DEMO</span>';
      }, 1500);
    }
  });
});

// Social cards hover effect
const socialCards = document.querySelectorAll('.social-card');
socialCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 0, 64, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Add entrance animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.8s ease';
    document.body.style.opacity = '1';
  }, 100);
});

