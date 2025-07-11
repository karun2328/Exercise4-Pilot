const express = require('express')
const fs=require('fs');
const path = require('path');

const app = express()
const port = 3000

app.use(express.static('public'));

app.use(express.json());

const tokenFile=path.join(__dirname,'token.json');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'public','index.html'));
});

app.post('/token',(req,res)=>{
  fs.writeFile(tokenFile,JSON.stringify(req.body),err=>{
    if(err){
      console.error("Failed to save token:",err);
      res.status(500).send("Error saving token");
    }else{
      res.send('Token Saved');
    }
  });
});

app.get('/token', (req, res) => {
  if(!fs.existsSync(tokenFile)){
    console.log("No token found")
    return res.json({user: null, browser: null})
  }

  fs.readFile(tokenFile, (err, data) => {
    if (err) {
      console.error("Failed to read token:", err);
      return res.status(500).send('Error reading token');
    } 
    try{

      res.json(JSON.parse(data));
    }catch(parseErr){
      console.error("Invalid JSON");
      return res.status(500).send('Invalid Token');


    }
    
  });
});

app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})
