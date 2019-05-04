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
    var flag = 0;
    var intent = req.body.intent;
    var orderNumber = req.body.OrderNum || false;
    if (orderNumber) {
        //orderNumber = parseInt(orderNumber, 10);
        if (orderNumber.startsWith('111')) {
            replyMsg = 'Here is your order detail:\n\nSO: ' + orderNumber + '\nPO Number: XYZ\nReq.Delivery Date: MM/DD/YY\nDelivery Block: S4\nMaterial: Matnr\nReqd Qty: XX\nConfirmed Qty: YY\nNet Value: $$\nDelivery Doc: XYZ';
            return res.json({
                replies: [{
                    type: "quickReplies",
                    content: {
                        title: replyMsg,
                        buttons: [{
                                title: 'Remove dlv block',
                                value: 'Remove delivery block S4'
                            },
                            {
                                title: 'Start Over',
                                value: 'Start Over'
                            },
                            {
                                title: 'No,  Exit from chat',
                                value: 'Exit'
                            }]
                    }
                }],
                conversation: {
                    language: "en",
                    memory: {
                        orderNum: orderNumber,
                        deliveryBlock: 'S4'
                    }
                }
            });
        } else {
            replyMsg = 'Here is your order detail:\n\nSO: ' + orderNumber + '\nPO Number: XYZ\nReq.Delivery Date: MM/DD/YY\nDelivery Block: None\nMaterial: Matnr\nReqd Qty: XX\nConfirmed Qty: YY\nNet Value: $$\nDelivery Doc: XYZ';
            flag = 1;
        }
    } else {
        replyMsg = 'Could not understand your order number, please double check';
        flag = 1;
    }

    if (flag == 1) {
        return res.json({
            replies: [{
                type: "quickReplies",
                content: {
                    title: replyMsg,
                    buttons: [{
                            title: 'Start Over',
                            value: 'Start Over'
                        },
                        {
                            title: 'No,  Exit from chat',
                            value: 'Exit'
                        }]
                }
            }]
        });
    }
});

restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});
