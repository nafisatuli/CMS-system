const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({

    title: {

        type: String,
        required: true

    },
    status: {
        type: String,
        default: 'public'
    },
    allowComments: {
        type: Boolean,
        required: require
    },
    body: {
        type: String,
        require: true
    }
});

mongoose.model('posts', postSchema);