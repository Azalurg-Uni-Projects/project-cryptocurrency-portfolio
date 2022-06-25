const express = require('express');
const router = express.Router();
const axios = require('axios');
router.get('/', async (req, res) => {
    res.set('Content-Type', 'application/json');
    try{
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false" );
        if(response.status === 200){
            res.status(200).send(JSON.stringify(response.data));
        } 
        else {
            res.status(500).send(JSON.stringify({coins: []}))
        }   
    }
    catch(err){
        console.log(err);
        res.status(500).send(JSON.stringify({coins: []}));
    }
    

});

module.exports = router;
