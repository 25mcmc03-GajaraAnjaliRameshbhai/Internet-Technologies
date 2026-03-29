const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let id = 1;

// GET users
app.get("/users", (req, res) => {
  res.json(users);
});

// ADD user
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ error: "All fields required" });
  }

  const newUser = { id: id++, name, email, age };
  users.push(newUser);

  res.json(newUser);
});

// UPDATE user
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, age } = req.body;

  users = users.map(u =>
    u.id === userId ? { ...u, name, email, age } : u
  );

  res.json({ id: userId, name, email, age });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  users = users.filter(u => u.id !== userId);

  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});