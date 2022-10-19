const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",function(err){
  console.log(err);
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
})

const Article = mongoose.model("Article",articleSchema);

// app.get("/articles",function(req,res){
//
//   Article.find(function(err,foundArticles){
//     // console.log(foundArticles);
//     if(!err)
//       res.send(foundArticles);
//     else
//       res.send(err);
//   })
// })
//
// app.post("/articles",function(req,res){
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//   });
//
//   newArticle.save(function(err){
//     if(!err)
//       res.send("Inserted Successfully!");
//     else
//       res.send("Insert Unsuccesfull!")
//   });
//
// })
//
// app.delete("/articles",function(req,res){
//   const articleTitle = req.body.title;
//   Article.deleteMany({},function(err){
//     if(!err)
//       res.send("Deletion Successfull!");
//     else {
//       res.send("Deletion Unsuccesfull!");
//     }
//   });
// })

app.route("/articles")
  .get(function(req,res){
      Article.find(function(err,foundArticles){
        // console.log(foundArticles);
        if(!err)
          res.send(foundArticles);
        else
          res.send(err);
      })
  })
  .post(function(req,res){
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
      });

      newArticle.save(function(err){
        if(!err)
          res.send("Inserted Successfully!");
        else
          res.send("Insert Unsuccesfull!")
      });
  })
  .delete(function(req,res){
    const articleTitle = req.body.title;
      Article.deleteMany({},function(err){
        if(!err)
          res.send("Deletion Successfull!");
        else {
          res.send("Deletion Unsuccesfull!");
        }
      });
  })

  app.route("/articles/:article")
  .get(function(req,res){
      Article.findOne({title:req.params.article},function(err,article){
        if(err)
          res.send(err);
        else {
          res.send(article);
        }
    })
  })

    .put(function(req,res){
      Article.updateOne({title:req.params.article},{title:req.body.title,content:req.body.content},function(err){
        if(err)
          res.send(err);
        else {
          res.send("Updation Successfull");
        }
    })
  })

    .patch(function(req,res){
      Article.updateOne({title:req.params.article},{$set:req.body},function(err){
        if(err)
          res.send(err);
        else {
          res.send("Success!");
        }
    })
  })
    .delete(function(req,res){
      Article.findOneAndRemove({title:req.params.article},function(err){
        if(err)
          res.send(err);
        else {
          res.send("Deletion Successfull!");
        }
    })
  })


app.listen(3000,function(){
  console.log("Server is running on port 3000");
})
