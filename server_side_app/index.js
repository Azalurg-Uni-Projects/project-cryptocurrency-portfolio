const express = require('express');
const axios = require('axios');
const { param } = require('express/lib/request');
const {PORT, authEndpoint, tokenEndpoint, apiProtectedEndpoint, apiUnprotectedEndpoint, clientId, clientSecret, codeVerifier, codeChallenge, redirectUriLogin, redirectUriWallet} = require('./config/config')

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

let token = "";

// create auth request
const authRequestLogin = `${authEndpoint}?
response_type=code&
client_id=${clientId}&
state=1234&
redirect_uri=${redirectUriLogin}&
code_challenge=${codeChallenge}&
code_challenge_method=S256`;

const authRequestWallet = `${authEndpoint}?
response_type=code&
client_id=${clientId}&
state=1234&
redirect_uri=${redirectUriWallet}&
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
    res.render('home', {authRequestLogin, authRequestWallet, title: "Home"})
});

app.get('/market', async (_req, res) => {
    res.set('Content-Type', 'text/html');
    try{
        const response = await axios.get(apiUnprotectedEndpoint)
        if(response.status === 200){
            res.render('market', {authRequestLogin, authRequestWallet, title: "Market", coins: response.data})
        } else {
            res.render('500', {authRequestLogin, authRequestWallet, title: "Error 500"})
        }
    }
    catch(err){
        console.log(err);
        res.status(521).render('521', {authRequestLogin, authRequestWallet, title: "Error 521"});
    }
    
    
});


// change on login page
app.get('/wallet', (req, res) => {

    const params = new URLSearchParams();
    
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', redirectUriWallet);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('code_verifier', codeVerifier);
    params.append('code', req.query.code);
    
    return axios
        .post(tokenEndpoint, params)
        .then(result => {
            const accessToken = result.data.access_token || ''
            token = accessToken
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
            if(typeof(result2.data.content) != String)
            res.set('Content-Type', 'text/html');
            res.render('wallet', {authRequestLogin, authRequestWallet, coins: result2.data.content, title: "Wallet"})
        })
        .catch(err => {
            console.log(err);
            res.set('Content-Type', 'text/html');
            res.render('500', {authRequestLogin, authRequestWallet, title: "Error 500"})
        })
})

app.post("/post", (req, res) =>{
    const data = JSON.parse(req.headers.myheader);
    res.set('Content-Type', 'text/html');
    res.send("git")
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {authRequestLogin, authRequestWallet, title: "Error 404"});
})

app.listen(PORT, _err => {
    console.log(`Web app listening on port ${PORT}`);
})