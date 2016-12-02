//dependencies
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const router = express.Router();
const models = require('../models');


//redirect
router.get('/', function(req, res) {
    res.redirect('/burgers');
});

//get burger.js logic 
router.get('/burgers', function(req, res) {
    models.burgers.findAll(
        // attributes: ['burger_name']
        ).then(function(data){
    res.render('index', { burgers: data });
    });
});

router.post('/burgers/create', function(req, res) {
     models.burgers.create({
        burger_name:req.body.name,
        devoured: 0
     }).then(function(){
        res.redirect('/burgers');
     });
});

router.put('/burgers/update/devour/:id', function(req, res) {
    //tableName, column, ID, callback
   models.burgers.update({
    devoured:1
    },{where:{
        id:req.params.id
    }}
   ).then(function(){
        res.redirect('/burgers');
   }) 
});

router.delete('/burgers/delete/:id', function(req, res) {
    //deleteOne(table,id,callback)
    models.burgers.destroy(
        {where:{
            id:req.params.id
        }}).then(function(){
            res.redirect('/burgers');
        })
})

//initial load/direct
router.use(function(req, res) {
    res.redirect('/burgers');
})
//export
module.exports = router;


