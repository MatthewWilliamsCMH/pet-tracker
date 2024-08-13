const loginFrmHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#login-email').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', { //is this route correct?
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/'); //append "/pack" to route?
    } else {
      alert('Please register before trying to log in.');
      document.location.replace('/login');
    }
  }
};

const regFrmHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#register-user').value.trim();
  const email = document.querySelector('#register-email').value.trim();
  const password = document.querySelector('#register-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', { //is this route correct?
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    };
  };
};

document
  .querySelector('.login-form')
  .addEventListener('submit', logFrmHandler);

document
  .querySelector('.register-form')
  .addEventListener('submit', regFrmHandler);