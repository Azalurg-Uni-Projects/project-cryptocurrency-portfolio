import React, { useEffect, useState }  from 'react'
import {connect} from "react-redux";
import { extractCoins } from "../redux/coins/selectors"
import { getCoins } from '../redux/coins/operations';
import { useNavigate } from 'react-router-dom';
const axios = require('axios');
const Cookies = require('js-cookie')

const Wallet = ({coins, getCoins}) => {
    const navigate = useNavigate()

    const authRequestLogin = "http://localhost:8080/realms/main/protocol/openid-connect/auth?response_type=code&client_id=browserapp&state=1234&redirect_uri=http://localhost:3000/session&code_challenge=TKsCMm9IxqyWVyCNMZ3x-T4PTlSQyPNVPkR9NzOATp4&code_challenge_method=S256"

    useEffect(() => {
        const token = Cookies.get("token")
        if (!token) {
            window.location.href=authRequestLogin;
        } else {
            //pobieranie danych
        }
        if(coins.length === 0){
            getCoins();
        }
    }, [])


    return(
        <div>
            <h1>Wallet</h1>
            {coins ? coins.map(coin =>(
            <div key={coin.id}>
                {coin.name}: {coin.current_price}$
            </div>
            )) : <p className='Error'>Connection to CoinGecko error</p>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        coins: extractCoins(state),
    };
}

const mapDispatchToProps = {
    getCoins
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);