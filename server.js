const express = require('express');
const app = express();

//parse incoming urlencoded data and populate req.body object
const bodyParser = require('body-parser');

//password encryption extension
const bcrypt = require('bcrypt'); 

//initialize database
const db = require('./models');
const jwt = require('jsonwebtoken')

//APP.USE 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//APP.GET
app.get('/', (req, res) => {res.sendFile(__dirname + '/views/index.html');});
app.get('/', (req, res) => {res.sendFile(__dirname + '/views/profile.html');});

//Geocoding
app.get('/interests/location', getLongLat = (req,res) => {
  if(err){
    console.log("ERROR: " + err)
    res.sendStatus(400)
  }
})

//Get user interests from cached value from selected checkboxes in interests.html
app.get('/userInterests', getInterests = (req,res) => {
  let username = req.query.username
  db.User.findOne({username:username}, (err,user) => {
    if(err){
      console.log("ERROR: " + err )
      res.sendStatus(400)
    } else {
      res.json(user)
    }
  })
})

app.get('/interests', (req, res) => {
  res.sendFile(__dirname + '/views/interests.html');
});

app.get('/profile', (req, res) => {
  res.sendFile(__dirname + '/views/profile.html');
});

//APP.POST
app.post('/verify', verifyToken, (req, res) => {
    let verified= jwt.verify(req.token, 'kombucha')
    res.json(verified)
})

app.post('/protectedPage', verifyToken, (req, res) => {
    jwt.verify(req.token, 'kombucha', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: 'Post created',
          authData
        });
      }
    });
});

app.post('/signup', (req, res) => {
    db.User.find({email: req.body.email})
    .exec()
    .then( user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "email already exists"
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if(err){ 
            res.status(500).json({error: err})
          } else {
            const user = new db.User({
              email: req.body.email,
              password: hash,
              username: req.body.username,
              interests: req.body.interests
            });
            console.log(JSON.stringify(user));
            user
              .save()
              .then( result =>
                res.json({
                  message: 'User created',
                  user: result
                })
              )
              .catch( err => {
                console.log(err);
                res.status(500).json({err})
              })
          }
        })
      }
    })
});

app.post('/login', (req, res) => {
    db.User.find({email: req.body.email})
      .exec()
      .then( users => {
        if(users.length < 1) {
          return res.status(401).json({
            message: "Email/Password incorrect"
          })
        }
        bcrypt.compare(req.body.password, users[0].password, (err, match) => {
          if(err){return res.status(500).json({err})}
          if(match){
            const token = jwt.sign({
                email: users[0].email,
                _id: users[0]._id
              }, 
              "kombucha",
              {
                expiresIn: "5h"
              },
            );
            return res.status(200).json(
              {
                message: 'Auth successful',
                token
              }
            )
          } else {
            res.status(401).json({message: "Email/Password incorrect"})
          }
        })
      })
      .catch( err => {
        console.log(err);
        res.status(500).json({err})
      })
});

//APP.PUT
app.put('/profile',(req,res)=>{
  db.User.findOneAndUpdate({username:req.body.username},{meetupIDs:req.body.meetupId})
})

app.put('/profile/remove',(req,res)=>{
  console.log("Removing Profile",req.body.username)
  db.User.findOneAndRemove({username:req.body.username},{meetupIDs:req.body.meetupId})
})

app.put('/interests', (req, res) => {
//DB CALLS
  db.User.findOneAndUpdate({username: req.body.username},{interests: req.body.interests})

  db.User.findOneAndUpdate({username: req.body.username},
    {interests: req.body.interests})
  .exec()
  .then( user => {
    console.log("INFO: User: " + user);
  })
  res.status(200).json({
    message: "Sent OK"
  })
});

//FUNCTIONS
verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }
//server
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
});

