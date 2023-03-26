const fs = require("fs")
/*const fakeObj = {
  id: "5",
  username: "Vickie",
  country: "Uganda",
  date: "Tue Jul 22 2003 08:53:21 GMT+0300 (FLE Daylight Time)",
  message: "Anyone from Africa here?"
}*/
let latestNum;

function writeObjToJson(newObject) {
  if(!newObject.date) {
    newObject.date = new Date();
  }
  if(!newObject.id) {
    if(latestNum) {
      latestNum += 1;
      newObject.id = latestNum;
      fs.readFile('guestbook.json', (err, data) => {
        if (err) throw err;
      
        const jsonData = JSON.parse(data);
        jsonData.push(validateObjectKeysOrder(newObject));
        fs.writeFile('guestbook.json', JSON.stringify(jsonData), (err) => {
          if (err) throw err;
          console.log("Updated")
        })
      });
    }else {
      fs.readFile('guestbook.json', (err, data) => {
        if (err) throw err;
      
        const jsonData = JSON.parse(data);
        latestNum = 0;
        jsonData.forEach(element => {
          if(element.id >= latestNum) latestNum = element.id;
        });
        latestNum += 1;
        newObject.id = latestNum;
        jsonData.push(validateObjectKeysOrder(newObject));
        fs.writeFile('guestbook.json', JSON.stringify(jsonData), (err) => {
          if (err) throw err;
          console.log("Updated")
        })
      });
    }
  }
  
}

function readJsonFile() {
  let json;
  fs.readFile('guestbook.json', (err, data) => {
    if (err) throw err;
    return JSON.parse(data);
  });
  console.log(json);
}


function validateObjectKeysOrder(obj) {
  return {id: obj.id,
    username: obj.username,
    country: obj.country,
    date: obj.date,
    message: obj.message
  }
}

module.exports = {readJsonFile, writeObjToJson}