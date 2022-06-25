const express = require('express');
const router = express.Router();
const { param } = require('express/lib/request');
const axios = require('axios');

const { clientId, clientSecret, introspectionEndpoint } = require("../config/config")

router.get('/protected/data', (req, res) => {

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
                res.send(JSON.stringify({message: "Secret date"}))
            } else {
                res.send({message: "Invalid token"})
            }
            
        })
        .catch(error => {
            console.log(error);
            res.set('Content-Type', 'application/json');
            res.send(JSON.stringify({message: "Some other error"}))
        })
});

module.exports = router;
