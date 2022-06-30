const express = require('express');
const router = express.Router();
const { param } = require('express/lib/request');
const axios = require('axios');

const { clientId, clientSecret, introspectionEndpoint } = require("../config/config")

var content = []

router.get('/', (req, res) => {

    const accessToken = (req.headers.authorization || '').split(' ')[1] || '';
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('token', accessToken);
    
    return axios
        .post(introspectionEndpoint, params)
        .then(result => {
            console.log("Introspection result");
            console.log(result);
            res.set('Content-Type', 'application/json');
            if(result.data.active === true){
                res.send(JSON.stringify({content}))
            } else {
                res.send({content: "Invalid token"})
            }
            
        })
        .catch(error => {
            console.log(error);
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify({content: "Some other error"}))
        })
});

router.post('/', (req, res) => {

    console.log(req.body);

    const accessToken = (req.headers.authorization || '').split(' ')[1] || '';
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('token', accessToken);
    
    return axios
        .post(introspectionEndpoint, params)
        .then(result => {
            res.set('Content-Type', 'application/json');
            content.push(req.body.data)
            res.send(JSON.stringify({content}))
        })
        .catch(error => {
            console.log(error);
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify({content: "Some other error"}))
        })
});

module.exports = router;
