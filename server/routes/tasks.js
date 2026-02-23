const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/project/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE project_id = $1",
      [projectId]
    );

    res.json(tasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1️⃣ ดึง task + assignee name
    const taskResult = await pool.query(
      `SELECT 
          t.*,
          u.username AS assignee_name
       FROM tasks t
       LEFT JOIN users u 
         ON t.assignee_id = u.id
       WHERE t.id = $1`,
      [id]
    );

    if (taskResult.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const task = taskResult.rows[0];

    // 2️⃣ ดึง checklist
    const checklistResult = await pool.query(
      `SELECT id,
              content AS text,
              is_done AS done
       FROM task_checklists
       WHERE task_id = $1
       ORDER BY position ASC`,
      [id]
    );

    task.checklist = checklistResult.rows;

    res.json(task);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, status, description, checklist } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Update task
    const taskResult = await client.query(
      `UPDATE tasks
       SET title = $1,
           status = $2,
           description = $3
       WHERE id = $4
       RETURNING *`,
      [title, status, description, id]
    );

    if (taskResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Task not found" });
    }

    // 2️⃣ ลบ checklist เดิม
    await client.query(
      "DELETE FROM task_checklists WHERE task_id = $1",
      [id]
    );

    // 3️⃣ Insert checklist ใหม่
    if (Array.isArray(checklist)) {
      for (let i = 0; i < checklist.length; i++) {
        await client.query(
          `INSERT INTO task_checklists
           (task_id, content, is_done, position)
           VALUES ($1, $2, $3, $4)`,
          [
            id,
            checklist[i].text,
            checklist[i].done,
            i
          ]
        );
      }
    }

    await client.query("COMMIT");

    res.json({ message: "Task updated successfully" });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Server error" });
  } finally {
    client.release();
  }
});



module.exports = router;