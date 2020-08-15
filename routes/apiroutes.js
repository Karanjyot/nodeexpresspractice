const express = require("express")
const router = express.Router();
const members = require('../members')


router.get("/", (req,res)=>{
    res.send("<h1>Hello Mandy<h1>")
  
})

router.get("/about", (req,res)=>{
    res.send("<h1>About<h1>")
  
})

router.get("/api/:id", (req,res)=>{
    for(i=0; i< members.length; i++){

        if(members[i].id === parseInt(req.params.id)){
            console.log(typeof req.params.id)
            res.send(members[i])
           
        }
 
    }
    return res.send("members not found");
})

// router.get("/api/member", (req,res)=>{
//     res.send(members)
// })

router.post("/api/member", (req,res)=>{

    members.push(req.body)    
    res.send(members)
    console.log(members)
})



module.exports = router