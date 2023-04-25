window.onload = function () {
    //Call to API order to load all provinces of Viet Nam
    fetch('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1', {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => {
            data = data.data.data
            let selectProvince = document.getElementById('province')

            //Load data into select tag province
            for (let i = 0; i < data.length; i++) {
                let option = document.createElement('option')
                option.value = data[i].code
                option.innerText = data[i].name
                selectProvince.appendChild(option)
            }
        })
        .catch(err => {
            console.log(err)
        })

    //Load district information with suitable province
    document.getElementById('province').addEventListener('change', function (e) {
        let codeProvince = e.target.value
        fetch(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${codeProvince}&limit=-1`, {
            method: 'GET'
        })
            .then(rel => rel.json())
            .then(data => {
                data = data.data.data
                let selectDistrict = document.getElementById('district')

                //Remove old data district if it exists
                if ($('#district').children().length != 0) {
                    $('#district').empty()
                }

                for (let i = 0; i < data.length; i++) {
                    let option = document.createElement('option')
                    option.value = data[i].code
                    option.innerText = data[i].name
                    selectDistrict.appendChild(option)
                }
            })
            .catch(err => {
                console.log(err)
            })
    })
}

document.getElementById('add-recruitment').addEventListener('submit', function (e) {
    e.preventDefault()
    let formData = new FormData()
    formData.append('title', document.getElementById('title').value)
    const file = document.getElementById('image')
    if (file.files.length > 0) {
        formData.append('image', file.files[0])
    }
    formData.append('salary', document.getElementById('salary').value)
    
    let address = {
        street: document.getElementById('street').value,
        district: document.getElementById('district').value,
        province: document.getElementById('province').value,
    }
    formData.append('address', address)
    formData.append('workingWay', document.getElementById('workingWay').value)
    formData.append('position', document.getElementById('position').value)
    formData.append('profession', document.getElementById('profession').value)
    formData.append('experience', document.getElementById('experience').value)
    formData.append('description', document.getElementById('description').value)
    formData.append('requirement', document.getElementById('requirement').value)
    formData.append('benefit', document.getElementById('benefit').value)
    formData.append('deadlineSubmis', document.getElementById('deadlineSubmis').value)

    fetch('/recruiter/add-recruitment', {
        method: 'POST',
        body: formData
    })
        .then(rel => rel.json())
        .then(data => {
            console.log(data)
            if (data.status === 'OK') {
                location.href = '/recruiter/manage-recruitments'
            }
        })
        .catch(err => {
            console.log(err)
        })
})