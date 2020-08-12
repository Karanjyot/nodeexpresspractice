const express = require("express")
const router = express.Router();


router.get("/", (req,res)=>{
    res.send("<h1>Hello World<h1>")
  
})

router.get("/about", (req,res)=>{
    res.send("<h1>About<h1>")
  
})

router.get("/api/:id", (req,res)=>{
    res.send(req.params.id)
  
})

router.post("/api/member", (req,res)=>{
    res.send(req.body.food)
    console.log(req.body.food)
})

module.exports = router