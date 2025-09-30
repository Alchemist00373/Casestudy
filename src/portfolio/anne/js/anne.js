  const links = document.querySelectorAll('nav a');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      target.style.transition = 'background 1.5s';
      target.style.background = '#93C47D';
      setTimeout(() => target.style.background = 'white', 500);
    });
  });
