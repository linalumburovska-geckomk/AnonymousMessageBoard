/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/messageBoard');
var MessageBoard= require('../models/MessageBoard')
 
module.exports = function (app) {

  app.route('/api/threads')
    .get(function (req, res){
      MessageBoard.find().exec(function(error,data) {
        return res.json(data);
      })
    })
    
    .post(function (req, res){
      var data = new MessageBoard({
        "text": req.body.text,
        "delete_password": req.body.delete_password,
        "created_on": new Date(),
        "bumped_on": new Date(),
        "reported": false
      })  

      data.save();
      return res.json(data);
    })
    
    .delete(function(req, res){
      MessageBoard.remove(function(error,data){
        if(error){
          return res.send('Error');
        }else {
          return res.json('complete delete successful')
        }
      })
    });

    app.route('/api/threads/:board')
    .get(function (req, res){
      var idBoard = req.params.board;
      MessageBoard.findById(idBoard).exec(function(error,data) {
        return res.json(data);
      })
    })
    
    .put(function (req, res){
      var idBoard= req.params.board;
      MessageBoard.findById(idBoard).exec(function(error,data) {
        data.text = req.body.text;
        data.delete_password = req.body.delete_password,
        data.created_on= new Date();
        data.bumped_on = new Date();
        data.reported = req.body.reported;
        data.save();
        return res.json(data);
      }) 
    })
    
    .delete(function(req, res){
      var idBoard = req.params.board;
      MessageBoard.findByIdAndRemove(idBoard).exec(function(error,data) {
        if(error){
          return res.send('Error');
        }else {
          return res.json('delete successful')
        }
      })
    });


  app.route('/api/replies/:board')
    .get(function (req, res){
      var idBoard = req.params.board;
      MessageBoard.findById(idBoard).select('replies').exec(function(error,data) {
        return res.json(data);
      })
    })
    
    .post(function(req, res){
      var idBoard = req.params.board;
      var newReply = req.body.reply;
      MessageBoard.findById(idBoard).exec(function(error,data) {
        data.replies.push(newReply);
        data.save();
        return res.json(data);
      })
    })

    .put(function(req, res){
      var idBoard = req.params.board;
      var newReply = req.body.reply;
      MessageBoard.findById(idBoard).exec(function(error,data) {
        data.replies.push(newReply);
        data.replies.shift();
        data.save();
        return res.json(data);
      })
    })
    
    .delete(function(req, res){
      var idBoard = req.params.board;
      MessageBoard.findByIdAndRemove(idBoard).select('replies').exec(function(error,data) {
        if(error){
          return res.send('Error');
        }else {
          return res.json('delete successful')
        }
      })
      //if successful response will be 'delete successful'
    });
  
};