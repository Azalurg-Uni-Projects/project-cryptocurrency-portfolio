import React, { useEffect, useState }  from 'react'
import {connect} from "react-redux";
import { extractCoins } from "../redux/coins/selectors"
import { getCoins } from '../redux/coins/operations';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import {walletSchema} from "./walletSchema" 
const axios = require('axios');
const Cookies = require('js-cookie')

const Wallet = ({coins, getCoins}) => {
    const navigate = useNavigate()
    const [apiData, setApiData] = useState([])

    const authRequestLogin = "http://localhost:8080/realms/main/protocol/openid-connect/auth?response_type=code&client_id=browserapp&state=1234&redirect_uri=http://localhost:3000/session&code_challenge=TKsCMm9IxqyWVyCNMZ3x-T4PTlSQyPNVPkR9NzOATp4&code_challenge_method=S256"
   
    async function getData(token){
            const k = await axios.get("http://localhost:4000/spa", {
                headers: {'Authorization': 'Bearer ' + token}
            })
            setApiData(k.data.content)
    }

    const handleSubmit = async (values) => {
        const token = Cookies.get("token")
        values["id"] = Math.random()
        console.log(values);
        const k = await axios.post("http://localhost:4000/spa", values,{
                headers: {'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}
            })
        setApiData(k.data.content);
    }

    useEffect(() => {
        const token = Cookies.get("token")
        if (!token) {
            window.location.href=authRequestLogin;
        } else {
            getData(token)
        }
        if(coins.length === 0){
            getCoins();
        }
    }, [])


    return(
        <div>
            <h1>Wallet</h1>
            <Formik
                initialValues={{
                    coin_name: "Bitcoin",
                    amount: 0
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                validationSchema={walletSchema}>
                <Form className="Input">

                    <li>
                        <label htmlFor="coin_name">Coin name: </label>  
                        <Field name="coin_name" type="text" id="coin_name"/>  
                        <ErrorMessage name="coin_name" component="p" className='Delete'/> 
                    </li>
                    <li>
                        <label htmlFor="amount">Amount: </label>  
                        <Field name="amount" type="number" id="amount"/>  
                        <ErrorMessage name="amount" component="p" className='Delete'/> 
                    </li>
  
                    <div className="Submit">
                        <button type="submit" className="Btn">Add</button>
                    </div>
                </Form>
            </Formik>
            {apiData ? apiData.map(coin =>(
            <div key={coin.id}>
                {coin.coin_name}: {coin.amount}$
            </div>
            )) : <p className='Error'>Nothing here</p>}
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