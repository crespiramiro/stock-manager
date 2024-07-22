# stock-manager-demo

Product Management Application

This application serves as a demonstration of skills with various technologies, aimed at showcasing capabilities to potential employers. Its primary function is to manage product inventory with user authentication.

Features

User Registration and Login: Secure authentication using JWT (JSON Web Tokens) with refresh tokens to maintain user sessions.
Product Management (CRUD): Allows users to create, read, update, and delete products. Each product is associated with a user through the userId property.
Data Visualization: Utilizes Shadcn charts for visualizing product information such as category distribution and average prices.
Error Handling: Redirects to the authentication page upon authentication errors. Uses refresh tokens to handle token expiration.

Technologies

Frontend:

React@18.3.1
Tailwind CSS@3.4.4
Shadcn
Keep React@1.3.0
React Hook Form@7.52.0
Next.js@14.2.4

Backend:

Node.js
Express.js
MongoDB - Mongoose
jsonwebtoken

Additional Libraries:

axios@1.7.2
bcrypt@5.1.1
cors@2.8.5
dotenv@16.4.5
express-rate-limit@7.3.1
express-validator@7.1.0
nodemon@3.1.3

Installation
Clone the repository:

sh
git clone https://github.com/your-username/repo-name.git
Navigate into the project directory:

sh
cd repo-name
Install dependencies for the backend:

sh
cd backend
npm install
Install dependencies for the frontend:

sh
cd ../frontend
npm install
Setup environment variables:

Create a .env file in the backend directory with necessary configuration such as MongoDB URI and JWT secrets.

Run the backend server:

sh
cd backend
npm start

Run the frontend application:

sh
Copiar código
cd ../frontend
npm run dev

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch for your feature or fix.
Make your changes and test thoroughly.
Submit a pull request describing your changes and their purpose.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Additional Resources
No additional resources are provided.
