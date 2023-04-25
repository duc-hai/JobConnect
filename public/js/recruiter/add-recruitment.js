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
        fetch (`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${codeProvince}&limit=-1`, {
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