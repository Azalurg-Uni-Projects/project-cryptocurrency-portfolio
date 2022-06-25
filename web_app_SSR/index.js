const express = require('express');
const axios = require('axios');
const { param } = require('express/lib/request');
const {PORT, authEndpoint, tokenEndpoint, apiProtectedEndpoint, apiUnprotectedEndpoint, clientId, clientSecret, codeVerifier, codeChallenge, redirectUri} = require('./config/config')

const app = express();
app.set('view engine', 'ejs');


// create auth request
const authRequest = `${authEndpoint}?
response_type=code&
client_id=${clientId}&
state=1234&
redirect_uri=${redirectUri}&
code_challenge=${codeChallenge}&
code_challenge_method=S256`;

// logger middleware
app.use((req, _res, next) => {
    console.log('----HEADERS--');
    console.log(req.headers);
    console.log('----PARAMS--');
    console.log(req.query);
    next();
    
    });

app.get('/', (_req, res) => {
    res.set('Content-Type', 'text/html');
    res.render('home', {authRequest, title: "Home"})
});

app.get('/wallet', (_req, res) => {
    res.set('Content-Type', 'text/html');
    res.render('wallet', {authRequest, title: "Wallet"})
});

app.get('/market', async (_req, res) => {
    res.set('Content-Type', 'text/html');
    try{
        const response = await axios.get(apiUnprotectedEndpoint)
        if(response.status === 200){
            res.render('market', {authRequest, title: "Market", coins: response.data})
        } else {
            res.render('500', {authRequest, title: "Error 500"})
        }
    }
    catch(err){
        console.log(err);
        res.status(521).render('521', {authRequest, title: "Error 521"});
    }
    
    
});


// change on login page
app.get('/redirect', (req, res) => {

    const params = new URLSearchParams();
    
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', redirectUri);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('code_verifier', codeVerifier);
    params.append('code', req.query.code);
    
    return axios
        .post(tokenEndpoint, params)
        .then(result => {
            const accessToken = result.data.access_token || ''
            return axios.get(apiProtectedEndpoint, {
                headers: {'Authorization': 'Bearer ' + accessToken}
            })
        })
        .then(result2 => {   //rozpatrzeć różne scenariusze !!!!!!!!!!!
            let success = true
            if (result2.status !== 200){
                success = false
            }
            console.log(result2.data);
            res.send(`
            <!DOCTYPE html>
            <body>
            <h2>${success}</h2>
            <p>${result2.data.message}</p>
            </body>
            </html>
            `);
        })
        .catch(err => {
            res.send(`
            <!DOCTYPE html>
            <body>
            <h2>Error</h2>
            <p>${err.message}</p>
            </body>
            </html>
            `);
        })
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {authRequest, title: "Error 404"});
})

app.listen(PORT, _err => {
    console.log(`Web app listening on port ${PORT}`);
})