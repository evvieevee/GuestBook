const express = require("express")
const bodyParser = require("body-parser")
const path = require("path");
const { writeObjToJson, readJsonFile } = require("./helper");
const app = express()
const fs = require("fs")

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/', (req, res)=>{
  console.log('Here')
  res.sendFile(path.join(__dirname + "/home.html"))
})

app.get('/guestbook', (req, res)=>{
  console.log('Here2')
  res.format({
    html: () => {
      res.sendFile(path.join(__dirname + "/guestbook.html"))
    },
    json: () => {

      fs.readFile('guestbook.json', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
      });
      //res.json(readJsonFile());
    }
  })
})

app.post('/newmessage', (req, res)=>{
  console.log("post", req.body)
  writeObjToJson(req.body);
  res.sendStatus(201);
})

app.get('/newmessage', (req, res)=>{
  console.log('Here, new message')
  res.sendFile(path.join(__dirname + "/newmessage.html"))
  //writeObjToJson();
  
})

app.get('/ajaxmessage', (req, res)=>{
  console.log('Here')
  res.sendFile(path.join(__dirname + "/ajaxmessage.html"))
}) 

app.post('/', bodyParser, (req, res)=>{
  console.log(req.body)
  console.log(req.query)
  res.send("nice")
})

app.listen(3000)

