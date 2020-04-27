const express = require("express");
const BlogController = require("../controllers/blog");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-blog", [md_auth.ensureAuth], BlogController.addBlog);
api.get("/get-blogs", BlogController.getBlogs);

module.exports = api;