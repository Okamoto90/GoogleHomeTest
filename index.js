'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});


restService.post('/wiki', function(req, res) {

    var name = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    $.ajax({
        type: 'GET',
        url: "https://ja.wikipedia.org/w/api.php?format=xml&action=query&prop=revisions&titles=" + name + "&rvprop=content",
        success: function(data) {
            $('#content').append(data.responseText);
        },
        error: function(xhr, status, err) {
            alert('HTML読み出しで問題がありました:' + url);
        }
    });

    return res.json({
        speech: name,
        displayText: "https://ja.wikipedia.org/w/api.php?format=xml&action=query&prop=revisions&titles=" + name + "&rvprop=content",
        source: 'webhook-echo-sample'
    });
});




restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
