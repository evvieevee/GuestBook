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
app.use(express.static('home'))

app.get('/guestbook', (req, res)=>{
  res.format({
    html: () => {
      res.sendFile(path.join(__dirname + "/guestbook.html"))
    },
    json: () => {
      fs.readFile('guestbook.json', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
      });
    }
  })
})

app.post('/newmessage', (req, res)=>{
  writeObjToJson(req.body);
  res.redirect('/guestbook')
})

app.get('/newmessage', (req, res)=>{
  res.sendFile(path.join(__dirname + "/newmessage.html"))
})

app.post('/ajaxmessage', async (req, res)=>{
  res.json(await writeObjToJson(req.body));
})

app.get('/ajaxmessage', (req, res)=>{
  res.sendFile(path.join(__dirname + "/ajaxmessage.html")) 
}) 

app.listen(3000)

