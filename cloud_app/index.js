const express = require('express');
const axios = require('axios');
const { param } = require('express/lib/request');
const { PORT, tokenEndpoint, apiIntegrationEndpoint, clientId, clientSecret} = require('./config/config')

const app = express();

app.use((req, res, next) => {
    console.log('----HEADERS--');
    console.log(req.headers);
    console.log('----PARAMS--');
    console.log(req.query);
    next();
});


app.get('/', (req, res) => {

    const params = new URLSearchParams();

    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    return axios.post(tokenEndpoint, params)
    .then(result => {
        accessToken = result.data.access_token || '';
        return axios.get(apiIntegrationEndpoint, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
    })
    .then(result => {
        res.set('Content-Type', 'application/json');
        res.send({ 
            message: result.data.message
        });
    })
    .catch(error => {
        res.set('Content-Type', 'text/html');
        res.send({ 
            error
        })}
     );
    });

app.get('/public', async (req, res) => {
    try{
        const k = await axios.get("http://localhost:4000/public")
        console.log(k.data);
        res.status(200).send(k.data[0])
    }
    catch(err){
        res.status(500).send(err.message)
    }
    
})

app.post('/', (req, res) => {

    const params = new URLSearchParams();

    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    return axios.post(tokenEndpoint, params)
    .then(result => {
        accessToken = result.data.access_token || '';
        return axios.post(apiIntegrationEndpoint, {number: Math.random} ,{
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        })
    })
    .then(result => {
        res.set('Content-Type', 'application/json');
        res.send({ 
            message: result.data.message
        });
    })
    .catch(error => {
        res.set('Content-Type', 'text/html');
        res.send({ 
            error
        })}
     );
});

app.listen(PORT, err => {
    console.log(`App listening on port ${PORT}`);
});