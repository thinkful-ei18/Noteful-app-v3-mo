const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Folder = require('../models/folder');
const Note = require('../models/note');
const Tag = require('../models/tag');

//Get All tags
router.get('/tags', (req,res,next)=>{
Tag
.find()
.sort('name')
.then(results => {
    res.json(results)
})
.catch(next);
});

//Get tag by id
router.get('/tags/:id', (req,res,next)=>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('The `id` is not valid');
        err.status = 400;
        return next(err);
      }

      Tag.findById(id)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(next);
});

module.exports = router;