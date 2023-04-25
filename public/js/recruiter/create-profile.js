document.getElementById('create-profile-company').addEventListener('submit', function (e) {
    e.preventDefault()
    let formData = new FormData()

    formData.append('name', document.getElementById('name').value)
    
    const logo = document.getElementById('logo')
    if (logo.files.length > 0) {
        for (let i = 0; i < logo.files.length; i++) {
            formData.append('logo', logo.files[i])
        }
    }

    // const coverImg = document.getElementById('coverImg')
    // if (coverImg.files.length > 0) {
    //     formData.append('coverImg', coverImg.files[0])
    // }

    formData.append('address', document.getElementById('address').value)

    formData.append('website', document.getElementById('website').value)

    formData.append('employees', document.getElementById('employees').value)

    formData.append('introduction', document.getElementById('introduction').value)

    fetch('/recruiter/create-profile-company', {
        method: 'POST',
        body: formData,
    })
    .then (rel => rel.json()) 
    .then (data => {
        console.log(data)
        if (data.status === 'OK') {
            location.href = '/recruiter'
        }
    }) 
    .catch(err => {
        console.log(err)
    })
})