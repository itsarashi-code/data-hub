require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const Post = require("./models/Post");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Data Hub API is running" });
});

// CREATE USER
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required"
      });
    }

    const user = await User.create({ name, email });

    res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET ALL POSTS
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("authorId", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// TOP 3 RECENT POSTS
app.get("/posts/recent/top3", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("authorId", "name email");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET SINGLE POST
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("authorId", "name email");

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.json(post);
  } catch (error) {
    res.status(400).json({ message: "Invalid post ID" });
  }
});

// CREATE POST
app.post("/posts", async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    const post = await Post.create({
      title,
      content,
      authorId: authorId || undefined
    });

    res.status(201).json({
      message: "Post created successfully",
      post
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE POST
app.put("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.json({
      message: "Post updated successfully",
      post
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE POST
app.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.json({
      message: "Post deleted successfully",
      post
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// MOCK LOGIN (Sprint 09)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  res.json({
    message: "Login successful",
    token: "mock-jwt-token-123456"
  });
});

// Start server only after database connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();