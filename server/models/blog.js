const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const BlogSchema = Schema({
    title: String,
    url: {
        type: String,
        unique: true
    },
    description: String,
    date: Date,
});
BlogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Blog", BlogSchema);