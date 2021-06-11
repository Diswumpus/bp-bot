const mongoose = require('mongoose');

const thanksSchema = new mongoose.Schema({
    perm: Boolean,
    user: String
});

const ThanksModel = module.exports = mongoose.model('perms', thanksSchema);