document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.title-description-link');
  
  links.forEach(link => {
    const titleText = link.querySelector('.title-text');
    const descriptionText = link.querySelector('.description-text');
    
    link.addEventListener('mouseenter', () => {
      titleText.classList.add('hidden');
      descriptionText.classList.remove('hidden');
    });
    
    link.addEventListener('mouseleave', () => {
      titleText.classList.remove('hidden');
      descriptionText.classList.add('hidden');
    });
  });
});