const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const env = require('dotenv')
const db = require('./config/database')
const route = require('./routes')
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser(process.env.COOKIE_SECRET))

app.engine('hbs',
    handlebars.engine({
        extname: 'hbs', //Set extenstion name is hbs
        defaultLayout: 'main',
        helpers: {
            //List helpers show here

            //Pagination recruitments in home page applicant
            pagination: (current, pages) => {
                if (pages < 0) {
                    return
                }

                //Check if current page is the first or the last page in total pages, then disabled next and previous buttons
                let prev = ''
                let next = ''
                if (current == Number(1)) {
                    prev = 'disabled'
                }

                if (current == Number(pages)) {
                    next = 'disabled'
                }
                let htmlPag = `<ul class="pagination mt-3">
                <li class="page-item ${prev}">
                <a class="page-link" href="/?page=${current-1}">Trước</a>
                </li>`
                for (let i = 1; i <= pages; i++) {
                    if (i == current) {
                        htmlPag += `<li class="page-item active"><a class="page-link" href="/?page=${i}">${i}</a></li>`
                    }
                    else {
                        htmlPag += `<li class="page-item"><a class="page-link" href="/?page=${i}">${i}</a></li>`
                    }
                }
                htmlPag += `<li class="page-item ${next}">
                <a class="page-link" href="/?page=${current+1}">Sau</a>
                </li></ul>`
                return htmlPag
            },

            // format date with dd/mm/yyyy
            formatDMY: (date) => {
                const day = date.getDate()
                const month = date.getMonth() + 1
                const year = date.getFullYear()
                
                if (day < 10) 
                    day = '0' + day
                if (month < 10)
                    month = '0' + month
                return `${day}/${month}/${year}`
            }
        },
    })
)

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

env.config() //Config env
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

db.connect() //Connect to database
app.use('/', route)

app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`)
})