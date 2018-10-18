const mongoose = require('mongoose');

const capteurs = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uid: {type: String, required: true},
    space: {type: String, required: true},
    status: {type: Boolean, required: true}
})

module.exports = mongoose.model('capteurs', capteurs);