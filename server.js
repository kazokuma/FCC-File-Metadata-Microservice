'use strict';

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// require and use "multer"...
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb)  => {
    cb(null, file.fieldname + Date.now())
  }
})

const uploads = multer({storage: storage});
                                                                  
                                                              

app.use(cors());
app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({extended: false});
        
app.use('/public', express.static(process.cwd() + '/public'));
//app.use('/uploads', express.static(process.cwd() + '/uploads'));

app.post('/api/fileanalyse', uploads.array('upfile'), (req, res, next) => {
  console.log(req.files.length);
  if (req.files.length == 0) { console.log("fiele is empty."); 
                              return res.send("<p>No file name is entered.  Please fill in at least one file name.</p>")}
  else {
  let response = [];
  // this is where I set filename for uploaded file.  Because the program upload files in an array very quickly, sometime they will set the same name by 
// using Date.now().  So I need to add i to avoid that situation.
  for(var i = 0; i < req.files.length; i++) {
  response.push({
      filename: req.files[i].filename + i,
      filesize: req.files[i].size
  });
  
  }
  return res.json(response);
  }        
});

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
