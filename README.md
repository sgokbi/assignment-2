# assignment-2 (User Management )

## How to clone the repository

[Link](https://github.com/sgokbi/assignment-2)
To clone the repository, use the following command:

`git clone https://github.com/sgokbi/assignment-2.git `

## How to run the repository

- Run the command `npm i install`
- To transfer TypeScript file into JavaScript file, run `tsc`
- Run the project in localhost port 5000 by run the command `npm run start:dev`
- Open the MongoDB Compass and then connect to the MongoDB localhost
- Open the Postman for testing
- In the Postman to create a new user, use POST method and the route is `http://localhost:5000/api/users`
- To get Single User, use the GET method and the route is `http://localhost:5000/api/users/:userId`
- To get all the user, use the GET method and the route is `http://localhost:5000/api/users/`
- To update a user, use the PUT method and the route is `http://localhost:5000/api/users/:userId`
- To Delete a user, use the DELETE method and the route is `http://localhost:5000/api/users/:userId`

- To check if the user data is storing or updating in the Database, check with the proper route in the localhost 5000 post
