import express from "express";
import employees from "#db/employees";

const router = express.Router();

//GET /employees
router.get("/", (req, res) => {
  res.send(employees);
});

//GET /employees/random
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

//GET /employees/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

//POST /employees
router.post("/", (req, res) => {
  const name = req.body?.name;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("A name is required");
  }
// unique id
  const newEmployee = {
    id: employees.length, 
    name: name.trim(),
  };

  employees.push(newEmployee);
  res.status(201).send(newEmployee);
});

export default router;