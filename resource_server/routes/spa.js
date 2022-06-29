const express = require('express');
const router = express.Router();
const { param } = require('express/lib/request');
const axios = require('axios');
const jwt = require("jsonwebtoken");
const { realmPemCert } = require("../config/config")

var content = []

router.get('/', (req, res) => {

    const accessToken = (req.headers.authorization || '').split(' ')[1] || '';
    console.log(accessToken);
    if (!accessToken) {
		return res.status(401).end();
	}

    // const payload = jwt.verify(accessToken, realmPemCert, { algorithms: ['RS256']}, function(err, p){
    //     console.log(err);
    //     console.log(p);
    // });
    // console.log(payload);
    // Tutal logika sprawdzania pola exp - DoItYourself
    // Sprawdzić czy tkoen nie wygasł
    res.send(JSON.stringify({content}))
});

router.post('/', (req, res) => {

    const accessToken = (req.headers.authorization || '').split(' ')[1] || '';
    console.log(accessToken);
    if (!accessToken) {
		return res.status(401).end();
	}
    content.push(req.body)
    res.send(JSON.stringify({content}))
});

module.exports = router;