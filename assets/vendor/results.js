const result = document.querySelector('.result-desc'),
  score = localStorage.getItem('score'),
  tryAgainBtn = document.querySelector('.try-btn');

//show score
result.innerHTML = `You got <span>${score}</span> correct answer`;

//clear local storage
tryAgainBtn.addEventListener('click', () => {
  localStorage.clear();
})


