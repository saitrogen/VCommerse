# Terminal API Testing Guide

## 1. Register a Seller (with UPI ID)
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Seller",
    "email": "seller@test.com",
    "password": "password123",
    "role": "seller",
    "upiId": "test@upi"
  }'
```

## 2. Register a Buyer (no UPI needed)
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Buyer",
    "email": "buyer@test.com",
    "password": "password123",
    "role": "buyer"
  }'
```

## 3. Login and Get Token
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seller@test.com",
    "password": "password123"
  }'
```
- Copy the "token" value from response

## 4. Create Product (Use seller token)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Test Product",
    "description": "Test description",
    "price": 100,
    "stock": 10,
    "category": "other"
  }'
```

## 5. Test Endpoints
```bash
# Get all products
curl http://localhost:3000/api/products

# Get single product (replace :id)
curl http://localhost:3000/api/products/:id