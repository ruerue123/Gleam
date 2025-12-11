# Gleam Candles Backend API

Full-featured REST API for Gleam Candles E-commerce platform built with Node.js, Express, and MongoDB.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with protected routes
- 🛍️ **Product Management** - Full CRUD operations for products
- 🛒 **Order Processing** - Complete order management system
- ❤️ **Favorites System** - User wishlist functionality
- 👥 **User Profiles** - User account management
- 🔍 **Search & Filter** - Product search and collection filtering
- 🔒 **Admin Panel** - Admin-only routes for management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Validation**: express-validator
- **Payment**: Stripe integration ready

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gleam-candles
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

### Database Setup

Seed the database with sample products:
```bash
npm run seed
```

This will create:
- Sample products for all collections
- Admin user (email: admin@gleam.com, password: admin123)

### Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
GET    /api/auth/profile        - Get user profile (Protected)
PUT    /api/auth/profile        - Update user profile (Protected)
```

### Products
```
GET    /api/products                    - Get all products
GET    /api/products/:slug              - Get single product
GET    /api/products/collection/:slug   - Get products by collection
POST   /api/products                    - Create product (Admin)
PUT    /api/products/admin/:id          - Update product (Admin)
DELETE /api/products/admin/:id          - Delete product (Admin)
```

### Orders
```
POST   /api/orders              - Create new order (Protected)
GET    /api/orders/myorders     - Get user orders (Protected)
GET    /api/orders/:id          - Get order by ID (Protected)
PUT    /api/orders/:id/pay      - Update order to paid (Protected)
GET    /api/orders              - Get all orders (Admin)
PUT    /api/orders/:id/status   - Update order status (Admin)
```

### Users
```
GET    /api/users/favourites           - Get user favourites (Protected)
POST   /api/users/favourites/:id       - Add to favourites (Protected)
DELETE /api/users/favourites/:id       - Remove from favourites (Protected)
```

## Data Models

### User
- name, email, password
- role (user/admin)
- shippingAddress
- favourites (array of product IDs)

### Product
- name, slug, description
- price, collection, scent
- stock, images
- rating, reviews

### Order
- user, orderItems
- shippingAddress
- paymentMethod, paymentResult
- prices (items, shipping, tax, total)
- status (pending, processing, shipped, delivered)

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

Admin routes additionally require the user to have admin role.

## Error Handling

All endpoints return consistent error responses:
```json
{
  "message": "Error description",
  "stack": "Stack trace (development only)"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Next Steps

1. Set up MongoDB (local or Atlas)
2. Configure environment variables
3. Run database seed
4. Start the server
5. Test endpoints with Postman/Thunder Client
6. Connect frontend to API

## Payment Integration

To enable Stripe payments:
1. Get your Stripe API keys from https://stripe.com
2. Add them to `.env`
3. Implement Stripe checkout in frontend

## Production Deployment

For production deployment (Vercel, Heroku, etc.):
1. Set `NODE_ENV=production`
2. Use secure JWT secret
3. Enable CORS for your frontend domain
4. Use MongoDB Atlas for database
5. Add rate limiting and security headers

## Support

For issues or questions, please check the documentation or contact support.
