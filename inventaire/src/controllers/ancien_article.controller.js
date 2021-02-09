/// oumaima hedhli
"use strict";
const createError = require("http-errors");
const ancien_article = require("../models/ancien_article.model");
const formidable = require("formidable");
const path = require("path");
const mysql = require("mysql");
const fs = require("fs-extra");
const { nextTick } = require("process");


exports.create = function(req, res) {
  const newarticle = new ancien_article(req.body);
  console.log(newarticle)
 // console.log(req.body)
 // res.send("hello")

  //handles null error 
 if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    ancien_article.create(newarticle, function(err, entreprise) {
          if (err)
          res.send(err);
          res.json({error:false,message:"entreprise added successfully!",data:entreprise});
      });
  }
};


exports.findById = function (req, res, next) {
  try {
    ancien_article.findById(req.params.id, function (err, ancien_article) {
      try {
        console.log(ancien_article);
        if (ancien_article.length !== 0) {
          res.json(ancien_article[0]);
        } else {
          throw createError(404, "ancien_article does not exist.");
        }
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(createError(404, "Unexpected Error."));
  }
};
exports.findAll = function (req, res, next) {
  try {
    ancien_article.findAll(function (err, user) {
      try {
        if (user.length !== 0) {
          res.send(user);
        } else {
          throw createError(404, "Users Not Found.");
        }
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(createError(404, "Unexpected Error."));
  }
};

exports.delete = function(req, res) {
  ancien_article.delete( req.params.id, function(err, student) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Student successfully deleted' });
  });
};


