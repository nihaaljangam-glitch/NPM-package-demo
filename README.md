# Express API Logger — Demo Project

A working Express.js REST API that demonstrates the [`@nihaljangam/express-api-logger`](https://github.com/nihaaljangam-glitch/NPM-package) middleware in action.

---

## What This Project Shows

This demo proves that the `express-api-logger` middleware:

- Installs cleanly as an NPM dependency
- Works with any Express.js application with a single `app.use()` call
- Logs HTTP method, URL, status code, and response time automatically
- Color-codes status codes in the terminal (green = 2xx, yellow = 4xx, red = 5xx)
- Silences specific paths via `ignorePaths` (e.g. `/health`)

---

## Package Being Demonstrated

| Field | Value |
| :--- | :--- |
| Package | `@nihaljangam/express-api-logger` |
| Version | `1.0.0` |
| Source | [github.com/nihaaljangam-glitch/NPM-package](https://github.com/nihaaljangam-glitch/NPM-package) |

---

## Requirements

- Node.js >= 18
- NPM >= 9

---

## Setup

```bash
# Clone this demo
git clone https://github.com/nihaaljangam-glitch/NPM-package-demo.git
cd NPM-package-demo

# Install dependencies
npm install

# Start the server
npm start
```

The server starts at **http://localhost:3000**

---

## Middleware Configuration Used

```javascript
const apiLogger = require("@nihaljangam/express-api-logger");

app.use(
  apiLogger({
    color: true,
    timestamp: true,
    showResponseTime: true,
    format: "standard",
    ignorePaths: ["/health"]
  })
);
```

---

## Available Routes

| Method | Route | Expected Status |
| :--- | :--- | :--- |
| GET | `/health` | 200 — **not logged** (ignorePaths) |
| GET | `/api/users` | 200 OK |
| GET | `/api/users/1` | 200 OK |
| GET | `/api/users/99` | 404 Not Found |
| POST | `/api/users` | 201 Created |
| PUT | `/api/users/1` | 200 OK |
| DELETE | `/api/users/1` | 200 OK |
| GET | `/api/products` | 200 OK |
| GET | `/api/error` | 500 Internal Server Error |

---

## Terminal Output Example

When requests are made, the terminal shows:

```
[19:38:00]  GET      /api/users          200 OK                     4ms
[19:38:01]  POST     /api/users          201 Created               12ms
[19:38:02]  GET      /api/users/99       404 Not Found              3ms
[19:38:03]  DELETE   /api/users/1        200 OK                     2ms
[19:38:04]  GET      /api/error          500 Internal Server Error  5ms
```

The `/health` route produces **no output** because it is in `ignorePaths`.

---

## Testing the Routes with curl

```bash
# 200 OK
curl http://localhost:3000/api/users

# 201 Created
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Diana"}'

# 404 Not Found
curl http://localhost:3000/api/users/99

# 500 Server Error
curl http://localhost:3000/api/error

# Health check — silent (not logged)
curl http://localhost:3000/health
```

---

## Author

**Nihal Jangam**
- Package repo: [github.com/nihaaljangam-glitch/NPM-package](https://github.com/nihaaljangam-glitch/NPM-package)
