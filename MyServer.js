// create express server

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

let app = express();
app.use(bodyParser.urlencoded({extend : false}));
app.use(bodyParser.json());

// connect server to mongodb ==>localhost
mongoose.connect("mongodb://0.0.0.0:27017/My_E-Learning", (err)=>{
    if(!err) console.log('DB now is connected');
    else console.log(err)
})

// schema
const StudentSchema = new mongoose.Schema({
    id : Number,
    name : String,
    age : Number,
    phone : String,
    email : String,
    favBooks : String,
    NumOfVisit : Number
});

const LevelsSchema = new mongoose.Schema({
    level : Number,
    department : String
});

const MaterialSchema = new mongoose.Schema({
    typeOfBooks : String,
    NumOfBooks : Number
});

// convert schema to model(class)
let StudentModel = new mongoose.model("Student",StudentSchema);

let LevelsModel = new mongoose.model("Levels",LevelsSchema);

let MaterialModel = new mongoose.model("Material",MaterialSchema)


// Add new Data for All
app.post('/test1', function (request, response) {
    return StudentModel.create({
      id: request.body.id,
      name: request.body.name,
      age: request.body.age,
      phone : request.body.phone,
      email : request.body.email,
      favBooks : request.body.favBooks,
      NumOfVisit : request.body.NumOfVisit
    }).then(function (StudentModel) {
      if (StudentModel) {
        response.send(StudentModel);
      } else {
        response.status(400).send('Error in insert new  record');
      }
    });
  });

  app.post('/test2', function (request, response) {
    return LevelsModel.create({
      level : request.body.level,
      department : request.body.department
    }).then(function (LevelsModel) {
      if (LevelsModel) {
        response.send(LevelsModel);
      } else {
        response.status(400).send('Error in insert new  record');
      }
    });
  });


  app.post('/test3', function (request, response) {
    return MaterialModel.create({
        typeOfBooks : request.body.typeOfBooks,
        NumOfBooks : request.body.NumOfBooks
    }).then(function (MaterialModel) {
      if (MaterialModel) {
        response.send(MaterialModel);
      } else {
        response.status(400).send('Error in insert new  record');
      }
    });
  });


// let NewStudent = new StudentModel({
//     name : "Ali Gamal",
//     age : 22,
//     phone : "01119076841",
//     favfood : "Koshary",
//     NumOfVisit : 15
// }).save();

// let NewLevels = new LevelsModel({
//     level : 3,
//     department : "CS"
// }).save();

// let NewMaterial = new MaterialModel({
//     typeOfBooks : "Scientific",
//     NumOfBooks : 11000
// }).save();


// endpoint to fetch All (Students , Levels , Material) from database

app.get('/Student',async(req , res)=>{
    let allStudent = await StudentModel.find();
    res.status(200);
    res.json(allStudent)
})

app.get('/Levels',async(req , res)=>{
    let allLevels = await LevelsModel.find();
    res.status(200);
    res.json(allLevels)
})

app.get('/Material',async(req , res)=>{
    let allMaterial = await MaterialModel.find();
    res.status(200);
    res.json(allMaterial)
})

// Update All data
app.put('/updatestudent/:id',
 function(req, res) { var db = req.db;
     var StudentToUpdate = req.params.id;
     db.collection('StudentModel').update( { _id: StudentToUpdate},req.body,
         function(err, result){ res.send( (err === null) ? {msg: ''} : {msg: err} ); }); });


app.put('/updateLevels/:id',
 function(req, res) { var db = req.db;
     var LevelsToUpdate = req.params.id;
     db.collection('LevelsModel').update( { _id: LevelsToUpdate},req.body,
         function(err, result){ res.send( (err === null) ? {msg: ''} : {msg: err} ); }); });


app.put('/updateMaterial/:id',
 function(req, res) { var db = req.db;
     var MaterialToUpdate = req.params.id;
     db.collection('MaterialModel').update( { _id: MaterialToUpdate},req.body,
         function(err, result){ res.send( (err === null) ? {msg: ''} : {msg: err} ); }); });

 

app.listen(7000, function(){
    console.log("server now is opened....!")
})
