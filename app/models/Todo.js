const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TodoSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true

    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('todos', TodoSchema);