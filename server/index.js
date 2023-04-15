const express = require('express')
const app = express();
const path = require("path");
const port = 3000
const fs = require("fs");

const listsData = require('../src/components/FakeDataListItems.json');

app.use( (req, res , next) => {
  res.header('Access-Control-Allow-Origin' , '*');
  res.header('Access-Control-Allow-Headers' , 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.get( '/dataListItems/:userId/:id/delete' , (req, res) => {
  
  let index = listsData.map((item) => item.id).indexOf(parseInt(req.params.id));

  if (index > -1) {
    
    listsData.splice(index, 1);
    console.log("Result", listsData);
  }

  

  fs.writeFile("../src/components/FakeDataListItems.json", JSON.stringify(listsData), (err) => {

    if (err) throw err;
    console.log("Update");
   
  });



  res.redirect(`http://localhost:5173/list/${req.params.userId}`);
})


app.post( '/dataListItems/:userId/post' , (req, res) => {
  var idGenerator = listsData.length;

  
  // listsData.map ( data => {
  //   if(data.id === idGenerator) {
  //     idGenerator = idGenerator + 1;
  //   }

    
  // })
  idGenerator = idGenerator + 1;

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


  let data = {
    id :idGenerator,
    userId : req.params.userId,
    name : req.query.name,
    des : req.query.des,
    startDate : getCurrentDate(),
    endDate : timeEnd(),
    amountOfSaving : 0,
    price : req.query.price,
    img : '../public/img/' + req.query.img,
    status : false

  }

  let appendData = fs.readFileSync("../src/components/FakeDataListItems.json");
  let myObject = JSON.parse(appendData);
  myObject.push(data);

  var appendData2 = JSON.stringify(myObject);
  fs.writeFile("../src/components/FakeDataListItems.json", appendData2, (err) => {

    if (err) throw err;
    console.log("New data added");
   
  });

res.redirect(`http://localhost:5173/list/${req.params.userId}`);
  
})

app.get("/" , (req, res) => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(listsData));
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})