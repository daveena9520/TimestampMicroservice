const express = require("express");
const app = express();

const PORT = 3000;


app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.get('/api/timestamp/:date_string?', function(req,res){
    let now = new Date();
    let date_string;
    let response = {};

    if(!req.params.date_string){
        res.send({unix:now.getTime(),utc:now.toUTCString()});
        return;
    }

    date_string = req.params.date_string;

    if(parseFloat(date_string) && (date_string != "0" || date_string == 0)){
        date_string = parseFloat(date_string);
        response.unix = new Date(date_string).getTime();
        response.utc = new Date(date_string).toUTCString();
    }else if(new Date(date_string) != "Invalid Date"){
        response.unix = new Date(date_string).getTime();
        response.utc = new Date(date_string).toUTCString();
    }else if(date_string == "0" || date_string == 0){
        response.unix = new Date(0).getTime();
        response.utc = new Date(0).toUTCString();
    }else{
        return {error:"Invalid Date"};
    }


    res.send(response);
})

const listener = app.listen(PORT, function(err,res){
    if(err){
        console.log(err);
        throw err;
    }
    console.log("Listening for requests on port " + PORT);
})