const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Boardgame = require('../models/boardgame'); 

router.get('/', (req, res, next) => {
    Boardgame.find()
        .select('_id name boardgame_url boardgame_id image_url age category designer complexity year min_time max_time avg_time min_player max_player avg_rating')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                boardgame: docs.map(doc =>{
                    return {
                        _id: doc._id,
                        name: doc.name,
                        boardgame_url: doc.boardgame_url,
                        boardgame_id: doc.boardgame_id,
                        image_url: doc.image_url,
                        age: doc.age,
                        category: doc.category,
                        designer: doc.designer,
                        complexity: doc.complexity,
                        year: doc.year,
                        min_time: doc.min_time,
                        max_time: doc.max_time,
                        avg_time: doc.avg_time,
                        min_player: doc.min_player,
                        max_player: doc.max_player,
                        avg_rating: doc.avg_rating
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
    const boardgame = new Boardgame({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        boardgame_url: req.body.boardgame_url,
        boardgame_id: req.body.boardgame_id,
        image_url: req.body.image_url,
        age: req.body.age,
        category: req.body.category,
        designer: req.body.designer,
        complexity: req.body.complexity,
        year: req.body.year,
        min_time: req.body.min_time,
        max_time: req.body.max_time,
        avg_time: req.body.avg_time,
        min_player: req.body.min_player,
        max_player: req.body.max_player,
        avg_rating: req.body.avg_rating
    });
    boardgame
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Adding boardgame to store success',
                boardgame: {
                    _id: result._id,
                    name: result.name,
                    boardgame_url: result.boardgame_url,
                    boardgame_id: result.boardgame_id,
                    image_url: result.image_url,
                    age: result.age,
                    category: result.category,
                    designer: result.designer,
                    complexity: result.complexity,
                    year: result.year,
                    min_time: result.min_time,
                    max_time: result.max_time,
                    avg_time: result.avg_time,
                    min_player: result.min_player,
                    max_player: result.max_player,
                    avg_rating: result.avg_rating
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});

router.get('/findByBoardgameId/:boardgameId', (req, res, next) => {
    const id = req.params.boardgameId;

    Boardgame.find({ _id: id })
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                    boardgame: doc
            });
        }else{
            res.status(404).json({
                message: 'Boardgame' + id + 'does not exist'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/findByName/:boardgameName', (req, res, next) => {
    const name = req.params.boardgameName;

    Product.find({ name: name })
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                boardgame: doc
            });
        }else{
            res.status(404).json({
                message: 'Boardgame name ' + name + ' does not exist'
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

router.get('/findByFilter/:boardgame', (req, res, next) => {
    const boardgame = JSON.parse(req.params.boardgame);
    const category = boardgame.category;

    Boardgame.find({category: { $elemMatch: {category} }})
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            boardgame: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    boardgame_url: doc.boardgame_url,
                    boardgame_id: doc.boardgame_id,
                    image_url: doc.image_url,
                    age: doc.age,
                    category: doc.category,
                    designer: doc.designer,
                    complexity: doc.complexity,
                    year: doc.year,
                    min_time: doc.min_time,
                    max_time: doc.max_time,
                    avg_time: doc.avg_time,
                    min_player: doc.min_player,
                    max_player: doc.max_player,
                    avg_rating: doc.avg_rating
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


router.patch('/update/:boardgameId', (req, res, next) => {
    const id = req.params.boardgameId;
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Boardgame.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Boardgame: ' + id + ' updated!!'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/delete/:boardgameId', (req, res, next) => {
    const id = req.params.boardgameId;
    Boardgame.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Boardgame: ' + id + ' is deleted!!'
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