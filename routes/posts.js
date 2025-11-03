const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { title, content, category } = req.body;
  const owner = req.user._id;
  if (!title || !content || !category) {
    return res.status(400).send("Title , content , category are required.");
  }
  if (!["Technology", "Health", "Travel"].includes(category)) {
    return res
      .status(400)
      .send("Invalid category. Must be one of Technology, Health, Travel.");
  }
  const post = new Post({ title, content, category, owner });
  await post.save();
  res.status(201).send(post);
});

router.get("/", async (req, res) => {
  const { category } = req.query;
  let filter = {};
  if (category) {
    if (["Technology", "Health", "Travel"].includes(category)) {
      filter.category = category;
      const posts = await Post.find(filter);
      res.send(posts);
    }
    res
      .status(400)
      .send("Invalid category. Must be one of Technology, Health, Travel.");
  } else {
    const posts = await Post.find();
    res.send(posts);
  }
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res.status(400).send("Title , content and category are required.");
  }
  if (!["Technology", "Health", "Travel"].includes(category)) {
    return res
      .status(400)
      .send("Invalid category. Must be one of Technology, Health, Travel.");
  }

  const post = await Post.findById(id);
  if (!post) return res.status(404).send("Post not found.");
  if (post.owner.toString() !== req.user._id)
    return res.status(403).send("You are not authorized to update this post.");

  post.title = title;
  post.content = content;
  post.category = category;
  await post.save();
  res.status(200).send({ message: "Post Updated Successfully", post });
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.status(404).send("Post not found.");
  if (post.owner.toString() !== req.user._id)
    return res.status(403).send("You are not authorized to update this post.");
  await Post.findByIdAndDelete(id);
  res.status(200).send({ message: "Post Deleted Successfully", post });
});

module.exports = router;
