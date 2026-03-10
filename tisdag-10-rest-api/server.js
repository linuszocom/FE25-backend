import express from "express";

const app = express();

const PORT = 3000;

app.use(express.json()); // middleware

// mockdata
let users = [
  { id: 1, name: "Luna", email: "luna@example.com" },
  { id: 2, name: "Maria", email: "maria@example.com" },
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
