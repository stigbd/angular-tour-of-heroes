# An attempt at Angular 2

Based on [angular.io tutorial](https://angular.io/tutorial)

An experimental project to learn Angular 2, angular cli and jwt.

## Requirements

### Node
A convenient way to install node is to install the excellent tool  [nvm](https://github.com/creationix/nvm)

And then:
```
$ nvm install node
```
### Angular cli
```
$ npm install -g @angular/cli
```
### A hero-api
For example my express based server:
<https://github.com/stigbd/angular-tour-of-heroes-server.git>

### A simple authentication server
For example my simple express based authentication service:
<https://github.com/stigbd/a-simple-authentiation-service.git>

## Usage
```
$ git clone https://github.com/stigbd/angular-tour-of-heroes.git
$ cd angular-tour-of-heroes
$ npm install
$ ng serve
```

## Background and credits

### How JSON Web Tokens (JWT) are used
![alt text](./image/jwt_process.png "")

Image from <https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec>

### Login

Based on <http://angularjs.blogspot.no/2016/11/easy-angular-authentication-with-json.html>

### Guard

Based on <https://github.com/auth0-blog/angular2-tour-of-heroes>

### Tests

Based on <https://semaphoreci.com/community/tutorials/a-tdd-approach-to-building-a-todo-api-using-node-js-and-mongodb>
