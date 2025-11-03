# Node.js Blog API

A RESTful API for user authentication and blog management built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**
  - Sign up with name, email, and password (with validation)
  - Login with JWT token generation
- **Blog Management**
  - Create, view, update, and delete blogs
  - Filter blogs by category (Technology, Health, Travel)
  - Ownership enforcement: users can edit/delete only their own blogs
- **Testing**
  - Unit tests for authentication and blog routes using Jest and Supertest

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/faroukemad/nodeJsPosts.git
   cd nodeJsPosts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file for environment variables:
   ```
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=mongodb://localhost/posts
   ```

4. Run the server:
   ```bash
   npm start
   ```

5. Run tests:
   ```bash
   npm test
   ```

## API Endpoints

### Authentication

- `POST /api/signup`  
  Input: `{ name, email, password }`  
  Output: Success or error message

- `POST /api/login`  
  Input: `{ email, password }`  
  Output: JWT token or error message

### Blogs

- `POST /api/posts`  
  Input: `{ title, content, category }`  
  Output: Success or error message

- `GET /api/posts?category=Technology`  
  Output: List of blogs (filtered by category)

- `PUT /api/posts/:id`  
  Input: Blog ID, updated title/content/category  
  Output: Success or error message

- `DELETE /api/posts/:id`  
  Input: Blog ID  
  Output: Success or error message

