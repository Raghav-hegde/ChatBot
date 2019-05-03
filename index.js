"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
    bodyParser.urlencoded({
        extended: true
    })
);

restService.use(bodyParser.json());

restService.post("/getSOStatus", function(req, res) {
    //console.log('event data: ' + JSON.stringify(event.data));	
    //var replyMsg;
    //var intent = req.data['intent'];
    //var orderNumber = req.data['OrderNum'];
    var replyMsg = "Returning from webhook";
    //console.log('intent detected: ' + intent);
    return res.json({
       replies: [{
      type: "text",
      content: replyMsg
    }]
    });
});

restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});
