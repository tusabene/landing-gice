document.addEventListener('DOMContentLoaded', () => {
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const hamburgerMenu = document.getElementById('hamburger-menu');

  hamburgerIcon.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
  });
});
