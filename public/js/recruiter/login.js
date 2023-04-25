const formLogin = document.getElementById('form-login')

formLogin.addEventListener('submit', function (e) {
    e.preventDefault()
    const data = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    }
    fetch('/recruiter/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then (rel => rel.json())
    .then(result => {
        console.log(result)
        if (result.status === 'OK') {
            location.href = '/recruiter'
        }
    })
    .catch(err => {
        console.log(err)
    })
})