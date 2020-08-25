const express = require("express");
const router = express.Router();
const members = require("../members");
const User = require("../models/userModel");
const food = require("../models/foodModel");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/about", (req, res) => {
  res.send("<h1>About<h1>");
});

// retrieve a member
router.get("/api/findmember/:id", (req, res) => {
  for (i = 0; i < members.length; i++) {
    if (members[i].id === parseInt(req.params.id)) {
      console.log(typeof req.params.id);
      return res.send(members[i]);
    }
  }
  res.send("members not found");
});

// router.get("/api/member", (req,res)=>{
//     res.send(members)
// })

// add a member
router.post("/api/member/add", (req, res) => {
  members.push(req.body);
  res.send(members);
  console.log(members);
});

//delete a member
router.post("/api/member/delete", (req, res) => {
  for (i = 0; i < members.length; i++) {
    if (req.body.id === members[i].id) {
      members.splice([i], 1);
      res.send(members);
    }
  }

  return res.send("members not found");
});

//update a member
router.post("/api/member/update", (req, res) => {
  for (i = 0; i < members.length; i++) {
    if (req.body.id === members[i].id) {
      members[i] = req.body;
      res.send(members);
    }
  }

  return res.send("members not found");
});

// save to user model

router.post("/api/user", (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  user
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

//save to food model

router.post("/api/food", (req, res) => {
  food
    .create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

// retrieve all from food

router.get("/api/findall", (req, res) => {
  food
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// retrive specific food through get route

router.get("/api/findone/:rating/:food", (req, res) => {
  food
    .find({ rating: req.params.rating, food: req.params.food })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// retrieve specific food through post route

router.post("/api/findone/", (req, res) => {
  food
    .find({ food: req.body.food })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

//update food item

router.put("/api/update", (req, res) => {
  food
    .updateOne(
      { _id: req.body._id },
      { $set: { food: req.body.food, rating: req.body.rating } }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// detele food item by id

router.delete("/api/delete", (req, res) => {
  food
    .deleteOne({ _id: req.body._id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// login route

router.post("/api/login", (req, res) => {
  //mock user

  const user = {
    id: 1,
    username: "karanjyot",
    email: "karanjyot@gmail.com",
  };

  jwt.sign({ user: user }, "secretkey1", (err, token) => {
    res.json({ token: token });
  });
});

//protected route

router.post("/api/protectedroute", verifyToken, (req,res)=>{
  res.json("protected routed access granted")
})

//middleware function

function verifyToken(req,res,next){
  //get auth header token
  const bearerHeader = req.headers['authorization']

  //check if bearer is undefined

  if(typeof bearerHeader != 'undefined'){

    //split at space

    const bearer = bearerHeader.split(' ')

    //get token from array

    const bearerToken = bearer[1]

    //set the token

    req.token = bearerToken

    //call next middleware
    
    next()

  }else{
    //forbidden
    res.sendStatus(403)
  }
}
module.exports = router;
