
# Product Management API

This is a backend application built using NestJS, MongoDB, and Docker Compose. The API provides features for authentication, authorization, and product management, including creating, updating, retrieving, and deleting products. It follows best practices, including custom exception handling, input validation, and pagination.

---

## Features

- **Authentication and Authorization**:
  - User registration and login with JWT tokens.
  - Role-based access control (Admin and User roles).
- **Product Management**:
  - CRUD operations for products.
  - Pagination support for listing products.
- **Validation**:
  - Custom pipes for input validation, including ID and price fields.
- **Error Handling**:
  - Centralized exception handling with descriptive error messages.
- **Dockerized Setup**:
  - Includes a Docker Compose script for running the app and a MongoDB instance.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Postman](https://www.postman.com/) (optional for testing API)

---

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:ahmedmaherdev/product-management-api-.git
   cd product-management-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following values:

   ```env
   DATABASE_URI=mongodb://localhost:27017/product-management
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=30d
   ```

4. Start the application with Docker Compose:

   ```bash
   docker-compose up
   ```

   This will:
   - Spin up a MongoDB instance.
   - Run the API on [http://localhost:3000](http://localhost:3000).

---

## Running the Application

- **Development Mode**: Run `npm run start:dev`.
- **Production Mode**: Run `npm run start:prod`.

---

## API Documentation

### Postman Collection

The API endpoints are documented in a Postman collection. You can view and test the endpoints using the following link:

[Postman Documentation](https://documenter.getpostman.com/view/17068729/2sAYBVgWSa)

---

### Key Endpoints

#### Authentication

- `POST /auth/register`: Register a new user (Admin or User role).
- `POST /auth/login`: Log in and receive a JWT token.

#### Products

- `POST /products`: Create a new product (Requires authentication).
- `GET /products`: Get all products with optional pagination (Requires authentication).
- `GET /products/:id`: Get a single product by ID (Requires authentication).
- `PATCH /products/:id`: Update a product (Requires authentication).
- `DELETE /products/:id`: Delete a product (Admin only).

---

## Testing the Application

1. Import the Postman Collection.
2. Set the `API_URL` variable to `http://localhost:3000` in your Postman environment.
3. Use the **Register User** and **Login** endpoints to get a JWT token.
4. Pass the token in the `Authorization` header for protected routes.

---

## Folder Structure

```plaintext
src/
  auth/          # Authentication module.
  products/      # Product module.
  users/         # User Module.
  common/        # Shared utilities, including pipes, filters, and interceptors.
docker-compose.yml  # Docker Compose configuration.
test/            # Test cases for the API.
```

---

## Contributing

Feel free to fork this repository and contribute by submitting a pull request.

---

## License

This project is licensed under the MIT License.
