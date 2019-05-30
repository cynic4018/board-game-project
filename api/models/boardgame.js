const mongoose = require('mongoose');

const boardgameSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    boardgame_url: { type: String, required: true},
    boardgame_id: { type: String, required: true },
    image_url: { type: String, required: true},
    age: { type: Number, required: true},
    category: { type: String, required: true},
    designer: { type: String, require: true},
    complexity: { type: Number, required: true},
    year: { type: Number, required: true},
    min_time: { type: Number, required: true},
    max_time: { type: Number, required: true},
    avg_time: { type: Number, required: true},
    min_player: { type: Number, required: true},
    max_player: { type: Number, required: true},
    avg_rating: { type: Number, required: true}
});

module.exports = mongoose.model('Boardgame', boardgameSchema);