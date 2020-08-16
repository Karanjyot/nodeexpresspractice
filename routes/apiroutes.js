const express = require("express");
const router = express.Router();
const members = require("../members");

router.get("/", (req, res) => {
  res.send("<h1>Hello Mandy<h1>");
});

router.get("/about", (req, res) => {
  res.send("<h1>About<h1>");
});

// retrieve a member
router.get("/api/:id", (req, res) => {
  for (i = 0; i < members.length; i++) {
    if (members[i].id === parseInt(req.params.id)) {
      console.log(typeof req.params.id);
      res.send(members[i]);
    }
  }
  return res.send("members not found");
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

module.exports = router;
