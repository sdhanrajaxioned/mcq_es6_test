const result = document.querySelector('.result-desc'),
  score = localStorage.getItem('score'),
  tryAgainBtn = document.querySelector('.try-btn');

result.innerHTML = `You got <span>${score}</span> correct answer`;

tryAgainBtn.addEventListener('click', () => {
  localStorage.clear();
})


