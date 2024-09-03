const modal = document.getElementById('modal');
const page = document.getElementById('page');

function openModal() {
  if (!sessionStorage.getItem('logged-in')) {
    modal.style.display = 'block';
    page.classList.add('hideContent');
    sessionStorage.setItem('logged-in', 'true')
  }
}

function closeModal() {
  modal.style.display = 'none';
  page.classList.remove('hideContent');
}

window.onload = function () {
  openModal();
  setTimeout(closeModal, 4000);
};