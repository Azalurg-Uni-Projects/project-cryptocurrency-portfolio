import React, { useEffect, useState }  from 'react'
import {connect} from "react-redux";

import { extractCoins } from "../redux/coins/selectors"
import { getCoins } from '../redux/coins/operations';

const Market = ({coins, getCoins}) => {


    useEffect(() => {

        if(coins.length === 0){
            getCoins();
        }
        
    }, [])


    return(
        <div>
            <h1>Market Page</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Market);