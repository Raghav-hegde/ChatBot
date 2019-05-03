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

restService.post("/echo", function(req, res) {
    var speech =
        req.body.queryResult &&
        req.body.queryResult.parameters &&
        req.body.queryResult.parameters.echoText ?
        req.body.queryResult.parameters.echoText :
        "Seems like some problem. Speak again.";
    return res.json({
        fulfillmentText: speech,
        source: "webhook-echo-sample"
    });
});

restService.post("/calculator", function(req, res) {
    var num1 = req.body.queryResult.parameters.number1;
    var num2 = req.body.queryResult.parameters.number2;
    var operation = req.body.queryResult.parameters.operator;
    var result = 0;
    var answer = "";
    switch (operation) {
        case "Add":
            result = num1 + num2;
            answer = num1 + " + " + num2 + " = " + result;
            break;
        case "Subtract":
            result = num1 - num2;
            answer = num1 + " - " + num2 + " = " + result;
            break;
        case "Multiply":
            result = num1 * num2;
            answer = num1 + " * " + num2 + " = " + result;
            break;
            defaut: answer = "I'm facing difficulty in that. Talk to the developer";
    }
    return res.json({
        fulfillmentText: answer,
        source: "webhook-addition-sample"
    });
});

restService.post("/poc", function(req, res) {
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
