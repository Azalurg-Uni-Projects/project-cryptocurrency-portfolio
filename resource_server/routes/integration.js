const express = require('express');
const router = express.Router();
const { param } = require('express/lib/request');
const axios = require('axios');

const { integrationClientId, integrationClientSecret, introspectionEndpoint } = require("../config/config")

router.get('/', (req, res) => {

    const accessToken = (req.headers.authorization || '').split(' ')[1] || '';
    
    const params = new URLSearchParams();
    params.append('client_id', integrationClientId);
    params.append('client_secret', integrationClientSecret);
    params.append('token', accessToken);

    return axios.post(introspectionEndpoint, params)
    .then(result => {
        console.log("Introspection result");
        res.set('Content-Type', 'application/json');

        if (result.data.active == true ) {
            res.send(JSON.stringify({ 
                message: "Hi, I'm private message"
            }));
        }
        else {
            res.send({
                message: 'Invalid token'
            });
        }

    })
    .catch(error => {
        console.log(error);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({error: "Some other error"}))
    })
});

router.post('/', (req, res) => {

    const accessToken = (req.headers.authorization || '').split(' ')[1] || '';

    const params = new URLSearchParams();
    params.append('client_id', integrationClientId);
    params.append('client_secret', integrationClientSecret);
    params.append('token', accessToken);

    return axios.post(introspectionEndpoint, params)
    .then(result => {
        res.set('Content-Type', 'application/json');

        if (result.data.active == true ) {
            res.send(JSON.stringify({ 
                message: Math.random()
            }));
        }
        else {
            res.send({
                message: 'Invalid token'
            });
        }

    })
    .catch(error => {
        console.log(error);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({error: "Some other error"}))
    })
});

module.exports = router;