'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const nodeWikipedia = require("node-wikipedia")
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
    // nodeWikipedia.page.data(name, { content: true }, function(response) {
    //     console.log(JSON.stringify(response.text, null, 2));
    // }
    var headers = {
        'Content-Type' : 'application/json'
    }
    var options = {
        url : 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=Google&redirects',
        method: 'POST',
        json : 'true'
    }
    console.log(url);
    request(options, function(err, resp, body) {
        if (err) {
            console.log(url, err);
            return;
        } else {
            return res.json({
                speech: name,
                displayText: response,
                source: 'webhook-echo-sample'
            });
        }
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
    // var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=Google&redirects"
    // console.log(url);
    // request(url, { json: true }, function(err, resp, body) {
    //     if (err) {
    //         console.log(url, err);
    //         return;
    //     } else {
    //         callback(body, url);
    //     }
    // });
    // nodeWikipedia.page.data("Clifford_Brown", { content: true }, function(response) {
    //     console.log(JSON.stringify(response.text,null,2));
    // });
});
