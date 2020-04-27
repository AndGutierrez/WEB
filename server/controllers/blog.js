const Blog = require("../models/blog");

function addBlog(req, res) {   
    const body = req.body;
    const blog = new Blog(body);

    blog.save((err, blogStored) => {
        if (err) {
            res.status(500).send({ code: 500, message: "El blog que intenta crear ya existe."});
        } else {
            if (!blogStored) {
                res.status(400).send({ code: 400, message: "No se ha podido crear el blog."});
                return;
            } else {
                res.status(200).send({ code: 200, message: "Blog creado correctamente."});
            }
        }
    });
}

function getBlogs(req, res) {
    const { page = 1, limit = 10 } = req.query;
    
    const options = {
        page,
        limit: parseInt(limit),
        sort: { date: "desc" }
    };

    Blog.paginate({}, options, (err, blogsStored) => {
        if (err){
            res.status(500).send({ code: 500, message: "Error del servidor." });
        } else {
            if (!blogsStored) {
                res.status(404).send({ code: 404, message: "No se ha encontrado ningún blog." });
            } else {
                res.status(200).send({ code: 200, blogs: blogsStored });
            }
        }
    });
}

module.exports = {
    addBlog,
    getBlogs,
};