const Post = require("../models/post");
const postService = require("../services/postService");
const { validatePost, VALID_CATEGORIES } = require("../utils/postValidate");

exports.createPost = async (req, res) => {
  const error = validatePost(req.body);
  if (error) return res.status(400).send(error);
  const post = await postService.create({...req.body , owner:req.user._id});
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
  const posts = await postService.findAll(filter);
  res.send(posts);
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const error = validatePost(req.body);
  if (error) return res.status(400).send(error);
  const post = await postService.findById(id);
  if (!post) return res.status(404).send("Post not found.");
  if (post.owner.toString() !== req.user._id)
    return res.status(403).send("You are not authorized to update this post.");
  const postUpdated= await postService.update(post, req.body);
  res.status(200).send({ message: "Post Updated Successfully", postUpdated });
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await postService.findById(id);
  if (!post) return res.status(404).send("Post not found.");
  if (post.owner.toString() !== req.user._id)
    return res.status(403).send("You are not authorized to delete this post.");
  const deletedPost = await postService.delete(id);
  res.status(200).send({ message: "Post Deleted Successfully"});
};
