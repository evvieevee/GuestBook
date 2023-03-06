const fs = require("fs")
/*const fakeObj = {
  id: "5",
  username: "Vickie",
  country: "Uganda",
  date: "Tue Jul 22 2003 08:53:21 GMT+0300 (FLE Daylight Time)",
  message: "Anyone from Africa here?"
}*/


function writeObjToJson(newObject) {
  fs.readFile('guestbook.json', (err, data) => {
    if (err) throw err;
  
    const jsonData = JSON.parse(data);
    jsonData.push(newObject);
    fs.writeFile('guestbook.json', JSON.stringify(jsonData), (err) => {
      if (err) throw err;
      console.log("Updated")
    })
  });
}

function readJsonFile() {
  let json;
  fs.readFile('guestbook.json', (err, data) => {
    if (err) throw err;
    return JSON.parse(data);
  });
  console.log(json);
}

module.exports = {readJsonFile, writeObjToJson}