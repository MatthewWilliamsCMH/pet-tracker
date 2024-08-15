// we need to GRAB References
const form = document.getElementById('register-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let userVal = username.value
    let emailVal = email.value
    let passVal = password.value

    //console.log(userVal, emailVal, passVal)

    fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            username: userVal, 
            email: emailVal, 
            password: passVal
        })
    })
        
})