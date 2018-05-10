# MEVN Stack REST API

## Technologies

This project uses:
Mongo, Express, VueJS, Node

## Requirements

This project will require:
* Node >=7.0
* MongoDB

## Installation

To install this project simply clone or download the repo:

`git clone https://github.com/abdullahtariq91/mevn-rest-api.git <dir name>`

`cd <dir name>`

`npm install`

`cp .env.example .env` then add in your local Mongo URI **Changing the PORT variable in the .env will require you to change it in the `views/config/http.js` file.**

### Setup/Development

The server will require you to be running a local instance of MongoDB.

To use this project you can run

`npm run dev:serve`

and

`npm run dev:client`

in separate terminal instances. This will allow hot reloading of both changes to the server and changes to the client.

The credentials for the super admin are `Email: super@admin.com` `Password: 123456`.

### Project Structure

##### Backend

`/src`

`--/controllers/`-- Contains controllers for the API

`--/database/`

`----/models/`-- Contains the models

`--/middleware/`-- Contains middleware for catching errors and ACL permissions

`--/libs/`

`----/authentication.js`-- Checks for user authentication

`----/common.js`-- Contains common functions used by the API

`----/sockets.js`-- Contains functionality for socket io

`--/routes/`

`----/api.js`-- Routes for the API

`----/user.js`-- Routes specific to the user resource

`----/secret.js`-- Routes to check for admin permissions (RBAC)

`----/login.js`-- Routes to login and logout

##### Frontend

`/views`

`--/config/http.js`-- Axios config for local request

`--/pages/`-- Pages for login, home, and users

`--/router/index.js`-- Config for vue-router

`--/App.vue`

`--/main.js`

`--/index.html`-- The file returned to user

### Routes

All endpoints are behind the `/api` endpoint.

#### `GET`
`/users` - returns a list of all users inside of an array called `data`.

`/secret` - returns a message only the admin can view.

`/users/:id` - where `:id` is the id of a `user` resource. The resource is then returned in JSON format.

#### `POST`
`/users` - Creates a new `user` resource based on the payload of the request.

`/login` - Logs in the user.

`/login/logout` - Logs out the user and removes socket connection.

#### `DELETE`
`/users/:id` - Delete a user resouce matching the `:id` specified.

#### `PUT`
`/users` - Update a user based on the payload of the request

##

The Client can be accessed by hitting the document root:

`localhost:8080/` Will send you to the application.
