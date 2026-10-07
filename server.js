const express = require("express");

const app = express();

const PORT = 5000;

// Parse incoming JSON data
app.use(express.json());

// Custom request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();

  console.log(`[${req.method}] ${req.url} - ${timestamp}`);

  next();
});

// In-memory database
let blogPosts = [];

// GET all blog posts
app.get("/posts", (req, res) => {
  res.json(blogPosts);
});

// GET a single blog post
app.get("/posts/:id", (req, res) => {
  const post = blogPosts.find(
    (post) => post.id === Number(req.params.id)
  );

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.json(post);
});

// CREATE a new blog post
app.post("/posts", (req, res) => {
  const newPost = req.body;

  blogPosts.push(newPost);

  res.status(201).json({
    message: "Post created successfully",
    post: newPost,
  });
});

// UPDATE a blog post
app.put("/posts/:id", (req, res) => {
  const postIndex = blogPosts.findIndex(
    (post) => post.id === Number(req.params.id)
  );

  if (postIndex === -1) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  blogPosts[postIndex] = {
    ...blogPosts[postIndex],
    ...req.body,
    id: Number(req.params.id),
  };

  res.json({
    message: "Post updated successfully",
    post: blogPosts[postIndex],
  });
});

// DELETE a blog post
app.delete("/posts/:id", (req, res) => {
  const postIndex = blogPosts.findIndex(
    (post) => post.id === Number(req.params.id)
  );

  if (postIndex === -1) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const deletedPost = blogPosts.splice(postIndex, 1);

  res.json({
    message: "Post deleted successfully",
    post: deletedPost[0],
  });
});

// Mock login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  res.json({
    message: "Login successful",
    token: "mock-jwt-token-123456",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});