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
    var replyMsg;
    var intent = req.body.intent;
    var orderNumber = req.body.OrderNum || false;
    if (orderNumber) {
        orderNumber = parseInt(orderNumber, 10);
        replyMsg = 'SO: '+orderNumber+'\nPO Number: XYZ\nReq.Delivery Date: MM/DD/YY\nDelivery Block: S4\nMaterial: Matnr\nReqd Qty: XX\nConfirmed Qty: YY\nNet Value: $$\nDelivery Doc: XYZ';
    } else {
        replyMsg = 'Could not understand your order number, please double check';
    }
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
