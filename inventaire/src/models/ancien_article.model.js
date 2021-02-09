/// oumaima hedhli
"ancien_article strict";
var dbConn = require("../../config/db.config");

//ancien_article object create
var ancien_article = function (ancien_article) {
  this.code_compte = ancien_article.code_compte;
  this.ancien_code = ancien_article.ancien_code;
  this.designation = ancien_article.designation;
  this.categorie = ancien_article.categorie;
  this.date = ancien_article.date;
  this.location = ancien_article.location;
  this.state = ancien_article.state;
  this.serial_number = ancien_article.serial_number;
  this.newcode = ancien_article.newcode;



};
ancien_article.create = function (newEmp, result) {
  dbConn.query("INSERT INTO newArticle set ?", newEmp, function (err, res) {
      if (err) {
          console.log("error: ", err);
          result(err, null);
      }
      else {
          console.log(res.insertId);
          result(null, res.insertId);
      }
  });
};
ancien_article.findById = function (id, result) {
  console.log("Select * from ancien_articles where ancien_code =  '"+ id +"'")
  dbConn.query("Select * from ancien_article where ancien_code =  '"+ id +"'", function (err, res) {
    if (err) {
      result(err, null);
      console.log(err)

    } else {
      console.log(res)
      result(null, res);
    }
  });
};
ancien_article.findAll = function (result) {
  dbConn.query("Select * from newArticle", function (err, res) {
      if (err) {
          console.log("error: ", err);
          result(null, err);
      }
      else {
          
          result(null, res);
      }
  });
};
ancien_article.delete = function (id, result) {
  dbConn.query("DELETE FROM newArticle WHERE id = ?", [id], function (err, res) {
      if (err) {
          console.log("error: ", err);
          result(null, err);
      }
      else {
          result(null, res);
      }
  });
};


module.exports = ancien_article;
