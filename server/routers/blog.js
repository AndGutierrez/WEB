const express = require("express");
const BlogController = require("../controllers/blog");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-blog", [md_auth.ensureAuth], BlogController.addBlog);
api.get("/get-blogs", BlogController.getBlogs);
api.get("/get-blog/:url", BlogController.getBlog);
api.put("/update-blog/:id", [md_auth.ensureAuth], BlogController.updateBlog);
api.delete("/delete-blog/:id", [md_auth.ensureAuth], BlogController.deleteBlog);

module.exports = api;