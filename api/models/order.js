const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_name: { type: String, required: true },
    cashier_name: { type: String, required: true },
    gender: { type: String, required: true},
    age: { type: Number, required: true},
    year: { type: Number, required: true},
    billtotal: { type: Number, required: true},
    boardgame1: { type: mongoose.Schema.Types.ObjectId, ref: 'Boardgame', required: true},
    boardgame2: { type: mongoose.Schema.Types.ObjectId, ref: 'Boardgame'},
    boardgame3: { type: mongoose.Schema.Types.ObjectId, ref: 'Boardgame'},
    boardgame4: { type: mongoose.Schema.Types.ObjectId, ref: 'Boardgame'},
    boardgame5: { type: mongoose.Schema.Types.ObjectId, ref: 'Boardgame'},
});

module.exports = mongoose.model('Order', orderSchema);