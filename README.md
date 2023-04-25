# Job Connect

### Description
Job Connect is a software that helps connect between applicant and recruiter

### Installations
- [MongoDB Compass](https://www.mongodb.com/try/download/community) 
- [Database tools](https://www.mongodb.com/docs/database-tools/) (Remember see [installation guide](https://www.mongodb.com/docs/database-tools/installation/installation/) fit your OP to run db tools, it is compulsory)
- IDE or Editor JS (Ex: [VSCode](https://code.visualstudio.com/download))

### Import database
1. Open MongoDB Compass, click Connect to create a connection (copy your connection string)
2. Create a database "jobconnect":
    - Can use GUI
    - Or type this command into _MONGOSH (bottom in the screen):
    `use jobconnect`
3. Then, open CLI 
    - Navigate to project `cd <path to project>`
    - Type: 
```
mongorestore --db=jobconnect database/jobconnect/ --uri="mongodb://localhost:27017"
```

See DB Tool details: [here](https://www.mongodb.com/docs/database-tools/mongoimport/)
- Export collection: 
```
mongodump --db=jobconnect --uri="mongodb://localhost:27017" --out="database"
```

### Config
- Can config host, port, database name, connection string in folder `config`

### Running project
1. Open cmd (terminal) and navigate to project
2. Type: 
```
node app.js
```
or run in dev mode:
```
npm start
```

### Accounts
- Applicant: luuduchai@gmail.com / 123456
- Recruiter: admin / 123456

### Authors
- Lưu Đức Hải