# Job Connect

### Description
Job Connect is a software that helps connect between applicant and recruiter

### Design Analysis documentation
- Technologies: NodeJS (ExpressJS), View Engine Handlebars, MongoDB, ...
- Code API, suitable for microservices architecture (SOA subject)
- Documentation (important): [here](https://drive.google.com/file/d/1oE_LjauHoKv_XYRK7oxSQ97aqS6jaQbI/view?usp=sharing)

### Installations
- [MongoDB Compass](https://www.mongodb.com/try/download/community) 
- [Database tools](https://www.mongodb.com/docs/database-tools/) (Remember see [installation guide](https://www.mongodb.com/docs/database-tools/installation/installation/) fit your OP to run db tools, it is compulsory)
- IDE or Editor JS (Ex: [VSCode](https://code.visualstudio.com/download))
- [Postman](https://www.postman.com/downloads/)

### Import database
1. Open MongoDB Compass, click Connect to create a connection (copy your connection string)
2. Create a database "jobconnect":
    - Can use GUI
    - Or type this command into _MONGOSH (bottom in the screen):
    `use jobconnect`
3. Then, open CLI 
    - Navigate to project `cd <path to project>`
    - Enter to command line: 
```
mongorestore --db=jobconnect database/jobconnect/ --uri="mongodb://localhost:27017"
```
`jobconnect` is database name and `mongodb://localhost:27017` is connection string

### Configs
- Can config host, port, database name, connection string in folder `config`

### Running project
1. Open cmd (terminal) and navigate to project
2. Enter to command line (install node_modules folder):
```
npm install
```
3. Enter to command line to run project: 
```
node app.js
```
or run in dev mode:
```
npm start
```

### Postman API
1. Import postman collections in folder `postman`
2. Run API in each requests
3. Create enviroment variables:
- `baseURL` with value is url to website (Ex: http://localhost:3000)
- `Access_Token_Recruiter` with value is access token get from login function
4. Send request 
Notes: If you see json returned with message: 'Unauthorized, please check your login', please send login request first, then update access token in enviroment variables (or access token with be storage automatically in cookies with HTTP Only settings)

### Achivements 
- API with acctors recruiter and applicant (actor admin has the same way to code as both)
- Layout: 
    - Home page
    - Recruiter page with link: /recruiter/login first, then you redirect to home page recruiter. You can use functional: 'Tạo hồ sơ doanh nghiệp' and 'Tạo mới tin tuyển dụng' inside 'Quản lý tin tuyển dụng' in the left sidebar.

### API documentation
- You can use based on collections avalable in postman folder
- Get API document in the [Design Analysis document](#Design-Analysis-documentation)

### Accounts
- Applicant: luuduchai@gmail.com / 123456
- Recruiter: recruiter@gmail.com / 123456

### Author
- [Luu Duc Hai](mailto:luuduchai.nt@gmail.com)

### References
- Export collection command:
```
mongodump --db=jobconnect --uri="mongodb://localhost:27017" --out="database"
```
- See DB Tool details: [here](https://www.mongodb.com/docs/database-tools/mongoimport/)
- Mongoose queries: [here](https://mongoosejs.com/docs/queries.html)
