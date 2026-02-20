Micro Marketplace

A small full-stack Micro Marketplace application with Web and Backend support. Users can browse products, search, paginate, and add/remove favorites.

#Features

User Authentication (Login/Register) with JWT stored in cookies

Product Listing with Search and Pagination

Favorite / Unfavorite Products

Responsive Web UI built with React and Tailwind CSS

Backend API built with Node.js, Express, and MongoDB

Cloudinary integration for image uploads

Product editing available on server only (no frontend edit UI)



#Tech Stack

Frontend: React, Axios, Tailwind CSS
Backend: Node.js, Express, MongoDB, Mongoose, Cloudinary
Authentication: JWT + Cookies
Image Upload: Multer + Cloudinary



#Backend API Endpoints

Auth
POST /api/v1/register – Register a new user
POST /api/v1/login – Login user
GET /api/v1/getuser – Fetch current logged-in user


Products
POST /api/v1/add-product – Add a new product (with image)
GET /api/v1/get-products – Fetch products with optional search and pagination (page, limit)
POST /api/v1/products/:id/favorite – Toggle favorite for a product
PATCH /api/v1/products/:id – Edit a product (server-only, no frontend UI)
DELETE /api/v1/products/:id – Delete a product



#Frontend Pages
Home – Displays products with search, pagination, and favorite buttons

Login – User login page

Signup – User registration page

Not Found – 404 page

Notes

Product edit functionality is not implemented on the frontend. You can edit product details directly on the server (e.g., via Postman or MongoDB).

Favorites toggle updates in real-time on the frontend after API calls.

All requests use cookies for authentication.



#Setup Instructions
Backend

Clone the repository

Install dependencies:

cd backend
npm install

Set environment variables in .env

PORT=3000
MONGO_URI=<your_mongodb_uri>
ACCESS_TOKEN=<your_jwt_secret>
CLOUD_NAME=<cloudinary_cloud_name>
CLOUD_API_KEY=<cloudinary_api_key>
CLOUD_API_SECRET=<cloudinary_api_secret>

Start server:

npm run dev
Frontend

Navigate to frontend folder:

cd frontend

Install dependencies:

npm install

Start frontend server:

npm run dev

Frontend runs on http://localhost:5173 by default. Backend runs on http://localhost:3000.

This README clearly communicates the features, tech stack, endpoints, and also specifically notes that edit functionality is server-only.
