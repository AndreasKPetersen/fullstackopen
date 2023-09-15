const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  }).populate("user", { username: 1, name: 1 });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = await request.user;

  if (user === null) {
    return response.status(401).json({ error: "Invalid token" });
  }

  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(200).end();
  } else {
    response.status(401).json({ error: "only creator of blog can delete" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  ).populate("user", { username: 1, name: 1 });

  if (updatedBlog) {
    response.status(200).json(updatedBlog.toJSON());
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
