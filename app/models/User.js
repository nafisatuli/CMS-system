const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({

    firstName: {
        type: String,
        required: true

    },
    lastName: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true

    }

});

UserSchema.methods.testMethod = function () {
    //console.log('using schema methods');
};

module.exports = mongoose.model('users', UserSchema);