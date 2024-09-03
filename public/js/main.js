//handle modal
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

//handle logout button
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

document.getElementById('logoutBtn').addEventListener('click', logout);