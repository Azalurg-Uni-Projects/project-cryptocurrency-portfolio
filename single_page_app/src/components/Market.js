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
            <table className="CoinsList">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>Mkt Cap</th>
                    </tr>
                </thead>
                <tbody>
                {coins ? coins.map(coin =>(
                    <tr key={coin.id} className="Coin">
                        <td> {coin.market_cap_rank} </td>
                        <td className="Symbol"> <img alt="image" src={coin.image}></img> {coin.symbol} </td>
                        <td>${coin.current_price}</td>
                        <td>${coin.market_cap}</td>
                    </tr>
                    )) : <tr className='Error'>Connection to CoinGecko error</tr>}
                </tbody>
            </table>
            
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