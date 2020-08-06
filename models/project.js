const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    creationDate:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Project', projectSchema)
