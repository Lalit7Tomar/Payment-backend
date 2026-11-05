# Secure Payment System Backend

A production-ready Node.js backend for processing secure transactions. Built with Express and MongoDB, featuring atomic ACID transactions to prevent financial data corruption and JWT-based authentication.

## Features
- **Atomic Transactions:** Uses MongoDB `ClientSession` to ensure payments completely succeed or fully rollback, preventing partial deductions.
- **Secure Authentication:** JWT-based route protection.
- **Modular Architecture:** Clean MVC-inspired separation of routes, controllers, and middleware.

## Tech Stack
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file based on `.env.example` in the root directory.
3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint | Description | Requires Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/payments/process` | Processes a secure transfer | Yes (JWT) |
