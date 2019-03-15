# User-service

> Using TypeORM and GraphQL.

Simple microservice written in typescript to manage user databases. 

## Usage
> CRUD operations from the GraphQL Playground
### Create
```
mutation {
  createUser (
        firstName: "Manu", 
        lastName: "Hortet", 
        userName: "manuhortet", 
        password: "1234", 
        avatar: "https://cdn1.iconfinder.com/data/icons/simple-icons/4096/github-4096-black.png"
  )
}
```


### Read
1. Search for a single user, based on its __id__ or its __userName__
2. See all users
#### Search single user:
```
query {
  user (userName: "manuhortet") {
        id
        firstName
        lastName
  }
}
```
Will return attributes `id`, `firstName` and `lastName` of the user @manuhortet 
#### See all users:
```angular2
query {
  users {
        id
        firstName
        lastName
        userName
        password
        avatar
  }
}
```
Will return the full list of attributes for every user.


### Update
```
mutation {
  updateUser ( 
        id: 1,
        firstName: "Mr. incognito"
  )
}
```
Will change attribute `firstName` of user with `id` = 1 to _Mr. incognito_ (highly ensuring his privacy)

### Delete
```
mutation {
  deleteUser (id: 1)
}
```


**Note:** Every interaction can be done through an HTTP endpoint accessing tool as curl too :)

## Running
### Locally
From the root of the project, just:
```
yarn start
```
### Docker
Build the service:
```
docker build -t <SERVICE-NAME>
```
Run the container:
```
docker run -p 4000:4000 <SERVICE-NAME>
```


**Note:** Running locally or on Docker, the GraphQL playground will be accessible on `localhost:4000`


