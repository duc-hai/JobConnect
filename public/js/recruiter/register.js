const regis = document.getElementById('form-register')

regis.addEventListener('submit', function (e) {
    e.preventDefault()
    const data = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value
    }
    fetch ('/recruiter/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
})