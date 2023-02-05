const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongooseDelete = require('mongoose-delete');

const Course = new Schema({
    _id:{type:Number},
    name: {type: String,require:true},
    description: { type: String },
    img: { type: String },
    videoID: { type: String,require:true },
    level: { type: String },
    slug: {type: String, slug:'name',unique:true},
}, {
    _id: false,
    timestamps: true,
});
//Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt:true,
    overrideMethods: 'all',
},
);
module.exports = mongoose.model('Course', Course);