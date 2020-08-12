var express = require("express");
var path = require("path");
var app = express ();



var PORT = 5000 || process.env.PORT

//middleware to handle JSON/URLencoded data. Parse JSON (turn json into js object)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 
app.use('/', require("./routes/apiroutes"))

// set a static folder
// app.use(express.static(path.join(__dirname, 'public')))


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
   
})