const result = document.querySelector('.resutlt-desc'),
  score = localStorage.getItem('score'),
  tryAgainBtn = document.querySelector('.try-btn');

result.innerHTML = `you got ${score} correct answer`;

tryAgainBtn.addEventListener('click', () => {
  localStorage.clear();
})


