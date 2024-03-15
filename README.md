# React Marvel Team-up Backend

## Overview

React Marvel Team-up Backend is the server-side component of the React Marvel Teamup application, responsible for handling data storage, authentication, and API endpoints.

## Technologies Used **REVIEW**

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Cors**: Cross-Origin Resource Sharing middleware for Express.
- **Jsonwebtoken**: JSON Web Token implementation for Node.js.
- **Bcrypt**: Library for hashing passwords.
- **Pg**: PostgreSQL client for Node.js.
- **Dotenv**: Module for loading environment variables from a .env file into process.env.
- **Colors**: Library for adding color to console output.
- **Morgan**: HTTP request logger middleware for Node.js.
- **Jsonschema**: JSON schema validator.
- **Axios**: For making HTTP requests from Node.js or the browser, providing a simple and intuitive API.


## Database Setup

- The Marvel API can be found [here](https://developer.marvel.com/)
- A diagram of the schema for the database can be found [here](https://app.quickdatabasediagrams.com/#/d/6FJbjZ)

1. Install PostgreSQL if not already installed.

2. Create a new database for marvel app. Create a test database.

3. Update the `.env` file with the database connection details.

4. Sign up for developer account with Marvel and get private and public keys. 

5. Run the marvel.sql file in psql. 

6. Run getCharactersForDB in the marvelAPI.js file under helpers to seed the DB with character data. 


## API Endpoints

  

### Authentication

  

- #### POST /auth/token

- Returns a JWT token for authentication.

  

- #### POST /auth/register

- Registers a new user.

  

### Characters
  

- #### GET /characters

- Returns a list of all characters.

  

- #### GET /characters/:id

- Returns details of a specific character


  

### Comics


- #### GET /comics/username

- Returns a list of comics that a user has on their reading list. 

  

- #### GET /search/:charOneId/:charTwoId/:offset"

- References the Marvel API to get 

  


  

### Users

  

- #### GET /users/:username

- Returns details of a specific user.

  

- #### DELETE /users/:username

- Deletes a specific user.

  

- #### POST /users/:username/comics/:id

- Adds a comic to a user's reading list. 


## Contributing

Contributions are welcome! Please fork the repository and submit pull requests with any improvements, bug fixes, or new features.
