# CStoday

Simple web application for detailing courses in the field of computing.

![CStoday](https://user-images.githubusercontent.com/52302576/82171282-3d107e80-989d-11ea-9692-e8186beb3720.png)



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

MongoDB and Insomnia/Postman. 

### Installing

Install dependencies for both backend('./' directory) and frontend('./view' directory).

```
yarn install
```

## Deployment

With the database running and inside the './' directory, run the backend:

```
node index.js
```
Now the frontend:

```
yarn start
```

To populate the database use the HTTP routes or create an Admin user(using Insomnia/Postman). OR get CRUD access in '/login' frontend route.
To revoge Admin status clean localStorage. 

## Built With

* NodeJS - Backend
* ReactJs - Frontend
* Bootstrap - Style
* MongoDB - Database
* JWT - Authentication
