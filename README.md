# Job Connect

### Description
Job Connect is a software that helps connect between applicant and recruiter

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

### Accounts
- Applicant: luuduchai@gmail.com / 123456
- Recruiter: recruiter@gmail.com / 123456

### Author
- Luu Duc Hai

### References
- Export collection command:
```
mongodump --db=jobconnect --uri="mongodb://localhost:27017" --out="database"
```
- See DB Tool details: [here](https://www.mongodb.com/docs/database-tools/mongoimport/)
- Mongoose queries: [here](https://mongoosejs.com/docs/queries.html)
