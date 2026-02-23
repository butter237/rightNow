const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create project
router.post("/", async (req, res) => {
  try {
    const { name, owner_id } = req.body;

    const newProject = await pool.query(
      "INSERT INTO projects (name, owner_id) VALUES ($1, $2) RETURNING *",
      [name, owner_id]
    );

    res.json(newProject.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await pool.query("SELECT * FROM projects");
    res.json(projects.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;