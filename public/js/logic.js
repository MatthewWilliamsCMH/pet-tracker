const modal = document.getElementById('modal');
const page = document.getElementById('page');

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

function openModal() {
  if (sessionStorage.getItem('logged-in') === null) {
    modal.style.display = 'block';
    page.classList.add('hide-content');
    sessionStorage.setItem('logged-in', 'true')
  }
}

function closeModal() {
  modal.style.display = 'none';
  page.classList.remove('hide-content');
}

const noPhoto = () => {
  document.getElementById(animalPhoto).innerHTML = 'The photo is not yet available.';
};

window.onload = function () {
  openModal();
  setTimeout(closeModal, 4000);
};

document.getElementById('logoutBtn').addEventListener('click', logout);