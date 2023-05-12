const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const app = express();
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient
const { Schema} = mongoose;
const multer = require("multer");
const path = require('path');
const { default: postcss } = require('postcss');
const port = 3000;
const bcrypt = require('bcrypt');
const md5 = require('md5');
const { ObjectId } = require('mongodb');

var pathImg;

const storage = multer.diskStorage({
    destination : function(req , fikle , cb) {
        return cb(null , '../public/img/');
    },
    filename : function(req, file ,cb) {

        pathImg = `${Date.now()}_${file.originalname}`;
        return cb(null , `${Date.now()}_${file.originalname}`);
    }
});

const uploads = multer({storage : storage});

app.use('/',router)
app.use(cors());
router.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended : false}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('static' , express.static('uploads'));
mongoose.set("strictQuery", false);

app.use( (req, res , next) => {
  res.header('Access-Control-Allow-Origin' , '*');
  res.header('Access-Control-Allow-Headers' , 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

mongoose.connect("mongodb://127.0.0.1:27017/Okane" , {
 
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const schPosts = new Schema({
   
    userId : ObjectId,
    name : String,
    des : String,
    startDate : String,
    endDate : String,
    amountOfSaving : Number,
    price : Number,
    img : String,
    status : Boolean
 
}, {collection : 'posts'});

const postsModel = mongoose.model('posts' , schPosts);

const schUsers = new Schema({


  name : String,
  email : String,
  password : String,
  salary : Number

}, {collection : 'users'});

const usersModel = mongoose.model('users' , schUsers);

router.patch('/list/:userId/:id/addMoney' , (req, res) => {
    var myquery = { _id: req.params.id};
    var newvalues = {"$inc" : {"amountOfSaving": req.query.amount}};
  var setStatus;

    postsModel.findByIdAndUpdate( myquery , newvalues).then(post => {
        if(!post) {
            return res.status(404).send();
        }

        if(post.price - post.amountOfSaving <= req.query.amount) {
         
          setStatus = {$set : {"status" : true}};
          postsModel.findByIdAndUpdate( myquery , setStatus).then(post => {
            if(!post) {
                return res.status(404).send();
            }
      
            console.log("update status");
        })
        }
        
        console.log("update amount of saving");
    })

    
    res.status(200).send("update amount of saving!");
    // res.redirect(`http://127.0.0.1:5173/list/${req.params.userId}/${req.params.id}`);
})

router.delete( '/list/:userId/:id/delete' , (req, res) => {
 
  postsModel.findByIdAndDelete(req.params.id).then(post => {
    if(!post) {
        return res.status(404).send();
    }
    console.log("delete");

  }).catch(err => {
      res.status(500).send(err);
  })

  res.status(200).send("already deleted");
  
  // res.redirect(`http://localhost:5173/list/${req.params.userId}`);
})

router.post( '/dataListItems/:userId/post', uploads.single("img"), async (req, res) => {
  
  console.log(req.body);
  console.log(req.file);
  

  function getCurrentDate() {
    const t = new Date();
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    return `${date}/${month}/${year}`;
  }

  function timeEnd() {
    const t = req.query.endDate;
    const arr = t.split("-");
    const date = arr[2];
    const month = arr[1];
    const year = arr[0];
    return `${date}/${month}/${year}`;
  }

  let Data = new postsModel({
       
    userId : req.params.userId,
    name : req.query.name,
    des : req.query.des,
    startDate : getCurrentDate(),
    endDate : timeEnd(),
    amountOfSaving : 0,
    price : req.query.price,
    img : '../../public/img/' + pathImg,
    status : false
  })

  Data.save();

  res.redirect(`http://localhost:5173/list/${req.params.userId}`);
  
})

router.post('/addUser' , (req, res) => {

  let maxId = 0;


  usersModel.findOne({email : req.query.email}).then(data => {
    if(data) {
      console.log(req.query.email + "is exist in database.");
      res.status(400).send("Existed Email.");
    }else {
      usersModel.findOne({name : req.query.name}).then( users => {
        console.log(users);
        if(users) {
          console.log(req.query.name + "is exist in database.");
          res.status(400).send("Existed Username.");
        }else {
    
          let Data = new usersModel({
        
            name : req.query.name,
            email : req.query.email,
            password : md5(req.query.password),
            salary : 0
       })
     
       Data.save();
          
          res.redirect(`http://localhost:5173/login`);
        }
      })
    }
  })

})

router.patch('/update/:userId/:postId' , (req, res) => {
 
  var myquery = { _id: req.params.postId , userId : req.params.uerId };
  var newvalues = {"$set" : {"des": req.query.des,}};

  postsModel.findByIdAndUpdate( myquery , newvalues).then(post => {
    if(!post) {
        return res.status(404).send();
    }
    console.log("update");
})

  res.send("updated!");
})

router.get('/login' , (req, res) => {
  console.log(req.query.userName);
  console.log(md5(req.query.password));
    usersModel.findOne({name : req.query.userName , password : md5(req.query.password)}).then( result => {
        console.log(result);
        
      if(result) {
        console.log("match!!!!");
 
        res.redirect(`http://localhost:5173/list/${result._id}`);
      }else {
        console.log("Noooo");
      res.status(400).send("Username or password invaild.");
      }
        
    }) 
   

})

router.get('/fetchAllPosts' , async (req , res) => {
  const allposts = await postsModel.find({})
  res.send(allposts);
})

router.get('/fetchAllUsers' , async (req , res) => {
  const allUsers = await usersModel.find({})
  res.send(allUsers);
})

router.get("/" , (req, res) => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(postsModel));
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




