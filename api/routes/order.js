const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order'); 

router.get('/', (req, res, next) => {
    Order.find()
        .select('_id user_name cashier_name gender age year billtotal boardgame1 boardgame2 boardgame3 boardgame4 boardgame5')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                boardgame: docs.map(doc =>{
                    return {
                        _id: doc._id,
                        user_name: doc.user_name,
                        cashier_name: doc.cashier_name,
                        gender: doc.gender,
                        age: doc.age,
                        year: doc.year,
                        billtotal: doc.billtotal,
                        boardgame1: doc.boardgame1,
                        boardgame2: doc.boardgame2,
                        boardgame3: doc.boardgame3,
                        boardgame4: doc.boardgame4,
                        boardgame5: doc.boardgame5
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;