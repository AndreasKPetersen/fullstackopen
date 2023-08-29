const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();

const redis = require("../redis");

let addedTodosCount;

const initializeTodosCount = async () => {
  addedTodosCount = await redis.getAsync("added_todos");
  if (!addedTodosCount) {
    const todos = await Todo.find({});
    addedTodosCount = todos.length;
  }
};

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

router.get("/statistics", async (req, res) => {
  await initializeTodosCount();
  res.send(JSON.stringify({ added_todos: Number(addedTodosCount) }));
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  await initializeTodosCount();
  await redis.setAsync("added_todos", Number(addedTodosCount) + 1);

  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.todo.id, req.body);
  res.send(todo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
