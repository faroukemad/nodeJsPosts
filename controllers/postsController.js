const Post = require("../models/post");

const { validatePost, VALID_CATEGORIES } = require("../utils/postValidate");
exports.createPost = async (req, res) => {
  const error = validatePost(req.body);
  if (error) return res.status(400).send(error);
  const { title, content, category } = req.body;
  const owner = req.user._id;
  const post = new Post({ title, content, category, owner });
  await post.save();
  res.status(201).send(post);
};

exports.getPosts = async (req, res) => {
  const { category } = req.query;
  let filter = {};
  if (category) {
    if (!VALID_CATEGORIES.includes(category))
      return res
        .status(400)
        .send(
          `Invalid category. Must be one of ${VALID_CATEGORIES.join(", ")}.`
        );
    filter.category = category;
  }
  const posts = await Post.find(filter);
  res.send(posts);
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const error = validatePost(req.body);
  if (error) return res.status(400).send(error);
  const { title, content, category } = req.body;
  const post = await Post.findById(id);
  if (!post) return res.status(404).send("Post not found.");
  if (post.owner.toString() !== req.user._id)
    return res.status(403).send("You are not authorized to update this post.");
  post.title = title;
  post.content = content;
  post.category = category;
  await post.save();
  res.status(200).send({ message: "Post Updated Successfully", post });
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.status(404).send("Post not found.");
  if (post.owner.toString() !== req.user._id)
    return res.status(403).send("You are not authorized to delete this post.");
  await Post.findByIdAndDelete(id);
  res.status(200).send({ message: "Post Deleted Successfully", post });
};
