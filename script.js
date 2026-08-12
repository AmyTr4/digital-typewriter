const printBtn = document.getElementById('printBtn');
const stage = document.querySelector('.stage');
printBtn.addEventListener('click', () => {
  stage.classList.add('is-printing');
});