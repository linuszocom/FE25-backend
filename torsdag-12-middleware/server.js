import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// FEL SÄTT:
// const API_KEY = "min-hemliga-nyckel";

// RÄTT SÄTT
const API_KEY = process.env.API_KEY;

// Middleware funktion som kräver korrekt API nyckel
function requireApiKey(req, res, next) {
  const apikey = req.headers["x-api-key"];

  // Om nyckel saknas eller inte matchar - svara 401 och inget next() anrop
  if (!apikey || apikey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Ogiltig eller saknad API-nyckel" });
  }
  // Nyckel stämmer - skickar vidare i flödet
  next();
}

app.use(express.json()); // middleware
// Registrerar vi middleware funktionen endast för /api-routes
app.use("/api", requireApiKey);

// mockdata
let users = [
  { id: 1, name: "Luna", email: "luna@example.com", role: "admin" },
  { id: 2, name: "Maria", email: "maria@example.com", role: "guest" },
];

app.get("/", (req, res) => {
  res.json({ meddelande: "Välkommen till Users API" });
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ fel: "Användaren hittades inte" });
  }

  res.json(user);
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body; // destructuring

  if (!name || !email) {
    return res.status(400).json({ fel: "Name och email krävs" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ fel: "Användaren hittades inte" });
  }

  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ fel: "Name och email krävs" });
  }

  user.name = req.body.name;
  user.email = req.body.email;

  res.json(user);
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ fel: "Användaren hittades inte" });
  }

  users = users.filter((u) => u.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API:et lyssnar på http://localhost:${PORT}`);
});

// // En middleware: Skickar vidare genom att vi anropar next()
// function middleware(req, res, next) {
//   console.log("Middleware kördes - du skickas nu vidare");
//   next();
// }

// // Middleware: Stoppar ett svar/request flöde
// function middlewareStop(req, res, next) {
//   res.status(503).json({ meddelande: "Stopp!" });
// }

// // request flöde
// // 1. Request kommer in (postman)
// // 2. Middleware 1 (express.json()) parsar vår body
// // 3 Middleware 2 - middleware
// // 4. Middleware 3 - middlewarestop
// // 5. GET /api/users -. skickar data tillbaka
// // 6. Response skickas till klienten (Postman i detta fall)

// // felmeddelanden som vi skickar till en client
// // FEL
// res
//   .status(500)
//   .json({ error: "Kunde inte ansluta till databasen på ip 192.168.1.0" });

// // RÄTT
// res.status(500).json({ error: "Något gick fel på servern" });

// // Autentisering vs Auktorisering

// // Autentisering - vem är du?
// function autentisering(req, res, next) {
//   const apiKey = req.headers["x-api-key"];
//   if (!apiKey || apiKey !== process.env.API_KEY) {
//     return res.status(401).json({ error: "Ogiltig API nyckel" });
//   }
//   next();
// }

// // Auktorisering - Får du göra detta?
// // Kontrollerar rättigheter: admin, user, guest
// function baraAdmin(req, res, next) {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ error: "Du har inte behörighet" });
//   }
//   next();
// }

// CORS - Cross-Origin Resource Sharing
// Frontend - localhost:5173
// API körs - localhost:3000

// fetch('http://localhost:3000/api/users') // webläsaren kommer säga STOP
// npm install cors
// import cors from 'cors';
// app.use(cors()) - tillåter alla origins bra vid utveckling
// app.use(({ origin: 'https://min-frontend.se' }));
