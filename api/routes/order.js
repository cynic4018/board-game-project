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
                order: docs.map(doc =>{
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

router.post('/', (req, res, next) => {
    const order = new Order({
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
    });
    order
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Ordered success!!',
                order: {
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
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});

router.get('/findByAge/:orderAge', (req, res, next) => {
    const age = req.params.orderAge;

    Order.find({ age: age })
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                order: doc
            });
        }else{
            res.status(404).json({
                message: 'No ordered with customer age:' + age
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.get('/findByAge/:orderYear', (req, res, next) => {
    const year = req.params.orderYear;

    Order.find({ year: year })
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                order: doc
            });
        }else{
            res.status(404).json({
                message: 'No Ordered in ' + year
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.get('/findByGender/:orderGender', (req, res, next) => {
    const gender = req.params.orderGender;

    Order.find({ gender: gender })
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                order: doc
            });
        }else{
            res.status(404).json({
                message: 'No Ordered with ' + gender + 'customer'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.get('/findByUsername/:orderUsername', (req, res, next) => {
    const name = req.params.orderUsername;

    Order.find({ user_name: name })
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                order: doc
            });
        }else{
            res.status(404).json({
                message: 'No customer name:' + name
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.get('/findByCashiername/:orderCashiername', (req, res, next) => {
    const cashiername = req.params.orderCashiername;

    Order.find({ cashier_name: cashiername })
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                order: doc
            });
        }else{
            res.status(404).json({
                message: 'No cashier name:' + cashiername
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/delete/:customerId', (req, res, next) => {
    const id = req.params.customerId;
    Order.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order: ' + id + ' is deleted!!'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.delete('/deleteUsername/:customerName', (req, res, next) => {
    const customer = req.params.customerName;
    Order.remove({ user_name: customer })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Customer name: ' + customer + ' is deleted!!'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;