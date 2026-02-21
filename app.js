import express from "express";
import employees from "#db/employees";
import employeesRouter from "./routes/employees.js";

const app = express();

//(middleware to read JSON)
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello employees!");
});


app.use("/employees", employeesRouter);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Server error");
});

export default app;

//this way, all your /employees routes live in routes/employees.js