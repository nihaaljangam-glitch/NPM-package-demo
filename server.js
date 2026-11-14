/**
 * Demo server for @nihaljangam/express-api-logger
 *
 * This project demonstrates how to integrate the express-api-logger
 * middleware into a real Express.js REST API.
 *
 * Run:  node server.js
 * Then visit: http://localhost:3000
 */

"use strict";

const express = require("express");
const apiLogger = require("@nihaljangam/express-api-logger");

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(express.json());

// Register the API Logger middleware with custom configuration
app.use(
  apiLogger({
    color: true,            // Colorized terminal output
    timestamp: true,        // Show [HH:mm:ss] on every line
    showResponseTime: true, // Show response duration (e.g. 12ms)
    format: "standard",     // Clean columnar format
    ignorePaths: ["/health"] // Health checks are silent
  })
);

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check — NOT logged (ignorePaths)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// GET all users → 200 OK
app.get("/api/users", (req, res) => {
  res.status(200).json({
    users: [
      { id: 1, name: "Alice",   role: "admin" },
      { id: 2, name: "Bob",     role: "user"  },
      { id: 3, name: "Charlie", role: "user"  }
    ]
  });
});

// GET single user → 200 OK or 404 Not Found
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const users = { 1: "Alice", 2: "Bob", 3: "Charlie" };

  if (users[id]) {
    res.status(200).json({ id, name: users[id] });
  } else {
    res.status(404).json({ error: `User ${id} not found` });
  }
});

// POST create user → 201 Created
app.post("/api/users", (req, res) => {
  const { name } = req.body || {};
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  res.status(201).json({ id: 4, name, message: "User created successfully" });
});

// PUT update user → 200 OK
app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.status(200).json({ id, message: "User updated successfully" });
});

// DELETE user → 200 OK
app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.status(200).json({ id, message: "User deleted successfully" });
});

// GET all products → 200 OK
app.get("/api/products", (req, res) => {
  res.status(200).json({
    products: [
      { id: 1, name: "Mechanical Keyboard", price: 120 },
      { id: 2, name: "Ergonomic Mouse",     price: 85  },
      { id: 3, name: "USB-C Hub",           price: 45  }
    ]
  });
});

// Simulate a 500 server error
app.get("/api/error", (req, res, next) => {
  next(new Error("Simulated internal server error"));
});

// Global error handler (must have 4 parameters)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// ─── Start Server ─────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("");
  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║       Express API Logger — Demo Server               ║");
  console.log("╠══════════════════════════════════════════════════════╣");
  console.log(`║  Server  : http://localhost:${PORT}                     ║`);
  console.log("║  Package : @nihaljangam/express-api-logger           ║");
  console.log("╠══════════════════════════════════════════════════════╣");
  console.log("║  Available Routes:                                   ║");
  console.log("║  GET    /health              (silent – not logged)   ║");
  console.log("║  GET    /api/users           → 200 OK                ║");
  console.log("║  GET    /api/users/:id       → 200 OK or 404         ║");
  console.log("║  POST   /api/users           → 201 Created           ║");
  console.log("║  PUT    /api/users/:id       → 200 OK                ║");
  console.log("║  DELETE /api/users/:id       → 200 OK                ║");
  console.log("║  GET    /api/products        → 200 OK                ║");
  console.log("║  GET    /api/error           → 500 Server Error      ║");
  console.log("╚══════════════════════════════════════════════════════╝");
  console.log("");
});
