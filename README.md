# Shoply — Mini Ecommerce

Full-stack mini ecommerce app: browse products, search/filter, view details, and manage a shopping cart.

## Stack

- **Frontend:** Next.js 16, React 19, Material UI
- **Backend:** Express.js (modular architecture)
- **Database:** MongoDB + Mongoose

## Features

- Product listing with debounced search, category filter, sort, and pagination
- Product details page with stock-aware quantity
- Add to cart + cart page (update qty, remove, live total in **INR ₹**)
- Loading, empty, and error UI states
- Auto-seed products when the backend starts (if DB is empty)
- Modular backend with centralized error handling

## Prerequisites

- Node.js 18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`)

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed    # optional — also auto-seeds on server start if empty
npm run dev
```

API: http://localhost:5000

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # create from example below if needed
npm run dev
```

App: http://localhost:3000

> **Note:** `.env` / `.env.local` and `node_modules` are gitignored and are **not** included in this repo. Copy from the examples below.

## Environment

Create these locally (do not commit them):

**backend/.env** (from `backend/.env.example`)

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce
NODE_ENV=development
```

**frontend/.env.local**

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (`?search=&category=&sort=&page=&limit=`) |
| GET | `/api/products/:id` | Product details |
| POST | `/api/cart` | Add item (`{ productId, quantity, cartId? }`) |
| GET | `/api/cart/:id` | Get cart |
| PUT | `/api/cart/:id` | Update item qty (`{ itemId, quantity }`) |
| GET | `/api/health` | Health check |

**Sort values:** `newest` · `price-asc` · `price-desc` · `name`  
Set `quantity: 0` on PUT to remove an item from the cart.

## Project structure

```
ecomerce/
├── backend/
│   └── src/
│       ├── modules/product/
│       ├── modules/cart/
│       ├── middleware/
│       ├── data/              # seed catalog
│       └── utils/
└── frontend/
    └── src/
        ├── app/               # /, /products/[id], /cart
        ├── components/
        ├── context/
        ├── hooks/
        ├── lib/
        └── theme/
```
