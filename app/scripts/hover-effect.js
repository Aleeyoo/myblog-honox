// Function to initialize hover effects
function initHoverEffects() {
  const links = document.querySelectorAll('.title-description-link');
  console.log('Found', links.length, 'title-description-link elements');
  
  links.forEach((link, index) => {
    const titleText = link.querySelector('.title-text');
    const descriptionText = link.querySelector('.description-text');
    
    if (!titleText || !descriptionText) {
      console.error('Missing title or description element in link', index, link);
      return;
    }
    
    console.log('Setting up hover effect for link', index, titleText.textContent, descriptionText.textContent);
    
    link.addEventListener('mouseenter', () => {
      titleText.classList.add('hidden');
      descriptionText.classList.remove('hidden');
      // Ensure no underline on hover
      titleText.style.textDecoration = 'none';
      descriptionText.style.textDecoration = 'none';
      console.log('Mouse enter on link', index);
    });
    
    link.addEventListener('mouseleave', () => {
      titleText.classList.remove('hidden');
      descriptionText.classList.add('hidden');
      // Ensure no underline when not hovering
      titleText.style.textDecoration = 'none';
      descriptionText.style.textDecoration = 'none';
      console.log('Mouse leave on link', index);
    });
  });
}

// Try to initialize immediately
initHoverEffects();

// Also try to initialize when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHoverEffects);
} else {
  // DOM is already loaded
  initHoverEffects();
}

// Also try to initialize after a short delay to ensure everything is rendered
setTimeout(initHoverEffects, 500);