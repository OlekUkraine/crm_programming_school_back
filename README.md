 # CRM-Programming school
 

 ## Install node.js
[> Help installing node.js ](https://nodejs.org/ru/download/package-manager)

 ## Clone a project from a repository
[> link to the repository](https://github.com/OlekUkraine/crm_programming_school_back.git)
```
https://github.com/OlekUkraine/crm_programming_school_back.git
```

 ## Description of the .env file:
```
PORT= { The port you will use in your application }

DB_URL= { mongodb+srv://<username>:<password>@day-06-06-2023.nxqwqpr.mongodb.net }

SECRET_SALT= { secret salt }

JWT_ACCESS_SECRET= { access secret }
JWT_REFRESH_SECRET= { refresh secret }
JWT_FORGOT_SECRET= { forgot secret }
JWT_ACTIVATE_SECRET= { activate secret }

LIFETIME_ACCESS_TOKEN= { How long will the token live? }
LIFETIME_REFRESH_TOKEN= { How long will the token live? }
LIFETIME_ACTIVATE_TOKEN= { How long will the token live? }

FRONT_PORT= { To generate a user activation link }
FRONT_URL= { To generate a user activation link }
```
## The project uses the MongoDB database
[> MongoDB ](https://www.mongodb.com/)

 ## Install all libraries
```
npm install

yarn install
```
 ## Start project:
```
npm run start

yarn start
```


 ## Documentation (swagger) on using endpoints is [> here <](http://localhost:5010/api/docs)

 