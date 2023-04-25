window.onload = function () {
    //Use ajax call to API order to load all provinces of Viet Nam
    $.ajax({
        url: 'https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1',
        method: 'GET'
    })
        .done(function (res) {
            let data = res.data.data //Get list of provinces
            //console.log(data)
            let selectProvince = document.getElementById('location-province')

            //Load data into select tag province
            for (let i = 0; i < data.length; i++) {
                let option = document.createElement('option')
                option.value = data[i].code
                option.innerText = data[i].name
                selectProvince.appendChild(option)
            }
        })
        .fail(function (err) {
            alert('Lỗi khi load api tỉnh thành: ' + err)
        })

    //If user selected a city (provice) then load data about district with that city
    document.getElementById('location-province').addEventListener('change', function (e) {
        let codeProvince = e.target.value
        $.ajax({
            url: `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${codeProvince}&limit=-1`,
            method: 'GET'
        })
            .done(function (res) {
                console.log(res)
                let data = res.data.data
                //console.log(data)
                let selectProvince = document.getElementById('location-district')

                //Remove old data district if it exists
                if ($('#location-district').children().length != 0) {
                    $('#location-district').empty()
                }

                //Load data into select tag district
                for (let i = 0; i < data.length; i++) {
                    let option = document.createElement('option')
                    option.value = data[i].code
                    option.innerText = data[i].name
                    selectProvince.appendChild(option)
                }
            })
            .fail(function (err) {
                alert('Lỗi khi load api quận huyện: ' + err)
            })
    })

    //Saved / unsaved job 
    let heartBtn = document.querySelectorAll('.fav-recruitment')
    for (let i = 0; i < heartBtn.length; i++) {
        heartBtn[i].addEventListener('click', function (e) {
            let id = this.getAttribute('data-reID')
            let evt = this
            $.ajax({
                url: `/recruitment/savedJob/${id}`,
                method: 'GET'
            })
                .done(function (res) {
                    if (res.code == 1) {
                        evt.classList.remove('fa-regular')
                        evt.classList.add('fa-solid')
                        evt.classList.add('heart-red')
                    }
                    else {
                        evt.classList.add('fa-regular')
                        evt.classList.remove('fa-solid')
                        evt.classList.remove('heart-red')
                    }
                })
                .fail(function (err) {
                    console.log(err)
                })
        })
    }   
}

document.getElementById("current-year").innerText = new Date().getFullYear();

//Open search filter
function showFilter() {
    document.getElementById("filter").style.display = "block";
}

function collap() {
    document.getElementById("filter").style.display = "none";
}

function closeNavBar() {
    document.getElementById("nav-bar-responsive").style.display = "none";
}

function showNavBar() {
    document.getElementById("nav-bar-responsive").style.display = "block";
}